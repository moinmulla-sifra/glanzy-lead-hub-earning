import {
  saveSubscription,
  normalizePlanName,
} from "../../lib/subscriptionStore";
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

const getSupabase = (env?: Record<string, unknown>) => {
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

  return createClient(url, key);
};

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

// In-memory set for event deduplication
const seenEvents = new Set<string>();

export const handleDodoWebhook = async (
  request: Request,
  env?: Record<string, unknown>,
) => {
  const supabase = getSupabase(env);
  const payload = await request.text();

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

    if (seenEvents.has(eventId)) {
      return new Response(
        JSON.stringify({ received: true, message: "Duplicate event ignored" }),
        { headers: { "Content-Type": "application/json" } },
      );
    }
    seenEvents.add(eventId);

    // Attempt Supabase webhook_events idempotency if table exists (ignore if missing)
    try {
      const { data: existingEvent } = await supabase
        .from("webhook_events")
        .select("id")
        .eq("event_id", eventId)
        .maybeSingle();

      if (existingEvent) {
        return new Response(
          JSON.stringify({
            received: true,
            message: "Duplicate event ignored",
          }),
          { headers: { "Content-Type": "application/json" } },
        );
      }

      await supabase.from("webhook_events").insert({
        event_id: eventId,
        event_type: eventType,
        payload: parsed,
      });
    } catch {
      // Table doesn't exist or RLS blocked, memory deduplication handles it
    }

    const data = parsed.data || {};
    const metadata =
      data.metadata ||
      data.customer?.metadata ||
      data.subscription?.metadata ||
      {};

    let workspaceId = metadata.workspace_id;
    let planType = metadata.plan_type;
    const customerEmail = data.customer?.email;

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
    if (!workspaceId && customerEmail) {
      try {
        const { data: profile } = await supabase
          .from("profiles")
          .select("id")
          .eq("email", customerEmail)
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
      } catch (profErr) {
        console.warn("Profile resolution notice:", profErr);
      }
    }

    if (workspaceId) {
      const activePlan = normalizePlanName(planType || "creator_pro");
      const providerSubId =
        data.subscription_id ||
        data.payment_id ||
        data.id ||
        `dodo_${Date.now()}`;

      if (
        eventType === "payment.succeeded" ||
        eventType === "subscription.active" ||
        eventType === "subscription.renewed"
      ) {
        await saveSubscription(
          {
            workspace_id: workspaceId,
            plan: activePlan,
            status: "active",
            provider: "dodo",
            provider_subscription_id: providerSubId,
            customer_email: customerEmail,
            next_billing_date: data.next_billing_date,
            updated_at: new Date().toISOString(),
          },
          env,
        );
      } else if (eventType === "subscription.updated") {
        const nextStatus = data.status === "active" ? "active" : "on_hold";
        await saveSubscription(
          {
            workspace_id: workspaceId,
            plan: activePlan,
            status: nextStatus,
            provider: "dodo",
            provider_subscription_id: providerSubId,
            customer_email: customerEmail,
            next_billing_date: data.next_billing_date,
            updated_at: new Date().toISOString(),
          },
          env,
        );
      } else if (eventType === "subscription.on_hold") {
        await saveSubscription(
          {
            workspace_id: workspaceId,
            plan: activePlan,
            status: "on_hold",
            provider: "dodo",
            provider_subscription_id: providerSubId,
            customer_email: customerEmail,
            updated_at: new Date().toISOString(),
          },
          env,
        );
      } else if (
        eventType === "subscription.cancelled" ||
        eventType === "subscription.canceled" ||
        eventType === "subscription.expired" ||
        eventType === "subscription.failed" ||
        eventType === "payment.failed"
      ) {
        await saveSubscription(
          {
            workspace_id: workspaceId,
            plan: "free",
            status: "inactive",
            provider: "dodo",
            provider_subscription_id: providerSubId,
            customer_email: customerEmail,
            updated_at: new Date().toISOString(),
          },
          env,
        );
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    console.error("Webhook processing error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to process webhook" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
