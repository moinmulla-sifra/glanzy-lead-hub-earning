-- 1. Create missing tables
CREATE TABLE IF NOT EXISTS public.research_jobs (
  id uuid NOT NULL DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  workspace_id uuid REFERENCES public.workspaces(id) ON DELETE CASCADE,
  requested_by uuid REFERENCES auth.users(id),
  research_type text NOT NULL,
  query jsonb NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed')),
  error text,
  results_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  started_at timestamptz,
  completed_at timestamptz
);

CREATE TABLE IF NOT EXISTS public.research_runs (
  id uuid NOT NULL DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  research_job_id uuid REFERENCES public.research_jobs(id) ON DELETE CASCADE,
  target_url text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed')),
  raw_results jsonb,
  error text,
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

CREATE TABLE IF NOT EXISTS public.brand_evidence (
  id uuid NOT NULL DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  brand_id uuid REFERENCES public.brands(id) ON DELETE CASCADE,
  research_run_id uuid REFERENCES public.research_runs(id) ON DELETE SET NULL,
  evidence_type text NOT NULL,
  content text NOT NULL,
  source_url text,
  confidence_score numeric CHECK (confidence_score >= 0 AND confidence_score <= 100),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.research_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_evidence ENABLE ROW LEVEL SECURITY;

-- Add Missing RLS Policies for Profiles and Workspaces (INSERT)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can insert their own profile') THEN
        CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can create workspaces') THEN
        CREATE POLICY "Users can create workspaces" ON workspaces FOR INSERT WITH CHECK (auth.uid() = owner_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can insert workspace members') THEN
        CREATE POLICY "Users can insert workspace members" ON workspace_members FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;
END $$;

-- Fix the trigger to allow BOTH creator and agency workspace automatic creation
CREATE OR REPLACE FUNCTION create_creator_workspace() RETURNS trigger AS $$
DECLARE
  new_workspace_id uuid;
BEGIN
  IF new.account_type IN ('creator', 'agency') THEN
    INSERT INTO public.workspaces (name, type, owner_id)
    VALUES (COALESCE(new.full_name, 'My Workspace'), new.account_type, new.id)
    RETURNING id INTO new_workspace_id;
    
    INSERT INTO public.workspace_members (workspace_id, user_id, role)
    VALUES (new_workspace_id, new.id, 'owner');
  END IF;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
