import { createClient } from '@supabase/supabase-js';
import { ResearchEngine } from './src/lib/research/engine';

async function run() {
  console.log("Initializing test automation run...");
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials in environment");
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  
  try {
    const result = await ResearchEngine.runAutomatedHourlyJob(supabase);
    console.log("Automation Result:", result);
  } catch (error) {
    console.error("Test execution failed:", error);
  }
}

run();
