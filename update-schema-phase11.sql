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

