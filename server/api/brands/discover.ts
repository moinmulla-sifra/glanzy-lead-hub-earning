import { createClient } from "@supabase/supabase-js";
import { PLANS, PlanType } from "../../../src/lib/monetization";

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

export const handleDiscover = async (
  request: Request,
  env?: Record<string, unknown>,
) => {
  try {
    const supabase = getSupabase(env);
    const body = await request.json().catch(() => ({}));
    const token = request.headers.get("Authorization")?.replace("Bearer ", "");

    let user: { id: string } | null = null;
    if (token) {
      const { data } = await supabase.auth.getUser(token);
      user = (data?.user as { id: string } | null) || null;
    }

    const {
      workspaceId,
      pageParam = 0,
      pageSize = 12,
      search,
      filters,
      sortOption,
    } = body;

    let activeWorkspaceId = workspaceId;
    if (!activeWorkspaceId && user?.id) {
      const { data: member } = await supabase
        .from("workspace_members")
        .select("workspace_id")
        .eq("user_id", user.id)
        .limit(1)
        .maybeSingle();
      activeWorkspaceId = member?.workspace_id;
    }

    let plan = "free";
    if (activeWorkspaceId) {
      const { data: sub } = await supabase
        .from("subscriptions")
        .select("plan")
        .eq("workspace_id", activeWorkspaceId)
        .eq("status", "active")
        .maybeSingle();

      if (sub?.plan) {
        plan = sub.plan as string;
      }
    }

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

    if (activeWorkspaceId) {
      const { data: usage } = await supabase
        .from("usage")
        .select("*")
        .eq("workspace_id", activeWorkspaceId)
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
          workspace_id: activeWorkspaceId,
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
    }

    let q = supabase.from("brands").select("*", { count: "exact" });

    if (search) {
      q = q.or(
        `company_name.ilike.%${search}%,industry.ilike.%${search}%,country.ilike.%${search}%`,
      );
    }

    if (filters?.industry && filters.industry.length > 0)
      q = q.in("industry", filters.industry);
    if (filters?.country && filters.country.length > 0)
      q = q.in("country", filters.country);

    if (planConfig.features.advanced_filters) {
      if (filters?.company_stage && filters.company_stage.length > 0)
        q = q.in("company_stage", filters.company_stage);
      if (filters?.budget_potential && filters.budget_potential.length > 0)
        q = q.in("budget_potential", filters.budget_potential);
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
