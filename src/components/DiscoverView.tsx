import { BRAND_SELECT_FIELDS } from "@/lib/constants";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useMonetization } from "@/lib/useMonetization";
import { useDevice } from "@/lib/useDevice";

import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  useQuery,
} from "@tanstack/react-query";
import { supabase, type Brand } from "@/lib/supabase";
import { toast } from "sonner";
import {
  Search,
  Filter,
  Plus,
  Check,
  Star,
  TrendingUp,
  Globe,
  X,
  ChevronDown,
  Sparkles,
  SlidersHorizontal,
  Loader2,
  Building2,
  AlertCircle,
  RotateCcw,
} from "lucide-react";
import { BrandProfileModal } from "./BrandProfileModal";

type SortOption = "best_match" | "lead_score" | "creator_fit" | "recent" | "az";

export function DiscoverView({
  userId,
  onStartOutreach,
}: {
  userId: string | null;
  onStartOutreach?: (brandId: string) => void;
}) {
  const queryClient = useQueryClient();
  const { isMobile, deviceType } = useDevice();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Modal state
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  // Filters state
  const [activeFilters, setActiveFilters] = useState<{
    industry: string[];
    country: string[];
    company_stage: string[];
    budget_potential: string[];
  }>({
    industry: [],
    country: [],
    company_stage: [],
    budget_potential: [],
  });

  const [sortOption, setSortOption] = useState<SortOption>("best_match");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch user workspace
  const { data: workspaceData } = useQuery({
    queryKey: ["user-workspace", userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data } = await supabase
        .from("workspace_members")
        .select("workspace_id")
        .eq("user_id", userId!)
        .limit(1)
        .maybeSingle();
      return data;
    },
  });

  const workspaceId = workspaceData?.workspace_id;

  // Saved brands query
  const savedQuery = useQuery({
    queryKey: ["saved-brand-ids", workspaceId],
    enabled: !!workspaceId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("saved_brands")
        .select("brand_id")
        .eq("workspace_id", workspaceId!);
      if (error) return new Set<string>();
      return new Set(data.map((d) => d.brand_id));
    },
  });

  const savedIds = savedQuery.data || new Set();

  // Dual-mode fetcher: tries API route, falls back to direct Supabase query
  const fetchBrands = async ({ pageParam = 0 }) => {
    const pageSize = 12;

    // 1. Try server-side API endpoint first
    try {
      const { data: session } = await supabase.auth.getSession();
      const token = session?.session?.access_token;
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch("/api/brands/discover", {
        method: "POST",
        headers,
        body: JSON.stringify({
          workspaceId,
          pageParam,
          pageSize,
          search: debouncedSearch,
          filters: activeFilters,
          sortOption,
        }),
      });

      const contentType = response.headers.get("content-type") || "";
      if (response.ok && contentType.includes("application/json")) {
        const data = await response.json();
        if (data && Array.isArray(data.brands)) {
          const totalCount =
            data.totalCount ?? data.count ?? data.brands.length;
          return {
            ...data,
            totalCount,
            count: totalCount,
          };
        }
      }
    } catch {
      // API unavailable, fall back to direct Supabase client query
    }

    // 2. Direct Supabase Query Fallback (works seamlessly on Vercel, static preview, anywhere)
    const from = pageParam * pageSize;
    const to = from + pageSize - 1;

    let q = supabase.from("brands").select("*", { count: "exact" });

    if (debouncedSearch && debouncedSearch.trim()) {
      const s = debouncedSearch.trim();
      q = q.or(
        `company_name.ilike.%${s}%,industry.ilike.%${s}%,country.ilike.%${s}%`,
      );
    }

    if (activeFilters.industry && activeFilters.industry.length > 0) {
      q = q.in("industry", activeFilters.industry);
    }
    if (activeFilters.country && activeFilters.country.length > 0) {
      q = q.in("country", activeFilters.country);
    }
    if (activeFilters.company_stage && activeFilters.company_stage.length > 0) {
      q = q.in("company_stage", activeFilters.company_stage);
    }
    if (
      activeFilters.budget_potential &&
      activeFilters.budget_potential.length > 0
    ) {
      q = q.in("budget_potential", activeFilters.budget_potential);
    }

    if (sortOption === "lead_score") {
      q = q.order("lead_score", { ascending: false, nullsFirst: false });
    } else if (sortOption === "creator_fit") {
      q = q.order("influencer_fit_score", {
        ascending: false,
        nullsFirst: false,
      });
    } else if (sortOption === "recent") {
      q = q.order("created_at", { ascending: false });
    } else if (sortOption === "az") {
      q = q.order("company_name", { ascending: true });
    } else {
      // best_match default
      q = q.order("lead_score", { ascending: false, nullsFirst: false });
    }

    const { data: brands, count, error } = await q.range(from, to);

    if (error) {
      console.error("Supabase direct query error:", error);
      throw new Error(error.message || "Failed to load brands");
    }

    const totalCount = count ?? (brands ? brands.length : 0);
    const hasMore = from + pageSize < totalCount;

    return {
      brands: brands || [],
      count: totalCount,
      totalCount,
      nextPage: hasMore ? pageParam + 1 : undefined,
    };
  };

  const {
    data: brandsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isBrandsLoading,
    isError: isBrandsError,
    error: brandsError,
    refetch,
  } = useInfiniteQuery({
    queryKey: [
      "brands",
      workspaceId || "anon",
      debouncedSearch,
      activeFilters,
      sortOption,
    ],
    queryFn: fetchBrands,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const allBrands = brandsData?.pages.flatMap((page) => page.brands) || [];
  const totalCount =
    brandsData?.pages[0]?.totalCount ??
    brandsData?.pages[0]?.count ??
    allBrands.length;

  const saveMutation = useMutation({
    mutationFn: async (brandId: string) => {
      if (!workspaceId) throw new Error("No workspace found");

      const isCurrentlySaved = savedIds.has(brandId);

      if (isCurrentlySaved) {
        const { error } = await supabase
          .from("saved_brands")
          .delete()
          .match({ workspace_id: workspaceId, brand_id: brandId });
        if (error) throw error;
        return { action: "unsaved", brandId };
      } else {
        const { error } = await supabase
          .from("saved_brands")
          .insert({ workspace_id: workspaceId, brand_id: brandId });
        if (error) throw error;
        return { action: "saved", brandId };
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["saved-brand-ids", workspaceId],
      });
      toast.success(
        data.action === "saved" ? "Brand saved to list" : "Brand removed",
      );
    },
    onError: (err: Error) => {
      toast.error(err.message || "Could not update saved brands");
    },
  });

  const toggleFilter = (
    category: keyof typeof activeFilters,
    value: string,
  ) => {
    setActiveFilters((prev) => {
      const current = prev[category];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [category]: next };
    });
  };

  const clearFilters = () => {
    setActiveFilters({
      industry: [],
      country: [],
      company_stage: [],
      budget_potential: [],
    });
  };

  const activeFiltersCount = useMemo(() => {
    return Object.values(activeFilters).reduce(
      (acc, arr) => acc + arr.length,
      0,
    );
  }, [activeFilters]);

  // Available filter options
  const filterOptions = {
    industry: [
      "AI & Machine Learning",
      "B2B SaaS",
      "Developer Tools",
      "Fintech",
      "Health & Wellness",
      "E-commerce",
      "Cybersecurity",
      "Edtech",
      "Creator Economy",
      "Consumer Tech",
    ],
    country: ["United States", "United Kingdom", "Canada", "Germany", "India"],
    company_stage: ["Seed", "Early Stage", "Growth", "Scaleup", "Public"],
    budget_potential: ["High", "Medium", "Enterprise"],
  };

  return (
    <div className="flex flex-col gap-5 lg:gap-8 pb-12 animate-in fade-in duration-500 h-full">
      {/* Header Section */}
      <div className="flex flex-col gap-1.5 sm:gap-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
          Discover Brands
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
          Find vetted brand sponsorship opportunities tailored to your audience.
        </p>
      </div>

      {/* Search and Filter Toolbar */}
      <div className="flex flex-col gap-3">
        {/* Search Bar Input */}
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 items-stretch sm:items-center bg-card p-2 sm:p-2.5 rounded-2xl border border-border/60 shadow-sm subtle-shadow">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder={
                isMobile
                  ? "Search brands or industries..."
                  : "Search brands, industries, products..."
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 sm:py-3 bg-transparent border-none focus:ring-0 text-sm sm:text-base placeholder:text-muted-foreground text-foreground outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors"
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <div className="hidden sm:block w-px h-8 bg-border" />

          {/* Action buttons: on mobile, 2 evenly split touch targets */}
          <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 px-1 sm:px-0">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 min-h-[44px] text-xs sm:text-sm font-semibold rounded-xl transition-all
                ${
                  isFilterOpen || activeFiltersCount > 0
                    ? "bg-brand/15 text-brand border border-brand/30"
                    : "bg-muted/70 text-foreground hover:bg-muted border border-border/40"
                }
              `}
            >
              <SlidersHorizontal className="w-4 h-4 shrink-0" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] text-white font-bold ml-0.5">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            <div className="relative flex items-center min-w-0">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="w-full sm:w-auto appearance-none bg-muted/70 text-foreground text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2.5 pr-8 min-h-[44px] rounded-xl cursor-pointer hover:bg-muted transition-colors border border-border/40 focus:ring-2 focus:ring-brand truncate"
              >
                <option value="best_match">Best Match</option>
                <option value="lead_score">Highest Lead Score</option>
                <option value="creator_fit">Highest Creator Fit</option>
                <option value="recent">Recently Added</option>
                <option value="az">Company A–Z</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Filter Drawer / Panel: Bottom sheet on mobile, clean expanding panel on desktop */}
        {isFilterOpen && (
          <>
            {/* Mobile Sheet Backdrop */}
            {isMobile && (
              <div
                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 lg:hidden"
                onClick={() => setIsFilterOpen(false)}
              />
            )}

            <div
              className={`
                bg-card border border-border/60 shadow-xl animate-in duration-200 z-50
                ${
                  isMobile
                    ? "fixed bottom-0 left-0 right-0 max-h-[80vh] rounded-t-3xl p-5 pb-8 overflow-y-auto flex flex-col"
                    : "rounded-2xl p-6 slide-in-from-top-2"
                }
              `}
            >
              <div className="flex items-center justify-between mb-5 shrink-0">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-brand" />
                  <h3 className="font-bold text-foreground text-base sm:text-lg">
                    Filter Opportunities
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Clear all
                    </button>
                  )}
                  {isMobile && (
                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="p-1 text-muted-foreground hover:text-foreground rounded-full"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-1 overflow-y-auto">
                {Object.entries(filterOptions).map(([category, options]) => (
                  <div key={category} className="flex flex-col gap-2.5">
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      {category.replace("_", " ")}
                    </h4>
                    <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                      {options.map((option) => {
                        const isActive =
                          activeFilters[
                            category as keyof typeof activeFilters
                          ].includes(option);
                        return (
                          <label
                            key={option}
                            className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted/50 cursor-pointer transition-colors min-h-[40px]"
                          >
                            <div
                              className={`w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0
                                ${
                                  isActive
                                    ? "bg-brand border-brand"
                                    : "border-input"
                                }
                              `}
                            >
                              {isActive && (
                                <Check className="w-3 h-3 text-white" />
                              )}
                            </div>
                            <span
                              className={`text-xs sm:text-sm ${
                                isActive
                                  ? "text-foreground font-semibold"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {option}
                            </span>
                            <input
                              type="checkbox"
                              className="hidden"
                              checked={isActive}
                              onChange={() =>
                                toggleFilter(
                                  category as keyof typeof activeFilters,
                                  option,
                                )
                              }
                            />
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {isMobile && (
                <div className="pt-4 mt-4 border-t border-border/50 shrink-0">
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="w-full py-3 bg-brand text-brand-foreground font-semibold rounded-xl text-sm shadow-md"
                  >
                    Apply Filters ({activeFiltersCount})
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* Active Filters Pills */}
        {activeFiltersCount > 0 && !isFilterOpen && (
          <div className="flex flex-wrap items-center gap-1.5 px-1">
            <span className="text-xs text-muted-foreground mr-1">Active:</span>
            {Object.entries(activeFilters).map(([category, values]) =>
              values.map((val) => (
                <span
                  key={`${category}-${val}`}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted text-xs font-medium text-foreground border border-border/50"
                >
                  {val}
                  <button
                    onClick={() =>
                      toggleFilter(category as keyof typeof activeFilters, val)
                    }
                    className="text-muted-foreground hover:text-foreground"
                    aria-label={`Remove filter ${val}`}
                  >
                    <X size={12} />
                  </button>
                </span>
              )),
            )}
            <button
              onClick={clearFilters}
              className="text-xs font-medium text-brand hover:underline ml-1"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between px-1">
        <p className="text-xs sm:text-sm font-medium text-muted-foreground">
          {isBrandsLoading ? (
            "Loading opportunities..."
          ) : (
            <>{totalCount === 1 ? "1 brand" : `${totalCount} brands`} found</>
          )}
        </p>
      </div>

      {/* Main Content: Error, Loading, Empty, or Cards Grid */}
      {isBrandsError ? (
        <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 bg-destructive/5 border border-destructive/20 rounded-3xl">
          <AlertCircle className="w-10 h-10 text-destructive mb-3" />
          <h2 className="text-lg sm:text-xl font-bold mb-2">
            {brandsData?.pages?.[0]?.error ||
            brandsError?.message?.includes("limit reached")
              ? "Daily Limit Reached"
              : "Unable to load opportunities"}
          </h2>
          <p className="text-muted-foreground text-sm max-w-sm mb-5">
            {brandsData?.pages?.[0]?.error ||
            brandsError?.message?.includes("limit reached")
              ? "You have reached your daily search limit on the Free plan. Upgrade to unlock unlimited discovery."
              : "We could not retrieve brand leads right now. Please tap retry."}
          </p>
          <button
            onClick={() => refetch()}
            className="flex items-center gap-2 px-5 py-2.5 bg-background border border-border rounded-xl text-sm font-semibold hover:bg-muted transition-colors shadow-sm"
          >
            <RotateCcw size={15} />
            Retry
          </button>
        </div>
      ) : isBrandsLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl sm:rounded-3xl border border-border/50 bg-card p-5 sm:p-6 h-[260px] sm:h-[300px] animate-pulse flex flex-col justify-between"
            >
              <div>
                <div className="h-6 w-2/3 bg-muted rounded-lg mb-3" />
                <div className="h-4 w-1/3 bg-muted rounded-md mb-2" />
                <div className="h-4 w-1/2 bg-muted rounded-md" />
              </div>
              <div className="h-10 w-full bg-muted rounded-xl mt-4" />
            </div>
          ))}
        </div>
      ) : allBrands.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center p-10 sm:p-16 bg-card border border-border/60 rounded-2xl sm:rounded-3xl">
          <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4 border border-border/50 shadow-sm">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-2">
            {debouncedSearch || activeFiltersCount > 0
              ? "No brands match your search"
              : "No brands available"}
          </h2>
          <p className="text-muted-foreground max-w-md mb-6 text-sm sm:text-base">
            {debouncedSearch || activeFiltersCount > 0
              ? "Try adjusting your keywords or clearing active filters to view more opportunities."
              : "No brand listings found. Check back soon for fresh opportunities."}
          </p>
          {(debouncedSearch || activeFiltersCount > 0) && (
            <button
              onClick={() => {
                setSearchTerm("");
                clearFilters();
              }}
              className="px-5 py-2.5 bg-brand text-brand-foreground rounded-xl text-sm font-semibold hover:bg-brand/90 transition-colors shadow-sm"
            >
              Clear search & filters
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {allBrands.map((brand) => {
              const isSaved = savedIds.has(brand.id);

              let signal = null;
              if (brand.recent_funding)
                signal = { text: "Recent Funding", type: "success" };
              else if (brand.recent_launch)
                signal = { text: "Recent Launch", type: "info" };
              else if (brand.existing_creator_activity)
                signal = { text: "Active with Creators", type: "warning" };

              return (
                <div
                  key={brand.id}
                  className="group flex flex-col bg-card rounded-2xl sm:rounded-3xl border border-border/60 hover:border-brand/40 overflow-hidden subtle-shadow transition-all hover:-translate-y-1 duration-300"
                >
                  <div
                    className="p-4 sm:p-6 flex-1 flex flex-col cursor-pointer"
                    onClick={() => setSelectedBrand(brand)}
                  >
                    <div className="flex justify-between items-start mb-3 gap-2.5">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-muted/60 border border-border/50 flex items-center justify-center shrink-0 overflow-hidden">
                          {brand.logo_url ? (
                            <img
                              src={brand.logo_url}
                              alt={brand.company_name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Building2
                              size={18}
                              className="text-muted-foreground/60"
                            />
                          )}
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-foreground leading-tight line-clamp-1 truncate">
                          {brand.company_name}
                        </h3>
                      </div>

                      {brand.lead_score != null && (
                        <div
                          className="flex items-center gap-1 bg-muted/80 text-foreground px-2 py-0.5 rounded-full text-[11px] font-bold border border-border/50 shrink-0"
                          title="Lead Score"
                        >
                          <TrendingUp className="w-3 h-3 text-brand" />
                          {brand.lead_score}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {brand.industry && (
                        <span className="px-2 py-0.5 bg-muted/50 text-muted-foreground border border-border/50 rounded-md text-[11px] font-medium truncate max-w-[160px]">
                          {brand.industry}
                        </span>
                      )}
                      {brand.country && (
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-muted/50 text-muted-foreground border border-border/50 rounded-md text-[11px] font-medium">
                          <Globe className="w-3 h-3" />
                          {brand.country}
                        </span>
                      )}
                    </div>

                    {signal && (
                      <div className="mb-3">
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md
                          ${
                            signal.type === "success"
                              ? "bg-green-500/10 text-green-600 dark:text-green-400"
                              : signal.type === "info"
                                ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                                : "bg-orange-500/10 text-orange-600 dark:text-orange-400"
                          }
                        `}
                        >
                          <Sparkles className="w-3 h-3" />
                          {signal.text}
                        </span>
                      </div>
                    )}

                    {brand.influencer_fit_score != null && (
                      <div className="mt-auto mb-4">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                          <span className="font-semibold text-foreground flex items-center gap-1">
                            <Star className="w-3 h-3 text-brand" /> Fit Score
                          </span>
                          <span className="font-bold text-foreground">
                            {brand.influencer_fit_score}/100
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-brand transition-all duration-700"
                            style={{ width: `${brand.influencer_fit_score}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div
                      className="mt-auto pt-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        disabled={
                          saveMutation.isPending &&
                          saveMutation.variables === brand.id
                        }
                        onClick={() => saveMutation.mutate(brand.id)}
                        className={`w-full flex items-center justify-center gap-2 py-2.5 px-3 min-h-[44px] rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200
                          ${
                            isSaved
                              ? "bg-muted text-foreground border border-border/50 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 group/btn"
                              : "bg-brand text-brand-foreground hover:bg-brand/90 shadow-sm"
                          }
                        `}
                      >
                        {saveMutation.isPending &&
                        saveMutation.variables === brand.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : isSaved ? (
                          <>
                            <Check className="w-4 h-4 group-hover/btn:hidden" />
                            <X className="w-4 h-4 hidden group-hover/btn:block" />
                            <span className="group-hover/btn:hidden">
                              Saved
                            </span>
                            <span className="hidden group-hover/btn:block">
                              Remove
                            </span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            Save Brand
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {hasNextPage && (
            <div className="flex justify-center mt-6 sm:mt-8">
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="flex items-center gap-2 px-6 sm:px-8 py-3 bg-muted text-foreground rounded-xl text-xs sm:text-sm font-semibold hover:bg-muted/80 transition-colors border border-border/50 shadow-sm disabled:opacity-50 min-h-[44px]"
              >
                {isFetchingNextPage ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading more...
                  </>
                ) : (
                  "Load More Brands"
                )}
              </button>
            </div>
          )}
        </>
      )}

      {/* Brand Details Modal */}
      <BrandProfileModal
        brand={selectedBrand}
        isOpen={!!selectedBrand}
        onClose={() => setSelectedBrand(null)}
        isSaved={selectedBrand ? savedIds.has(selectedBrand.id) : false}
        isSaving={
          selectedBrand
            ? saveMutation.isPending &&
              saveMutation.variables === selectedBrand.id
            : false
        }
        onSave={() => selectedBrand && saveMutation.mutate(selectedBrand.id)}
        onStartOutreach={() => {
          if (selectedBrand && onStartOutreach) {
            setSelectedBrand(null);
            onStartOutreach(selectedBrand.id);
          }
        }}
      />
    </div>
  );
}
