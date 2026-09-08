import { n as __toESM } from "./_runtime.mjs";
import { t as supabase } from "./_ssr/supabase-BEO93jmY.mjs";
import { a as useQueryClient, n as useMutation, o as require_jsx_runtime, s as require_react, t as useInfiniteQuery } from "./_libs/react+tanstack__react-query.mjs";
import { g as Link, v as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { H as Check, N as Globe, O as LoaderCircle, V as ChevronDown, W as Calendar, _ as Search, d as Star, f as Sparkles, g as Send, l as Trash2, n as X, p as SlidersHorizontal } from "./_libs/lucide-react.mjs";
import { t as useMonetization } from "./_ssr/useMonetization-C8GPMWTs.mjs";
import { t as BRAND_SELECT_FIELDS } from "./_ssr/constants-GxBJ0Kj6.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { t as BrandProfileModal } from "./_ssr/BrandProfileModal-CeOzAnEj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_dashboard.saved-COC8tS2r.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6 lg:gap-8 pb-12 animate-in fade-in duration-500 h-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl lg:text-4xl font-bold tracking-tight text-foreground",
					children: "Saved Brands"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground text-lg max-w-2xl",
					children: "Keep track of the brands you want to explore or contact."
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
										placeholder: "Search saved brands...",
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
												value: "recently_saved",
												children: "Recently Saved"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "recently_updated",
												children: "Recently Updated"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "creator_fit",
												children: "Highest Creator Fit"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "lead_score",
												children: "Highest Lead Score"
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
							className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
							children: Object.entries(filterOptions).map(([category, options]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
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
					children: isSavedLoading ? "Loading..." : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: totalCount === 1 ? "1 saved brand" : `${totalCount} saved brands` })
				})
			}),
			isSavedError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center text-center p-12 bg-destructive/5 border border-destructive/20 rounded-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-12 h-12 text-destructive mb-4" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-bold mb-2",
						children: "Couldn't load saved brands"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground max-w-sm mb-6",
						children: "Something went wrong while loading your saved opportunities."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => queryClient.invalidateQueries({ queryKey: ["saved_brands_query"] }),
						className: "px-6 py-2.5 bg-background border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors",
						children: "Try again"
					})
				]
			}) : isSavedLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6",
				children: [...Array(4)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl border border-border/50 bg-card p-6 h-[320px] animate-pulse flex flex-col justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-7 w-2/3 bg-muted rounded-lg mb-4" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-5 w-1/3 bg-muted rounded-md mb-2" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-5 w-1/2 bg-muted rounded-md" })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 mt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-11 w-full bg-muted rounded-xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-11 w-full bg-muted rounded-xl" })]
					})]
				}, i))
			}) : totalCount === 0 && !debouncedSearch && activeFiltersCount === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center text-center p-16 bg-card border border-border/60 rounded-3xl h-[50vh]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-20 h-20 rounded-3xl bg-muted/50 flex items-center justify-center mb-6 border border-border/50 shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "w-10 h-10 text-muted-foreground" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-bold mb-3",
						children: "No saved brands yet"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground max-w-md mb-8 text-lg",
						children: "Save interesting brands from Discover and they'll appear here."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/discover",
						className: "px-6 py-3 bg-brand text-brand-foreground rounded-xl text-sm font-semibold hover:bg-brand/90 transition-colors shadow-sm",
						children: "Discover Brands"
					})
				]
			}) : allSavedBrands.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center text-center p-16 bg-card border border-border/60 rounded-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-20 h-20 rounded-3xl bg-muted/50 flex items-center justify-center mb-6 border border-border/50 shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-10 h-10 text-muted-foreground" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-bold mb-3",
						children: "No saved brands found"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground max-w-md mb-8 text-lg",
						children: "Try another search or clear your filters to see your saved brands."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
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
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "group flex flex-col bg-card rounded-3xl border border-border/60 hover:border-brand/40 overflow-hidden subtle-shadow transition-all hover:-translate-y-1 duration-300",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-6 flex-1 flex flex-col cursor-pointer",
							onClick: () => setSelectedSavedBrand(savedRecord),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-start mb-4 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-xl font-bold text-foreground leading-tight line-clamp-2",
										children: brand.company_name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider border shrink-0 ${getStatusColor(savedRecord.status)}`,
										children: savedRecord.status
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
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-auto mb-6 flex flex-col gap-2",
									children: [brand.influencer_fit_score != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-xs text-muted-foreground mb-1.5",
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
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1 text-[11px] text-muted-foreground mt-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "w-3 h-3" }),
											"Saved on",
											" ",
											new Date(savedRecord.created_at).toLocaleDateString()
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-auto pt-4 border-t border-border/50 flex gap-2",
									onClick: (e) => e.stopPropagation(),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										disabled: removeMutation.isPending && removeMutation.variables === savedRecord.id,
										onClick: () => removeMutation.mutate(savedRecord.id),
										className: "flex items-center justify-center p-3 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors",
										title: "Remove from Saved",
										children: removeMutation.isPending && removeMutation.variables === savedRecord.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => {
											if (onStartOutreach) onStartOutreach(brand.id);
										},
										className: "flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-brand text-brand-foreground rounded-xl text-sm font-semibold hover:bg-brand/90 transition-all shadow-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "w-4 h-4" }), "Start Outreach"]
									})]
								})
							]
						})
					}, savedRecord.id);
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
			})
		]
	});
}
function SavedPage() {
	const [userId, setUserId] = (0, import_react.useState)(null);
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) setUserId(data.session.user.id);
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SavedView, {
		userId,
		onStartOutreach: (brandId) => navigate({
			to: "/outreach",
			search: { brandId }
		})
	});
}
//#endregion
export { SavedPage as component };
