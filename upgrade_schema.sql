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

