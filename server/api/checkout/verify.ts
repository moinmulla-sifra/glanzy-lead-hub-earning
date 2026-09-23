import { createClient } from "@supabase/supabase-js";

const DEFAULT_SUPABASE_URL = "https://ldxjxrtdylnuhvmmcveg.supabase.co";
const DEFAULT_SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkeGp4cnRkeWxudWh2bW1jdmVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg2OTgxMjUsImV4cCI6MjEwNDI3NDEyNX0.C7mUyroSPQ7Vcpepiqv-jzSd-zhTB4fHuFrMX23l3HY";

function sanitizeSupabaseKey(rawKey: string | undefined | null): string {
  if (!rawKey) return "";
  const key = rawKey.trim().replace(/^["']|["']$/g, "");
  const parts = key.split(".");
  if (parts.length >= 3) {
    const sigMatch = parts[2].match(/^[A-Za-z0-9_-]+/);
    if (sigMatch) {
      return `${parts[0]}.${parts[1]}.${sigMatch[0]}`;
    }
  }
  return key;
}

const getSupabase = (
  env?: Record<string, unknown>,
  authHeader?: string | null,
) => {
  const rawUrl =
    (env?.VITE_SUPABASE_URL as string) ||
    process.env.VITE_SUPABASE_URL ||
    DEFAULT_SUPABASE_URL;
  const rawKey =
    (env?.VITE_SUPABASE_SERVICE_ROLE_KEY as string) ||
    (env?.VITE_SUPABASE_ANON_KEY as string) ||
    process.env.VITE_SUPABASE_SERVICE_ROLE_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY ||
    DEFAULT_SUPABASE_KEY;

  const url =
    rawUrl && !rawUrl.includes("placeholder")
      ? rawUrl.trim()
      : DEFAULT_SUPABASE_URL;
  const key = sanitizeSupabaseKey(rawKey) || DEFAULT_SUPABASE_KEY;

  return createClient(url, key, {
    auth: { persistSession: false },
    global: {
      headers: authHeader ? { Authorization: authHeader } : {},
    },
  });
};

export const handleVerifyCheckout = async (
  request: Request,
  env?: Record<string, unknown>,
) => {
  try {
    const authHeader =
      request.headers.get("authorization") ||
      request.headers.get("Authorization");
    const supabase = getSupabase(env, authHeader);
    const body = await request.json().catch(() => ({}));
    const { workspaceId, planId, sessionId } = body;

    if (!workspaceId) {
      return new Response(JSON.stringify({ error: "Missing workspaceId" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const activePlan = planId || "creator_pro";

    // Update or insert subscription in Supabase
    const { data: existingSub } = await supabase
      .from("subscriptions")
      .select("id")
      .eq("workspace_id", workspaceId)
      .maybeSingle();

    let subError = null;
    if (existingSub?.id) {
      const { error } = await supabase
        .from("subscriptions")
        .update({
          plan: activePlan,
          status: "active",
          provider: "dodo",
          provider_subscription_id: sessionId || `checkout_${Date.now()}`,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingSub.id);
      subError = error;
    } else {
      const { error } = await supabase.from("subscriptions").insert({
        workspace_id: workspaceId,
        plan: activePlan,
        status: "active",
        provider: "dodo",
        provider_subscription_id: sessionId || `checkout_${Date.now()}`,
        updated_at: new Date().toISOString(),
      });
      subError = error;
    }

    if (subError) {
      console.error("Subscription sync error:", subError);
      return new Response(JSON.stringify({ error: subError.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
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
