import { t as supabase } from "./supabase-BEO93jmY.mjs";
import { r as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { t as PLANS } from "./monetization-mD78bnGP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useMonetization-C8GPMWTs.js
function useMonetization(userId) {
	const { data: memberData } = useQuery({
		queryKey: ["workspace_member", userId],
		enabled: !!userId,
		queryFn: async () => {
			const { data, error } = await supabase.from("workspace_members").select("workspace_id").eq("user_id", userId).limit(1).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
	const workspaceId = memberData?.workspace_id;
	const { data: subData } = useQuery({
		queryKey: ["subscription", workspaceId],
		enabled: !!workspaceId,
		queryFn: async () => {
			const { data, error } = await supabase.from("subscriptions").select("plan").eq("workspace_id", workspaceId).maybeSingle();
			return data || { plan: "free" };
		}
	});
	const currentPlan = subData?.plan || "free";
	const planConfig = PLANS[currentPlan];
	return {
		workspaceId,
		currentPlan,
		planConfig,
		features: planConfig.features,
		limits: planConfig.limits,
		isProOrAgency: currentPlan === "pro" || currentPlan === "agency"
	};
}
//#endregion
export { useMonetization as t };
