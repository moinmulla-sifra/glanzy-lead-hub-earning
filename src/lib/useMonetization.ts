import { useQuery } from "@tanstack/react-query";
import { supabase } from "./supabase";
import { PLANS, type PlanType } from "./monetization";
import { useEffect, useState } from "react";

export function useMonetization(userId: string | null) {
  const { data: memberData } = useQuery({
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

  const { data: subData } = useQuery({
    queryKey: ["subscription", workspaceId],
    enabled: !!workspaceId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("subscriptions")
        .select("plan")
        .eq("workspace_id", workspaceId!)
        .maybeSingle();

      return data || { plan: "free" };
    },
  });

  const currentPlan = (subData?.plan as PlanType) || "free";
  const planConfig = PLANS[currentPlan];

  return {
    workspaceId,
    currentPlan,
    planConfig,
    features: planConfig.features,
    limits: planConfig.limits,
    isProOrAgency: currentPlan === "pro" || currentPlan === "agency",
  };
}
