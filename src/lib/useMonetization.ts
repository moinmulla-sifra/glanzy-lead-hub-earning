import { useQuery } from "@tanstack/react-query";
import { supabase } from "./supabase";
import { PLANS, type PlanType } from "./monetization";

export function useMonetization(userId: string | null) {
  const { data: memberData, isLoading: isLoadingMember } = useQuery({
    queryKey: ["workspace_member", userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("workspace_members")
        .select("workspace_id, workspaces(type)")
        .eq("user_id", userId!)
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
  });

  const workspaceId = memberData?.workspace_id;
  const workspaceType =
    (memberData?.workspaces as Record<string, unknown>)?.type || "creator"; // Default to creator if unknown

  const { data: subData, isLoading: isLoadingSub } = useQuery({
    queryKey: ["subscription_data", workspaceId],
    enabled: !!workspaceId,
    queryFn: async () => {
      // 1. Primary check: Query our backend subscription endpoint (checks live Dodo Payments API + persistent server store)
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const token = sessionData?.session?.access_token;
        const email = sessionData?.session?.user?.email;

        const url = `/api/subscription/current?workspaceId=${encodeURIComponent(
          workspaceId!,
        )}${email ? `&userEmail=${encodeURIComponent(email)}` : ""}`;

        const res = await fetch(url, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (res.ok) {
          const apiSub = await res.json();
          if (apiSub && apiSub.plan) {
            let plan = apiSub.plan;
            if (plan === "pro") plan = "creator_pro";
            if (plan === "agency") plan = "agency_pro";
            if (PLANS[plan as PlanType]) {
              return {
                plan: plan as PlanType,
                status: apiSub.status || "active",
                subscriptionId: apiSub.provider_subscription_id,
                nextBillingDate: apiSub.next_billing_date,
              };
            }
          }
        }
      } catch (err) {
        console.warn("Backend subscription check notice:", err);
      }

      // 2. Secondary fallback: Query Supabase subscriptions table directly
      try {
        const { data: sub } = await supabase
          .from("subscriptions")
          .select("plan, status")
          .eq("workspace_id", workspaceId!)
          .eq("status", "active")
          .maybeSingle();

        let plan = (sub?.plan as string) || "free";

        if (plan === "pro") plan = "creator_pro";
        if (plan === "agency") plan = "agency_pro";

        if (!PLANS[plan as PlanType]) {
          plan = "free";
        }

        return {
          plan: plan as PlanType,
          status: sub?.status || "inactive",
        };
      } catch {
        return {
          plan: "free" as PlanType,
          status: "inactive",
        };
      }
    },
  });

  const isLoading = isLoadingMember || (!!workspaceId && isLoadingSub);
  const currentPlan = (subData?.plan as PlanType) || "free";
  const planConfig = PLANS[currentPlan];

  const shouldShowAds = false;

  return {
    workspaceId,
    workspaceType,
    currentPlan,
    planConfig,
    features: planConfig.features,
    limits: planConfig.limits,
    isPaid: currentPlan !== "free",
    shouldShowAds,
    isLoading,
  };
}
