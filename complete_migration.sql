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

