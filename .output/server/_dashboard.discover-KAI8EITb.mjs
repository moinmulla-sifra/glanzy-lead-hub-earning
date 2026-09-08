import { n as __toESM } from "./_runtime.mjs";
import { t as supabase } from "./_ssr/supabase-BEO93jmY.mjs";
import { a as useQueryClient, n as useMutation, o as require_jsx_runtime, r as useQuery, s as require_react, t as useInfiniteQuery } from "./_libs/react+tanstack__react-query.mjs";
import { v as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { B as CircleAlert, H as Check, N as Globe, O as LoaderCircle, V as ChevronDown, _ as Search, c as TrendingUp, d as Star, f as Sparkles, n as X, p as SlidersHorizontal, y as Plus } from "./_libs/lucide-react.mjs";
import { t as useMonetization } from "./_ssr/useMonetization-C8GPMWTs.mjs";
import { t as BRAND_SELECT_FIELDS } from "./_ssr/constants-GxBJ0Kj6.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { t as BrandProfileModal } from "./_ssr/BrandProfileModal-CeOzAnEj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_dashboard.discover-KAI8EITb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6 lg:gap-8 pb-12 animate-in fade-in duration-500 h-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl lg:text-4xl font-bold tracking-tight text-foreground",
					children: "Discover Brands"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground text-lg max-w-2xl",
					children: "Find brands that could be a strong fit for your next collaboration."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row gap-3 items-center bg-card p-2 rounded-2xl border border-border/60 shadow-sm subtle-shadow",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative w-full",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										placeholder: "Search brands, industries, products...",
										value: searchTerm,
										onChange: (e) => setSearchTerm(e.target.value),
										className: "w-full pl-10 pr-4 py-3 bg-transparent border-none focus:ring-0 text-base placeholder:text-muted-foreground"
									}),
									searchTerm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setSearchTerm(""),
										className: "absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 16 })
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hidden sm:block w-px h-8 bg-border" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 w-full sm:w-auto px-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setIsFilterOpen(!isFilterOpen),
									className: `flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors
                ${isFilterOpen || activeFiltersCount > 0 ? "bg-brand/10 text-brand" : "bg-muted/50 text-foreground hover:bg-muted"}
              `,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "w-4 h-4" }),
										"Filters",
										activeFiltersCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] text-white",
											children: activeFiltersCount
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative group flex-1 sm:flex-none",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: sortOption,
										onChange: (e) => setSortOption(e.target.value),
										className: "w-full sm:w-auto appearance-none bg-muted/50 text-foreground text-sm font-semibold px-4 py-2.5 pr-10 rounded-xl cursor-pointer hover:bg-muted transition-colors border-none focus:ring-2 focus:ring-brand",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "best_match",
												children: "Best Match"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "lead_score",
												children: "Highest Lead Score"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "creator_fit",
												children: "Highest Creator Fit"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "recent",
												children: "Recently Verified"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "az",
												children: "Company A–Z"
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none group-hover:text-foreground" })]
								})]
							})
						]
					}),
					isFilterOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-card border border-border/60 rounded-2xl p-6 shadow-sm animate-in slide-in-from-top-2 duration-200",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-foreground",
								children: "Advanced Filters"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: clearFilters,
								className: "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
								children: "Clear all"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
							}).map(([category, options]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3",
								children: category.replace("_", " ")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar",
								children: options.map((option) => {
									const isActive = activeFilters[category].includes(option);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex items-center gap-3 cursor-pointer group",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: `w-4 h-4 rounded border flex items-center justify-center transition-colors
                            ${isActive ? "bg-brand border-brand" : "border-input group-hover:border-brand/50"}
                          `,
												children: isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3 h-3 text-white" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `text-sm ${isActive ? "text-foreground font-medium" : "text-muted-foreground"}`,
												children: option
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												className: "hidden",
												checked: isActive,
												onChange: () => toggleFilter(category, option)
											})
										]
									}, option);
								})
							})] }, category))
						})]
					}),
					activeFiltersCount > 0 && !isFilterOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2 px-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-muted-foreground mr-2",
								children: "Active filters:"
							}),
							Object.entries(activeFilters).map(([category, values]) => values.map((val) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/80 text-xs font-medium text-foreground border border-border/50",
								children: [val, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => toggleFilter(category, val),
									className: "text-muted-foreground hover:text-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 12 })
								})]
							}, `${category}-${val}`))),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: clearFilters,
								className: "text-xs font-medium text-brand hover:underline ml-2",
								children: "Clear all"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-between px-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium text-muted-foreground",
					children: isBrandsLoading ? "Searching..." : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [totalCount === 1 ? "1 brand" : `${totalCount} brands`, " found"] })
				})
			}),
			isBrandsError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center text-center p-12 bg-destructive/5 border border-destructive/20 rounded-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "w-12 h-12 text-destructive mb-4" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-bold mb-2",
						children: "We couldn't load brands"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground max-w-sm mb-6",
						children: "Something went wrong while loading opportunities. Please check your connection and try again."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => queryClient.invalidateQueries({ queryKey: ["brands"] }),
						className: "px-6 py-2.5 bg-background border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors",
						children: "Try again"
					})
				]
			}) : isBrandsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
				children: [...Array(8)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl border border-border/50 bg-card p-6 h-[320px] animate-pulse flex flex-col justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-7 w-2/3 bg-muted rounded-lg mb-4" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-5 w-1/3 bg-muted rounded-md mb-2" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-5 w-1/2 bg-muted rounded-md" })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-11 w-full bg-muted rounded-xl mt-6" })]
				}, i))
			}) : allBrands.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center text-center p-16 bg-card border border-border/60 rounded-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-20 h-20 rounded-3xl bg-muted/50 flex items-center justify-center mb-6 border border-border/50 shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-10 h-10 text-muted-foreground" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-bold mb-3",
						children: debouncedSearch || activeFiltersCount > 0 ? "No brands found" : "No brands yet"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground max-w-md mb-8 text-lg",
						children: debouncedSearch || activeFiltersCount > 0 ? "Try changing your search or removing some filters to see more opportunities." : "Branzly hasn't added any brand opportunities to your instance yet. New opportunities will appear here once the database is populated."
					}),
					(debouncedSearch || activeFiltersCount > 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							setSearchTerm("");
							clearFilters();
						},
						className: "px-6 py-3 bg-brand text-brand-foreground rounded-xl text-sm font-semibold hover:bg-brand/90 transition-colors shadow-sm",
						children: "Clear search & filters"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "group flex flex-col bg-card rounded-3xl border border-border/60 hover:border-brand/40 overflow-hidden subtle-shadow transition-all hover:-translate-y-1 duration-300",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-6 flex-1 flex flex-col cursor-pointer",
							onClick: () => setSelectedBrand(brand),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-start mb-4 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-xl font-bold text-foreground leading-tight line-clamp-2",
										children: brand.company_name
									}), brand.lead_score != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1 bg-muted text-foreground px-2.5 py-1 rounded-full text-xs font-bold border border-border/50 shrink-0",
										title: "Lead Score",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "w-3 h-3 text-muted-foreground" }), brand.lead_score]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-2 mb-4",
									children: [brand.industry && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "px-2.5 py-1 bg-muted/50 text-muted-foreground border border-border/50 rounded-lg text-xs font-medium",
										children: brand.industry
									}), brand.country && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1 px-2.5 py-1 bg-muted/50 text-muted-foreground border border-border/50 rounded-lg text-xs font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "w-3 h-3" }), brand.country]
									})]
								}),
								signal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mb-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: `inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md
                          ${signal.type === "success" ? "bg-green-500/10 text-green-600 dark:text-green-400" : signal.type === "info" ? "bg-blue-500/10 text-blue-600 dark:text-blue-400" : "bg-orange-500/10 text-orange-600 dark:text-orange-400"}
                        `,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3 h-3" }), signal.text]
									})
								}),
								brand.influencer_fit_score != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-auto mb-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-xs text-muted-foreground mb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-semibold text-foreground flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "w-3 h-3 text-brand" }), " Creator Fit"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-bold text-foreground",
											children: [brand.influencer_fit_score, "/100"]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-1.5 w-full bg-muted rounded-full overflow-hidden",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-full bg-brand transition-all duration-1000",
											style: { width: `${brand.influencer_fit_score}%` }
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-auto pt-2",
									onClick: (e) => e.stopPropagation(),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										disabled: saveMutation.isPending && saveMutation.variables === brand.id,
										onClick: () => saveMutation.mutate(brand.id),
										className: `w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200
                          ${isSaved ? "bg-muted text-foreground border border-border/50 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 group/btn" : "bg-brand text-brand-foreground hover:bg-brand/90 shadow-sm hover:shadow-md"}
                        `,
										children: saveMutation.isPending && saveMutation.variables === brand.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : isSaved ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-4 h-4 group-hover/btn:hidden" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4 hidden group-hover/btn:block" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "group-hover/btn:hidden",
												children: "Saved"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "hidden group-hover/btn:block",
												children: "Remove"
											})
										] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" }), "Save Brand"] })
									})
								})
							]
						})
					}, brand.id);
				})
			}), hasNextPage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => fetchNextPage(),
					disabled: isFetchingNextPage,
					className: "flex items-center gap-2 px-8 py-3 bg-muted text-foreground rounded-xl text-sm font-semibold hover:bg-muted/80 transition-colors border border-border/50 shadow-sm disabled:opacity-50",
					children: isFetchingNextPage ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin" }), "Loading more..."] }) : "Load More Brands"
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandProfileModal, {
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
			})
		]
	});
}
function DiscoverPage() {
	const [userId, setUserId] = (0, import_react.useState)(null);
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) setUserId(data.session.user.id);
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiscoverView, {
		userId,
		onStartOutreach: (brandId) => navigate({
			to: "/outreach",
			search: { brandId }
		})
	});
}
//#endregion
export { DiscoverPage as component };
