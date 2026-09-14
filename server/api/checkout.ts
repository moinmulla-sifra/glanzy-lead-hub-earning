import DodoPayments from "dodopayments";

const getDodo = (env?: Record<string, unknown>) =>
  new DodoPayments({
    bearerToken:
      (env?.DODO_PAYMENTS_API_KEY as string) ||
      process.env.DODO_PAYMENTS_API_KEY ||
      "test_sk_placeholder",
    environment: "test_mode",
  });

const getProductId = (
  planId: string,
  interval: string,
  env?: Record<string, unknown>,
) => {
  if (planId === "creator_plus" && interval === "monthly")
    return (
      (env?.DODO_CREATOR_PLUS_MONTHLY_PRODUCT_ID as string) ||
      process.env.DODO_CREATOR_PLUS_MONTHLY_PRODUCT_ID
    );
  if (planId === "creator_plus" && interval === "yearly")
    return (
      (env?.DODO_CREATOR_PLUS_YEARLY_PRODUCT_ID as string) ||
      process.env.DODO_CREATOR_PLUS_YEARLY_PRODUCT_ID
    );
  if (planId === "creator_pro" && interval === "monthly")
    return (
      (env?.DODO_CREATOR_PRO_MONTHLY_PRODUCT_ID as string) ||
      process.env.DODO_CREATOR_PRO_MONTHLY_PRODUCT_ID
    );
  if (planId === "creator_pro" && interval === "yearly")
    return (
      (env?.DODO_CREATOR_PRO_YEARLY_PRODUCT_ID as string) ||
      process.env.DODO_CREATOR_PRO_YEARLY_PRODUCT_ID
    );
  if (planId === "agency_plus" && interval === "monthly")
    return (
      (env?.DODO_AGENCY_PLUS_MONTHLY_PRODUCT_ID as string) ||
      process.env.DODO_AGENCY_PLUS_MONTHLY_PRODUCT_ID
    );
  if (planId === "agency_plus" && interval === "yearly")
    return (
      (env?.DODO_AGENCY_PLUS_YEARLY_PRODUCT_ID as string) ||
      process.env.DODO_AGENCY_PLUS_YEARLY_PRODUCT_ID
    );
  if (planId === "agency_pro" && interval === "monthly")
    return (
      (env?.DODO_AGENCY_PRO_MONTHLY_PRODUCT_ID as string) ||
      process.env.DODO_AGENCY_PRO_MONTHLY_PRODUCT_ID
    );
  if (planId === "agency_pro" && interval === "yearly")
    return (
      (env?.DODO_AGENCY_PRO_YEARLY_PRODUCT_ID as string) ||
      process.env.DODO_AGENCY_PRO_YEARLY_PRODUCT_ID
    );

  // Fallback for simple tests
  return (
    (env?.DODO_TEST_PRODUCT_ID as string) || process.env.DODO_TEST_PRODUCT_ID
  );
};

export const handleCheckout = async (
  request: Request,
  env?: Record<string, unknown>,
) => {
  try {
    const dodo = getDodo(env);
    const body = await request.json().catch(() => ({}));
    const { planId, workspaceId, interval, returnUrl, userEmail, userName } =
      body;

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

    const origin =
      request.headers.get("origin") ||
      (request.headers.get("referer")
        ? new URL(request.headers.get("referer")!).origin
        : null) ||
      (returnUrl ? new URL(returnUrl).origin : null) ||
      new URL(request.url).origin;

    const baseReturnUrl = returnUrl || `${origin}/settings`;
    let finalReturnUrl = baseReturnUrl;
    try {
      const parsedUrl = new URL(baseReturnUrl, origin);
      parsedUrl.searchParams.set("checkout_success", "true");
      if (workspaceId) parsedUrl.searchParams.set("workspace_id", workspaceId);
      if (planId) parsedUrl.searchParams.set("plan", planId);
      finalReturnUrl = parsedUrl.toString();
    } catch {
      finalReturnUrl = `${baseReturnUrl}?checkout_success=true&workspace_id=${workspaceId || ""}&plan=${planId || ""}`;
    }

    const cancelUrl = `${origin}/pricing`;

    const session = await dodo.checkoutSessions.create({
      billing_address: {
        country: "IN",
      },
      billing_currency: "INR",
      customer: {
        name:
          userName ||
          `Workspace ${workspaceId ? workspaceId.slice(0, 8) : "User"}`,
        email: userEmail || "customer@branzly.com",
      },
      product_cart: [
        {
          product_id: productId,
          quantity: 1,
        },
      ],
      return_url: finalReturnUrl,
      cancel_url: cancelUrl,
      feature_flags: {
        redirect_immediately: true,
      },
      metadata: {
        workspace_id: workspaceId || "",
        plan_type: planId || "",
      },
    });

    return new Response(JSON.stringify({ url: session.checkout_url }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    console.error("Checkout Error:", err);
    const errorObj = err as { status?: number; message?: string } | undefined;
    const isAuthError =
      errorObj?.status === 401 ||
      String(errorObj?.message || "").includes("401") ||
      String(errorObj?.message || "").includes("Unauthorized");

    const message = isAuthError
      ? "Dodo Payments authentication failed (401 Unauthorized). The current DODO_PAYMENTS_API_KEY is invalid or expired. Please update DODO_PAYMENTS_API_KEY in your environment configuration with a valid key from your Dodo Payments dashboard."
      : errorObj?.message || "Failed to create checkout session";

    return new Response(JSON.stringify({ error: message }), {
      status: isAuthError ? 401 : 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
