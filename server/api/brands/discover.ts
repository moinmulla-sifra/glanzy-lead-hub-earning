import { createClient } from "@supabase/supabase-js";
import { PLANS, PlanType } from "../../../src/lib/monetization";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || "https://placeholder.supabase.co",
  process.env.VITE_SUPABASE_SERVICE_ROLE_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY ||
    "placeholder",
);

export const handleDiscover = async (request: Request) => {
  try {
    const body = await request.json();
    const token = request.headers.get("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const {
      data: { user },
    } = await supabase.auth.getUser(token);
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const {
      workspaceId,
      pageParam = 0,
      pageSize = 12,
      search,
      filters,
      sortOption,
    } = body;

    const { data: sub } = await supabase
      .from("subscriptions")
      .select("plan")
      .eq("workspace_id", workspaceId)
      .eq("status", "active")
      .maybeSingle();

    let plan = (sub?.plan as string) || "free";
    if (plan === "pro") plan = "creator_pro";
    if (plan === "agency") plan = "agency_pro";
    if (!PLANS[plan as PlanType]) plan = "free";

    const planConfig = PLANS[plan as PlanType];

    const now = new Date();
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    ).toISOString();

    const { data: usage } = await supabase
      .from("usage")
      .select("*")
      .eq("workspace_id", workspaceId)
      .gte("period_start", startOfDay)
      .limit(1)
      .maybeSingle();

    let searches = usage?.searches || 0;
    const leads = usage?.brand_views || 0;

    if (pageParam === 0 && search) {
      if (
        planConfig.limits.daily_brand_searches !== "unlimited" &&
        searches >= planConfig.limits.daily_brand_searches
      ) {
        return new Response(
          JSON.stringify({ error: "Daily search limit reached" }),
          { status: 403, headers: { "Content-Type": "application/json" } },
        );
      }
      searches++;
    }

    if (
      planConfig.limits.daily_brand_leads !== "unlimited" &&
      leads >= planConfig.limits.daily_brand_leads
    ) {
      return new Response(
        JSON.stringify({ error: "Daily lead limit reached" }),
        { status: 403, headers: { "Content-Type": "application/json" } },
      );
    }

    if (!usage) {
      const endOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
      ).toISOString();
      await supabase.from("usage").insert({
        workspace_id: workspaceId,
        period_start: startOfDay,
        period_end: endOfDay,
        searches: search && pageParam === 0 ? 1 : 0,
        brand_views: pageSize,
      });
    } else {
      await supabase
        .from("usage")
        .update({
          searches: searches,
          brand_views: leads + pageSize,
        })
        .eq("id", usage.id);
    }

    let q = supabase.from("brands").select("*", { count: "exact" });

    if (search) {
      q = q.or(
        `company_name.ilike.%${search}%,industry.ilike.%${search}%,country.ilike.%${search}%`,
      );
    }

    if (filters?.industry) q = q.eq("industry", filters.industry);
    if (filters?.country) q = q.eq("country", filters.country);

    if (planConfig.features.advanced_filters) {
      if (filters?.company_stage)
        q = q.eq("company_stage", filters.company_stage);
    }

    if (sortOption === "score") {
      q = q.order("lead_score", { ascending: false });
    } else if (sortOption === "recent") {
      q = q.order("created_at", { ascending: false });
    } else {
      q = q.order("company_name", { ascending: true });
    }

    q = q.range(pageParam * pageSize, (pageParam + 1) * pageSize - 1);

    const { data: brands, count, error } = await q;
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const maskedBrands = brands?.map((brand) => {
      if (!planConfig.features.full_brand_intelligence) {
        return {
          ...brand,
          product_description: planConfig.features.product_intelligence
            ? brand.product_description
            : "Upgrade to unlock product intelligence",
          recent_funding: planConfig.features.funding_intelligence
            ? brand.recent_funding
            : "Upgrade to unlock funding intelligence",
          marketing_activity: planConfig.features.marketing_intelligence
            ? brand.marketing_activity
            : "Upgrade to unlock marketing intelligence",
          creator_signals: planConfig.features.creator_intelligence
            ? brand.creator_signals
            : null,
        };
      }
      return brand;
    });

    return new Response(
      JSON.stringify({
        brands: maskedBrands,
        count,
        nextPage:
          (pageParam + 1) * pageSize < (count || 0) ? pageParam + 1 : undefined,
      }),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (err: unknown) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
