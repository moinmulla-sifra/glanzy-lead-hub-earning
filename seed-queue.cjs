const { createClient } = require('@supabase/supabase-js');

async function seed() {
  const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY // fallback for anon, but it needs service role
  );
  
  const defaults = [
    { category: "D2C", country: "US", niche: "Beauty", research_query: { keywords: ["D2C", "Beauty", "startup"], industry: "Beauty", country: "US" } },
    { category: "Consumer", country: "US", niche: "Fashion", research_query: { keywords: ["Consumer", "Fashion", "brand"], industry: "Fashion", country: "US" } },
    { category: "Food", country: "UK", niche: "Health", research_query: { keywords: ["Food", "Health", "startup"], industry: "Food", country: "UK" } },
    { category: "SaaS", country: "US", niche: "Creators", research_query: { keywords: ["SaaS", "Creator Economy", "startup"], industry: "Software", country: "US" } },
    { category: "D2C", country: "Global", niche: "Wellness", research_query: { keywords: ["Wellness", "D2C"], industry: "Wellness" } },
  ];
  
  const { data, error } = await supabase.from('research_queue').insert(defaults);
  console.log("Error:", error);
  console.log("Data:", data);
}
seed();
