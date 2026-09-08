-- ====================================================================
-- BRANZLY SUPABASE COMPLETE BACKEND FIX
-- Paste and Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. FIX PROFILES TABLE (Add all missing columns)
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS niche text,
  ADD COLUMN IF NOT EXISTS agency_name text,
  ADD COLUMN IF NOT EXISTS primary_niche text,
  ADD COLUMN IF NOT EXISTS content_categories text[],
  ADD COLUMN IF NOT EXISTS platforms text[],
  ADD COLUMN IF NOT EXISTS audience_range text,
  ADD COLUMN IF NOT EXISTS website text,
  ADD COLUMN IF NOT EXISTS social_links jsonb,
  ADD COLUMN IF NOT EXISTS onboarding_completed boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS last_researched_at timestamptz,
  ADD COLUMN IF NOT EXISTS last_verified_at timestamptz,
  ADD COLUMN IF NOT EXISTS data_confidence text,
  ADD COLUMN IF NOT EXISTS research_status text,
  ADD COLUMN IF NOT EXISTS source_count integer DEFAULT 0;

-- Sync niche and primary_niche if one is filled and the other is null
UPDATE public.profiles 
SET niche = COALESCE(niche, primary_niche),
    primary_niche = COALESCE(primary_niche, niche)
WHERE niche IS NULL OR primary_niche IS NULL;

-- 3. FIX WORKSPACES TABLE (Add missing workspace_type column)
ALTER TABLE public.workspaces 
  ADD COLUMN IF NOT EXISTS workspace_type text,
  ADD COLUMN IF NOT EXISTS type text;

-- Sync workspace_type and type
UPDATE public.workspaces 
SET workspace_type = COALESCE(workspace_type, type, 'creator'),
    type = COALESCE(type, workspace_type, 'creator')
WHERE workspace_type IS NULL OR type IS NULL;

-- 4. FIX SAVED_BRANDS TABLE (Add missing columns)
ALTER TABLE public.saved_brands 
  ADD COLUMN IF NOT EXISTS status text DEFAULT 'Saved',
  ADD COLUMN IF NOT EXISTS email_subject text,
  ADD COLUMN IF NOT EXISTS email_body text,
  ADD COLUMN IF NOT EXISTS notes text,
  ADD COLUMN IF NOT EXISTS tags text[],
  ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

-- 5. FIX OUTREACH TABLE (Relax status check constraint so 'Saved', 'Contacted', etc. work)
ALTER TABLE public.outreach DROP CONSTRAINT IF EXISTS outreach_status_check;
ALTER TABLE public.outreach 
  ADD CONSTRAINT outreach_status_check 
  CHECK (LOWER(status) IN ('saved', 'contacted', 'replied', 'interested', 'meeting', 'won', 'lost'));

-- 6. FIX OUTREACH_ACTIVITY TABLE (Add missing columns and make workspace_id nullable)
ALTER TABLE public.outreach_activity 
  ALTER COLUMN workspace_id DROP NOT NULL;

ALTER TABLE public.outreach_activity 
  ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS description text,
  ADD COLUMN IF NOT EXISTS old_status text,
  ADD COLUMN IF NOT EXISTS new_status text;

-- Trigger to auto-populate workspace_id on outreach_activity from outreach if omitted
CREATE OR REPLACE FUNCTION auto_fill_outreach_activity_workspace() 
RETURNS trigger AS $$
BEGIN
  IF NEW.workspace_id IS NULL AND NEW.outreach_id IS NOT NULL THEN
    SELECT workspace_id INTO NEW.workspace_id FROM public.outreach WHERE id = NEW.outreach_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_fill_outreach_activity_workspace ON public.outreach_activity;
CREATE TRIGGER trg_fill_outreach_activity_workspace
  BEFORE INSERT ON public.outreach_activity
  FOR EACH ROW EXECUTE PROCEDURE auto_fill_outreach_activity_workspace();

