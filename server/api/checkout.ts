import DodoPayments from "dodopayments";

const getDodo = (env: any) =>
  new DodoPayments({
    bearerToken:
      (env?.DODO_PAYMENTS_API_KEY as string) ||
      process.env.DODO_PAYMENTS_API_KEY ||
      "test_sk_placeholder",
    environment: "test_mode",
  });

const getProductId = (planId: string, interval: string, env: any) => {
  if (planId === "creator_plus" && interval === "monthly")
    return (
      env?.DODO_CREATOR_PLUS_MONTHLY_PRODUCT_ID ||
      process.env.DODO_CREATOR_PLUS_MONTHLY_PRODUCT_ID
    );
  if (planId === "creator_plus" && interval === "yearly")
    return (
      env?.DODO_CREATOR_PLUS_YEARLY_PRODUCT_ID ||
      process.env.DODO_CREATOR_PLUS_YEARLY_PRODUCT_ID
    );
  if (planId === "creator_pro" && interval === "monthly")
    return (
      env?.DODO_CREATOR_PRO_MONTHLY_PRODUCT_ID ||
      process.env.DODO_CREATOR_PRO_MONTHLY_PRODUCT_ID
    );
  if (planId === "creator_pro" && interval === "yearly")
    return (
      env?.DODO_CREATOR_PRO_YEARLY_PRODUCT_ID ||
      process.env.DODO_CREATOR_PRO_YEARLY_PRODUCT_ID
    );
  if (planId === "agency_plus" && interval === "monthly")
    return (
      env?.DODO_AGENCY_PLUS_MONTHLY_PRODUCT_ID ||
      process.env.DODO_AGENCY_PLUS_MONTHLY_PRODUCT_ID
    );
  if (planId === "agency_plus" && interval === "yearly")
    return (
      env?.DODO_AGENCY_PLUS_YEARLY_PRODUCT_ID ||
      process.env.DODO_AGENCY_PLUS_YEARLY_PRODUCT_ID
    );
  if (planId === "agency_pro" && interval === "monthly")
    return (
      env?.DODO_AGENCY_PRO_MONTHLY_PRODUCT_ID ||
      process.env.DODO_AGENCY_PRO_MONTHLY_PRODUCT_ID
    );
  if (planId === "agency_pro" && interval === "yearly")
    return (
      env?.DODO_AGENCY_PRO_YEARLY_PRODUCT_ID ||
      process.env.DODO_AGENCY_PRO_YEARLY_PRODUCT_ID
    );

  // Fallback for simple tests
  return env?.DODO_TEST_PRODUCT_ID || process.env.DODO_TEST_PRODUCT_ID;
};

export const handleCheckout = async (request: Request, env?: any) => {
  try {
    const dodo = getDodo(env);
    const body = await request.json();
    const { planId, workspaceId, interval, returnUrl } = body;

    const productId = getProductId(planId, interval, env);
    if (!productId) {
      return new Response(
        JSON.stringify({
          error: `Missing Dodo Product ID configuration for plan: ${planId} (${interval}). Please configure DODO_${planId.toUpperCase()}_${interval.toUpperCase()}_PRODUCT_ID in test environment variables.`,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const session = await dodo.checkoutSessions.create({
      billing_address: {
        country: "IN",
      },
      billing_currency: "INR",
      customer: {
        name: "Workspace " + workspaceId,
        email: "customer@branzly.com", // Usually derived from current user context, hardcoded here for testing if not passed
      },
      product_cart: [
        {
          product_id: productId,
          quantity: 1,
        },
      ],
      return_url: returnUrl || `${request.headers.get("origin") || new URL(request.url).origin || "http://localhost:3000"}/settings`,
      metadata: {
        workspace_id: workspaceId,
        plan_type: planId,
      },
    });

    return new Response(JSON.stringify({ url: session.checkout_url }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    console.error("Checkout Error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
