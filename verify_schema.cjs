const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const env = fs
  .readFileSync(".env", "utf8")
  .split("\n")
  .reduce((acc, line) => {
    const [key, val] = line.split("=");
    if (key) acc[key] = val;
    return acc;
  }, {});

const supabase = createClient(
  env.VITE_SUPABASE_URL,
  env.VITE_SUPABASE_ANON_KEY,
);

async function checkTable(table, columns) {
  const { data, error } = await supabase.from(table).select(columns).limit(1);
  if (error) {
    console.error(`[ERROR] Table: ${table} | Error:`, error.message);
    return false;
  }
  console.log(`[OK] Table: ${table} | Columns: ${columns} exist.`);
  return true;
}

async function verify() {
  console.log("--- Starting Verification ---");
  let allPassed = true;

  const checks = [
    { table: "brand_products", cols: "id, name, category, price, source" },
    {
      table: "brand_contacts",
      cols: "id, source, source_url, verified_at, updated_at",
    },
    {
      table: "brand_social_profiles",
      cols: "id, source, discovered_at, updated_at",
    },
    { table: "brand_activities", cols: "id, confidence" },
    { table: "outreach", cols: "id, contacted_by, contact_channel" },
    {
      table: "outreach_activity",
      cols: "id, user_id, description, old_status, new_status",
    },
    {
      table: "brands",
      cols: "id, company_name, recent_funding, opportunity_signals, creator_fit_score",
    },
  ];

  for (const check of checks) {
    const pass = await checkTable(check.table, check.cols);
    if (!pass) allPassed = false;
  }

  console.log(
    "\nOverall Result:",
    allPassed ? "MIGRATION APPLIED" : "MIGRATION MISSING OR INCOMPLETE",
  );
}
verify();
