import { t as supabase } from "./supabase-CzmrzPTc.mjs";
import { t as PLANS } from "./ssr.mjs";
import { r as useQuery } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useMonetization-B-HRUEIg.js
function useMonetization(userId) {
	const { data: memberData, isLoading: isLoadingMember } = useQuery({
		queryKey: ["workspace_member", userId],
		enabled: !!userId,
		queryFn: async () => {
			const { data, error } = await supabase.from("workspace_members").select("workspace_id, workspaces(type)").eq("user_id", userId).limit(1).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
	const workspaceId = memberData?.workspace_id;
	const workspaceType = (memberData?.workspaces)?.type || "creator";
	const { data: subData, isLoading: isLoadingSub } = useQuery({
		queryKey: ["subscription_data", workspaceId],
		enabled: !!workspaceId,
		queryFn: async () => {
			const { data: sub } = await supabase.from("subscriptions").select("plan, status").eq("workspace_id", workspaceId).eq("status", "active").maybeSingle();
			let plan = sub?.plan || "free";
			if (plan === "pro") plan = "creator_pro";
			if (plan === "agency") plan = "agency_pro";
			if (!PLANS[plan]) plan = "free";
			return {
				plan,
				status: sub?.status || "inactive"
			};
		}
	});
	const isLoading = isLoadingMember || !!workspaceId && isLoadingSub;
	const currentPlan = subData?.plan || "free";
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
		isLoading
	};
}
//#endregion
export { useMonetization as t };
