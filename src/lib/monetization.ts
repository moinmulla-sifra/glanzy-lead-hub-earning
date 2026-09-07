import { supabase } from "./supabase";

export type PlanType = "free" | "pro" | "agency";

export interface PlanConfig {
  name: string;
  type: PlanType;
  priceMonthly: number;
  limits: {
    searchesPerMonth: number;
    brandViewsPerMonth: number;
    savedBrandsTotal: number;
    outreachActiveTotal: number;
    teamMembers: number;
  };
  features: {
    advancedDiscovery: boolean;
    removeAds: boolean;
    exportData: boolean;
    prioritySupport: boolean;
  };
}

export const PLANS: Record<PlanType, PlanConfig> = {
  free: {
    name: "Free",
    type: "free",
    priceMonthly: 0,
    limits: {
      searchesPerMonth: 50,
      brandViewsPerMonth: 100,
      savedBrandsTotal: 25,
      outreachActiveTotal: 10,
      teamMembers: 1,
    },
    features: {
      advancedDiscovery: false,
      removeAds: false,
      exportData: false,
      prioritySupport: false,
    },
  },
  pro: {
    name: "Pro",
    type: "pro",
    priceMonthly: 49,
    limits: {
      searchesPerMonth: 500,
      brandViewsPerMonth: 1000,
      savedBrandsTotal: 500,
      outreachActiveTotal: 250,
      teamMembers: 1,
    },
    features: {
      advancedDiscovery: true,
      removeAds: true,
      exportData: true,
      prioritySupport: true,
    },
  },
  agency: {
    name: "Agency",
    type: "agency",
    priceMonthly: 199,
    limits: {
      searchesPerMonth: 5000,
      brandViewsPerMonth: 10000,
      savedBrandsTotal: 5000,
      outreachActiveTotal: 2500,
      teamMembers: 10,
    },
    features: {
      advancedDiscovery: true,
      removeAds: true,
      exportData: true,
      prioritySupport: true,
    },
  },
};

export async function checkFeatureAccess(
  workspaceId: string,
  feature: keyof PlanConfig["features"],
) {
  const { data: sub } = await supabase
    .from("subscriptions")
    .select("plan, status")
    .eq("workspace_id", workspaceId)
    .single();

  const currentPlan = (sub?.plan as PlanType) || "free";
  const planConfig = PLANS[currentPlan];

  return planConfig.features[feature];
}

export async function checkUsageLimit(
  workspaceId: string,
  limitKey: keyof PlanConfig["limits"],
) {
  const { data: sub } = await supabase
    .from("subscriptions")
    .select("plan")
    .eq("workspace_id", workspaceId)
    .single();

  const currentPlan = (sub?.plan as PlanType) || "free";
  const limit = PLANS[currentPlan].limits[limitKey];

  if (
    limitKey === "teamMembers" ||
    limitKey === "savedBrandsTotal" ||
    limitKey === "outreachActiveTotal"
  ) {
    // These are absolute counts we can query directly
    let table = "";
    if (limitKey === "teamMembers") table = "workspace_members";
    if (limitKey === "savedBrandsTotal") table = "saved_brands";
    if (limitKey === "outreachActiveTotal") table = "outreach";

    const { count } = await supabase
      .from(table)
      .select("*", { count: "exact", head: true })
      .eq("workspace_id", workspaceId);

    return { allowed: (count || 0) < limit, current: count || 0, limit };
  }

  // Periodic limits (searches, brand views)
  const { data: usage } = await supabase
    .from("usage")
    .select(limitKey === "searchesPerMonth" ? "searches" : "brand_views")
    .eq("workspace_id", workspaceId)
    .order("period_start", { ascending: false })
    .limit(1)
    .single();

  const currentVal =
    limitKey === "searchesPerMonth"
      ? usage?.searches || 0
      : usage?.brand_views || 0;

  return { allowed: currentVal < limit, current: currentVal, limit };
}

export async function incrementUsage(
  workspaceId: string,
  metric: "searches" | "brand_views",
) {
  // Try to find current period usage
  const now = new Date();

  // Note: a robust implementation would use a Postgres function to safely upsert and increment,
  // preventing race conditions, but this is a simplified frontend-driven approach.

  const { data: currentUsage } = await supabase
    .from("usage")
    .select("*")
    .eq("workspace_id", workspaceId)
    .order("period_start", { ascending: false })
    .limit(1)
    .single();

  if (!currentUsage || new Date(currentUsage.period_end) < now) {
    // Create new period (e.g. 1 month)
    const periodStart = new Date();
    const periodEnd = new Date();
    periodEnd.setMonth(periodEnd.getMonth() + 1);

    await supabase.from("usage").insert({
      workspace_id: workspaceId,
      period_start: periodStart.toISOString(),
      period_end: periodEnd.toISOString(),
      [metric]: 1,
    });
  } else {
    // Increment existing
    const newVal = (currentUsage[metric] || 0) + 1;
    await supabase
      .from("usage")
      .update({ [metric]: newVal })
      .eq("id", currentUsage.id);
  }
}
