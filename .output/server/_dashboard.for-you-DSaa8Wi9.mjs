import { n as __toESM } from "./_runtime.mjs";
import { t as supabase } from "./_ssr/supabase-CzmrzPTc.mjs";
import { a as useQueryClient, n as useMutation, r as useQuery, s as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { y as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "./_libs/react.mjs";
import { c as TrendingUp, d as Star, f as Sparkles, q as Bookmark } from "./_libs/lucide-react.mjs";
import { t as useMonetization } from "./_ssr/useMonetization-Dm9pnDla.mjs";
import { t as BRAND_SELECT_FIELDS } from "./_ssr/constants-GxBJ0Kj6.mjs";
import { t as startResearchJob } from "./_ssr/actions-DfyIGH8y.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { t as BrandProfileModal } from "./_ssr/BrandProfileModal-BlmSgtkx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_dashboard.for-you-DSaa8Wi9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "/app/applet/src/components/ForYouView.tsx";
function ForYouView({ userId }) {
	const queryClient = useQueryClient();
	const [selectedBrand, setSelectedBrand] = (0, import_react.useState)(null);
	const [savedBrandIds, setSavedBrandIds] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const profileQuery = useQuery({
		queryKey: ["profile", userId],
		enabled: !!userId,
		queryFn: async () => {
			const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();
			if (error) throw error;
			return data;
		}
	});
	const { workspaceId } = useMonetization(userId);
	useQuery({
		queryKey: ["saved_brands_set", workspaceId],
		enabled: !!workspaceId,
		queryFn: async () => {
			const { data, error } = await supabase.from("saved_brands").select("brand_id").eq("workspace_id", workspaceId);
			if (error) throw error;
			const ids = new Set(data.map((d) => d.brand_id));
			setSavedBrandIds(ids);
			return ids;
		}
	});
	const outreachQuery = useQuery({
		queryKey: ["outreach_exclusion", workspaceId],
		enabled: !!workspaceId,
		queryFn: async () => {
			const { data, error } = await supabase.from("outreach").select("brand_id, status").eq("workspace_id", workspaceId).in("status", ["Won", "Lost"]);
			if (error) throw error;
			return new Set(data.map((d) => d.brand_id));
		}
	});
	const refreshResearchMutation = useMutation({
		mutationFn: async (brand) => {
			if (!workspaceId || !userId) throw new Error("Missing context");
			const { data: { session } } = await supabase.auth.getSession();
			const token = session?.access_token || "";
			return await startResearchJob({ data: {
				workspaceId,
				userId,
				type: "refresh",
				query: {
					url: brand.website || brand.domain,
					keywords: [brand.company_name]
				},
				provider: "tinyfish",
				token
			} });
		},
		onSuccess: () => {
			toast.success("Research started in background. Results will appear shortly.");
		},
		onError: (err) => toast.error(err.message || "Failed to start research")
	});
	const brandsQuery = useQuery({
		queryKey: ["foryou_brands"],
		enabled: !!profileQuery.data,
		queryFn: async () => {
			const { data, error } = await supabase.from("brands").select(BRAND_SELECT_FIELDS).limit(100).order("influencer_fit_score", {
				ascending: false,
				nullsFirst: false
			});
			if (error) throw error;
			return data;
		}
	});
	const toggleSaveMutation = useMutation({
		mutationFn: async ({ brandId, isSaved }) => {
			if (!workspaceId) throw new Error("No workspace selected");
			if (isSaved) {
				const { error } = await supabase.from("saved_brands").delete().eq("workspace_id", workspaceId).eq("brand_id", brandId);
				if (error) throw error;
			} else {
				const { error } = await supabase.from("saved_brands").insert({
					workspace_id: workspaceId,
					brand_id: brandId
				});
				if (error) throw error;
			}
		},
		onSuccess: (_, variables) => {
			setSavedBrandIds((prev) => {
				const next = new Set(prev);
				if (variables.isSaved) next.delete(variables.brandId);
				else next.add(variables.brandId);
				return next;
			});
			toast.success(variables.isSaved ? "Removed from Saved" : "Added to Saved");
			queryClient.invalidateQueries({ queryKey: ["saved_brands_set"] });
			queryClient.invalidateQueries({ queryKey: ["saved_brands"] });
		},
		onError: (err) => toast.error(err.message || "Failed to update saved status")
	});
	const recommendations = (0, import_react.useMemo)(() => {
		if (!profileQuery.data || !brandsQuery.data) return [];
		const profile = profileQuery.data;
		const excludeIds = outreachQuery.data || /* @__PURE__ */ new Set();
		const scored = [];
		for (const brand of brandsQuery.data) {
			if (excludeIds.has(brand.id)) continue;
			let score = 0;
			const reasons = [];
			const userNiche = profile.niche || profile.primary_niche;
			if (userNiche && brand.industry) {
				if (brand.industry.toLowerCase().includes(userNiche.toLowerCase()) || userNiche.toLowerCase().includes(brand.industry.toLowerCase())) {
					score += 40;
					reasons.push(`Strong match for your ${userNiche} niche`);
				} else if (brand.industry === "General") score += 10;
			}
			if (profile.country && brand.country && profile.country === brand.country) {
				score += 20;
				reasons.push("Based in your country");
			}
			if (brand.influencer_fit_score && brand.influencer_fit_score > 75) {
				score += brand.influencer_fit_score / 2;
				reasons.push("High creator-fit score");
			}
			if (brand.recent_funding) {
				score += 15;
				reasons.push("Recently funded");
			}
			if (brand.recent_launch) {
				score += 15;
				reasons.push("Recently launched a campaign");
			}
			if (brand.lead_score) score += brand.lead_score / 10;
			if (score > 30) scored.push({
				brand,
				score,
				reasons
			});
		}
		return scored.sort((a, b) => b.score - a.score);
	}, [
		profileQuery.data,
		brandsQuery.data,
		outreachQuery.data
	]);
	const isLoading = profileQuery.isLoading || brandsQuery.isLoading;
	const isProfileIncomplete = profileQuery.isSuccess && !profileQuery.data?.niche && !profileQuery.data?.primary_niche && !profileQuery.data?.platforms?.length;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex flex-col h-full gap-6 lg:gap-8 pb-12 animate-in fade-in duration-500",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-3xl lg:text-4xl font-bold tracking-tight text-foreground flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, {
						className: "text-brand",
						size: 32
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 247,
						columnNumber: 11
					}, this), " For You"]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 246,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-muted-foreground text-lg max-w-2xl",
					children: "Brand opportunities picked for your profile and interests."
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 249,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 245,
				columnNumber: 7
			}, this),
			isLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
				children: [
					1,
					2,
					3,
					4,
					5,
					6
				].map((i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-card rounded-3xl p-6 border border-border/50 shadow-sm animate-pulse h-64" }, i, false, {
					fileName: _jsxFileName$1,
					lineNumber: 257,
					columnNumber: 13
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 255,
				columnNumber: 9
			}, this) : isProfileIncomplete ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex-1 flex flex-col items-center justify-center text-center p-16 bg-card border border-border/60 rounded-3xl subtle-shadow",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "w-20 h-20 rounded-3xl bg-brand/10 flex items-center justify-center mb-6 border border-brand/20 shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "w-10 h-10 text-brand" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 266,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 265,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-2xl font-bold mb-3 text-foreground",
						children: "Let's improve your matches"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 268,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-muted-foreground max-w-md mb-8 text-lg",
						children: "Tell us a little more about your content and we'll personalize your brand opportunities."
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 271,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/profile",
						className: "px-6 py-3 bg-brand text-brand-foreground rounded-xl text-sm font-semibold hover:bg-brand/90 transition-colors shadow-sm",
						children: "Complete Profile"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 275,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 264,
				columnNumber: 9
			}, this) : brandsQuery.data?.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex-1 flex flex-col items-center justify-center text-center p-16 bg-card border border-border/60 rounded-3xl subtle-shadow",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "text-2xl font-bold mb-3",
					children: "No opportunities yet"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 284,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-muted-foreground max-w-md text-lg",
					children: "Branzly doesn't have enough brand data to build recommendations yet."
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 285,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 283,
				columnNumber: 9
			}, this) : recommendations.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex-1 flex flex-col items-center justify-center text-center p-16 bg-card border border-border/60 rounded-3xl subtle-shadow",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-2xl font-bold mb-3",
						children: "We couldn't find a strong match yet"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 291,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-muted-foreground max-w-md mb-8 text-lg",
						children: "Try expanding your profile or checking Discover for more opportunities."
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 294,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex gap-4 justify-center",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/profile",
							className: "px-6 py-3 bg-muted text-foreground rounded-xl text-sm font-semibold hover:bg-muted/80 transition-colors shadow-sm",
							children: "Complete Profile"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 299,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/discover",
							className: "px-6 py-3 bg-brand text-brand-foreground rounded-xl text-sm font-semibold hover:bg-brand/90 transition-colors shadow-sm",
							children: "Explore Discover"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 305,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 298,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 290,
				columnNumber: 9
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col gap-10",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "text-xl font-bold mb-4 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Star, {
						className: "text-yellow-500 fill-yellow-500",
						size: 20
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 318,
						columnNumber: 15
					}, this), " Top Matches"]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 317,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
					children: recommendations.slice(0, 6).map((rec) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RecommendationCard, {
						rec,
						isSaved: savedBrandIds.has(rec.brand.id),
						onToggleSave: () => toggleSaveMutation.mutate({
							brandId: rec.brand.id,
							isSaved: savedBrandIds.has(rec.brand.id)
						}),
						onClickView: () => setSelectedBrand(rec.brand)
					}, rec.brand.id, false, {
						fileName: _jsxFileName$1,
						lineNumber: 323,
						columnNumber: 17
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 321,
					columnNumber: 13
				}, this)] }, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 316,
					columnNumber: 11
				}, this), recommendations.length > 6 && /* @__PURE__ */ (void 0)("section", { children: [/* @__PURE__ */ (void 0)("h2", {
					className: "text-xl font-bold mb-4 flex items-center gap-2",
					children: [/* @__PURE__ */ (void 0)(TrendingUp, {
						className: "text-brand",
						size: 20
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 343,
						columnNumber: 17
					}, this), " Trending For You"]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 342,
					columnNumber: 15
				}, this), /* @__PURE__ */ (void 0)("div", {
					className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
					children: recommendations.slice(6, 12).map((rec) => /* @__PURE__ */ (void 0)(RecommendationCard, {
						rec,
						isSaved: savedBrandIds.has(rec.brand.id),
						onToggleSave: () => toggleSaveMutation.mutate({
							brandId: rec.brand.id,
							isSaved: savedBrandIds.has(rec.brand.id)
						}),
						onClickView: () => setSelectedBrand(rec.brand)
					}, rec.brand.id, false, {
						fileName: _jsxFileName$1,
						lineNumber: 347,
						columnNumber: 19
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 345,
					columnNumber: 15
				}, this)] }, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 341,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 314,
				columnNumber: 9
			}, this),
			selectedBrand && workspaceId && /* @__PURE__ */ (void 0)(BrandProfileModal, {
				brand: selectedBrand,
				isOpen: true,
				onClose: () => setSelectedBrand(null),
				isSaved: savedBrandIds.has(selectedBrand.id),
				isSaving: toggleSaveMutation.isPending,
				onSave: () => toggleSaveMutation.mutate({
					brandId: selectedBrand.id,
					isSaved: savedBrandIds.has(selectedBrand.id)
				}),
				onStartOutreach: () => {},
				isRefreshing: refreshResearchMutation.isPending,
				onRefreshResearch: () => selectedBrand && refreshResearchMutation.mutate(selectedBrand)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 367,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 243,
		columnNumber: 5
	}, this);
}
function RecommendationCard({ rec, isSaved, onToggleSave, onClickView }) {
	const { brand, score, reasons } = rec;
	const matchPercentage = Math.min(99, Math.max(65, Math.floor(score)));
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "bg-card rounded-3xl border border-border/60 overflow-hidden flex flex-col subtle-shadow hover:-translate-y-1 hover:shadow-xl hover:border-brand/30 transition-all duration-300",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "p-6 flex-1 flex flex-col cursor-pointer",
			onClick: onClickView,
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex justify-between items-start mb-4 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "text-xl font-bold text-foreground leading-tight line-clamp-2",
						children: brand.company_name
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 411,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-1 bg-brand/10 text-brand px-2.5 py-1 rounded-full text-xs font-bold border border-brand/20 shrink-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Star, { className: "w-3 h-3" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 415,
								columnNumber: 13
							}, this),
							matchPercentage,
							"% Match"
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 414,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 410,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap gap-2 mb-4",
					children: [brand.industry && /* @__PURE__ */ (void 0)("span", {
						className: "px-2.5 py-1 bg-muted/50 text-muted-foreground border border-border/50 rounded-lg text-xs font-medium",
						children: brand.industry
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 422,
						columnNumber: 13
					}, this), brand.country && /* @__PURE__ */ (void 0)("span", {
						className: "px-2.5 py-1 bg-muted/50 text-muted-foreground border border-border/50 rounded-lg text-xs font-medium",
						children: brand.country
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 427,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 420,
					columnNumber: 9
				}, this),
				reasons.length > 0 && /* @__PURE__ */ (void 0)("div", {
					className: "mt-auto bg-muted/30 p-3 rounded-xl border border-border/50 space-y-2",
					children: [/* @__PURE__ */ (void 0)("p", {
						className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
						children: "Why this brand?"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 435,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("ul", {
						className: "text-sm space-y-1",
						children: reasons.slice(0, 2).map((reason, i) => /* @__PURE__ */ (void 0)("li", {
							className: "flex items-start gap-1.5 text-foreground/80",
							children: [/* @__PURE__ */ (void 0)(Check$1, {
								size: 14,
								className: "text-brand shrink-0 mt-0.5"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 444,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("span", {
								className: "line-clamp-2 leading-tight",
								children: reason
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 445,
								columnNumber: 19
							}, this)]
						}, i, true, {
							fileName: _jsxFileName$1,
							lineNumber: 440,
							columnNumber: 17
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 438,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 434,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 406,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "p-4 border-t border-border/50 bg-muted/10 flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
				onClick: (e) => {
					e.stopPropagation();
					onClickView();
				},
				className: "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-foreground text-background rounded-xl text-sm font-semibold hover:bg-foreground/90 transition-colors",
				children: "View Brand"
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 454,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
				onClick: (e) => {
					e.stopPropagation();
					onToggleSave();
				},
				className: `p-2.5 rounded-xl border transition-colors ${isSaved ? "bg-brand/10 border-brand/30 text-brand hover:bg-brand/20" : "bg-background border-border hover:bg-muted text-muted-foreground"}`,
				title: isSaved ? "Remove from Saved" : "Save Brand",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bookmark, {
					size: 20,
					className: isSaved ? "fill-brand" : ""
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 475,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 463,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 453,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 405,
		columnNumber: 5
	}, this);
}
function Check$1({ size, className }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "3",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		className,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("polyline", { points: "20 6 9 17 4 12" }, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 495,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 484,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/_dashboard.for-you.tsx?tsr-split=component";
function ForYouPage() {
	const [userId, setUserId] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) setUserId(data.session.user.id);
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ForYouView, { userId }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 15,
		columnNumber: 10
	}, this);
}
//#endregion
export { ForYouPage as component };
