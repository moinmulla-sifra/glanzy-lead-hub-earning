const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");

let envStr = "";
if (fs.existsSync(".env.local"))
  envStr += fs.readFileSync(".env.local", "utf8") + "\n";
if (fs.existsSync(".env")) envStr += fs.readFileSync(".env", "utf8");

const env = {};
envStr.split("\n").forEach((line) => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) env[match[1].trim()] = match[2].trim();
});

const supabaseUrl = env.VITE_SUPABASE_URL || env.SUPABASE_URL;
const supabaseKey =
  env.VITE_SUPABASE_ANON_KEY ||
  env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.log("No supabase credentials found in env");
  process.exit(0);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const tables = [
    "brands",
    "brand_products",
    "brand_contacts",
    "brand_social_profiles",
    "brand_activities",
    "brand_funding",
    "brand_evidence",
    "outreach",
  ];

  for (const table of tables) {
    const { data, error } = await supabase.from(table).select("*").limit(1);
    if (error) {
      console.log(`[FAILED] Table ${table}:`, error.message);
    } else {
      console.log(`[OK] Table ${table} exists.`);
    }
  }
}

check();
