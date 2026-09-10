import { n as __toESM } from "./_runtime.mjs";
import { t as supabase } from "./_ssr/supabase-CzmrzPTc.mjs";
import { a as useQueryClient, n as useMutation, r as useQuery, s as require_react, t as useInfiniteQuery } from "./_libs/react+tanstack__react-query.mjs";
import { b as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "./_libs/react.mjs";
import { N as LoaderCircle, Q as Check, S as Plus, V as Globe, X as CircleAlert, Z as ChevronDown, b as Search, g as SlidersHorizontal, h as Sparkles, m as Star, r as X, u as TrendingUp } from "./_libs/lucide-react.mjs";
import { t as BRAND_SELECT_FIELDS } from "./_ssr/constants-GxBJ0Kj6.mjs";
import { t as useMonetization } from "./_ssr/useMonetization-Dm9pnDla.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { t as BrandProfileModal } from "./_ssr/BrandProfileModal-GPUaURq_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_dashboard.discover-7QJ1-JDh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "/app/applet/src/components/DiscoverView.tsx";
function DiscoverView({ userId, onStartOutreach }) {
	const queryClient = useQueryClient();
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const [debouncedSearch, setDebouncedSearch] = (0, import_react.useState)("");
	const [isFilterOpen, setIsFilterOpen] = (0, import_react.useState)(false);
	const [selectedBrand, setSelectedBrand] = (0, import_react.useState)(null);
	const [activeFilters, setActiveFilters] = (0, import_react.useState)({
		industry: [],
		country: [],
		company_stage: [],
		budget_potential: []
	});
	const [sortOption, setSortOption] = (0, import_react.useState)("best_match");
	(0, import_react.useEffect)(() => {
		const t = setTimeout(() => setDebouncedSearch(searchTerm.trim()), 400);
		return () => clearTimeout(t);
	}, [searchTerm]);
	const { workspaceId } = useMonetization(userId);
	const savedIds = useQuery({
		queryKey: ["saved_brands_ids", workspaceId],
		enabled: !!workspaceId,
		queryFn: async () => {
			const { data, error } = await supabase.from("saved_brands").select("brand_id").eq("workspace_id", workspaceId);
			if (error) throw error;
			return new Set(data.map((d) => d.brand_id));
		}
	}).data || /* @__PURE__ */ new Set();
	const fetchBrands = async ({ pageParam = 0 }) => {
		const pageSize = 12;
		let q = supabase.from("brands").select(BRAND_SELECT_FIELDS, { count: "exact" });
		if (debouncedSearch) q = q.or(`company_name.ilike.%${debouncedSearch}%,industry.ilike.%${debouncedSearch}%,country.ilike.%${debouncedSearch}%`);
		if (activeFilters.industry.length > 0) q = q.in("industry", activeFilters.industry);
		if (activeFilters.country.length > 0) q = q.in("country", activeFilters.country);
		if (activeFilters.company_stage.length > 0) q = q.in("company_stage", activeFilters.company_stage);
		if (activeFilters.budget_potential.length > 0) q = q.in("budget_potential", activeFilters.budget_potential);
		switch (sortOption) {
			case "lead_score":
				q = q.order("lead_score", {
					ascending: false,
					nullsFirst: false
				});
				break;
			case "creator_fit":
				q = q.order("influencer_fit_score", {
					ascending: false,
					nullsFirst: false
				});
				break;
			case "recent":
				q = q.order("updated_at", { ascending: false });
				break;
			case "az":
				q = q.order("company_name", { ascending: true });
				break;
			default: q = q.order("lead_score", {
				ascending: false,
				nullsFirst: false
			}).order("influencer_fit_score", {
				ascending: false,
				nullsFirst: false
			});
		}
		q = q.range(pageParam * pageSize, (pageParam + 1) * pageSize - 1);
		const { data, error, count } = await q;
		if (error) throw error;
		return {
			brands: data,
			totalCount: count || 0,
			nextPage: data.length === pageSize ? pageParam + 1 : void 0
		};
	};
	const { data: brandsData, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading: isBrandsLoading, isError: isBrandsError } = useInfiniteQuery({
		queryKey: [
			"brands",
			debouncedSearch,
			activeFilters,
			sortOption
		],
		queryFn: fetchBrands,
		initialPageParam: 0,
		getNextPageParam: (lastPage) => lastPage.nextPage
	});
	const allBrands = brandsData?.pages.flatMap((page) => page.brands) || [];
	const totalCount = brandsData?.pages[0]?.totalCount || 0;
	const saveMutation = useMutation({
		mutationFn: async (brandId) => {
			if (!workspaceId) throw new Error("No workspace found");
			if (savedIds.has(brandId)) {
				const { error } = await supabase.from("saved_brands").delete().match({
					workspace_id: workspaceId,
					brand_id: brandId
				});
				if (error) throw error;
				return {
					action: "unsaved",
					brandId
				};
			} else {
				const { error } = await supabase.from("saved_brands").insert({
					workspace_id: workspaceId,
					brand_id: brandId,
					status: "Saved"
				});
				if (error) throw error;
				return {
					action: "saved",
					brandId
				};
			}
		},
		onSuccess: (result) => {
			if (result.action === "saved") toast.success("Brand saved to Outreach pipeline");
			else toast.success("Brand removed from pipeline");
			queryClient.invalidateQueries({ queryKey: ["saved_brands_ids"] });
			queryClient.invalidateQueries({ queryKey: ["saved_brands_query"] });
			queryClient.invalidateQueries({ queryKey: ["outreach"] });
		},
		onError: (err) => {
			toast.error(err.message || "Could not update saved status");
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
			budget_potential: []
		});
	};
	const activeFiltersCount = Object.values(activeFilters).reduce((acc, curr) => acc + curr.length, 0);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex flex-col gap-6 lg:gap-8 pb-12 animate-in fade-in duration-500 h-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-3xl lg:text-4xl font-bold tracking-tight text-foreground",
					children: "Discover Brands"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 267,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-muted-foreground text-lg max-w-2xl",
					children: "Find brands that could be a strong fit for your next collaboration."
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 270,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 266,
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
										lineNumber: 279,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
										type: "text",
										placeholder: "Search brands, industries, products...",
										value: searchTerm,
										onChange: (e) => setSearchTerm(e.target.value),
										className: "w-full pl-10 pr-4 py-3 bg-transparent border-none focus:ring-0 text-base placeholder:text-muted-foreground"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 280,
										columnNumber: 13
									}, this),
									searchTerm && /* @__PURE__ */ (void 0)("button", {
										onClick: () => setSearchTerm(""),
										className: "absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted",
										children: /* @__PURE__ */ (void 0)(X, { size: 16 }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 292,
											columnNumber: 17
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 288,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 278,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "hidden sm:block w-px h-8 bg-border" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 297,
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
											lineNumber: 310,
											columnNumber: 15
										}, this),
										"Filters",
										activeFiltersCount > 0 && /* @__PURE__ */ (void 0)("span", {
											className: "ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] text-white",
											children: activeFiltersCount
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 313,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 300,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "relative group flex-1 sm:flex-none",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
										value: sortOption,
										onChange: (e) => setSortOption(e.target.value),
										className: "w-full sm:w-auto appearance-none bg-muted/50 text-foreground text-sm font-semibold px-4 py-2.5 pr-10 rounded-xl cursor-pointer hover:bg-muted transition-colors border-none focus:ring-2 focus:ring-brand",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
												value: "best_match",
												children: "Best Match"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 325,
												columnNumber: 17
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
												value: "lead_score",
												children: "Highest Lead Score"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 326,
												columnNumber: 17
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
												value: "creator_fit",
												children: "Highest Creator Fit"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 327,
												columnNumber: 17
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
												value: "recent",
												children: "Recently Verified"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 328,
												columnNumber: 17
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
												value: "az",
												children: "Company A–Z"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 329,
												columnNumber: 17
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 320,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, { className: "absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none group-hover:text-foreground" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 331,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 319,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 299,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 277,
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
								lineNumber: 340,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("button", {
								onClick: clearFilters,
								className: "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
								children: "Clear all"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 341,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 339,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",
							children: Object.entries({
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
								company_stage: [
									"Startup",
									"Growing",
									"Established",
									"Enterprise"
								],
								budget_potential: [
									"Very High",
									"High",
									"Medium",
									"Low",
									"Unknown"
								]
							}).map(([category, options]) => /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h4", {
								className: "text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3",
								children: category.replace("_", " ")
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 353,
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
													lineNumber: 373,
													columnNumber: 31
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 367,
												columnNumber: 27
											}, this),
											/* @__PURE__ */ (void 0)("span", {
												className: `text-sm ${isActive ? "text-foreground font-medium" : "text-muted-foreground"}`,
												children: option
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 376,
												columnNumber: 27
											}, this),
											/* @__PURE__ */ (void 0)("input", {
												type: "checkbox",
												className: "hidden",
												checked: isActive,
												onChange: () => toggleFilter(category, option)
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 381,
												columnNumber: 27
											}, this)
										]
									}, option, true, {
										fileName: _jsxFileName$1,
										lineNumber: 363,
										columnNumber: 25
									}, this);
								})
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 356,
								columnNumber: 19
							}, this)] }, category, true, {
								fileName: _jsxFileName$1,
								lineNumber: 352,
								columnNumber: 17
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 349,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 338,
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
								lineNumber: 405,
								columnNumber: 13
							}, this),
							Object.entries(activeFilters).map(([category, values]) => values.map((val) => /* @__PURE__ */ (void 0)("span", {
								className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/80 text-xs font-medium text-foreground border border-border/50",
								children: [val, /* @__PURE__ */ (void 0)("button", {
									onClick: () => toggleFilter(category, val),
									className: "text-muted-foreground hover:text-foreground",
									children: /* @__PURE__ */ (void 0)(X, { size: 12 }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 421,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 415,
									columnNumber: 19
								}, this)]
							}, `${category}-${val}`, true, {
								fileName: _jsxFileName$1,
								lineNumber: 410,
								columnNumber: 17
							}, this))),
							/* @__PURE__ */ (void 0)("button", {
								onClick: clearFilters,
								className: "text-xs font-medium text-brand hover:underline ml-2",
								children: "Clear all"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 426,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 404,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 276,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between px-1",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-sm font-medium text-muted-foreground",
					children: isBrandsLoading ? "Searching..." : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [totalCount === 1 ? "1 brand" : `${totalCount} brands`, " found"] }, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 442,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 438,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 437,
				columnNumber: 7
			}, this),
			isBrandsError ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col items-center justify-center text-center p-12 bg-destructive/5 border border-destructive/20 rounded-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleAlert, { className: "w-12 h-12 text-destructive mb-4" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 450,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-xl font-bold mb-2",
						children: "We couldn't load brands"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 451,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-muted-foreground max-w-sm mb-6",
						children: "Something went wrong while loading opportunities. Please check your connection and try again."
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 452,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => queryClient.invalidateQueries({ queryKey: ["brands"] }),
						className: "px-6 py-2.5 bg-background border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors",
						children: "Try again"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 456,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 449,
				columnNumber: 9
			}, this) : isBrandsLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
				children: [...Array(8)].map((_, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-3xl border border-border/50 bg-card p-6 h-[320px] animate-pulse flex flex-col justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-7 w-2/3 bg-muted rounded-lg mb-4" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 473,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-5 w-1/3 bg-muted rounded-md mb-2" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 474,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-5 w-1/2 bg-muted rounded-md" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 475,
							columnNumber: 17
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 472,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-11 w-full bg-muted rounded-xl mt-6" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 477,
						columnNumber: 15
					}, this)]
				}, i, true, {
					fileName: _jsxFileName$1,
					lineNumber: 468,
					columnNumber: 13
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 466,
				columnNumber: 9
			}, this) : allBrands.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col items-center justify-center text-center p-16 bg-card border border-border/60 rounded-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "w-20 h-20 rounded-3xl bg-muted/50 flex items-center justify-center mb-6 border border-border/50 shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "w-10 h-10 text-muted-foreground" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 484,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 483,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-2xl font-bold mb-3",
						children: debouncedSearch || activeFiltersCount > 0 ? "No brands found" : "No brands yet"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 486,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-muted-foreground max-w-md mb-8 text-lg",
						children: debouncedSearch || activeFiltersCount > 0 ? "Try changing your search or removing some filters to see more opportunities." : "Branzly hasn't added any brand opportunities to your instance yet. New opportunities will appear here once the database is populated."
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 491,
						columnNumber: 11
					}, this),
					(debouncedSearch || activeFiltersCount > 0) && /* @__PURE__ */ (void 0)("button", {
						onClick: () => {
							setSearchTerm("");
							clearFilters();
						},
						className: "px-6 py-3 bg-brand text-brand-foreground rounded-xl text-sm font-semibold hover:bg-brand/90 transition-colors shadow-sm",
						children: "Clear search & filters"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 497,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 482,
				columnNumber: 9
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6",
				children: allBrands.map((brand) => {
					const isSaved = savedIds.has(brand.id);
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
							onClick: () => setSelectedBrand(brand),
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex justify-between items-start mb-4 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
										className: "text-xl font-bold text-foreground leading-tight line-clamp-2",
										children: brand.company_name
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 533,
										columnNumber: 23
									}, this), brand.lead_score != null && /* @__PURE__ */ (void 0)("div", {
										className: "flex items-center gap-1 bg-muted text-foreground px-2.5 py-1 rounded-full text-xs font-bold border border-border/50 shrink-0",
										title: "Lead Score",
										children: [/* @__PURE__ */ (void 0)(TrendingUp, { className: "w-3 h-3 text-muted-foreground" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 541,
											columnNumber: 27
										}, this), brand.lead_score]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 537,
										columnNumber: 25
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 532,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex flex-wrap gap-2 mb-4",
									children: [brand.industry && /* @__PURE__ */ (void 0)("span", {
										className: "px-2.5 py-1 bg-muted/50 text-muted-foreground border border-border/50 rounded-lg text-xs font-medium",
										children: brand.industry
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 549,
										columnNumber: 25
									}, this), brand.country && /* @__PURE__ */ (void 0)("span", {
										className: "flex items-center gap-1 px-2.5 py-1 bg-muted/50 text-muted-foreground border border-border/50 rounded-lg text-xs font-medium",
										children: [/* @__PURE__ */ (void 0)(Globe, { className: "w-3 h-3" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 555,
											columnNumber: 27
										}, this), brand.country]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 554,
										columnNumber: 25
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 547,
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
											lineNumber: 574,
											columnNumber: 27
										}, this), signal.text]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 563,
										columnNumber: 25
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 562,
									columnNumber: 23
								}, this),
								brand.influencer_fit_score != null && /* @__PURE__ */ (void 0)("div", {
									className: "mt-auto mb-6",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center justify-between text-xs text-muted-foreground mb-2",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "font-semibold text-foreground flex items-center gap-1",
											children: [/* @__PURE__ */ (void 0)(Star, { className: "w-3 h-3 text-brand" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 584,
												columnNumber: 29
											}, this), " Creator Fit"]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 583,
											columnNumber: 27
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "font-bold text-foreground",
											children: [brand.influencer_fit_score, "/100"]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 586,
											columnNumber: 27
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 582,
										columnNumber: 25
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "h-1.5 w-full bg-muted rounded-full overflow-hidden",
										children: /* @__PURE__ */ (void 0)("div", {
											className: "h-full bg-brand transition-all duration-1000",
											style: { width: `${brand.influencer_fit_score}%` }
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 591,
											columnNumber: 27
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 590,
										columnNumber: 25
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 581,
									columnNumber: 23
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-auto pt-2",
									onClick: (e) => e.stopPropagation(),
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										disabled: saveMutation.isPending && saveMutation.variables === brand.id,
										onClick: () => saveMutation.mutate(brand.id),
										className: `w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200
                          ${isSaved ? "bg-muted text-foreground border border-border/50 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 group/btn" : "bg-brand text-brand-foreground hover:bg-brand/90 shadow-sm hover:shadow-md"}
                        `,
										children: saveMutation.isPending && saveMutation.variables === brand.id ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "w-4 h-4 animate-spin" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 619,
											columnNumber: 27
										}, this) : isSaved ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "w-4 h-4 group-hover/btn:hidden" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 622,
												columnNumber: 29
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "w-4 h-4 hidden group-hover/btn:block" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 623,
												columnNumber: 29
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "group-hover/btn:hidden",
												children: "Saved"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 624,
												columnNumber: 29
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "hidden group-hover/btn:block",
												children: "Remove"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 627,
												columnNumber: 29
											}, this)
										] }, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 621,
											columnNumber: 27
										}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "w-4 h-4" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 633,
											columnNumber: 29
										}, this), "Save Brand"] }, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 632,
											columnNumber: 27
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 603,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 599,
									columnNumber: 21
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 528,
							columnNumber: 19
						}, this)
					}, brand.id, false, {
						fileName: _jsxFileName$1,
						lineNumber: 524,
						columnNumber: 17
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 510,
				columnNumber: 11
			}, this), hasNextPage && /* @__PURE__ */ (void 0)("div", {
				className: "flex justify-center mt-8",
				children: /* @__PURE__ */ (void 0)("button", {
					onClick: () => fetchNextPage(),
					disabled: isFetchingNextPage,
					className: "flex items-center gap-2 px-8 py-3 bg-muted text-foreground rounded-xl text-sm font-semibold hover:bg-muted/80 transition-colors border border-border/50 shadow-sm disabled:opacity-50",
					children: isFetchingNextPage ? /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(LoaderCircle, { className: "w-4 h-4 animate-spin" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 654,
						columnNumber: 21
					}, this), "Loading more..."] }, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 653,
						columnNumber: 19
					}, this) : "Load More Brands"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 647,
					columnNumber: 15
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 646,
				columnNumber: 13
			}, this)] }, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 509,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BrandProfileModal, {
				brand: selectedBrand,
				isOpen: !!selectedBrand,
				onClose: () => setSelectedBrand(null),
				isSaved: selectedBrand ? savedIds.has(selectedBrand.id) : false,
				isSaving: selectedBrand ? saveMutation.isPending && saveMutation.variables === selectedBrand.id : false,
				onSave: () => selectedBrand && saveMutation.mutate(selectedBrand.id),
				onStartOutreach: () => {
					if (selectedBrand && onStartOutreach) {
						setSelectedBrand(null);
						onStartOutreach(selectedBrand.id);
					}
				}
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 667,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 264,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/_dashboard.discover.tsx?tsr-split=component";
function DiscoverPage() {
	const [userId, setUserId] = (0, import_react.useState)(null);
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) setUserId(data.session.user.id);
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DiscoverView, {
		userId,
		onStartOutreach: (brandId) => navigate({
			to: "/contacted",
			search: { brandId }
		})
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 17,
		columnNumber: 10
	}, this);
}
//#endregion
export { DiscoverPage as component };
