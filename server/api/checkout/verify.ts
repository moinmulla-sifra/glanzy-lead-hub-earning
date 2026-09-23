import {
  saveSubscription,
  syncFromDodoPayments,
  normalizePlanName,
} from "../../lib/subscriptionStore";
import { createClient } from "@supabase/supabase-js";

const DEFAULT_SUPABASE_URL = "https://ldxjxrtdylnuhvmmcveg.supabase.co";
const DEFAULT_SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkeGp4cnRkeWxudWh2bW1jdmVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg2OTgxMjUsImV4cCI6MjEwNDI3NDEyNX0.C7mUyroSPQ7Vcpepiqv-jzSd-zhTB4fHuFrMX23l3HY";

export const handleVerifyCheckout = async (
  request: Request,
  env?: Record<string, unknown>,
) => {
  try {
    const authHeader =
      request.headers.get("authorization") ||
      request.headers.get("Authorization");
    const body = await request.json().catch(() => ({}));
    const { workspaceId, planId, sessionId, userEmail } = body;

    let resolvedEmail = userEmail;

    // Try reading user from auth token if userEmail was not sent in body
    if (!resolvedEmail && authHeader && authHeader.startsWith("Bearer ")) {
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
          resolvedEmail = data.user.email;
        }
      } catch {
        // Continue
      }
    }

    if (!workspaceId) {
      return new Response(JSON.stringify({ error: "Missing workspaceId" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    let activePlan = normalizePlanName(planId || "creator_pro");

    // First, sync live details from Dodo Payments if available
    const liveDodo = await syncFromDodoPayments(
      workspaceId,
      resolvedEmail,
      env,
    );
    if (liveDodo && liveDodo.plan) {
      activePlan = liveDodo.plan;
    } else {
      // Save the declared plan from checkout return
      await saveSubscription(
        {
          workspace_id: workspaceId,
          plan: activePlan,
          status: "active",
          provider: "dodo",
          provider_subscription_id: sessionId || `checkout_${Date.now()}`,
          customer_email: resolvedEmail,
          updated_at: new Date().toISOString(),
        },
        env,
        authHeader,
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        workspace_id: workspaceId,
        plan: activePlan,
        status: "active",
      }),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (err: unknown) {
    console.error("Verify checkout error:", err);
    const errorObj = err as { message?: string } | undefined;
    return new Response(
      JSON.stringify({ error: errorObj?.message || "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
