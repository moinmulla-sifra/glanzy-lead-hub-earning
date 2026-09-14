import DodoPayments from "dodopayments";
import { createClient } from "@supabase/supabase-js";

const getDodo = (env?: Record<string, unknown>) => {
  const apiKey =
    (env?.DODO_PAYMENTS_API_KEY as string) ||
    process.env.DODO_PAYMENTS_API_KEY ||
    "test_sk_placeholder";
  const rawEnv =
    (env?.DODO_PAYMENTS_ENVIRONMENT as string) ||
    process.env.DODO_PAYMENTS_ENVIRONMENT ||
    "test_mode";
  const environment = rawEnv === "live_mode" ? "live_mode" : "test_mode";

  return new DodoPayments({
    bearerToken: apiKey,
    environment,
  });
};

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

const PRODUCT_TO_PLAN: Record<string, string> = {
  pdt_0NnVj2WDdu538UYT0YJyn: "creator_plus",
  pdt_0NnVjWPRBluNjdQSiMw4H: "creator_plus",
  pdt_0NnVl9vHzPaM4ZeSuypNO: "creator_pro",
  pdt_0NnVlYI4ZE35p4jApk3Ud: "creator_pro",
  pdt_0NnVmAScc9gdOR13e5OGx: "agency_plus",
  pdt_0NnVmVob4HjnEaPiOoNWQ: "agency_plus",
  pdt_0NnVmrrrfGMpqoHR8yvHo: "agency_pro",
  pdt_0NnVnRNOMYq9ZlHoTEsua: "agency_pro",
};

export const handleDodoWebhook = async (
  request: Request,
  env?: Record<string, unknown>,
) => {
  const supabase = getSupabase(env);
  const payload = await request.text();
  const signature =
    request.headers.get("webhook-signature") ||
    request.headers.get("svix-signature");

  if (!payload) {
    return new Response(JSON.stringify({ message: "Missing payload" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const parsed = JSON.parse(payload);
    const eventType: string =
      parsed.type || parsed.event || parsed.event_type || "";
    const eventId: string =
      parsed.event_id ||
      parsed.id ||
      `${parsed.business_id || "dodo"}_${parsed.timestamp || Date.now()}_${eventType}`;

    // Process idempotency
    const { data: existingEvent } = await supabase
      .from("webhook_events")
      .select("id")
      .eq("event_id", eventId)
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
        event_id: eventId,
        event_type: eventType,
        payload: parsed,
      })
      .select("id")
      .maybeSingle();

    const data = parsed.data || {};
    const metadata =
      data.metadata ||
      data.customer?.metadata ||
      data.subscription?.metadata ||
      {};

    let workspaceId = metadata.workspace_id;
    let planType = metadata.plan_type;

    // Fallback: Infer plan from product ID if not in metadata
    if (!planType) {
      const prodId =
        data.product_id ||
        data.product_cart?.[0]?.product_id ||
        data.items?.[0]?.product_id;
      if (prodId && PRODUCT_TO_PLAN[prodId]) {
        planType = PRODUCT_TO_PLAN[prodId];
      }
    }

    // Fallback: Resolve workspace from customer email if missing in metadata
    if (!workspaceId && data.customer?.email) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", data.customer.email)
        .maybeSingle();

      if (profile?.id) {
        const { data: member } = await supabase
          .from("workspace_members")
          .select("workspace_id")
          .eq("user_id", profile.id)
          .limit(1)
          .maybeSingle();
        workspaceId = member?.workspace_id;
      }
    }

    if (workspaceId) {
      const activePlan = planType || "creator_pro";

      const { data: existingSub } = await supabase
        .from("subscriptions")
        .select("id")
        .eq("workspace_id", workspaceId)
        .maybeSingle();

      if (
        eventType === "payment.succeeded" ||
        eventType === "subscription.active" ||
        eventType === "subscription.renewed"
      ) {
        if (existingSub?.id) {
          await supabase
            .from("subscriptions")
            .update({
              plan: activePlan,
              status: "active",
              provider: "dodo",
              provider_subscription_id:
                data.subscription_id || data.payment_id || data.id,
              updated_at: new Date().toISOString(),
            })
            .eq("id", existingSub.id);
        } else {
          await supabase.from("subscriptions").insert({
            workspace_id: workspaceId,
            plan: activePlan,
            status: "active",
            provider: "dodo",
            provider_subscription_id:
              data.subscription_id || data.payment_id || data.id,
            updated_at: new Date().toISOString(),
          });
        }
      } else if (eventType === "subscription.updated") {
        const nextStatus = data.status === "active" ? "active" : "on_hold";
        if (existingSub?.id) {
          await supabase
            .from("subscriptions")
            .update({
              plan: activePlan,
              status: nextStatus,
              provider: "dodo",
              provider_subscription_id: data.subscription_id || data.id,
              updated_at: new Date().toISOString(),
            })
            .eq("id", existingSub.id);
        } else {
          await supabase.from("subscriptions").insert({
            workspace_id: workspaceId,
            plan: activePlan,
            status: nextStatus,
            provider: "dodo",
            provider_subscription_id: data.subscription_id || data.id,
            updated_at: new Date().toISOString(),
          });
        }
      } else if (eventType === "subscription.on_hold") {
        await supabase
          .from("subscriptions")
          .update({
            status: "on_hold",
            updated_at: new Date().toISOString(),
          })
          .eq("workspace_id", workspaceId);
      } else if (
        eventType === "subscription.cancelled" ||
        eventType === "subscription.canceled" ||
        eventType === "subscription.expired" ||
        eventType === "subscription.failed" ||
        eventType === "payment.failed"
      ) {
        await supabase
          .from("subscriptions")
          .update({
            status: eventType.includes("failed") ? "failed" : "canceled",
            updated_at: new Date().toISOString(),
          })
          .eq("workspace_id", workspaceId);
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    const errorMsg =
      err instanceof Error ? err.message : "Unknown webhook error";
    console.error("Webhook Error:", err);
    return new Response(JSON.stringify({ message: errorMsg }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
