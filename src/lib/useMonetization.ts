import { useQuery } from "@tanstack/react-query";
import { supabase } from "./supabase";
import { PLANS, type PlanType } from "./monetization";
import { useEffect, useState } from "react";

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
      const { data: sub } = await supabase
        .from("subscriptions")
        .select("plan, status")
        .eq("workspace_id", workspaceId!)
        .eq("status", "active")
        .maybeSingle();

      let plan = (sub?.plan as string) || "free";

      // Fallback for pre-migration state
      if (plan === "pro") plan = "creator_pro";
      if (plan === "agency") plan = "agency_pro";

      if (!PLANS[plan as PlanType]) {
        plan = "free";
      }

      return {
        plan: plan as PlanType,
        status: sub?.status || "inactive",
      };
    },
  });

  const isLoading = isLoadingMember || (!!workspaceId && isLoadingSub);
  const currentPlan = (subData?.plan as PlanType) || "free";
  const planConfig = PLANS[currentPlan];

  const shouldShowAds = !isLoading && planConfig.features.ads_enabled;

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
