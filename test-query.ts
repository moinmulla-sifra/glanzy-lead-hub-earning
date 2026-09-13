import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.VITE_SUPABASE_URL || "https://placeholder",
  process.env.VITE_SUPABASE_ANON_KEY || "placeholder",
);
async function run() {
  const { data } = await supabase.from("subscription_requests").select("*");
  console.log(JSON.stringify(data, null, 2));
}
run();
