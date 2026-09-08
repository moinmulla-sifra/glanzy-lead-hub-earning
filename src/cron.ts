import cron from "node-cron";
import { createClient } from "@supabase/supabase-js";
import { ResearchEngine } from "./lib/research/engine";

let isSetup = false;

export function setupCronJobs() {
  if (isSetup) return;
  isSetup = true;

  console.log(
    "Setting up automated hourly research engine scheduler using node-cron...",
  );

  // Run at minute 0 past every hour
  cron.schedule("0 * * * *", async () => {
    try {
      console.log("Automated hourly node-cron scheduler triggered...");
      const supabaseUrl = process.env["VITE_SUPABASE_URL"] || "https://placeholder.supabase.co";
      const supabaseKey =
        process.env["SERVICE_ROLE_KEY"] ||
        process.env["VITE_SUPABASE_ANON_KEY"] ||
        "";

      if (!supabaseUrl || !supabaseKey) {
        console.error("Missing Supabase credentials for automated job");
        return;
      }

      const supabase = createClient(supabaseUrl, supabaseKey);
      await ResearchEngine.runAutomatedHourlyJob(supabase);
    } catch (err) {
      console.error("Error in automated hourly scheduler:", err);
    }
  });
}
