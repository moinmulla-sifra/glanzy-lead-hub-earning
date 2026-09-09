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

