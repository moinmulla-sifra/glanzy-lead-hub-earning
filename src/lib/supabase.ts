import { createClient } from "@supabase/supabase-js";

// Browser-safe configuration for the user's own external Supabase project.
// Publishable (anon) key only — never a service-role/secret key.
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
export const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
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
