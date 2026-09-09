const missing = [
  "logo_url text",
  "city text",
  "category text",
  "subcategory text",
  "company_type text",
  "founded_year integer",
  "company_description text",
  "product_description text",
  "target_audience text",
  "target_market text",
  "target_demographic text",
  "price_positioning text",
  "business_model text",
  "opportunity_score integer",
  "creator_fit_score integer",
  "marketing_activity_score integer",
  "creator_signals jsonb",
  "opportunity_signals jsonb",
  "target_customer text",
  "data_confidence text",
  "recent_collaborations text",
  "research_status text",
  "last_researched_at timestamptz",
  "source_count integer"
];

console.log("ALTER TABLE public.brands");
console.log(missing.map(m => `ADD COLUMN IF NOT EXISTS ${m}`).join(",\n") + ";");
