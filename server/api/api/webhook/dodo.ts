import { createAPIFileRoute } from '@tanstack/react-start/api';
import DodoPayments from "dodopayments";
import { createClient } from "@supabase/supabase-js";

const dodo = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY || "test_sk_placeholder",
});

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || "https://placeholder",
  process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || "placeholder"
);

export const APIRoute = createAPIFileRoute('/api/webhook/dodo')({
  POST: async ({ request }) => {
    const payload = await request.text();
    const signature = request.headers.get("webhook-signature");
    
    if (!payload || !signature) {
      return new Response(JSON.stringify({ message: "Missing payload or signature" }), { status: 400 });
    }
    
    try {
      const parsed = JSON.parse(payload);
      
      if (parsed.data && parsed.data.metadata && parsed.data.metadata.workspace_id) {
        const workspaceId = parsed.data.metadata.workspace_id;
        const planType = parsed.data.metadata.plan_type;
        
        if (parsed.event === "payment.succeeded" || parsed.event === "subscription.active") {
          await supabase
            .from("subscriptions")
            .upsert({
              workspace_id: workspaceId,
              plan: planType,
              status: "active",
              provider: "dodo",
              provider_subscription_id: parsed.data.subscription_id || parsed.data.payment_id,
              updated_at: new Date().toISOString()
            }, { onConflict: "workspace_id" });
        } else if (parsed.event === "subscription.canceled") {
          await supabase
            .from("subscriptions")
            .update({
              status: "canceled",
              updated_at: new Date().toISOString()
            })
            .eq("workspace_id", workspaceId);
        }
      }
      
      return new Response(JSON.stringify({ received: true }), { headers: { "Content-Type": "application/json" } });
    } catch (err: any) {
      return new Response(JSON.stringify({ message: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
    }
  }
});
