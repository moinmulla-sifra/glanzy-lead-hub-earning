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
        .select("workspace_id")
        .eq("user_id", userId!)
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const workspaceId = memberData?.workspace_id;

  const { data: subData, isLoading: isLoadingSub } = useQuery({
    queryKey: ["subscription_data", workspaceId],
    enabled: !!workspaceId,
    queryFn: async () => {
      // 1. Get legacy subscription fallback
      const { data: legacySub } = await supabase
        .from("subscriptions")
        .select("plan")
        .eq("workspace_id", workspaceId!)
        .maybeSingle();

      // 2. Get latest approved manual request
      const { data: approvedReq } = await supabase
        .from("subscription_requests")
        .select("requested_plan")
        .eq("workspace_id", workspaceId!)
        .eq("status", "approved")
        .order("reviewed_at", { ascending: false })
        .limit(1)
        .maybeSingle();
        
      // 3. Get latest pending request
      const { data: pendingReq } = await supabase
        .from("subscription_requests")
        .select("requested_plan")
        .eq("workspace_id", workspaceId!)
        .eq("status", "pending")
        .order("requested_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      const activePlan = approvedReq?.requested_plan 
        ? (approvedReq.requested_plan as PlanType) 
        : (legacySub?.plan as PlanType) || "free";

      return { 
        plan: activePlan,
        pendingPlan: pendingReq ? (pendingReq.requested_plan as PlanType) : null
      };
    },
  });

  const isLoading = isLoadingMember || (!!workspaceId && isLoadingSub);
  const currentPlan = (subData?.plan as PlanType) || "free";
  const pendingPlan = subData?.pendingPlan || null;
  const planConfig = PLANS[currentPlan];
  const shouldShowAds = !isLoading && !planConfig.features.removeAds;

  return {
    workspaceId,
    currentPlan,
    pendingPlan,
    planConfig,
    features: planConfig.features,
    limits: planConfig.limits,
    isProOrAgency: currentPlan === "pro" || currentPlan === "agency",
    shouldShowAds,
    isLoading,
  };
}
