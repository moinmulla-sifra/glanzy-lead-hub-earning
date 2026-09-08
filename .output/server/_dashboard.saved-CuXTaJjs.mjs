import { n as __toESM } from "./_runtime.mjs";
import { t as supabase } from "./_ssr/supabase-CzmrzPTc.mjs";
import { a as useQueryClient, n as useMutation, s as require_react, t as useInfiniteQuery } from "./_libs/react+tanstack__react-query.mjs";
import { b as useNavigate, y as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "./_libs/react.mjs";
import { G as Calendar, H as ChevronDown, N as Globe, O as LoaderCircle, U as Check, _ as Search, d as Star, f as Sparkles, g as Send, l as Trash2, n as X, p as SlidersHorizontal } from "./_libs/lucide-react.mjs";
import { t as useMonetization } from "./_ssr/useMonetization-Dm9pnDla.mjs";
import { t as BRAND_SELECT_FIELDS } from "./_ssr/constants-GxBJ0Kj6.mjs";
import { t as startResearchJob } from "./_ssr/actions-CRa6Zpbw.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { t as BrandProfileModal } from "./_ssr/BrandProfileModal-xLj4NLEh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_dashboard.saved-CuXTaJjs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "/app/applet/src/components/SavedView.tsx";
function SavedView({ userId, onStartOutreach }) {
	const queryClient = useQueryClient();
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const [debouncedSearch, setDebouncedSearch] = (0, import_react.useState)("");
	const [isFilterOpen, setIsFilterOpen] = (0, import_react.useState)(false);
	const [selectedSavedBrand, setSelectedSavedBrand] = (0, import_react.useState)(null);
	const [activeFilters, setActiveFilters] = (0, import_react.useState)({
		industry: [],
		country: [],
		company_stage: [],
		budget_potential: [],
		status: []
	});
	const [sortOption, setSortOption] = (0, import_react.useState)("recently_saved");
	(0, import_react.useEffect)(() => {
		const t = setTimeout(() => setDebouncedSearch(searchTerm.trim()), 400);
		return () => clearTimeout(t);
	}, [searchTerm]);
	const { workspaceId } = useMonetization(userId);
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
	const fetchSavedBrands = async ({ pageParam = 0 }) => {
		if (!workspaceId) throw new Error("No workspace found");
		const pageSize = 12;
		let q = supabase.from("saved_brands").select(`
        *,
        brand:brand_id!inner (${BRAND_SELECT_FIELDS})
      `, { count: "exact" }).eq("workspace_id", workspaceId);
		if (activeFilters.status.length > 0) q = q.in("status", activeFilters.status);
		if (activeFilters.industry.length > 0) q = q.in("brand.industry", activeFilters.industry);
		if (activeFilters.country.length > 0) q = q.in("brand.country", activeFilters.country);
		if (activeFilters.company_stage.length > 0) q = q.in("brand.company_stage", activeFilters.company_stage);
		if (activeFilters.budget_potential.length > 0) q = q.in("brand.budget_potential", activeFilters.budget_potential);
		if (debouncedSearch) q = q.or(`company_name.ilike.%${debouncedSearch}%,industry.ilike.%${debouncedSearch}%,country.ilike.%${debouncedSearch}%`, { foreignTable: "brand" });
		switch (sortOption) {
			case "recently_saved":
				q = q.order("created_at", { ascending: false });
				break;
			case "recently_updated":
				q = q.order("updated_at", { ascending: false });
				break;
			case "creator_fit":
				q = q.order("influencer_fit_score", {
					foreignTable: "brand",
					ascending: false,
					nullsFirst: false
				});
				break;
			case "lead_score":
				q = q.order("lead_score", {
					foreignTable: "brand",
					ascending: false,
					nullsFirst: false
				});
				break;
			case "az":
				q = q.order("company_name", {
					foreignTable: "brand",
					ascending: true
				});
				break;
			default: q = q.order("created_at", { ascending: false });
		}
		q = q.range(pageParam * pageSize, (pageParam + 1) * pageSize - 1);
		const { data, error, count } = await q;
		if (error) {
			console.error(error);
			throw error;
		}
		return {
			savedBrands: data,
			totalCount: count || 0,
			nextPage: data.length === pageSize ? pageParam + 1 : void 0
		};
	};
	const { data: savedBrandsData, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading: isSavedLoading, isError: isSavedError } = useInfiniteQuery({
		queryKey: [
			"saved_brands_query",
			workspaceId,
			debouncedSearch,
			activeFilters,
			sortOption
		],
		queryFn: fetchSavedBrands,
		enabled: !!workspaceId,
		initialPageParam: 0,
		getNextPageParam: (lastPage) => lastPage.nextPage
	});
	const allSavedBrands = savedBrandsData?.pages.flatMap((page) => page.savedBrands) || [];
	const totalCount = savedBrandsData?.pages[0]?.totalCount || 0;
	const removeMutation = useMutation({
		mutationFn: async (savedId) => {
			const { error } = await supabase.from("saved_brands").delete().eq("id", savedId);
			if (error) throw error;
			return savedId;
		},
		onSuccess: () => {
			toast.success("Brand removed from Saved");
			queryClient.invalidateQueries({ queryKey: ["saved_brands_ids"] });
			queryClient.invalidateQueries({ queryKey: ["saved_brands_query"] });
			queryClient.invalidateQueries({ queryKey: ["outreach"] });
		},
		onError: (err) => {
			toast.error(err.message || "Could not remove brand");
		}
	});
	const toggleFilter = (category, value) => {
		setActiveFilters((prev) => {
			const current = prev[category];
			if (current.includes(value)) return {
				...prev,
				[category]: current.filter((v) => v !== value)
			};
			else return {
				...prev,
				[category]: [...current, value]
			};
		});
	};
	const clearFilters = () => {
		setActiveFilters({
			industry: [],
			country: [],
			company_stage: [],
			budget_potential: [],
			status: []
		});
	};
	const activeFiltersCount = Object.values(activeFilters).reduce((acc, curr) => acc + curr.length, 0);
	const filterOptions = {
		industry: [
			"Beauty",
			"Fashion",
			"Tech",
			"Food & Beverage",
			"Health",
			"Fitness",
			"SaaS",
			"E-commerce"
		],
		country: [
			"United States",
			"United Kingdom",
			"Canada",
			"Australia",
			"India",
			"Germany"
		],
		status: [
			"Saved",
			"Contacted",
			"Replied",
			"Interested",
			"Meeting",
			"Won",
			"Lost"
		]
	};
	const getStatusColor = (status) => {
		switch (status) {
			case "Won": return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20";
			case "Lost": return "bg-destructive/10 text-destructive border-destructive/20";
			case "Contacted":
			case "Replied":
			case "Interested":
			case "Meeting": return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
			default: return "bg-muted/50 text-muted-foreground border-border/50";
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex flex-col gap-6 lg:gap-8 pb-12 animate-in fade-in duration-500 h-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-3xl lg:text-4xl font-bold tracking-tight text-foreground",
					children: "Saved Brands"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 311,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-muted-foreground text-lg max-w-2xl",
					children: "Keep track of the brands you want to explore or contact."
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 314,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 310,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-col sm:flex-row gap-3 items-center bg-card p-2 rounded-2xl border border-border/60 shadow-sm subtle-shadow",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "relative w-full",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 323,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
										type: "text",
										placeholder: "Search saved brands...",
										value: searchTerm,
										onChange: (e) => setSearchTerm(e.target.value),
										className: "w-full pl-10 pr-4 py-3 bg-transparent border-none focus:ring-0 text-base placeholder:text-muted-foreground"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 324,
										columnNumber: 13
									}, this),
									searchTerm && /* @__PURE__ */ (void 0)("button", {
										onClick: () => setSearchTerm(""),
										className: "absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted",
										children: /* @__PURE__ */ (void 0)(X, { size: 16 }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 336,
											columnNumber: 17
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 332,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 322,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "hidden sm:block w-px h-8 bg-border" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 341,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2 w-full sm:w-auto px-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									onClick: () => setIsFilterOpen(!isFilterOpen),
									className: `flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors
                ${isFilterOpen || activeFiltersCount > 0 ? "bg-brand/10 text-brand" : "bg-muted/50 text-foreground hover:bg-muted"}
              `,
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SlidersHorizontal, { className: "w-4 h-4" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 354,
											columnNumber: 15
										}, this),
										"Filters",
										activeFiltersCount > 0 && /* @__PURE__ */ (void 0)("span", {
											className: "ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] text-white",
											children: activeFiltersCount
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 357,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 344,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "relative group flex-1 sm:flex-none",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
										value: sortOption,
										onChange: (e) => setSortOption(e.target.value),
										className: "w-full sm:w-auto appearance-none bg-muted/50 text-foreground text-sm font-semibold px-4 py-2.5 pr-10 rounded-xl cursor-pointer hover:bg-muted transition-colors border-none focus:ring-2 focus:ring-brand",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
												value: "recently_saved",
												children: "Recently Saved"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 369,
												columnNumber: 17
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
												value: "recently_updated",
												children: "Recently Updated"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 370,
												columnNumber: 17
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
												value: "creator_fit",
												children: "Highest Creator Fit"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 371,
												columnNumber: 17
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
												value: "lead_score",
												children: "Highest Lead Score"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 372,
												columnNumber: 17
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
												value: "az",
												children: "Company A–Z"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 373,
												columnNumber: 17
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 364,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, { className: "absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none group-hover:text-foreground" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 375,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 363,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 343,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 321,
						columnNumber: 9
					}, this),
					isFilterOpen && /* @__PURE__ */ (void 0)("div", {
						className: "bg-card border border-border/60 rounded-2xl p-6 shadow-sm animate-in slide-in-from-top-2 duration-200",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center justify-between mb-6",
							children: [/* @__PURE__ */ (void 0)("h3", {
								className: "font-bold text-foreground",
								children: "Advanced Filters"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 384,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("button", {
								onClick: clearFilters,
								className: "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
								children: "Clear all"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 385,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 383,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
							children: Object.entries(filterOptions).map(([category, options]) => /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h4", {
								className: "text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3",
								children: category.replace("_", " ")
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 396,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar",
								children: options.map((option) => {
									const isActive = activeFilters[category].includes(option);
									return /* @__PURE__ */ (void 0)("label", {
										className: "flex items-center gap-3 cursor-pointer group",
										children: [
											/* @__PURE__ */ (void 0)("div", {
												className: `w-4 h-4 rounded border flex items-center justify-center transition-colors
                            ${isActive ? "bg-brand border-brand" : "border-input group-hover:border-brand/50"}
                          `,
												children: isActive && /* @__PURE__ */ (void 0)(Check, { className: "w-3 h-3 text-white" }, void 0, false, {
													fileName: _jsxFileName$1,
													lineNumber: 421,
													columnNumber: 31
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 411,
												columnNumber: 27
											}, this),
											/* @__PURE__ */ (void 0)("span", {
												className: `text-sm ${isActive ? "text-foreground font-medium" : "text-muted-foreground"}`,
												children: option
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 424,
												columnNumber: 27
											}, this),
											/* @__PURE__ */ (void 0)("input", {
												type: "checkbox",
												className: "hidden",
												checked: isActive,
												onChange: () => toggleFilter(category, option)
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 433,
												columnNumber: 27
											}, this)
										]
									}, option, true, {
										fileName: _jsxFileName$1,
										lineNumber: 407,
										columnNumber: 25
									}, this);
								})
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 399,
								columnNumber: 19
							}, this)] }, category, true, {
								fileName: _jsxFileName$1,
								lineNumber: 395,
								columnNumber: 17
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 393,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 382,
						columnNumber: 11
					}, this),
					activeFiltersCount > 0 && !isFilterOpen && /* @__PURE__ */ (void 0)("div", {
						className: "flex flex-wrap items-center gap-2 px-1",
						children: [
							/* @__PURE__ */ (void 0)("span", {
								className: "text-sm text-muted-foreground mr-2",
								children: "Active filters:"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 457,
								columnNumber: 13
							}, this),
							Object.entries(activeFilters).map(([category, values]) => values.map((val) => /* @__PURE__ */ (void 0)("span", {
								className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/80 text-xs font-medium text-foreground border border-border/50",
								children: [val, /* @__PURE__ */ (void 0)("button", {
									onClick: () => toggleFilter(category, val),
									className: "text-muted-foreground hover:text-foreground",
									children: /* @__PURE__ */ (void 0)(X, { size: 12 }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 473,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 467,
									columnNumber: 19
								}, this)]
							}, `${category}-${val}`, true, {
								fileName: _jsxFileName$1,
								lineNumber: 462,
								columnNumber: 17
							}, this))),
							/* @__PURE__ */ (void 0)("button", {
								onClick: clearFilters,
								className: "text-xs font-medium text-brand hover:underline ml-2",
								children: "Clear all"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 478,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 456,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 320,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between px-1",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-sm font-medium text-muted-foreground",
					children: isSavedLoading ? "Loading..." : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: totalCount === 1 ? "1 saved brand" : `${totalCount} saved brands` }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 494,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 490,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 489,
				columnNumber: 7
			}, this),
			isSavedError ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col items-center justify-center text-center p-12 bg-destructive/5 border border-destructive/20 rounded-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "w-12 h-12 text-destructive mb-4" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 506,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-xl font-bold mb-2",
						children: "Couldn't load saved brands"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 507,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-muted-foreground max-w-sm mb-6",
						children: "Something went wrong while loading your saved opportunities."
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 508,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => queryClient.invalidateQueries({ queryKey: ["saved_brands_query"] }),
						className: "px-6 py-2.5 bg-background border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors",
						children: "Try again"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 511,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 505,
				columnNumber: 9
			}, this) : isSavedLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6",
				children: [...Array(4)].map((_, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-3xl border border-border/50 bg-card p-6 h-[320px] animate-pulse flex flex-col justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-7 w-2/3 bg-muted rounded-lg mb-4" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 530,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-5 w-1/3 bg-muted rounded-md mb-2" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 531,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-5 w-1/2 bg-muted rounded-md" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 532,
							columnNumber: 17
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 529,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex gap-2 mt-6",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-11 w-full bg-muted rounded-xl" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 535,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-11 w-full bg-muted rounded-xl" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 536,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 534,
						columnNumber: 15
					}, this)]
				}, i, true, {
					fileName: _jsxFileName$1,
					lineNumber: 525,
					columnNumber: 13
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 523,
				columnNumber: 9
			}, this) : totalCount === 0 && !debouncedSearch && activeFiltersCount === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col items-center justify-center text-center p-16 bg-card border border-border/60 rounded-3xl h-[50vh]",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "w-20 h-20 rounded-3xl bg-muted/50 flex items-center justify-center mb-6 border border-border/50 shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Star, { className: "w-10 h-10 text-muted-foreground" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 544,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 543,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-2xl font-bold mb-3",
						children: "No saved brands yet"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 546,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-muted-foreground max-w-md mb-8 text-lg",
						children: "Save interesting brands from Discover and they'll appear here."
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 547,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/discover",
						className: "px-6 py-3 bg-brand text-brand-foreground rounded-xl text-sm font-semibold hover:bg-brand/90 transition-colors shadow-sm",
						children: "Discover Brands"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 550,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 542,
				columnNumber: 9
			}, this) : allSavedBrands.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col items-center justify-center text-center p-16 bg-card border border-border/60 rounded-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "w-20 h-20 rounded-3xl bg-muted/50 flex items-center justify-center mb-6 border border-border/50 shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "w-10 h-10 text-muted-foreground" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 560,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 559,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-2xl font-bold mb-3",
						children: "No saved brands found"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 562,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-muted-foreground max-w-md mb-8 text-lg",
						children: "Try another search or clear your filters to see your saved brands."
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 563,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => {
							setSearchTerm("");
							clearFilters();
						},
						className: "px-6 py-3 bg-brand text-brand-foreground rounded-xl text-sm font-semibold hover:bg-brand/90 transition-colors shadow-sm",
						children: "Clear search & filters"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 566,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 558,
				columnNumber: 9
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6",
				children: allSavedBrands.map((savedRecord) => {
					const brand = savedRecord.brand;
					if (!brand) return null;
					let signal = null;
					if (brand.recent_funding) signal = {
						text: "Recent Funding",
						type: "success"
					};
					else if (brand.recent_launch) signal = {
						text: "Recent Launch",
						type: "info"
					};
					else if (brand.existing_creator_activity) signal = {
						text: "Active with Creators",
						type: "warning"
					};
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "group flex flex-col bg-card rounded-3xl border border-border/60 hover:border-brand/40 overflow-hidden subtle-shadow transition-all hover:-translate-y-1 duration-300",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "p-6 flex-1 flex flex-col cursor-pointer",
							onClick: () => setSelectedSavedBrand(savedRecord),
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex justify-between items-start mb-4 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
										className: "text-xl font-bold text-foreground leading-tight line-clamp-2",
										children: brand.company_name
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 602,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: `flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider border shrink-0 ${getStatusColor(savedRecord.status)}`,
										children: savedRecord.status
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 605,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 601,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex flex-wrap gap-2 mb-4",
									children: [brand.industry && /* @__PURE__ */ (void 0)("span", {
										className: "px-2.5 py-1 bg-muted/50 text-muted-foreground border border-border/50 rounded-lg text-xs font-medium",
										children: brand.industry
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 616,
										columnNumber: 25
									}, this), brand.country && /* @__PURE__ */ (void 0)("span", {
										className: "flex items-center gap-1 px-2.5 py-1 bg-muted/50 text-muted-foreground border border-border/50 rounded-lg text-xs font-medium",
										children: [/* @__PURE__ */ (void 0)(Globe, { className: "w-3 h-3" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 622,
											columnNumber: 27
										}, this), brand.country]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 621,
										columnNumber: 25
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 614,
									columnNumber: 21
								}, this),
								signal && /* @__PURE__ */ (void 0)("div", {
									className: "mb-4",
									children: /* @__PURE__ */ (void 0)("span", {
										className: `inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md
                          ${signal.type === "success" ? "bg-green-500/10 text-green-600 dark:text-green-400" : signal.type === "info" ? "bg-blue-500/10 text-blue-600 dark:text-blue-400" : "bg-orange-500/10 text-orange-600 dark:text-orange-400"}
                        `,
										children: [/* @__PURE__ */ (void 0)(Sparkles, { className: "w-3 h-3" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 641,
											columnNumber: 27
										}, this), signal.text]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 630,
										columnNumber: 25
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 629,
									columnNumber: 23
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-auto mb-6 flex flex-col gap-2",
									children: [brand.influencer_fit_score != null && /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center justify-between text-xs text-muted-foreground mb-1.5",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "font-semibold text-foreground flex items-center gap-1",
											children: [/* @__PURE__ */ (void 0)(Star, { className: "w-3 h-3 text-brand" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 652,
												columnNumber: 31
											}, this), " Creator Fit"]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 651,
											columnNumber: 29
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "font-bold text-foreground",
											children: [brand.influencer_fit_score, "/100"]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 655,
											columnNumber: 29
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 650,
										columnNumber: 27
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "h-1.5 w-full bg-muted rounded-full overflow-hidden",
										children: /* @__PURE__ */ (void 0)("div", {
											className: "h-full bg-brand transition-all duration-1000",
											style: { width: `${brand.influencer_fit_score}%` }
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 660,
											columnNumber: 29
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 659,
										columnNumber: 27
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 649,
										columnNumber: 25
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-1 text-[11px] text-muted-foreground mt-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Calendar, { className: "w-3 h-3" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 670,
												columnNumber: 25
											}, this),
											"Saved on",
											" ",
											new Date(savedRecord.created_at).toLocaleDateString()
										]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 669,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 647,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-auto pt-4 border-t border-border/50 flex gap-2",
									onClick: (e) => e.stopPropagation(),
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										disabled: removeMutation.isPending && removeMutation.variables === savedRecord.id,
										onClick: () => removeMutation.mutate(savedRecord.id),
										className: "flex items-center justify-center p-3 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors",
										title: "Remove from Saved",
										children: removeMutation.isPending && removeMutation.variables === savedRecord.id ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "w-4 h-4 animate-spin" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 691,
											columnNumber: 27
										}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "w-4 h-4" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 693,
											columnNumber: 27
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 680,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										onClick: () => {
											if (onStartOutreach) onStartOutreach(brand.id);
										},
										className: "flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-brand text-brand-foreground rounded-xl text-sm font-semibold hover:bg-brand/90 transition-all shadow-sm",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Send, { className: "w-4 h-4" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 704,
											columnNumber: 25
										}, this), "Start Outreach"]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 696,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 676,
									columnNumber: 21
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 597,
							columnNumber: 19
						}, this)
					}, savedRecord.id, false, {
						fileName: _jsxFileName$1,
						lineNumber: 593,
						columnNumber: 17
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 578,
				columnNumber: 11
			}, this), hasNextPage && /* @__PURE__ */ (void 0)("div", {
				className: "flex justify-center mt-8",
				children: /* @__PURE__ */ (void 0)("button", {
					onClick: () => fetchNextPage(),
					disabled: isFetchingNextPage,
					className: "flex items-center gap-2 px-8 py-3 bg-muted text-foreground rounded-xl text-sm font-semibold hover:bg-muted/80 transition-colors border border-border/50 shadow-sm disabled:opacity-50",
					children: isFetchingNextPage ? /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(LoaderCircle, { className: "w-4 h-4 animate-spin" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 723,
						columnNumber: 21
					}, this), "Loading more..."] }, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 722,
						columnNumber: 19
					}, this) : "Load More Brands"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 716,
					columnNumber: 15
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 715,
				columnNumber: 13
			}, this)] }, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 577,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BrandProfileModal, {
				brand: selectedSavedBrand?.brand || null,
				isOpen: !!selectedSavedBrand,
				onClose: () => setSelectedSavedBrand(null),
				isSaved: true,
				isSaving: selectedSavedBrand ? removeMutation.isPending && removeMutation.variables === selectedSavedBrand.id : false,
				onSave: () => {
					if (selectedSavedBrand) {
						removeMutation.mutate(selectedSavedBrand.id);
						setSelectedSavedBrand(null);
					}
				},
				isRefreshing: refreshResearchMutation.isPending,
				onRefreshResearch: () => selectedSavedBrand?.brand && refreshResearchMutation.mutate(selectedSavedBrand.brand),
				onStartOutreach: () => {
					if (selectedSavedBrand && onStartOutreach) {
						setSelectedSavedBrand(null);
						onStartOutreach(selectedSavedBrand.brand.id);
					}
				}
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 736,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 308,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/_dashboard.saved.tsx?tsr-split=component";
function SavedPage() {
	const [userId, setUserId] = (0, import_react.useState)(null);
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) setUserId(data.session.user.id);
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SavedView, {
		userId,
		onStartOutreach: (brandId) => navigate({
			to: "/outreach",
			search: { brandId }
		})
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 17,
		columnNumber: 10
	}, this);
}
//#endregion
export { SavedPage as component };
