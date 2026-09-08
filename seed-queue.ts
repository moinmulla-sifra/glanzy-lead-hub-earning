import { createClient } from '@supabase/supabase-js';

async function seed() {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log("Seeding research queue...");
  
  const items = [
    { category: 'D2C', country: 'US', niche: 'Beauty', research_query: { keywords: ["D2C", "Beauty", "startup"], industry: "Beauty", country: "US" }, enabled: true },
    { category: 'Consumer', country: 'US', niche: 'Fashion', research_query: { keywords: ["Consumer", "Fashion", "brand"], industry: "Fashion", country: "US" }, enabled: true }
  ];

  for (const item of items) {
    const { error } = await supabase.from('research_queue').insert(item);
    if (error) {
       console.log("Insert error (might already exist):", error.message);
    }
  }

  // Also make sure app_config is enabled
  await supabase.from('app_config').upsert({ key: 'research_scheduler', value: { enabled: true, frequency: 'hourly', target_per_run: 6 } });
  
  console.log("Seeding complete. Running test automation again...");
}

seed().catch(console.error);
