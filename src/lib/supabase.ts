import { createClient } from "@supabase/supabase-js";

// Browser-safe configuration for the user's own external Supabase project.
// Publishable (anon) key only — never a service-role/secret key.
export const SUPABASE_URL = import.meta.env['VITE_SUPABASE_URL'] || "";
export const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env['VITE_SUPABASE_ANON_KEY'] ||
  import.meta.env['VITE_SUPABASE_PUBLISHABLE_KEY'] ||
  "";

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  console.warn(
    "Missing Supabase configuration. Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your environment variables.",
  );
}

export const supabase = createClient(
  SUPABASE_URL || "https://placeholder.supabase.co",
  SUPABASE_PUBLISHABLE_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: "branzly-auth",
    },
  },
);

export type OutreachStatus =
  "Saved" | "Contacted" | "Replied" | "Interested" | "Meeting" | "Won" | "Lost";

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  country: string | null;
  account_type: "creator" | "agency" | null;
  niche: string | null;
  platforms: string[] | null;
  bio: string | null;
  agency_name: string | null;

  created_at: string;
  updated_at: string;
  last_researched_at?: string | null;
  last_verified_at?: string | null;
  data_confidence?: 'high' | 'medium' | 'low' | 'unverified' | null;
  research_status?: 'candidate' | 'verified' | 'needs_review' | 'rejected' | null;
  source_count?: number;
}

export interface Workspace {
  id: string;
  name: string;
  workspace_type: "creator" | "agency" | null;

  created_at: string;
  updated_at: string;
}

export interface WorkspaceMember {
  id: string;
  workspace_id: string;
  user_id: string;
  role: string;

  created_at: string;
}

export interface Brand {
  id: string;
  company_name: string;
  normalized_name: string | null;
  industry: string | null;
  country: string | null;
  website: string | null;
  domain: string | null;
  contact_person: string | null;
  contact_role: string | null;
  email: string | null;
  phone: string | null;
  linkedin: string | null;
  lead_score: number | null;
  influencer_fit_score: number | null;
  company_stage: string | null;
  budget_potential: string | null;
  recent_funding: string | null;
  recent_launch: string | null;
  marketing_activity: string | null;
  existing_creator_activity: string | null;
  why_now: string | null;

  // New Brand Intelligence fields
  logo_url: string | null;
  city: string | null;
  category: string | null;
  subcategory: string | null;
  company_type: string | null;
  founded_year: number | null;
  company_description: string | null;
  product_description: string | null;
  target_audience: string | null;
  target_market: string | null;
  price_positioning: string | null;
  business_model: string | null;
  opportunity_score: number | null;
  creator_fit_score: number | null;
  marketing_activity_score: number | null;
  creator_signals: any | null;
  target_customer: string | null;
  target_demographic: string | null;
  geographic_target: string | null;
  audience_type: string | null;
  market_positioning: string | null;
  works_with_creators: boolean | null;
  recent_collaborations: string | null;
  creator_campaign_activity: string | null;
  platforms_used: any | null;
  ugc_activity: string | null;
  ambassador_activity: string | null;
  opportunity_signals: any | null;
  data_confidence: string | null;
  research_status: string | null;
  last_researched_at: string | null;
  last_verified_at: string | null;
  source_count: number | null;

  created_at: string;
  updated_at: string;
}

export interface SavedBrand {
  id: string;
  workspace_id: string;
  brand_id: string;
  status: OutreachStatus;
  email_subject: string | null;
  email_body: string | null;
  notes: string | null;

  created_at: string;
  updated_at: string;
  brand?: Brand; // For joined queries
}

export interface Outreach {
  contacted_by: string | null;
  contact_channel: string | null;
  id: string;
  workspace_id: string;
  brand_id: string;
  status: OutreachStatus;
  email_subject: string | null;
  email_body: string | null;
  notes: string | null;
  next_action: string | null;
  contacted_at: string | null;
  last_activity_at: string;

  created_at: string;
  updated_at: string;
  brand?: Brand; // For joined queries
}

export interface Subscription {
  id: string;
  workspace_id: string;
  plan: "free" | "pro" | "agency";
  status: string;
  provider: string | null;
  provider_customer_id: string | null;
  provider_subscription_id: string | null;
  current_period_start: string | null;
  current_period_end: string | null;

  created_at: string;
  updated_at: string;
}

export interface Usage {
  id: string;
  workspace_id: string;
  period_start: string;
  period_end: string;
  searches: number;
  brand_views: number;
  saved_brands: number;
  outreach_activity: number;

  created_at: string;
  updated_at: string;
}

export interface OutreachActivity {
  id: string;
  outreach_id: string;
  user_id: string | null;
  activity_type:
    "status_changed" | "note_added" | "email_updated" | "contacted" | "created";
  description: string | null;
  old_status: string | null;
  new_status: string | null;

  created_at: string;
}

export interface ResearchJob {
  id: string;
  workspace_id: string;
  requested_by: string;
  research_type: string;
  query: any;
  provider: string | null;
  status: 'queued' | 'running' | 'completed' | 'failed' | 'cancelled';
  started_at: string | null;
  completed_at: string | null;
  error: string | null;
  result_count: number;

  created_at: string;
  updated_at: string;
}

export interface ResearchRun {
  id: string;
  research_job_id: string;
  provider: string;
  status: 'running' | 'completed' | 'failed';
  raw_results: any;
  error: string | null;
  started_at: string;
  completed_at: string | null;
}

export interface BrandEvidence {
  id: string;
  brand_id: string;
  research_run_id: string | null;
  source_url: string | null;
  source_type: string | null;
  field_name: string;
  evidence: any;
  confidence: 'high' | 'medium' | 'low' | 'unverified' | null;
  discovered_at: string;

  created_at: string;
}

export interface BrandSocialProfile {
  source: string | null;
  discovered_at: string | null;
  updated_at: string | null;
  id: string;
  brand_id: string;
  platform: string;
  url: string;
  follower_count: number | null;
  subscriber_count: number | null;
  activity_level: string | null;
  last_activity: string | null;
  created_at: string;
}

export interface BrandActivity {
  confidence: string | null;
  id: string;
  brand_id: string;
  activity_type: string;
  date: string | null;
  description: string;
  source: string | null;
  created_at: string;
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
  created_at: string;
}

export interface BrandContact {
  source: string | null;
  source_url: string | null;
  updated_at: string | null;
  verified_at: string | null;
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
  discovered_at: string | null;
  created_at: string;
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
  created_at: string;
  updated_at: string;
}
