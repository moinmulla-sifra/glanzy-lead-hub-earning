import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY,
);
async function run() {
  // Try to login as the user (the user in the screenshot is moinmulla7045@gmail.com)
  const {
    data: { session },
    error: authErr,
  } = await supabase.auth.signInWithPassword({
    email: "moinmulla7045@gmail.com",
    password: "password123", // assuming standard test password, or we can use another way
  });

  if (authErr) {
    console.log("Auth error:", authErr.message);
    // Let's just create a test function to fetch without RLS
    return;
  }

  const { data, error } = await supabase.from("research_queue").select("*");
  console.log("Error:", error);
  console.log("Data:", data);
}
run();
