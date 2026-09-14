import DodoPayments from "dodopayments";
import { createClient } from "@supabase/supabase-js";

const getDodo = (env: any) =>
  new DodoPayments({
    bearerToken:
      (env?.DODO_PAYMENTS_API_KEY as string) ||
      process.env.DODO_PAYMENTS_API_KEY ||
      "test_sk_placeholder",
    environment: "test_mode",
  });

const getSupabase = (env: any) =>
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

export const handleDodoWebhook = async (request: Request, env?: any) => {
  const dodo = getDodo(env);
  const supabase = getSupabase(env);
  const payload = await request.text();
  const signature = request.headers.get("webhook-signature");

  if (!payload || !signature) {
    return new Response(
      JSON.stringify({ message: "Missing payload or signature" }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  try {
    // In production we would verify the signature here using the DodoPayments SDK.
    // e.g. await dodo.webhooks.verifySignature(payload, signature, process.env.DODO_PAYMENTS_WEBHOOK_SECRET);

    const parsed = JSON.parse(payload);

    // Process idempotency
    const { data: existingEvent } = await supabase
      .from("webhook_events")
      .select("id")
      .eq("event_id", parsed.event_id)
      .maybeSingle();

    if (existingEvent) {
      return new Response(
        JSON.stringify({ received: true, message: "Duplicate event ignored" }),
        { headers: { "Content-Type": "application/json" } },
      );
    }

    // Store event for idempotency
    await supabase
      .from("webhook_events")
      .insert({
        event_id: parsed.event_id,
        event_type: parsed.event,
        payload: parsed,
      })
      .select("id")
      .maybeSingle();

    if (
      parsed.data &&
      parsed.data.metadata &&
      parsed.data.metadata.workspace_id
    ) {
      const workspaceId = parsed.data.metadata.workspace_id;
      const planType = parsed.data.metadata.plan_type;

      const eventType = parsed.event;

      if (
        eventType === "subscription.active" ||
        eventType === "subscription.renewed"
      ) {
        await supabase.from("subscriptions").upsert(
          {
            workspace_id: workspaceId,
            plan: planType,
            status: "active",
            provider: "dodo",
            provider_subscription_id:
              parsed.data.subscription_id || parsed.data.payment_id,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "workspace_id" },
        );
      } else if (eventType === "subscription.updated") {
        await supabase.from("subscriptions").upsert(
          {
            workspace_id: workspaceId,
            plan: planType,
            status: parsed.data.status === "active" ? "active" : "on_hold",
            provider: "dodo",
            provider_subscription_id: parsed.data.subscription_id,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "workspace_id" },
        );
      } else if (eventType === "subscription.on_hold") {
        await supabase
          .from("subscriptions")
          .update({
            status: "on_hold",
            updated_at: new Date().toISOString(),
          })
          .eq("workspace_id", workspaceId);
      } else if (
        eventType === "subscription.canceled" ||
        eventType === "subscription.expired" ||
        eventType === "subscription.failed"
      ) {
        await supabase
          .from("subscriptions")
          .update({
            status: eventType === "subscription.failed" ? "failed" : "canceled",
            updated_at: new Date().toISOString(),
          })
          .eq("workspace_id", workspaceId);
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    console.error("Webhook Error:", err);
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
