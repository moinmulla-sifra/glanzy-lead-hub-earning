import { createAPIFileRoute } from '@tanstack/react-start/api';
import DodoPayments from "dodopayments";

const dodo = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY || "test_sk_placeholder",
});

export const APIRoute = createAPIFileRoute('/api/checkout')({
  POST: async ({ request }) => {
    try {
      const body = await request.json();
      const { planId, workspaceId, interval } = body;
      
      const payment = await dodo.payments.create({
        billing: {
          city: "City",
          country: "IN",
          state: "State",
          street: "Street",
          zipcode: "000000",
        },
        customer: {
          name: "Workspace " + workspaceId,
          email: "customer@branzly.com"
        },
        product_cart: [
          {
            product_id: planId, // Expecting actual product ID here
            quantity: 1,
          },
        ],
        return_url: `${process.env.VITE_APP_URL || 'http://localhost:3000'}/settings`,
        metadata: {
          workspace_id: workspaceId,
          plan_type: planId
        }
      });

      return new Response(JSON.stringify({ url: payment.payment_link }), {
        headers: { "Content-Type": "application/json" }
      });
    } catch (err: any) {
      return new Response(JSON.stringify({ error: err.message }), {
        headers: { "Content-Type": "application/json" },
        status: 500
      });
    }
  }
});