-- 7. ENSURE AI RESEARCH TABLES EXIST
CREATE TABLE IF NOT EXISTS public.research_jobs (
  id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  workspace_id uuid REFERENCES public.workspaces(id) ON DELETE CASCADE,
  requested_by uuid REFERENCES auth.users(id),
  research_type text NOT NULL,
  query jsonb NOT NULL,
  provider text,
  status text NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'running', 'completed', 'failed', 'cancelled')),
  started_at timestamptz,
  completed_at timestamptz,
  error text,
  result_count integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.research_runs (
  id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  research_job_id uuid NOT NULL REFERENCES public.research_jobs(id) ON DELETE CASCADE,
  provider text NOT NULL,
  status text NOT NULL DEFAULT 'running' CHECK (status IN ('running', 'completed', 'failed')),
  raw_results jsonb,
  error text,
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

CREATE TABLE IF NOT EXISTS public.brand_evidence (
  id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  brand_id uuid NOT NULL REFERENCES public.brands(id) ON DELETE CASCADE,
  research_run_id uuid REFERENCES public.research_runs(id) ON DELETE SET NULL,
  source_url text,
  source_type text,
  field_name text NOT NULL,
  evidence jsonb,
  confidence text CHECK (confidence IN ('high', 'medium', 'low', 'unverified')),
  discovered_at timestamptz DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.research_queue (
  id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  category text NOT NULL,
  country text,
  niche text,
  research_query jsonb NOT NULL,
  priority integer DEFAULT 0,
  last_run timestamptz,
  next_run timestamptz DEFAULT now(),
  enabled boolean DEFAULT true
);

CREATE TABLE IF NOT EXISTS public.app_config (
  key text PRIMARY KEY,
  value jsonb
);

INSERT INTO public.app_config (key, value) 
VALUES ('research_scheduler', '{"enabled": true, "frequency": "hourly", "target_per_run": 6}') 
ON CONFLICT (key) DO NOTHING;

-- 8. FIX TRIGGER FOR AUTOMATIC WORKSPACE CREATION (Supports BOTH creator AND agency)
CREATE OR REPLACE FUNCTION create_creator_workspace() RETURNS trigger AS $$
DECLARE
  new_workspace_id uuid;
  ws_type text;
  ws_name text;
BEGIN
  ws_type := COALESCE(new.account_type, 'creator');
  ws_name := COALESCE(new.agency_name, new.full_name, 'My Workspace');
  
  -- Check if user already has a workspace
  IF NOT EXISTS (SELECT 1 FROM public.workspace_members WHERE user_id = new.id) THEN
    INSERT INTO public.workspaces (name, type, workspace_type, owner_id)
    VALUES (ws_name, ws_type, ws_type, new.id)
    RETURNING id INTO new_workspace_id;
    
    INSERT INTO public.workspace_members (workspace_id, user_id, role)
    VALUES (new_workspace_id, new.id, 'owner')
    ON CONFLICT (workspace_id, user_id) DO NOTHING;
  END IF;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_profile_created_workspace ON public.profiles;
CREATE TRIGGER on_profile_created_workspace
  AFTER INSERT OR UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE create_creator_workspace();

-- Backfill workspaces for any existing profiles that don't have one!
DO $$
DECLARE
  prof RECORD;
  new_ws_id uuid;
  ws_type text;
  ws_name text;
BEGIN
  FOR prof IN 
    SELECT p.id, p.full_name, p.agency_name, p.account_type 
    FROM public.profiles p
    LEFT JOIN public.workspace_members wm ON wm.user_id = p.id
    WHERE wm.id IS NULL
  LOOP
    ws_type := COALESCE(prof.account_type, 'creator');
    ws_name := COALESCE(prof.agency_name, prof.full_name, 'My Workspace');
    
    INSERT INTO public.workspaces (name, type, workspace_type, owner_id)
    VALUES (ws_name, ws_type, ws_type, prof.id)
    RETURNING id INTO new_ws_id;
    
    INSERT INTO public.workspace_members (workspace_id, user_id, role)
    VALUES (new_ws_id, prof.id, 'owner')
    ON CONFLICT (workspace_id, user_id) DO NOTHING;
  END LOOP;
END $$;

-- 9. ROW LEVEL SECURITY (RLS) POLICIES FIX
-- Ensure RLS is active on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outreach ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outreach_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_config ENABLE ROW LEVEL SECURITY;

-- Helper functions
CREATE OR REPLACE FUNCTION public.is_admin() 
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND account_type = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.user_workspaces()
RETURNS SETOF uuid AS $$
BEGIN
  RETURN QUERY SELECT workspace_id FROM public.workspace_members WHERE user_id = auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.is_workspace_manager(check_workspace_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.workspace_members 
    WHERE workspace_id = check_workspace_id 
      AND user_id = auth.uid() 
      AND role IN ('owner', 'admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- PROFILES POLICIES
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users cannot elevate to admin" ON public.profiles;

CREATE POLICY "Users can view their own profile" ON public.profiles 
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles 
  FOR SELECT USING (is_admin());

CREATE POLICY "Users can insert their own profile" ON public.profiles 
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles 
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- WORKSPACES POLICIES
DROP POLICY IF EXISTS "Users can view workspaces they are members of" ON public.workspaces;
DROP POLICY IF EXISTS "Workspace owners/admins can update workspace" ON public.workspaces;
DROP POLICY IF EXISTS "Users can create their own workspace" ON public.workspaces;

CREATE POLICY "Users can view workspaces they are members of" ON public.workspaces 
  FOR SELECT USING (id IN (SELECT user_workspaces()) OR owner_id = auth.uid());

CREATE POLICY "Users can create their own workspace" ON public.workspaces 
  FOR INSERT WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Workspace owners/admins can update workspace" ON public.workspaces 
  FOR UPDATE USING (is_workspace_manager(id) OR owner_id = auth.uid()) 
  WITH CHECK (is_workspace_manager(id) OR owner_id = auth.uid());

-- WORKSPACE MEMBERS POLICIES
DROP POLICY IF EXISTS "Users can view members of their workspaces" ON public.workspace_members;
DROP POLICY IF EXISTS "Workspace owners/admins can manage members" ON public.workspace_members;
DROP POLICY IF EXISTS "Users can insert membership for own workspace" ON public.workspace_members;

CREATE POLICY "Users can view members of their workspaces" ON public.workspace_members 
  FOR SELECT USING (workspace_id IN (SELECT user_workspaces()) OR user_id = auth.uid());

CREATE POLICY "Users can insert membership for own workspace" ON public.workspace_members 
  FOR INSERT WITH CHECK (user_id = auth.uid() OR is_workspace_manager(workspace_id));

CREATE POLICY "Workspace owners/admins can manage members" ON public.workspace_members 
  FOR ALL USING (is_workspace_manager(workspace_id) OR user_id = auth.uid()) 
  WITH CHECK (is_workspace_manager(workspace_id) OR user_id = auth.uid());

-- SAVED BRANDS POLICIES
DROP POLICY IF EXISTS "Users can view their workspace saved brands" ON public.saved_brands;
DROP POLICY IF EXISTS "Users can manage their workspace saved brands" ON public.saved_brands;

CREATE POLICY "Users can view their workspace saved brands" ON public.saved_brands 
  FOR SELECT USING (workspace_id IN (SELECT user_workspaces()));

CREATE POLICY "Users can manage their workspace saved brands" ON public.saved_brands 
  FOR ALL USING (workspace_id IN (SELECT user_workspaces())) 
  WITH CHECK (workspace_id IN (SELECT user_workspaces()));

-- OUTREACH POLICIES
DROP POLICY IF EXISTS "Users can view their workspace outreach" ON public.outreach;
DROP POLICY IF EXISTS "Users can manage their workspace outreach" ON public.outreach;

CREATE POLICY "Users can view their workspace outreach" ON public.outreach 
  FOR SELECT USING (workspace_id IN (SELECT user_workspaces()));

CREATE POLICY "Users can manage their workspace outreach" ON public.outreach 
  FOR ALL USING (workspace_id IN (SELECT user_workspaces())) 
  WITH CHECK (workspace_id IN (SELECT user_workspaces()));

-- OUTREACH ACTIVITY POLICIES
DROP POLICY IF EXISTS "Users can view their workspace outreach activity" ON public.outreach_activity;
DROP POLICY IF EXISTS "Users can manage their workspace outreach activity" ON public.outreach_activity;

CREATE POLICY "Users can view their workspace outreach activity" ON public.outreach_activity 
  FOR SELECT USING (
    workspace_id IN (SELECT user_workspaces()) 
    OR outreach_id IN (SELECT id FROM public.outreach WHERE workspace_id IN (SELECT user_workspaces()))
    OR user_id = auth.uid()
  );

CREATE POLICY "Users can manage their workspace outreach activity" ON public.outreach_activity 
  FOR ALL USING (
    workspace_id IN (SELECT user_workspaces()) 
    OR outreach_id IN (SELECT id FROM public.outreach WHERE workspace_id IN (SELECT user_workspaces()))
    OR user_id = auth.uid()
  ) WITH CHECK (
    workspace_id IN (SELECT user_workspaces()) 
    OR outreach_id IN (SELECT id FROM public.outreach WHERE workspace_id IN (SELECT user_workspaces()))
    OR user_id = auth.uid()
  );

-- SUBSCRIPTIONS POLICIES
DROP POLICY IF EXISTS "Users can view their workspace subscriptions" ON public.subscriptions;
DROP POLICY IF EXISTS "Users can manage their workspace subscriptions" ON public.subscriptions;

CREATE POLICY "Users can view their workspace subscriptions" ON public.subscriptions 
  FOR SELECT USING (workspace_id IN (SELECT user_workspaces()));

CREATE POLICY "Users can manage their workspace subscriptions" ON public.subscriptions 
  FOR ALL USING (is_workspace_manager(workspace_id)) 
  WITH CHECK (is_workspace_manager(workspace_id));

-- USAGE POLICIES
DROP POLICY IF EXISTS "Users can view their workspace usage" ON public.usage;
DROP POLICY IF EXISTS "Users can manage their workspace usage" ON public.usage;

CREATE POLICY "Users can view their workspace usage" ON public.usage 
  FOR SELECT USING (workspace_id IN (SELECT user_workspaces()));

CREATE POLICY "Users can manage their workspace usage" ON public.usage 
  FOR ALL USING (workspace_id IN (SELECT user_workspaces())) 
  WITH CHECK (workspace_id IN (SELECT user_workspaces()));

-- RESEARCH JOBS & RUNS POLICIES
DROP POLICY IF EXISTS "Users can view their workspace research jobs" ON public.research_jobs;
DROP POLICY IF EXISTS "Users can manage their workspace research jobs" ON public.research_jobs;
DROP POLICY IF EXISTS "Users can view their workspace research runs" ON public.research_runs;
DROP POLICY IF EXISTS "Users can manage their workspace research runs" ON public.research_runs;

CREATE POLICY "Users can view their workspace research jobs" ON public.research_jobs 
  FOR SELECT USING (workspace_id IN (SELECT user_workspaces()) OR requested_by = auth.uid());

CREATE POLICY "Users can manage their workspace research jobs" ON public.research_jobs 
  FOR ALL USING (workspace_id IN (SELECT user_workspaces()) OR requested_by = auth.uid()) 
  WITH CHECK (workspace_id IN (SELECT user_workspaces()) OR requested_by = auth.uid());

CREATE POLICY "Users can view their workspace research runs" ON public.research_runs 
  FOR SELECT USING (research_job_id IN (SELECT id FROM public.research_jobs WHERE workspace_id IN (SELECT user_workspaces()) OR requested_by = auth.uid()));

CREATE POLICY "Users can manage their workspace research runs" ON public.research_runs 
  FOR ALL USING (research_job_id IN (SELECT id FROM public.research_jobs WHERE workspace_id IN (SELECT user_workspaces()) OR requested_by = auth.uid())) 
  WITH CHECK (research_job_id IN (SELECT id FROM public.research_jobs WHERE workspace_id IN (SELECT user_workspaces()) OR requested_by = auth.uid()));

-- BRAND EVIDENCE POLICIES
DROP POLICY IF EXISTS "Authenticated users can view brand evidence" ON public.brand_evidence;
CREATE POLICY "Authenticated users can view brand evidence" ON public.brand_evidence 
  FOR SELECT USING (auth.role() = 'authenticated');

-- APP CONFIG & QUEUE POLICIES
DROP POLICY IF EXISTS "Authenticated users can view app config" ON public.app_config;
CREATE POLICY "Authenticated users can view app config" ON public.app_config 
  FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated users can view research queue" ON public.research_queue;
CREATE POLICY "Authenticated users can view research queue" ON public.research_queue 
  FOR SELECT USING (auth.role() = 'authenticated');
