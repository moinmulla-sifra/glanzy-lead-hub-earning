import { createClient } from "@supabase/supabase-js";

// Browser-safe configuration for the user's own external Supabase project.
// Publishable (anon) key only — never a service-role/secret key.
export const SUPABASE_URL =
  (import.meta.env["VITE_SUPABASE_URL"] as string | undefined) ??
  "https://rdelzqnhduaudjouadvf.supabase.co";

export const SUPABASE_PUBLISHABLE_KEY =
  (import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"] as string | undefined) ??
  "sb_publishable_WxqnrdckUqI1zABQEANC9g__Q1PyiMY";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: "glanzy-auth",
  },
});

export type MailStatus = "Pending" | "Complete" | "Success";

export interface BrandLead {
  id: string;
  company_name: string | null;
  industry: string | null;
  company_stage: string | null;
  product: string | null;
  website: string | null;
  linkedin: string | null;
  email: string | null;
  phone: string | null;
  contact_person: string | null;
  contact_role: string | null;
  lead_score: number | null;
  influencer_fit_score: number | null;
  priority: string | null;
  budget_potential: string | null;
  mail: MailStatus | null;
  why_now: string | null;
  recent_funding: string | null;
  recent_launch: string | null;
  marketing_activity: string | null;
  existing_creator_activity: string | null;
  next_action: string | null;
  email_subject: string | null;
  email_body: string | null;
  updated_at: string | null;
  verified_at?: string | null;
  created_at?: string | null;
}
