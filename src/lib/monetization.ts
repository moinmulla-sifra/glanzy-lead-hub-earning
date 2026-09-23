import { supabase } from "./supabase";

export type PlanType =
  "free" | "creator_plus" | "creator_pro" | "agency_plus" | "agency_pro";

export interface PlanConfig {
  name: string;
  type: PlanType;
  accountType: "creator" | "agency" | "all";
  priceMonthly: number;
  priceYearly: number;
  limits: {
    daily_brand_leads: number | "unlimited";
    daily_brand_searches: number | "unlimited";
    saved_brand_limit: number | "unlimited";
    monthly_contact_reveals: number;
    outreach_record_limit: number | "unlimited";
    team_seats: number;
  };
  features: {
    basic_filters: boolean;
    advanced_filters: boolean;
    limited_brand_intelligence: boolean;
    full_brand_intelligence: boolean;
    product_intelligence: boolean;
    funding_intelligence: boolean;
    marketing_intelligence: boolean;
    creator_intelligence: boolean;
    outreach_tracker: "none" | "basic" | "full";
    csv_export: "none" | "standard" | "custom";
    new_brand_alerts: boolean;
    notification_priority: "none" | "standard" | "priority";
    shared_workspace_crm: boolean;
    shared_outreach: boolean;
    whitelabel_reporting: boolean;
    dedicated_account_manager: boolean;
    priority_data_access: boolean;
    ads_enabled: boolean;
    support_level: "standard" | "priority";
  };
}

export const PLANS: Record<PlanType, PlanConfig> = {
  free: {
    name: "Free",
    type: "free",
    accountType: "all",
    priceMonthly: 0,
    priceYearly: 0,
    limits: {
      daily_brand_leads: 25,
      daily_brand_searches: 10,
      saved_brand_limit: 5,
      monthly_contact_reveals: 3,
      outreach_record_limit: 5,
      team_seats: 1,
    },
    features: {
      basic_filters: true,
      advanced_filters: false,
      limited_brand_intelligence: true,
      full_brand_intelligence: false,
      product_intelligence: false,
      funding_intelligence: false,
      marketing_intelligence: false,
      creator_intelligence: false,
      outreach_tracker: "basic",
      csv_export: "none",
      new_brand_alerts: false,
      notification_priority: "none",
      shared_workspace_crm: false,
      shared_outreach: false,
      whitelabel_reporting: false,
      dedicated_account_manager: false,
      priority_data_access: false,
      ads_enabled: false,
      support_level: "standard",
    },
  },
  creator_plus: {
    name: "Creators Plus",
    type: "creator_plus",
    accountType: "creator",
    priceMonthly: 499,
    priceYearly: 4999,
    limits: {
      daily_brand_leads: 500,
      daily_brand_searches: 100,
      saved_brand_limit: 50,
      monthly_contact_reveals: 50,
      outreach_record_limit: 100,
      team_seats: 1,
    },
    features: {
      basic_filters: true,
      advanced_filters: false,
      limited_brand_intelligence: false,
      full_brand_intelligence: true, // Except some that might be locked? No, "Brand Profile Intelligence. Contact emails and social links where available" But later "Creators Pro: Full Product intelligence, funding, marketing, creator". So creator_plus is limited.
      product_intelligence: false,
      funding_intelligence: false,
      marketing_intelligence: false,
      creator_intelligence: false,
      outreach_tracker: "basic",
      csv_export: "none",
      new_brand_alerts: false,
      notification_priority: "none",
      shared_workspace_crm: false,
      shared_outreach: false,
      whitelabel_reporting: false,
      dedicated_account_manager: false,
      priority_data_access: false,
      ads_enabled: false,
      support_level: "standard",
    },
  },
  creator_pro: {
    name: "Creators Pro",
    type: "creator_pro",
    accountType: "creator",
    priceMonthly: 999,
    priceYearly: 9999,
    limits: {
      daily_brand_leads: "unlimited",
      daily_brand_searches: "unlimited",
      saved_brand_limit: "unlimited",
      monthly_contact_reveals: 500,
      outreach_record_limit: "unlimited",
      team_seats: 1,
    },
    features: {
      basic_filters: true,
      advanced_filters: true,
      limited_brand_intelligence: false,
      full_brand_intelligence: true,
      product_intelligence: true,
      funding_intelligence: true,
      marketing_intelligence: true,
      creator_intelligence: true,
      outreach_tracker: "full",
      csv_export: "standard",
      new_brand_alerts: true,
      notification_priority: "standard",
      shared_workspace_crm: false,
      shared_outreach: false,
      whitelabel_reporting: false,
      dedicated_account_manager: false,
      priority_data_access: false,
      ads_enabled: false,
      support_level: "priority",
    },
  },
  agency_plus: {
    name: "Agency Plus",
    type: "agency_plus",
    accountType: "agency",
    priceMonthly: 2499,
    priceYearly: 24999,
    limits: {
      daily_brand_leads: "unlimited",
      daily_brand_searches: "unlimited",
      saved_brand_limit: "unlimited",
      monthly_contact_reveals: 1000,
      outreach_record_limit: "unlimited",
      team_seats: 3,
    },
    features: {
      basic_filters: true,
      advanced_filters: true,
      limited_brand_intelligence: false,
      full_brand_intelligence: true,
      product_intelligence: true,
      funding_intelligence: true,
      marketing_intelligence: true,
      creator_intelligence: true,
      outreach_tracker: "full",
      csv_export: "standard",
      new_brand_alerts: true,
      notification_priority: "standard",
      shared_workspace_crm: true,
      shared_outreach: true,
      whitelabel_reporting: false,
      dedicated_account_manager: false,
      priority_data_access: false,
      ads_enabled: false,
      support_level: "standard",
    },
  },
  agency_pro: {
    name: "Agency Pro",
    type: "agency_pro",
    accountType: "agency",
    priceMonthly: 4999,
    priceYearly: 49999,
    limits: {
      daily_brand_leads: "unlimited",
      daily_brand_searches: "unlimited",
      saved_brand_limit: "unlimited",
      monthly_contact_reveals: 5000,
      outreach_record_limit: "unlimited",
      team_seats: 10,
    },
    features: {
      basic_filters: true,
      advanced_filters: true,
      limited_brand_intelligence: false,
      full_brand_intelligence: true,
      product_intelligence: true,
      funding_intelligence: true,
      marketing_intelligence: true,
      creator_intelligence: true,
      outreach_tracker: "full",
      csv_export: "custom",
      new_brand_alerts: true,
      notification_priority: "priority",
      shared_workspace_crm: true,
      shared_outreach: true,
      whitelabel_reporting: true,
      dedicated_account_manager: true,
      priority_data_access: true,
      ads_enabled: false,
      support_level: "priority",
    },
  },
};

