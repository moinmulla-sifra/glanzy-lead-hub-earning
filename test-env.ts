import { createClient } from "@supabase/supabase-js";
console.log("Top level process.env.VITE_SUPABASE_URL:", process.env.VITE_SUPABASE_URL);
export const handleDiscover = async (request: Request) => {
  console.log("Inside handle process.env.VITE_SUPABASE_URL:", process.env.VITE_SUPABASE_URL);
  return new Response("OK");
}
