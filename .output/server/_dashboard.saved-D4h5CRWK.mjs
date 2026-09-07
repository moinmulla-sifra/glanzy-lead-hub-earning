import { n as __toESM } from "./_runtime.mjs";
import { t as supabase } from "./_ssr/supabase-BEO93jmY.mjs";
import { a as useQueryClient, n as useMutation, r as useQuery, s as require_react, t as useInfiniteQuery } from "./_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "./_libs/react.mjs";
import { D as Check, E as ChevronDown, O as Calendar, S as Globe, b as LoaderCircle, c as SlidersHorizontal, d as Search, i as Trash2, o as Star, s as Sparkles, t as X, u as Send } from "./_libs/lucide-react.mjs";
import { g as Link, v as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { t as BrandProfileModal } from "./_ssr/BrandProfileModal-D1ZK3FLE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_dashboard.saved-D4h5CRWK.js
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
	const workspaceId = useQuery({
		queryKey: ["workspaces", userId],
		enabled: !!userId,
		queryFn: async () => {
			const { data, error } = await supabase.from("workspace_members").select("workspace_id").eq("user_id", userId);
			if (error) throw error;
			return data.map((d) => d.workspace_id);
		}
	}).data?.[0];
	const fetchSavedBrands = async ({ pageParam = 0 }) => {
		if (!workspaceId) throw new Error("No workspace found");
		const pageSize = 12;
		let q = supabase.from("saved_brands").select(`
        *,
        brand:brand_id!inner (*)
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
					lineNumber: 306,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-muted-foreground text-lg max-w-2xl",
					children: "Keep track of the brands you want to explore or contact."
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 309,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 305,
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
										lineNumber: 318,
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
										lineNumber: 319,
										columnNumber: 13
									}, this),
									searchTerm && /* @__PURE__ */ (void 0)("button", {
										onClick: () => setSearchTerm(""),
										className: "absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted",
										children: /* @__PURE__ */ (void 0)(X, { size: 16 }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 331,
											columnNumber: 17
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 327,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 317,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "hidden sm:block w-px h-8 bg-border" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 336,
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
											lineNumber: 349,
											columnNumber: 15
										}, this),
										"Filters",
										activeFiltersCount > 0 && /* @__PURE__ */ (void 0)("span", {
											className: "ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] text-white",
											children: activeFiltersCount
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 352,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 339,
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
												lineNumber: 364,
												columnNumber: 17
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
												value: "recently_updated",
												children: "Recently Updated"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 365,
												columnNumber: 17
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
												value: "creator_fit",
												children: "Highest Creator Fit"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 366,
												columnNumber: 17
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
												value: "lead_score",
												children: "Highest Lead Score"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 367,
												columnNumber: 17
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
												value: "az",
												children: "Company A–Z"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 368,
												columnNumber: 17
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 359,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, { className: "absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none group-hover:text-foreground" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 370,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 358,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 338,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 316,
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
								lineNumber: 379,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("button", {
								onClick: clearFilters,
								className: "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
								children: "Clear all"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 380,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 378,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
							children: Object.entries(filterOptions).map(([category, options]) => /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h4", {
								className: "text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3",
								children: category.replace("_", " ")
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 391,
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
													lineNumber: 416,
													columnNumber: 31
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 406,
												columnNumber: 27
											}, this),
											/* @__PURE__ */ (void 0)("span", {
												className: `text-sm ${isActive ? "text-foreground font-medium" : "text-muted-foreground"}`,
												children: option
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 419,
												columnNumber: 27
											}, this),
											/* @__PURE__ */ (void 0)("input", {
												type: "checkbox",
												className: "hidden",
												checked: isActive,
												onChange: () => toggleFilter(category, option)
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 428,
												columnNumber: 27
											}, this)
										]
									}, option, true, {
										fileName: _jsxFileName$1,
										lineNumber: 402,
										columnNumber: 25
									}, this);
								})
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 394,
								columnNumber: 19
							}, this)] }, category, true, {
								fileName: _jsxFileName$1,
								lineNumber: 390,
								columnNumber: 17
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 388,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 377,
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
								lineNumber: 452,
								columnNumber: 13
							}, this),
							Object.entries(activeFilters).map(([category, values]) => values.map((val) => /* @__PURE__ */ (void 0)("span", {
								className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/80 text-xs font-medium text-foreground border border-border/50",
								children: [val, /* @__PURE__ */ (void 0)("button", {
									onClick: () => toggleFilter(category, val),
									className: "text-muted-foreground hover:text-foreground",
									children: /* @__PURE__ */ (void 0)(X, { size: 12 }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 468,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 462,
									columnNumber: 19
								}, this)]
							}, `${category}-${val}`, true, {
								fileName: _jsxFileName$1,
								lineNumber: 457,
								columnNumber: 17
							}, this))),
							/* @__PURE__ */ (void 0)("button", {
								onClick: clearFilters,
								className: "text-xs font-medium text-brand hover:underline ml-2",
								children: "Clear all"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 473,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 451,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 315,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between px-1",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-sm font-medium text-muted-foreground",
					children: isSavedLoading ? "Loading..." : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: totalCount === 1 ? "1 saved brand" : `${totalCount} saved brands` }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 489,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 485,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 484,
				columnNumber: 7
			}, this),
			isSavedError ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col items-center justify-center text-center p-12 bg-destructive/5 border border-destructive/20 rounded-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "w-12 h-12 text-destructive mb-4" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 497,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-xl font-bold mb-2",
						children: "Couldn't load saved brands"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 498,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-muted-foreground max-w-sm mb-6",
						children: "Something went wrong while loading your saved opportunities."
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 499,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => queryClient.invalidateQueries({ queryKey: ["saved_brands_query"] }),
						className: "px-6 py-2.5 bg-background border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors",
						children: "Try again"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 502,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 496,
				columnNumber: 9
			}, this) : isSavedLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6",
				children: [...Array(4)].map((_, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-3xl border border-border/50 bg-card p-6 h-[320px] animate-pulse flex flex-col justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-7 w-2/3 bg-muted rounded-lg mb-4" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 521,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-5 w-1/3 bg-muted rounded-md mb-2" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 522,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-5 w-1/2 bg-muted rounded-md" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 523,
							columnNumber: 17
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 520,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex gap-2 mt-6",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-11 w-full bg-muted rounded-xl" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 526,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-11 w-full bg-muted rounded-xl" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 527,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 525,
						columnNumber: 15
					}, this)]
				}, i, true, {
					fileName: _jsxFileName$1,
					lineNumber: 516,
					columnNumber: 13
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 514,
				columnNumber: 9
			}, this) : totalCount === 0 && !debouncedSearch && activeFiltersCount === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col items-center justify-center text-center p-16 bg-card border border-border/60 rounded-3xl h-[50vh]",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "w-20 h-20 rounded-3xl bg-muted/50 flex items-center justify-center mb-6 border border-border/50 shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Star, { className: "w-10 h-10 text-muted-foreground" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 535,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 534,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-2xl font-bold mb-3",
						children: "No saved brands yet"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 537,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-muted-foreground max-w-md mb-8 text-lg",
						children: "Save interesting brands from Discover and they'll appear here."
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 538,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/discover",
						className: "px-6 py-3 bg-brand text-brand-foreground rounded-xl text-sm font-semibold hover:bg-brand/90 transition-colors shadow-sm",
						children: "Discover Brands"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 541,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 533,
				columnNumber: 9
			}, this) : allSavedBrands.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col items-center justify-center text-center p-16 bg-card border border-border/60 rounded-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "w-20 h-20 rounded-3xl bg-muted/50 flex items-center justify-center mb-6 border border-border/50 shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "w-10 h-10 text-muted-foreground" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 551,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 550,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-2xl font-bold mb-3",
						children: "No saved brands found"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 553,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-muted-foreground max-w-md mb-8 text-lg",
						children: "Try another search or clear your filters to see your saved brands."
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 554,
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
						lineNumber: 557,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 549,
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
										lineNumber: 593,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: `flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider border shrink-0 ${getStatusColor(savedRecord.status)}`,
										children: savedRecord.status
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 596,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 592,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex flex-wrap gap-2 mb-4",
									children: [brand.industry && /* @__PURE__ */ (void 0)("span", {
										className: "px-2.5 py-1 bg-muted/50 text-muted-foreground border border-border/50 rounded-lg text-xs font-medium",
										children: brand.industry
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 607,
										columnNumber: 25
									}, this), brand.country && /* @__PURE__ */ (void 0)("span", {
										className: "flex items-center gap-1 px-2.5 py-1 bg-muted/50 text-muted-foreground border border-border/50 rounded-lg text-xs font-medium",
										children: [/* @__PURE__ */ (void 0)(Globe, { className: "w-3 h-3" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 613,
											columnNumber: 27
										}, this), brand.country]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 612,
										columnNumber: 25
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 605,
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
											lineNumber: 632,
											columnNumber: 27
										}, this), signal.text]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 621,
										columnNumber: 25
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 620,
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
												lineNumber: 643,
												columnNumber: 31
											}, this), " Creator Fit"]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 642,
											columnNumber: 29
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "font-bold text-foreground",
											children: [brand.influencer_fit_score, "/100"]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 646,
											columnNumber: 29
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 641,
										columnNumber: 27
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "h-1.5 w-full bg-muted rounded-full overflow-hidden",
										children: /* @__PURE__ */ (void 0)("div", {
											className: "h-full bg-brand transition-all duration-1000",
											style: { width: `${brand.influencer_fit_score}%` }
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 651,
											columnNumber: 29
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 650,
										columnNumber: 27
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 640,
										columnNumber: 25
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-1 text-[11px] text-muted-foreground mt-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Calendar, { className: "w-3 h-3" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 661,
												columnNumber: 25
											}, this),
											"Saved on",
											" ",
											new Date(savedRecord.created_at).toLocaleDateString()
										]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 660,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 638,
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
											lineNumber: 682,
											columnNumber: 27
										}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "w-4 h-4" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 684,
											columnNumber: 27
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 671,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										onClick: () => {
											if (onStartOutreach) onStartOutreach(brand.id);
										},
										className: "flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-brand text-brand-foreground rounded-xl text-sm font-semibold hover:bg-brand/90 transition-all shadow-sm",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Send, { className: "w-4 h-4" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 695,
											columnNumber: 25
										}, this), "Start Outreach"]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 687,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 667,
									columnNumber: 21
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 588,
							columnNumber: 19
						}, this)
					}, savedRecord.id, false, {
						fileName: _jsxFileName$1,
						lineNumber: 584,
						columnNumber: 17
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 569,
				columnNumber: 11
			}, this), hasNextPage && /* @__PURE__ */ (void 0)("div", {
				className: "flex justify-center mt-8",
				children: /* @__PURE__ */ (void 0)("button", {
					onClick: () => fetchNextPage(),
					disabled: isFetchingNextPage,
					className: "flex items-center gap-2 px-8 py-3 bg-muted text-foreground rounded-xl text-sm font-semibold hover:bg-muted/80 transition-colors border border-border/50 shadow-sm disabled:opacity-50",
					children: isFetchingNextPage ? /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(LoaderCircle, { className: "w-4 h-4 animate-spin" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 714,
						columnNumber: 21
					}, this), "Loading more..."] }, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 713,
						columnNumber: 19
					}, this) : "Load More Brands"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 707,
					columnNumber: 15
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 706,
				columnNumber: 13
			}, this)] }, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 568,
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
				onStartOutreach: () => {
					if (selectedSavedBrand && onStartOutreach) {
						setSelectedSavedBrand(null);
						onStartOutreach(selectedSavedBrand.brand.id);
					}
				}
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 727,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 303,
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
