export interface BrandContact {
  id: string;
  brand_id: string;
  name: string | null;
  role: string | null;
  department: string | null;
  email: string | null;
  phone: string | null;
  linkedin: string | null;
  contact_type: string | null;
  verification_status: string | null;
  discovered_at?: string | null;
  source?: string | null;
  source_url?: string | null;
  verified_at?: string | null;
}

export interface BrandProduct {
  id: string;
  brand_id: string;
  name: string;
  category: string | null;
  description: string | null;
  positioning: string | null;
  url: string | null;
  price: string | null;
  source: string | null;
  created_at?: string | null;
}

export interface BrandSocialProfile {
  id: string;
  brand_id: string;
  platform: string;
  url: string;
  follower_count: number | null;
  subscriber_count: number | null;
  activity_level: string | null;
  last_activity: string | null;
  source: string | null;
}

export interface BrandActivity {
  id: string;
  brand_id: string;
  activity_type: string;
  date: string | null;
  description: string;
  source: string | null;
  confidence?: string | null;
}

export interface BrandFunding {
  id: string;
  brand_id: string;
  latest_funding_round: string | null;
  funding_amount: string | null;
  total_funding: string | null;
  funding_date: string | null;
  funding_stage: string | null;
  investors: string | null;
  source: string | null;
}

export interface BrandEvidence {
  id: string;
  brand_id: string;
  source_url: string | null;
  source_type: string | null;
  field_name: string;
  evidence: Record<string, unknown>;
  confidence: string | null;
  discovered_at: string | null;
}

export interface UnifiedBrand {
  // Primary Identifiers
  id: string;
  brand_id: string;
  research_run_id?: string | null;

  // A. Company Information
  company_name: string;
  normalized_name?: string | null;
  normalized_company_name?: string | null;
  domain?: string | null;
  website?: string | null;
  website_url?: string | null;
  website_status?: string | null;
  logo_url?: string | null;
  country?: string | null;
  city?: string | null;
  headquarters?: string | null;
  industry?: string | null;
  category?: string | null;
  subcategory?: string | null;
  company_type?: string | null;
  company_stage?: string | null;
  founded_year?: number | string | null;
  employee_range?: string | null;
  company_description?: string | null;
  business_model?: string | null;
  price_positioning?: string | null;

  // B. Products and Audience
  primary_product_summary?: string | null;
  product_description?: string | null;
  target_audience?: string | null;
  target_customer?: string | null;
  target_demographic?: string | null;
  target_market?: string | null;
  geographic_target?: string | null;
  audience_type?: string | null;
  market_positioning?: string | null;

  // C. Marketing and Creator Activity
  works_with_creators?: boolean | string | null;
  creator_campaign_activity?: string | null;
  ugc_activity?: string | null;
  ambassador_activity?: string | null;
  affiliate_program?: string | null;
  platforms_used?: string | Record<string, unknown> | null;
  existing_creator_activity?: string | null;
  recent_collaborations?: string | null;
  marketing_activity?: string | null;
  recent_launch?: string | null;
  recent_funding?: string | null;
  why_now?: string | null;
  opportunity_signals?: string | Record<string, unknown> | null;
  creator_signals?: string | Record<string, unknown> | null;
  opportunity_summary?: string | null;

  // D. Scores and Research Quality
  lead_score?: number | null;
  opportunity_score?: number | null;
  creator_fit_score?: number | null;
  influencer_fit_score?: number | null;
  marketing_activity_score?: number | null;
  budget_potential?: string | null;
  estimated_budget_potential?: string | null;
  budget_evidence?: string | null;
  data_confidence?: string | null;
  research_status?: string | null;
  qualification_status?: string | null;
  qualification_reason?: string | null;
  rejection_reason?: string | null;
  first_discovered_at?: string | null;
  last_researched_at?: string | null;
  last_verified_at?: string | null;
  source_count?: number | null;

  // Aux flags
  hasContacts?: boolean;
  contactCount?: number;

  // Protected / Reveal fields
  email?: string | null;
  phone?: string | null;
  linkedin?: string | null;
  contact_person?: string | null;
  contact_role?: string | null;

  // Embedded collections (when fetched or detailed)
  contacts?: BrandContact[];
  products?: BrandProduct[];
  socialProfiles?: BrandSocialProfile[];
  activities?: BrandActivity[];
  funding?: BrandFunding[];
  evidence?: BrandEvidence[];
}

export type Brand = UnifiedBrand;
