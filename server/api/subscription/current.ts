import { getEffectiveSubscription } from "../../lib/subscriptionStore";
import { createClient } from "@supabase/supabase-js";

const DEFAULT_SUPABASE_URL = "https://ldxjxrtdylnuhvmmcveg.supabase.co";
const DEFAULT_SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkeGp4cnRkeWxudWh2bW1jdmVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg2OTgxMjUsImV4cCI6MjEwNDI3NDEyNX0.C7mUyroSPQ7Vcpepiqv-jzSd-zhTB4fHuFrMX23l3HY";

export const handleSubscriptionCurrent = async (
  request: Request,
  env?: Record<string, unknown>,
) => {
  try {
    const url = new URL(request.url);
    const authHeader =
      request.headers.get("authorization") ||
      request.headers.get("Authorization");

    let workspaceId = url.searchParams.get("workspaceId");
    let userEmail = url.searchParams.get("userEmail");
    const force = url.searchParams.get("force") === "true";

    if (request.method === "POST") {
      const body = await request.json().catch(() => ({}));
      if (body.workspaceId) workspaceId = body.workspaceId;
      if (body.userEmail) userEmail = body.userEmail;
    }

    // Try extracting user from Supabase auth token if userEmail is missing
    if (!userEmail && authHeader && authHeader.startsWith("Bearer ")) {
      try {
        const supabase = createClient(
          (env?.VITE_SUPABASE_URL as string) ||
            process.env.VITE_SUPABASE_URL ||
            DEFAULT_SUPABASE_URL,
          (env?.VITE_SUPABASE_ANON_KEY as string) ||
            process.env.VITE_SUPABASE_ANON_KEY ||
            DEFAULT_SUPABASE_KEY,
          { auth: { persistSession: false } },
        );
        const token = authHeader.replace("Bearer ", "").trim();
        const { data } = await supabase.auth.getUser(token);
        if (data?.user?.email) {
          userEmail = data.user.email;
        }
      } catch (tokenErr) {
        console.warn("Could not parse user from token:", tokenErr);
      }
    }

    if (!workspaceId && !userEmail) {
      return new Response(
        JSON.stringify({
          plan: "free",
          status: "inactive",
          error: "Missing workspaceId or userEmail",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const sub = await getEffectiveSubscription(
      workspaceId || "",
      userEmail,
      env,
      authHeader,
      force,
    );

    return new Response(JSON.stringify(sub), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (err: unknown) {
    console.error("Subscription Current Error:", err);
    return new Response(
      JSON.stringify({
        plan: "free",
        status: "inactive",
        error: err instanceof Error ? err.message : "Internal error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
