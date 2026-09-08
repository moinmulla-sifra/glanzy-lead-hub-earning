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
