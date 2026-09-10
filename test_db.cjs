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

async function test() {
  const supabase = createClient(
    env.VITE_SUPABASE_URL,
    env.VITE_SUPABASE_ANON_KEY,
  );

  // Create a brand
  const { data: brand, error: brandErr } = await supabase
    .from("brands")
    .insert({
      company_name: "Test Brand",
      industry: "Technology",
      opportunity_signals: ["hiring", "funded"],
    })
    .select()
    .single();

  if (brandErr) console.error("Brand error:", brandErr);
  else console.log("Brand created:", brand.id);

  if (brand) {
    // Create a product
    const { data: product, error: productErr } = await supabase
      .from("brand_products")
      .insert({
        brand_id: brand.id,
        name: "Test Product",
      })
      .select()
      .single();

    if (productErr) console.error("Product error:", productErr);
    else console.log("Product created:", product.id);

    // Check outreach
    const { error: outErr } = await supabase
      .from("outreach")
      .select("contacted_by, contact_channel")
      .limit(1);
    if (outErr) console.error("Outreach error:", outErr);
    else console.log("Outreach query success");
  }
}
test();
