import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-CzmrzPTc.mjs";
import { t as PLANS } from "./ssr.mjs";
import { s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as useMonetization } from "./useMonetization-B-HRUEIg.mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { Z as Check, at as ArrowLeft, et as Building2, i as User, n as X } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pricing-BtkCUwCQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/pricing.tsx?tsr-split=component";
function PricingPage() {
	const [billingInterval, setBillingInterval] = (0, import_react.useState)("yearly");
	const [viewMode, setViewMode] = (0, import_react.useState)("account");
	const [userId, setUserId] = (0, import_react.useState)(null);
	const { currentPlan, workspaceId, workspaceType, isLoading, planConfig } = useMonetization(userId);
	const [upgrading, setUpgrading] = (0, import_react.useState)(null);
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		async function init() {
			const { data: session } = await supabase.auth.getSession();
			if (session?.session) setUserId(session.session.user.id);
		}
		init();
	}, []);
	const handleUpgrade = async (plan) => {
		if (!userId || !workspaceId) {
			toast.error("Please sign in to upgrade");
			navigate({ to: "/auth" });
			return;
		}
		if (currentPlan === plan) {
			toast.info("You are already on this plan");
			return;
		}
		const selectedPlanConfig = PLANS[plan];
		if (selectedPlanConfig.accountType !== "all" && workspaceType && selectedPlanConfig.accountType !== workspaceType) {
			toast.error(`Account mismatch: You are trying to purchase a ${selectedPlanConfig.accountType} plan on a ${workspaceType} workspace. Please create a new workspace or contact support to change your account type.`);
			return;
		}
		setUpgrading(plan);
		try {
			const data = await (await fetch("/api/checkout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					planId: plan,
					workspaceId,
					interval: billingInterval
				})
			})).json();
			if (data.url) window.location.href = data.url;
			else throw new Error(data.error || "Failed to start checkout");
		} catch (err) {
			console.error("Upgrade checkout error:", err);
			toast.error(err.message || "Failed to initiate checkout. Please try again.");
			setUpgrading(null);
		}
	};
	let displayedPlans = Object.values(PLANS);
	if (viewMode === "account" && workspaceType) {
		if (workspaceType === "creator") displayedPlans = displayedPlans.filter((p) => p.accountType === "creator" || p.type === "free");
		else if (workspaceType === "agency") displayedPlans = displayedPlans.filter((p) => p.accountType === "agency" || p.type === "free");
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-background pt-8 pb-12 px-4 sm:px-6 lg:px-8",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-7xl mx-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mb-6 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => {
							if (window.history.length > 2) window.history.back();
							else navigate({ to: "/settings" });
						},
						className: "flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "w-4 h-4 mr-2" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 98,
							columnNumber: 13
						}, this), "Back"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 89,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => setViewMode((prev) => prev === "all" ? "account" : "all"),
						className: "text-sm font-medium text-brand hover:underline",
						children: viewMode === "all" ? "View My Plans" : "View All Plans"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 102,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 88,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-center max-w-3xl mx-auto mb-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
							className: "text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl mb-4",
							children: "Simple, transparent pricing"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 108,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xl text-muted-foreground",
							children: "Find the perfect plan for your business."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 111,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-8 flex justify-center",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "bg-muted p-1 rounded-xl inline-flex relative",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									onClick: () => setBillingInterval("monthly"),
									className: `relative z-10 px-6 py-2.5 text-sm font-bold rounded-lg transition-all ${billingInterval === "monthly" ? "text-foreground shadow-sm bg-background" : "text-muted-foreground hover:text-foreground"}`,
									children: "Monthly"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 117,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									onClick: () => setBillingInterval("yearly"),
									className: `relative z-10 px-6 py-2.5 text-sm font-bold rounded-lg transition-all flex items-center gap-2 ${billingInterval === "yearly" ? "text-foreground shadow-sm bg-background" : "text-muted-foreground hover:text-foreground"}`,
									children: ["Yearly", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "bg-green-500/10 text-green-600 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold",
										children: "Save 16%"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 122,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 120,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 116,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 115,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 107,
					columnNumber: 9
				}, this),
				isLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex justify-center items-center py-20",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 131,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 130,
					columnNumber: 22
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: `grid grid-cols-1 md:grid-cols-${Math.min(displayedPlans.length, 3)} lg:grid-cols-${displayedPlans.length} gap-6 items-stretch justify-center`,
					children: displayedPlans.map((plan) => {
						const isCurrentPlan = currentPlan === plan.type;
						const isPro = plan.type.includes("pro");
						const isAgency = plan.accountType === "agency";
						const price = billingInterval === "yearly" ? plan.priceYearly : plan.priceMonthly;
						const formattedPrice = new Intl.NumberFormat("en-IN", {
							style: "currency",
							currency: "INR",
							maximumFractionDigits: 0
						}).format(price);
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: `bg-card rounded-3xl border-2 p-6 flex flex-col h-full transition-all duration-200
                    ${isCurrentPlan ? "border-brand shadow-lg shadow-brand/10 relative z-10 scale-105" : "border-border/50 hover:border-border"}
                  `,
							children: [
								isCurrentPlan && /* @__PURE__ */ (void 0)("div", {
									className: "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand text-brand-foreground px-4 py-1 rounded-full text-sm font-bold shadow-sm",
									children: "Current Plan"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 146,
									columnNumber: 37
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-3 mb-4",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: `p-2 rounded-xl ${isCurrentPlan ? "bg-brand/10 text-brand" : "bg-muted text-muted-foreground"}`,
										children: isAgency ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Building2, { className: "w-5 h-5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 152,
											columnNumber: 35
										}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(User, { className: "w-5 h-5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 152,
											columnNumber: 71
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 151,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
										className: "text-xl font-bold text-foreground",
										children: plan.name
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 154,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 150,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mb-6",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-baseline gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-3xl font-extrabold text-foreground",
											children: price === 0 ? "Free" : formattedPrice
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 161,
											columnNumber: 23
										}, this), price > 0 && /* @__PURE__ */ (void 0)("span", {
											className: "text-muted-foreground font-medium",
											children: ["/", billingInterval === "yearly" ? "yr" : "mo"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 164,
											columnNumber: 37
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 160,
										columnNumber: 21
									}, this), billingInterval === "yearly" && price > 0 && /* @__PURE__ */ (void 0)("p", {
										className: "text-sm text-green-600 font-medium mt-1",
										children: "2 months free messaging"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 168,
										columnNumber: 67
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 159,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-4 mb-8 flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Feature, {
											included: true,
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "font-semibold",
												children: plan.limits.daily_brand_leads === "unlimited" ? "Unlimited" : plan.limits.daily_brand_leads
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 173,
												columnNumber: 23
											}, this), " brand leads/day"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 172,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Feature, {
											included: true,
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "font-semibold",
												children: plan.limits.daily_brand_searches === "unlimited" ? "Unlimited" : plan.limits.daily_brand_searches
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 176,
												columnNumber: 23
											}, this), " searches/day"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 175,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Feature, {
											included: true,
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "font-semibold",
												children: plan.limits.saved_brand_limit === "unlimited" ? "Unlimited" : plan.limits.saved_brand_limit
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 179,
												columnNumber: 23
											}, this), " saved brands"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 178,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Feature, {
											included: true,
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "font-semibold",
												children: plan.limits.monthly_contact_reveals
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 182,
												columnNumber: 23
											}, this), " contact reveals/mo"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 181,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Feature, {
											included: true,
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "font-semibold",
													children: plan.limits.team_seats
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 185,
													columnNumber: 23
												}, this),
												" team seat",
												plan.limits.team_seats > 1 ? "s" : ""
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 184,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-px bg-border/50 my-4" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 188,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Feature, {
											included: plan.features.advanced_filters,
											children: "Advanced filters"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 190,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Feature, {
											included: plan.features.full_brand_intelligence,
											children: "Full Brand Intelligence"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 191,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Feature, {
											included: plan.features.product_intelligence,
											children: "Product, Funding, & Marketing Intelligence"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 192,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Feature, {
											included: plan.features.outreach_tracker === "full",
											children: "Full Outreach Tracker"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 193,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Feature, {
											included: plan.features.csv_export !== "none",
											children: plan.features.csv_export === "custom" ? "Custom CSV exports" : "CSV exports"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 194,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Feature, {
											included: plan.features.new_brand_alerts,
											children: "In-app brand alerts"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 197,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Feature, {
											included: plan.features.shared_workspace_crm,
											children: "Shared Workspace CRM"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 198,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Feature, {
											included: plan.features.whitelabel_reporting,
											children: "Whitelabel reporting"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 199,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Feature, {
											included: plan.features.dedicated_account_manager,
											children: "Dedicated Account Manager"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 200,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Feature, {
											included: plan.features.support_level === "priority",
											children: "Priority support"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 201,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Feature, {
											included: !plan.features.ads_enabled,
											children: "Ad-free experience"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 202,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 171,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									onClick: () => handleUpgrade(plan.type),
									disabled: isCurrentPlan || upgrading === plan.type || plan.type === "free",
									className: `w-full py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2
                      ${isCurrentPlan ? "bg-muted text-muted-foreground cursor-default" : isPro || isAgency ? "bg-brand text-brand-foreground hover:bg-brand/90 shadow-sm" : plan.type === "free" ? "bg-muted text-muted-foreground cursor-not-allowed" : "bg-foreground text-background hover:bg-foreground/90 shadow-sm"}
                    `,
									children: upgrading === plan.type ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 209,
											columnNumber: 25
										}, this), "Processing..."]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 208,
										columnNumber: 48
									}, this) : isCurrentPlan ? "Current Plan" : plan.type === "free" ? "Free Tier" : "Upgrade to " + plan.name
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 205,
									columnNumber: 19
								}, this)
							]
						}, plan.type, true, {
							fileName: _jsxFileName,
							lineNumber: 143,
							columnNumber: 18
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 132,
					columnNumber: 20
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 87,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 86,
		columnNumber: 10
	}, this);
}
function Feature({ children, included }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: `flex items-start gap-3 ${included ? "text-foreground" : "text-muted-foreground opacity-60"}`,
		children: [included ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "w-5 h-5 text-green-500 shrink-0" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 227,
			columnNumber: 19
		}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "w-5 h-5 shrink-0" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 227,
			columnNumber: 75
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "text-sm",
			children
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 228,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 226,
		columnNumber: 10
	}, this);
}
//#endregion
export { PricingPage as component };
