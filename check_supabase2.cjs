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
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data: d1, error: e1 } = await supabase
    .from("brand_activities")
    .select("confidence")
    .limit(1);
  console.log("brand_activities.confidence:", e1 ? e1.message : "OK");

  const { data: d2, error: e2 } = await supabase
    .from("outreach")
    .select("contacted_by, contact_channel")
    .limit(1);
  console.log("outreach.contacted_by/channel:", e2 ? e2.message : "OK");

  const { data: d3, error: e3 } = await supabase
    .from("brands")
    .select("opportunity_signals, logo_url, company_description")
    .limit(1);
  console.log("brands columns:", e3 ? e3.message : "OK");
}

check();
