import { createClient } from "@supabase/supabase-js";

const getSupabase = (env?: Record<string, unknown>) =>
  createClient(
    (env?.VITE_SUPABASE_URL as string) ||
      process.env.VITE_SUPABASE_URL ||
      "https://placeholder.supabase.co",
    (env?.VITE_SUPABASE_SERVICE_ROLE_KEY as string) ||
      (env?.VITE_SUPABASE_ANON_KEY as string) ||
      process.env.VITE_SUPABASE_SERVICE_ROLE_KEY ||
      process.env.VITE_SUPABASE_ANON_KEY ||
      "placeholder",
  );

export const handleVerifyCheckout = async (
  request: Request,
  env?: Record<string, unknown>,
) => {
  try {
    const supabase = getSupabase(env);
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
