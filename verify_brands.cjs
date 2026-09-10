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

async function verifyBrands() {
  const { data, error } = await supabase.from("brands").select("*").limit(1);
  if (error) {
    console.error(`[ERROR]`, error);
  } else {
    if (data.length > 0) {
      console.log(Object.keys(data[0]).join(", "));
    } else {
      console.log("No brands exist, but fetch succeeded.");
    }
  }
}
verifyBrands();
