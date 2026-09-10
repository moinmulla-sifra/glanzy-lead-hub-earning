-- Safely remove deprecated internal research automation tables
DROP TABLE IF EXISTS public.research_queue CASCADE;
DROP TABLE IF EXISTS public.research_runs CASCADE;
DROP TABLE IF EXISTS public.research_jobs CASCADE;
DROP TABLE IF EXISTS public.app_config CASCADE;
