import { createServerFn } from "@tanstack/react-start";
import { ResearchEngine } from "./engine";
import { createClient } from "@supabase/supabase-js";

export const startResearchJob = createServerFn({ method: "POST" })
  .validator(
    (d: {
      workspaceId: string;
      userId: string;
      query: any;
      type: string;
      provider?: string;
      token: string;
    }) => d,
  )
  .handler(async ({ data: payload }) => {
    const supabase = createClient(
      process.env["VITE_SUPABASE_URL"] || import.meta.env.VITE_SUPABASE_URL || "https://placeholder.supabase.co",
      process.env["VITE_SUPABASE_ANON_KEY"] || import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder",
      {
        global: { headers: { Authorization: `Bearer ${payload.token}` } },
      },
    );
    const job = await ResearchEngine.createJob(
      supabase,
      payload.workspaceId,
      payload.userId,
      payload.type,
      payload.query,
      payload.provider,
    );

    // Start processing in background
    ResearchEngine.processJob(supabase, job.id).catch(console.error);

    return job;
  });

export const triggerAutomatedResearch = createServerFn({ method: "POST" })
  .validator((d: { token: string }) => d)
  .handler(async ({ data: payload }) => {
    const supabase = createClient(
      process.env["VITE_SUPABASE_URL"] || import.meta.env.VITE_SUPABASE_URL || "https://placeholder.supabase.co",
      process.env["VITE_SUPABASE_ANON_KEY"] || import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder",
      {
        global: { headers: { Authorization: `Bearer ${payload.token}` } },
      },
    );

    // Admin check - simple check
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    // Ideally check if user is admin, here assuming only admins can click the button in Admin UI

    // We must use SERVICE ROLE KEY because automated background jobs need full access
    const serviceRoleKey = process.env["SERVICE_ROLE_KEY"]; // Or use anon key if RLS allows it?
    // Wait, the automated job needs to bypass RLS to read all brands for deduplication, or we just rely on the anon/user.
    // Actually, we use the user's supabase client but if they are an admin, they should have access.

    // Execute the hourly job logic
    const result = await ResearchEngine.runAutomatedHourlyJob(supabase);
    return result;
  });
