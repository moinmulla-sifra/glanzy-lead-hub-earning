DROP TABLE IF EXISTS notification_preferences CASCADE;
DROP TABLE IF EXISTS usage CASCADE;
DROP TABLE IF EXISTS subscriptions CASCADE;
DROP TABLE IF EXISTS outreach_activity CASCADE;
DROP TABLE IF EXISTS outreach CASCADE;
DROP TABLE IF EXISTS saved_brands CASCADE;
DROP TABLE IF EXISTS brands CASCADE;
DROP TABLE IF EXISTS workspace_members CASCADE;
DROP TABLE IF EXISTS workspaces CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- BRANZLY SUPABASE BACKEND SCHEMA
-- Apply this in the Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  avatar_url text,
  account_type text CHECK (account_type IN ('creator', 'agency', 'admin')),
  country text,
  bio text,
  primary_niche text,
  content_categories text[],
  platforms text[],
  audience_range text,
  website text,
  social_links jsonb,
  onboarding_completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. WORKSPACES
CREATE TABLE workspaces (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  type text CHECK (type IN ('creator', 'agency')),
  owner_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 3. WORKSPACE MEMBERS
CREATE TABLE workspace_members (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id uuid REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role text CHECK (role IN ('owner', 'admin', 'member')) DEFAULT 'member',
  created_at timestamptz DEFAULT now(),
  UNIQUE(workspace_id, user_id)
);

-- 4. BRANDS (Global Canonical)
CREATE TABLE brands (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name text NOT NULL,
  normalized_name text UNIQUE,
  domain text UNIQUE,
  website text,
  country text,
  industry text,
  product text,
  company_stage text,
  contact_person text,
  contact_role text,
  email text,
  phone text,
  linkedin text,
  social_links jsonb,
  recent_funding text,
  recent_launch text,
  why_now text,
  marketing_activity text,
  existing_creator_activity text,
  influencer_fit_score integer,
  budget_potential text,
  lead_score integer,
  priority text,
  source text,
  verification_status text,
  last_verified timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 5. SAVED BRANDS
CREATE TABLE saved_brands (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id uuid REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  brand_id uuid REFERENCES brands(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(workspace_id, brand_id)
);

-- 6. OUTREACH
CREATE TABLE outreach (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id uuid REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  brand_id uuid REFERENCES brands(id) ON DELETE CASCADE NOT NULL,
  status text CHECK (status IN ('saved', 'contacted', 'replied', 'interested', 'meeting', 'won', 'lost')) DEFAULT 'saved',
  notes text,
  next_action text,
  contacted_at timestamptz,
  last_activity_at timestamptz DEFAULT now(),
  email_subject text,
  email_body text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(workspace_id, brand_id)
);

-- 7. OUTREACH ACTIVITY
CREATE TABLE outreach_activity (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  outreach_id uuid REFERENCES outreach(id) ON DELETE CASCADE NOT NULL,
  workspace_id uuid REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  activity_type text NOT NULL,
  note text,
  metadata jsonb,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- 8. SUBSCRIPTIONS
CREATE TABLE subscriptions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id uuid REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  plan text CHECK (plan IN ('free', 'pro', 'agency')) DEFAULT 'free',
  status text DEFAULT 'active',
  provider text,
  provider_customer_id text,
  provider_subscription_id text,
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 9. USAGE
CREATE TABLE usage (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id uuid REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  period_start timestamptz NOT NULL,
  period_end timestamptz NOT NULL,
  searches integer DEFAULT 0,
  brand_views integer DEFAULT 0,
  saved_brands integer DEFAULT 0,
  outreach_activity integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 10. NOTIFICATION PREFERENCES
CREATE TABLE notification_preferences (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  recommendation_notifications boolean DEFAULT true,
  product_updates boolean DEFAULT true,
  outreach_reminders boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- INDEXES
CREATE INDEX idx_profiles_account_type ON profiles(account_type);
CREATE INDEX idx_workspace_members_workspace_id ON workspace_members(workspace_id);
CREATE INDEX idx_workspace_members_user_id ON workspace_members(user_id);
CREATE INDEX idx_brands_domain ON brands(domain);
CREATE INDEX idx_brands_normalized_name ON brands(normalized_name);
CREATE INDEX idx_brands_industry ON brands(industry);
CREATE INDEX idx_brands_country ON brands(country);
CREATE INDEX idx_brands_lead_score ON brands(lead_score);
CREATE INDEX idx_brands_influencer_fit_score ON brands(influencer_fit_score);
CREATE INDEX idx_brands_updated_at ON brands(updated_at);
CREATE INDEX idx_saved_brands_workspace_id ON saved_brands(workspace_id);
CREATE INDEX idx_saved_brands_brand_id ON saved_brands(brand_id);
CREATE INDEX idx_outreach_workspace_id ON outreach(workspace_id);
CREATE INDEX idx_outreach_brand_id ON outreach(brand_id);
CREATE INDEX idx_outreach_status ON outreach(status);
CREATE INDEX idx_outreach_updated_at ON outreach(updated_at);
CREATE INDEX idx_outreach_last_activity ON outreach(last_activity_at);
CREATE INDEX idx_outreach_activity_outreach_id ON outreach_activity(outreach_id);
CREATE INDEX idx_outreach_activity_workspace_id ON outreach_activity(workspace_id);
CREATE INDEX idx_outreach_activity_created_at ON outreach_activity(created_at);

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE outreach ENABLE ROW LEVEL SECURITY;
ALTER TABLE outreach_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;

-- FUNCTIONS & TRIGGERS

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin() RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND account_type = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user() RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, account_type)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    COALESCE(new.raw_user_meta_data->>'account_type', 'creator')
  );
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();

-- Automatic Workspace Creation for Creators
CREATE OR REPLACE FUNCTION create_creator_workspace() RETURNS trigger AS $$
DECLARE
  new_workspace_id uuid;
BEGIN
  IF new.account_type = 'creator' THEN
    INSERT INTO public.workspaces (name, type, owner_id)
    VALUES (COALESCE(new.full_name, 'My Workspace'), 'creator', new.id)
    RETURNING id INTO new_workspace_id;
    
    INSERT INTO public.workspace_members (workspace_id, user_id, role)
    VALUES (new_workspace_id, new.id, 'owner');
  END IF;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_profile_created_workspace ON profiles;
CREATE TRIGGER on_profile_created_workspace
  AFTER INSERT ON profiles
  FOR EACH ROW EXECUTE PROCEDURE create_creator_workspace();


-- RLS POLICIES

-- Profiles
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT USING (is_admin());
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
-- Prevent users from making themselves admin via update
CREATE POLICY "Users cannot elevate to admin" ON profiles FOR UPDATE USING (auth.uid() = id AND account_type != 'admin');

-- 1. Helper functions (SECURITY DEFINER to bypass RLS for checks)
CREATE OR REPLACE FUNCTION user_workspaces()
RETURNS SETOF uuid AS $$
BEGIN
  RETURN QUERY SELECT workspace_id FROM public.workspace_members WHERE user_id = auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION is_workspace_manager(check_workspace_id uuid)
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


-- 2. Drop existing policies that cause recursion
DROP POLICY IF EXISTS "Users can view workspaces they are members of" ON workspaces;
DROP POLICY IF EXISTS "Workspace owners/admins can update workspace" ON workspaces;

DROP POLICY IF EXISTS "Users can view members of their workspaces" ON workspace_members;
DROP POLICY IF EXISTS "Workspace owners/admins can manage members" ON workspace_members;

DROP POLICY IF EXISTS "Users can view their workspace saved brands" ON saved_brands;
DROP POLICY IF EXISTS "Users can manage their workspace saved brands" ON saved_brands;

DROP POLICY IF EXISTS "Users can view their workspace outreach" ON outreach;
DROP POLICY IF EXISTS "Users can manage their workspace outreach" ON outreach;

DROP POLICY IF EXISTS "Users can view their workspace outreach activity" ON outreach_activity;
DROP POLICY IF EXISTS "Users can manage their workspace outreach activity" ON outreach_activity;

DROP POLICY IF EXISTS "Users can view their workspace subscriptions" ON subscriptions;

DROP POLICY IF EXISTS "Users can view their workspace usage" ON usage;


-- 3. Recreate policies securely without recursion

-- Workspaces
CREATE POLICY "Users can view workspaces they are members of" ON workspaces FOR SELECT USING (
  id IN (SELECT user_workspaces())
);

CREATE POLICY "Workspace owners/admins can update workspace" ON workspaces FOR UPDATE USING (
  is_workspace_manager(id)
) WITH CHECK (
  is_workspace_manager(id)
);

-- Workspace Members
CREATE POLICY "Users can view members of their workspaces" ON workspace_members FOR SELECT USING (
  workspace_id IN (SELECT user_workspaces())
);

CREATE POLICY "Workspace owners/admins can manage members" ON workspace_members FOR ALL USING (
  is_workspace_manager(workspace_id)
) WITH CHECK (
  is_workspace_manager(workspace_id)
);

-- Saved Brands
CREATE POLICY "Users can view their workspace saved brands" ON saved_brands FOR SELECT USING (
  workspace_id IN (SELECT user_workspaces())
);

CREATE POLICY "Users can manage their workspace saved brands" ON saved_brands FOR ALL USING (
  workspace_id IN (SELECT user_workspaces())
) WITH CHECK (
  workspace_id IN (SELECT user_workspaces())
);

-- Outreach
CREATE POLICY "Users can view their workspace outreach" ON outreach FOR SELECT USING (
  workspace_id IN (SELECT user_workspaces())
);

CREATE POLICY "Users can manage their workspace outreach" ON outreach FOR ALL USING (
  workspace_id IN (SELECT user_workspaces())
) WITH CHECK (
  workspace_id IN (SELECT user_workspaces())
);

-- Outreach Activity
CREATE POLICY "Users can view their workspace outreach activity" ON outreach_activity FOR SELECT USING (
  workspace_id IN (SELECT user_workspaces())
);

CREATE POLICY "Users can manage their workspace outreach activity" ON outreach_activity FOR ALL USING (
  workspace_id IN (SELECT user_workspaces())
) WITH CHECK (
  workspace_id IN (SELECT user_workspaces())
);

-- Subscriptions
CREATE POLICY "Users can view their workspace subscriptions" ON subscriptions FOR SELECT USING (
  workspace_id IN (SELECT user_workspaces())
);

-- Usage
CREATE POLICY "Users can view their workspace usage" ON usage FOR SELECT USING (
  workspace_id IN (SELECT user_workspaces())
);

-- Brands
CREATE POLICY "Authenticated users can view brands" ON brands FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage brands" ON brands FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- Notification Preferences
CREATE POLICY "Users can view their own preferences" ON notification_preferences FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own preferences" ON notification_preferences FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TABLE IF NOT EXISTS public.research_jobs (
  id uuid NOT NULL DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  workspace_id uuid REFERENCES public.workspaces(id) ON DELETE CASCADE,
  requested_by uuid REFERENCES auth.users(id),
  research_type text NOT NULL,
  query jsonb NOT NULL,
  provider text,
  status text NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'running', 'completed', 'failed', 'cancelled')),
  started_at timestamp with time zone,
  completed_at timestamp with time zone,
  error text,
  result_count integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.research_runs (
  id uuid NOT NULL DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  research_job_id uuid NOT NULL REFERENCES public.research_jobs(id) ON DELETE CASCADE,
  provider text NOT NULL,
  status text NOT NULL DEFAULT 'running' CHECK (status IN ('running', 'completed', 'failed')),
  raw_results jsonb,
  error text,
  started_at timestamp with time zone DEFAULT now(),
  completed_at timestamp with time zone
);

CREATE TABLE IF NOT EXISTS public.brand_evidence (
  id uuid NOT NULL DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  brand_id uuid NOT NULL REFERENCES public.brands(id) ON DELETE CASCADE,
  research_run_id uuid REFERENCES public.research_runs(id) ON DELETE SET NULL,
  source_url text,
  source_type text,
  field_name text NOT NULL,
  evidence jsonb,
  confidence text CHECK (confidence IN ('high', 'medium', 'low', 'unverified')),
  discovered_at timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.brands
ADD COLUMN IF NOT EXISTS last_researched_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS last_verified_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS data_confidence text CHECK (data_confidence IN ('high', 'medium', 'low', 'unverified')),
ADD COLUMN IF NOT EXISTS research_status text DEFAULT 'candidate' CHECK (research_status IN ('candidate', 'verified', 'needs_review', 'rejected')),
ADD COLUMN IF NOT EXISTS source_count integer DEFAULT 0;

-- RLS
ALTER TABLE public.research_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_evidence ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their workspace research jobs" ON public.research_jobs FOR SELECT USING (workspace_id IN (SELECT user_workspaces()));
CREATE POLICY "Users can manage their workspace research jobs" ON public.research_jobs FOR ALL USING (workspace_id IN (SELECT user_workspaces())) WITH CHECK (workspace_id IN (SELECT user_workspaces()));

CREATE POLICY "Users can view their workspace research runs" ON public.research_runs FOR SELECT USING (research_job_id IN (SELECT id FROM public.research_jobs WHERE workspace_id IN (SELECT user_workspaces())));
-- Server side will manage research runs usually, but let's give workspace access if needed.
CREATE POLICY "Users can manage their workspace research runs" ON public.research_runs FOR ALL USING (research_job_id IN (SELECT id FROM public.research_jobs WHERE workspace_id IN (SELECT user_workspaces()))) WITH CHECK (research_job_id IN (SELECT id FROM public.research_jobs WHERE workspace_id IN (SELECT user_workspaces())));

CREATE POLICY "Authenticated users can view brand evidence" ON public.brand_evidence FOR SELECT USING (auth.role() = 'authenticated');
-- Only admins/backend should modify brand evidence directly, or users through backend endpoints
CREATE POLICY "Admins can manage brand evidence" ON public.brand_evidence FOR ALL USING (is_admin()) WITH CHECK (is_admin());

CREATE TABLE IF NOT EXISTS public.research_queue (
  id uuid NOT NULL DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  category text NOT NULL,
  country text,
  niche text,
  research_query jsonb NOT NULL,
  priority integer DEFAULT 0,
  last_run timestamp with time zone,
  next_run timestamp with time zone DEFAULT now(),
  enabled boolean DEFAULT true
);

CREATE TABLE IF NOT EXISTS public.app_config (
  key text PRIMARY KEY,
  value jsonb
);

INSERT INTO public.app_config (key, value) VALUES ('research_scheduler', '{"enabled": true, "frequency": "hourly", "target_per_run": 6}') ON CONFLICT (key) DO NOTHING;

-- Prepopulate the queue with diverse topics
INSERT INTO public.research_queue (category, country, niche, research_query) VALUES
('D2C', 'US', 'Beauty', '{"keywords": ["D2C", "Beauty", "startup"], "industry": "Beauty", "country": "US"}'),
('Consumer', 'US', 'Fashion', '{"keywords": ["Consumer", "Fashion", "brand"], "industry": "Fashion", "country": "US"}'),
('Food', 'UK', 'Health', '{"keywords": ["Food", "Health", "startup"], "industry": "Food", "country": "UK"}'),
('SaaS', 'US', 'Creators', '{"keywords": ["SaaS", "Creator Economy", "startup"], "industry": "Software", "country": "US"}'),
('D2C', 'Global', 'Wellness', '{"keywords": ["Wellness", "D2C"], "industry": "Wellness"}')
ON CONFLICT DO NOTHING;

ALTER TABLE public.research_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage queue" ON public.research_queue FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admins can manage config" ON public.app_config FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- 11. BRAND INTELLIGENCE UPGRADES
ALTER TABLE public.brands
ADD COLUMN IF NOT EXISTS logo_url text,
ADD COLUMN IF NOT EXISTS city text,
ADD COLUMN IF NOT EXISTS category text,
ADD COLUMN IF NOT EXISTS subcategory text,
ADD COLUMN IF NOT EXISTS company_type text,
ADD COLUMN IF NOT EXISTS founded_year integer,
ADD COLUMN IF NOT EXISTS company_description text,
ADD COLUMN IF NOT EXISTS product_description text,
ADD COLUMN IF NOT EXISTS target_audience text,
ADD COLUMN IF NOT EXISTS target_market text,
ADD COLUMN IF NOT EXISTS price_positioning text,
ADD COLUMN IF NOT EXISTS business_model text,
ADD COLUMN IF NOT EXISTS opportunity_score integer,
ADD COLUMN IF NOT EXISTS creator_fit_score integer,
ADD COLUMN IF NOT EXISTS marketing_activity_score integer,
ADD COLUMN IF NOT EXISTS creator_signals jsonb,
ADD COLUMN IF NOT EXISTS target_customer text,
ADD COLUMN IF NOT EXISTS target_demographic text,
ADD COLUMN IF NOT EXISTS geographic_target text,
ADD COLUMN IF NOT EXISTS audience_type text,
ADD COLUMN IF NOT EXISTS market_positioning text,
ADD COLUMN IF NOT EXISTS works_with_creators boolean,
ADD COLUMN IF NOT EXISTS recent_collaborations text,
ADD COLUMN IF NOT EXISTS creator_campaign_activity text,
ADD COLUMN IF NOT EXISTS platforms_used jsonb,
ADD COLUMN IF NOT EXISTS ugc_activity text,
ADD COLUMN IF NOT EXISTS ambassador_activity text,
ADD COLUMN IF NOT EXISTS opportunity_signals jsonb;

CREATE TABLE IF NOT EXISTS public.brand_social_profiles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id uuid REFERENCES public.brands(id) ON DELETE CASCADE NOT NULL,
  platform text NOT NULL,
  url text NOT NULL,
  follower_count bigint,
  subscriber_count bigint,
  activity_level text,
  last_activity timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(brand_id, platform)
);

CREATE TABLE IF NOT EXISTS public.brand_activities (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id uuid REFERENCES public.brands(id) ON DELETE CASCADE NOT NULL,
  activity_type text NOT NULL,
  date timestamptz,
  description text NOT NULL,
  source text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.brand_funding (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id uuid REFERENCES public.brands(id) ON DELETE CASCADE NOT NULL,
  latest_funding_round text,
  funding_amount text,
  total_funding text,
  funding_date timestamptz,
  funding_stage text,
  investors text,
  source text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(brand_id)
);

CREATE TABLE IF NOT EXISTS public.brand_contacts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id uuid REFERENCES public.brands(id) ON DELETE CASCADE NOT NULL,
  name text,
  role text,
  department text,
  email text,
  phone text,
  linkedin text,
  contact_type text,
  verification_status text,
  discovered_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- RLS
ALTER TABLE public.brand_social_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_funding ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view brand_social_profiles" ON public.brand_social_profiles FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can view brand_activities" ON public.brand_activities FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can view brand_funding" ON public.brand_funding FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can view brand_contacts" ON public.brand_contacts FOR SELECT USING (auth.role() = 'authenticated');
-- 1. ADD CONTACTED METADATA TO OUTREACH
ALTER TABLE public.outreach
ADD COLUMN IF NOT EXISTS contacted_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS contact_channel text;

-- 2. FIX OUTREACH_ACTIVITY TO MATCH FRONTEND TYPES
ALTER TABLE public.outreach_activity
ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS description text,
ADD COLUMN IF NOT EXISTS old_status text,
ADD COLUMN IF NOT EXISTS new_status text;

-- 3. ADD MISSING BRAND CONTACTS METADATA
ALTER TABLE public.brand_contacts
ADD COLUMN IF NOT EXISTS source text,
ADD COLUMN IF NOT EXISTS source_url text,
ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now(),
ADD COLUMN IF NOT EXISTS verified_at timestamptz;

-- 4. BRAND PRODUCTS
CREATE TABLE IF NOT EXISTS public.brand_products (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id uuid REFERENCES public.brands(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  category text,
  description text,
  positioning text,
  url text,
  price text,
  source text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE public.brand_products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view brand_products" ON public.brand_products FOR SELECT USING (auth.role() = 'authenticated');

-- 5. BRAND ACTIVITIES UPGRADE
ALTER TABLE public.brand_activities
ADD COLUMN IF NOT EXISTS confidence text CHECK (confidence IN ('high', 'medium', 'low', 'unverified'));

-- 6. BRAND SOCIAL PROFILES UPGRADE
ALTER TABLE public.brand_social_profiles
ADD COLUMN IF NOT EXISTS source text,
ADD COLUMN IF NOT EXISTS discovered_at timestamptz DEFAULT now(),
ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

CREATE INDEX IF NOT EXISTS idx_brand_products_brand_id ON brand_products(brand_id);
-- 1. ADD CONTACTED METADATA TO OUTREACH
ALTER TABLE public.outreach
ADD COLUMN IF NOT EXISTS contacted_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS contact_channel text;

-- 2. FIX OUTREACH_ACTIVITY TO MATCH FRONTEND TYPES
ALTER TABLE public.outreach_activity
ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS description text,
ADD COLUMN IF NOT EXISTS old_status text,
ADD COLUMN IF NOT EXISTS new_status text;

-- 3. BRAND CONTACTS
CREATE TABLE IF NOT EXISTS public.brand_contacts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id uuid REFERENCES public.brands(id) ON DELETE CASCADE NOT NULL,
  name text,
  role text,
  department text,
  email text,
  phone text,
  linkedin text,
  contact_type text,
  verification_status text,
  source text,
  source_url text,
  verified_at timestamptz,
  updated_at timestamptz DEFAULT now(),
  discovered_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.brand_contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view brand_contacts" ON public.brand_contacts FOR SELECT USING (auth.role() = 'authenticated');

-- 4. BRAND PRODUCTS
CREATE TABLE IF NOT EXISTS public.brand_products (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id uuid REFERENCES public.brands(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  category text,
  description text,
  positioning text,
  url text,
  price text,
  source text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE public.brand_products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view brand_products" ON public.brand_products FOR SELECT USING (auth.role() = 'authenticated');
CREATE INDEX IF NOT EXISTS idx_brand_products_brand_id ON brand_products(brand_id);

-- 5. BRAND ACTIVITIES
CREATE TABLE IF NOT EXISTS public.brand_activities (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id uuid REFERENCES public.brands(id) ON DELETE CASCADE NOT NULL,
  activity_type text NOT NULL,
  date timestamptz,
  description text NOT NULL,
  source text,
  confidence text CHECK (confidence IN ('high', 'medium', 'low', 'unverified')),
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.brand_activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view brand_activities" ON public.brand_activities FOR SELECT USING (auth.role() = 'authenticated');

-- 6. BRAND SOCIAL PROFILES
CREATE TABLE IF NOT EXISTS public.brand_social_profiles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id uuid REFERENCES public.brands(id) ON DELETE CASCADE NOT NULL,
  platform text NOT NULL,
  url text NOT NULL,
  follower_count bigint,
  subscriber_count bigint,
  activity_level text,
  last_activity timestamptz,
  source text,
  discovered_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE(brand_id, platform)
);
ALTER TABLE public.brand_social_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view brand_social_profiles" ON public.brand_social_profiles FOR SELECT USING (auth.role() = 'authenticated');

-- 7. BRAND FUNDING
CREATE TABLE IF NOT EXISTS public.brand_funding (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id uuid REFERENCES public.brands(id) ON DELETE CASCADE NOT NULL,
  latest_funding_round text,
  funding_amount text,
  total_funding text,
  funding_date timestamptz,
  funding_stage text,
  investors text,
  source text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(brand_id)
);
ALTER TABLE public.brand_funding ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view brand_funding" ON public.brand_funding FOR SELECT USING (auth.role() = 'authenticated');

-- ADD MISSING BRAND INTELLIGENCE METADATA TO THE MAIN BRANDS TABLE
ALTER TABLE public.brands
ADD COLUMN IF NOT EXISTS logo_url text,
ADD COLUMN IF NOT EXISTS city text,
ADD COLUMN IF NOT EXISTS category text,
ADD COLUMN IF NOT EXISTS subcategory text,
ADD COLUMN IF NOT EXISTS company_type text,
ADD COLUMN IF NOT EXISTS founded_year integer,
ADD COLUMN IF NOT EXISTS company_description text,
ADD COLUMN IF NOT EXISTS product_description text,
ADD COLUMN IF NOT EXISTS target_audience text,
ADD COLUMN IF NOT EXISTS target_market text,
ADD COLUMN IF NOT EXISTS target_demographic text,
ADD COLUMN IF NOT EXISTS price_positioning text,
ADD COLUMN IF NOT EXISTS business_model text,
ADD COLUMN IF NOT EXISTS opportunity_score integer,
ADD COLUMN IF NOT EXISTS creator_fit_score integer,
ADD COLUMN IF NOT EXISTS marketing_activity_score integer,
ADD COLUMN IF NOT EXISTS creator_signals jsonb,
ADD COLUMN IF NOT EXISTS opportunity_signals jsonb,
ADD COLUMN IF NOT EXISTS target_customer text,
ADD COLUMN IF NOT EXISTS data_confidence text,
ADD COLUMN IF NOT EXISTS recent_collaborations text,
ADD COLUMN IF NOT EXISTS research_status text,
ADD COLUMN IF NOT EXISTS last_researched_at timestamptz,
ADD COLUMN IF NOT EXISTS source_count integer;