export async function getEffectiveSubscription(
  workspaceId: string,
): Promise<PlanType> {
  const { data: sub } = await supabase
    .from("subscriptions")
    .select("plan, status")
    .eq("workspace_id", workspaceId)
    .eq("status", "active")
    .maybeSingle();

  // Mapping old plans to new logic to prevent breaking changes while running migration
  let plan = (sub?.plan as string) || "free";
  if (plan === "pro") plan = "creator_pro";
  if (plan === "agency") plan = "agency_pro";

  // Verify it is a valid PlanType
  if (!PLANS[plan as PlanType]) {
    plan = "free";
  }

  return plan as PlanType;
}

export async function checkFeatureAccess(
  workspaceId: string,
  feature: keyof PlanConfig["features"],
) {
  const currentPlan = await getEffectiveSubscription(workspaceId);
  const planConfig = PLANS[currentPlan];
  return planConfig.features[feature];
}

export async function checkUsageLimit(
  workspaceId: string,
  limitKey: keyof PlanConfig["limits"],
) {
  const currentPlan = await getEffectiveSubscription(workspaceId);
  const limit = PLANS[currentPlan].limits[limitKey];

  if (limit === "unlimited") {
    return { allowed: true, current: 0, limit };
  }

  if (
    limitKey === "team_seats" ||
    limitKey === "saved_brand_limit" ||
    limitKey === "outreach_record_limit"
  ) {
    let table = "";
    if (limitKey === "team_seats") table = "workspace_members";
    if (limitKey === "saved_brand_limit") table = "saved_brands";
    if (limitKey === "outreach_record_limit") table = "outreach";

    const { count } = await supabase
      .from(table)
      .select("*", { count: "exact", head: true })
      .eq("workspace_id", workspaceId);

    return { allowed: (count || 0) < limit, current: count || 0, limit };
  }

  // Periodic limits (daily/monthly)
  const now = new Date();
  const startOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  ).toISOString();
  const startOfMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1,
  ).toISOString();

  // For brand_leads and searches, we need a daily usage table or query
  // Let's create or update usage logic
  if (limitKey === "daily_brand_leads" || limitKey === "daily_brand_searches") {
    const { data: usage } = await supabase
      .from("usage")
      .select("brand_views, searches")
      .eq("workspace_id", workspaceId)
      .gte("period_start", startOfDay)
      .maybeSingle();

    const currentVal =
      limitKey === "daily_brand_leads"
        ? usage?.brand_views || 0
        : usage?.searches || 0;
    return { allowed: currentVal < limit, current: currentVal, limit };
  }

  if (limitKey === "monthly_contact_reveals") {
    const { data: usage } = await supabase
      .from("usage")
      .select("contact_reveals")
      .eq("workspace_id", workspaceId)
      .gte("period_start", startOfMonth)
      .maybeSingle();

    const currentVal = usage?.contact_reveals || 0;
    return { allowed: currentVal < limit, current: currentVal, limit };
  }

  return { allowed: false, current: 0, limit };
}

export async function incrementUsage(
  workspaceId: string,
  metric: "searches" | "brand_views" | "contact_reveals",
  period: "daily" | "monthly" = "daily",
) {
  const now = new Date();
  const startOfPeriod =
    period === "daily"
      ? new Date(now.getFullYear(), now.getMonth(), now.getDate())
      : new Date(now.getFullYear(), now.getMonth(), 1);

  const endOfPeriod =
    period === "daily"
      ? new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
      : new Date(now.getFullYear(), now.getMonth() + 1, 1);

  // Attempt to find existing usage record for the period
  const { data: currentUsage } = await supabase
    .from("usage")
    .select("*")
    .eq("workspace_id", workspaceId)
    .gte("period_start", startOfPeriod.toISOString())
    .limit(1)
    .maybeSingle();

  if (!currentUsage) {
    await supabase.from("usage").insert({
      workspace_id: workspaceId,
      period_start: startOfPeriod.toISOString(),
      period_end: endOfPeriod.toISOString(),
      [metric]: 1,
    });
  } else {
    const newVal = (currentUsage[metric] || 0) + 1;
    await supabase
      .from("usage")
      .update({ [metric]: newVal })
      .eq("id", currentUsage.id);
  }
}
