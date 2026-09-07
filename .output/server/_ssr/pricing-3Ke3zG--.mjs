import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-BEO93jmY.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { G as Building2, H as Check, I as CreditCard, f as Sparkles, n as X, t as Zap } from "../_libs/lucide-react.mjs";
import { t as PLANS } from "./monetization-mD78bnGP.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pricing-3Ke3zG--.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PricingPage() {
	const [currentPlan, setCurrentPlan] = (0, import_react.useState)("free");
	const [workspaceId, setWorkspaceId] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [upgrading, setUpgrading] = (0, import_react.useState)(null);
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		async function loadPlan() {
			const { data: session } = await supabase.auth.getSession();
			if (!session?.session) {
				setLoading(false);
				return;
			}
			try {
				const { data: memberData } = await supabase.from("workspace_members").select("workspace_id").eq("user_id", session.session.user.id).limit(1).maybeSingle();
				if (memberData) {
					setWorkspaceId(memberData.workspace_id);
					const { data: subData } = await supabase.from("subscriptions").select("plan").eq("workspace_id", memberData.workspace_id).maybeSingle();
					if (subData) setCurrentPlan(subData.plan);
				}
			} catch (err) {
				console.error("Failed to load plan:", err);
			} finally {
				setLoading(false);
			}
		}
		loadPlan();
	}, []);
	const handleUpgrade = async (plan) => {
		if (!workspaceId) {
			navigate({ to: "/auth" });
			return;
		}
		setUpgrading(plan);
		try {
			const { data: existingSub } = await supabase.from("subscriptions").select("id").eq("workspace_id", workspaceId).single();
			if (existingSub) await supabase.from("subscriptions").update({
				plan,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}).eq("id", existingSub.id);
			else await supabase.from("subscriptions").insert({
				workspace_id: workspaceId,
				plan,
				status: "active"
			});
			setCurrentPlan(plan);
			toast.success(`Successfully upgraded to ${PLANS[plan].name} plan!`);
		} catch (err) {
			toast.error("Failed to process upgrade. Please try again.");
		} finally {
			setUpgrading(null);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background pt-24 pb-12 px-4 sm:px-6 lg:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center max-w-3xl mx-auto mb-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl mb-4",
					children: "Simple, transparent pricing"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xl text-muted-foreground",
					children: "Find the perfect plan for your creator business or agency. Scale as you grow."
				})]
			}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center items-center py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand" })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 md:grid-cols-3 gap-8 items-start",
				children: Object.values(PLANS).map((plan) => {
					const isCurrentPlan = currentPlan === plan.type;
					let Icon = Sparkles;
					if (plan.type === "pro") Icon = Zap;
					if (plan.type === "agency") Icon = Building2;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `bg-card rounded-3xl border-2 p-8 flex flex-col h-full transition-all duration-200
                    ${isCurrentPlan ? "border-brand shadow-lg shadow-brand/10 relative scale-105 md:-mt-4 md:mb-4 z-10" : "border-border/50 hover:border-border"}
                  `,
						children: [
							isCurrentPlan && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand text-brand-foreground px-4 py-1 rounded-full text-sm font-bold shadow-sm",
								children: "Current Plan"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `p-2 rounded-xl ${isCurrentPlan ? "bg-brand/10 text-brand" : "bg-muted text-muted-foreground"}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 24 })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-2xl font-bold",
									children: plan.name
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-4xl font-extrabold",
									children: ["$", plan.priceMonthly]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground font-medium",
									children: "/month"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-muted-foreground mb-8 min-h-[3rem]",
								children: [
									plan.type === "free" && "Perfect for getting started and exploring opportunities.",
									plan.type === "pro" && "For serious creators actively pitching and growing.",
									plan.type === "agency" && "For agencies managing multiple creators and campaigns."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => handleUpgrade(plan.type),
								disabled: isCurrentPlan || upgrading !== null,
								className: `w-full py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-200 mb-8
                      ${isCurrentPlan ? "bg-muted text-muted-foreground cursor-default" : plan.type === "pro" ? "bg-brand text-brand-foreground hover:bg-brand/90 shadow-sm" : "bg-foreground text-background hover:bg-foreground/90 shadow-sm"}
                    `,
								children: upgrading === plan.type ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "animate-pulse",
									children: "Processing..."
								}) : isCurrentPlan ? "Current Plan" : plan.priceMonthly === 0 ? "Get Started" : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { size: 18 }),
									"Upgrade to ",
									plan.name
								] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4",
										children: "Features & Limits"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FeatureItem, {
										included: true,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold",
												children: plan.limits.brandViewsPerMonth
											}),
											" ",
											"Brand Views /mo"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FeatureItem, {
										included: true,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold",
												children: plan.limits.searchesPerMonth
											}),
											" ",
											"Searches /mo"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FeatureItem, {
										included: true,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold",
												children: plan.limits.savedBrandsTotal
											}),
											" ",
											"Saved Brands"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FeatureItem, {
										included: true,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold",
												children: plan.limits.outreachActiveTotal
											}),
											" ",
											"Active Outreach"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FeatureItem, {
										included: true,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold",
												children: plan.limits.teamMembers
											}),
											" ",
											"Team Member",
											plan.limits.teamMembers > 1 ? "s" : ""
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-4 border-t border-border/50" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureItem, {
										included: plan.features.advancedDiscovery,
										children: "Advanced Discovery Filters"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureItem, {
										included: plan.features.removeAds,
										children: "Ad-Free Experience"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureItem, {
										included: plan.features.exportData,
										children: "Export Data"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureItem, {
										included: plan.features.prioritySupport,
										children: "Priority Support"
									})
								]
							})
						]
					}, plan.type);
				})
			})]
		})
	});
}
function FeatureItem({ children, included }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `flex items-start gap-3 ${included ? "text-foreground" : "text-muted-foreground opacity-60"}`,
		children: [included ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-5 h-5 text-green-500 shrink-0" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm",
			children
		})]
	});
}
//#endregion
export { PricingPage as component };
