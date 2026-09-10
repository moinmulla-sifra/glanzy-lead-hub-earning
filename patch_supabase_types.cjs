const fs = require("fs");

let code = fs.readFileSync("src/lib/supabase.ts", "utf8");

const newBrandFields = `
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
`;

// Insert the new fields into the Brand interface before created_at
code = code.replace(
  /  created_at: string;/g,
  newBrandFields + "\n  created_at: string;",
);

// Append the new table interfaces
code += `
export interface BrandSocialProfile {
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
`;

fs.writeFileSync("src/lib/supabase.ts", code);
