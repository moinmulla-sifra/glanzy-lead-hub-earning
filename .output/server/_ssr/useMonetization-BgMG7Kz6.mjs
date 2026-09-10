import { t as supabase } from "./supabase-CzmrzPTc.mjs";
import { t as PLANS } from "./monetization-mD78bnGP.mjs";
import { r as useQuery } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useMonetization-BgMG7Kz6.js
function useMonetization(userId) {
	const { data: memberData, isLoading: isLoadingMember } = useQuery({
		queryKey: ["workspace_member", userId],
		enabled: !!userId,
		queryFn: async () => {
			const { data, error } = await supabase.from("workspace_members").select("workspace_id").eq("user_id", userId).limit(1).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
	const workspaceId = memberData?.workspace_id;
	const { data: subData, isLoading: isLoadingSub } = useQuery({
		queryKey: ["subscription_data", workspaceId],
		enabled: !!workspaceId,
		queryFn: async () => {
			const { data: legacySub } = await supabase.from("subscriptions").select("plan").eq("workspace_id", workspaceId).maybeSingle();
			const { data: approvedReq } = await supabase.from("subscription_requests").select("requested_plan").eq("workspace_id", workspaceId).eq("status", "approved").order("reviewed_at", { ascending: false }).limit(1).maybeSingle();
			const { data: pendingReq } = await supabase.from("subscription_requests").select("requested_plan").eq("workspace_id", workspaceId).eq("status", "pending").order("requested_at", { ascending: false }).limit(1).maybeSingle();
			return {
				plan: approvedReq?.requested_plan ? approvedReq.requested_plan : legacySub?.plan || "free",
				pendingPlan: pendingReq ? pendingReq.requested_plan : null
			};
		}
	});
	const isLoading = isLoadingMember || !!workspaceId && isLoadingSub;
	const currentPlan = subData?.plan || "free";
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
		isLoading
	};
}
//#endregion
export { useMonetization as t };
