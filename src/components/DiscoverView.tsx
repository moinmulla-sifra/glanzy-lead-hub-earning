import { useState, useEffect, useMemo, useRef } from "react";
import { useDevice } from "@/lib/useDevice";
import { Link } from "@tanstack/react-router";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  useQuery,
} from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { type Brand } from "@/types/brand";
import { toast } from "sonner";
import {
  Search,
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
  ExternalLink,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { BrandProfileModal } from "./BrandProfileModal";

type SortOption = "best_match" | "lead_score" | "creator_fit" | "recent" | "az";

export function DiscoverView({
  userId,
  onStartOutreach: _onStartOutreach,
}: {
  userId: string | null;
  onStartOutreach?: (brandId: string) => void;
}) {
  const queryClient = useQueryClient();
  const { isMobile } = useDevice();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Modal state
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  // Expanded filters state matching Google Sheets contract
  const [activeFilters, setActiveFilters] = useState<{
    industry: string[];
    category: string[];
    country: string[];
    company_stage: string[];
    budget_potential: string[];
    creator_activity: string[];
    data_confidence: string[];
  }>({
    industry: [],
    category: [],
    country: [],
    company_stage: [],
    budget_potential: [],
    creator_activity: [],
    data_confidence: [],
  });

  const [sortOption, setSortOption] = useState<SortOption>("best_match");

  // Keep track of latest request to prevent stale requests from overwriting
  const requestIdRef = useRef(0);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim());
    }, 350);
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
    queryFn: async () => {
      const res = await fetch("/api/brands/saved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workspaceId }),
      });
      if (!res.ok) return new Set<string>();
      const data = await res.json();
      return new Set<string>(data.savedBrandIds || []);
    },
  });

  const savedIds = savedQuery.data || new Set();

  // Fetch brand leads strictly from server Google Sheets endpoint with Supabase fallback
  const fetchBrands = async ({ pageParam = 0 }) => {
    const currentRequestId = ++requestIdRef.current;
    const pageSize = 12;

    const { data: session } = await supabase.auth
      .getSession()
      .catch(() => ({ data: null }));
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

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(
        errData.error || `Failed to fetch brand leads: ${response.status}`,
      );
    }

    const data = await response.json();

    // Prevent race conditions: if a newer request started, don't let older results take over
    if (currentRequestId !== requestIdRef.current) {
      return {
        brands: [],
        count: 0,
        totalCount: 0,
        nextPage: undefined,
      };
    }

    const totalCount =
      data.totalCount ?? data.count ?? (data.brands ? data.brands.length : 0);
    const hasMore = (pageParam + 1) * pageSize < totalCount;

    return {
      brands: (data.brands || []) as Brand[],
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
      const isCurrentlySaved = savedIds.has(brandId);
      const res = await fetch("/api/brands/saved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workspaceId,
          action: isCurrentlySaved ? "unsave" : "save",
          brandId,
        }),
      });
      if (!res.ok) throw new Error("Could not update saved brands");
      return { action: isCurrentlySaved ? "unsaved" : "saved", brandId };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["saved-brand-ids", workspaceId],
      });
      queryClient.invalidateQueries({
        queryKey: ["saved_brands_query"],
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
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [category]: next };
    });
  };

  const clearFilters = () => {
    setActiveFilters({
      industry: [],
      category: [],
      country: [],
      company_stage: [],
      budget_potential: [],
      creator_activity: [],
      data_confidence: [],
    });
  };

  const activeFiltersCount = useMemo(() => {
    return Object.values(activeFilters).reduce(
      (acc, arr) => acc + arr.length,
      0,
    );
  }, [activeFilters]);

  // Available filter options based on Google Sheets contract
  const filterOptions = {
    industry: [
      "AI & Machine Learning",
      "B2B SaaS",
      "Developer Tools",
      "Fintech",
      "Health & Wellness",
      "E-commerce",
      "Beauty & Cosmetics",
      "Fashion & Apparel",
      "Cybersecurity",
      "Consumer Tech",
    ],
    category: [
      "Software",
      "Beauty",
      "Fashion",
      "Health",
      "Fintech",
      "Consumer Goods",
    ],
    creator_activity: ["works_with_creators", "ugc", "ambassador", "affiliate"],
    data_confidence: ["high", "medium", "low"],
    country: ["United States", "United Kingdom", "Canada", "Germany", "India"],
    company_stage: ["Seed", "Early Stage", "Growth", "Scaleup", "Public"],
    budget_potential: ["High", "Medium", "Enterprise"],
  };

  const filterLabels: Record<string, string> = {
    industry: "Industry",
    category: "Category",
    country: "Country",
    company_stage: "Company Stage",
    budget_potential: "Budget Potential",
    creator_activity: "Creator Signals",
    data_confidence: "Data Confidence",
    works_with_creators: "Active with Creators",
    ugc: "UGC Activity",
    ambassador: "Brand Ambassadors",
    affiliate: "Affiliate Program",
    high: "High Confidence",
    medium: "Medium Confidence",
    low: "Unverified / Low",
  };

  return (
    <div className="flex flex-col gap-5 lg:gap-8 pb-12 animate-in fade-in duration-500 h-full">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1.5 sm:gap-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
            Discover Brands
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
            Explore verified brand partnerships, creator collaboration signals,
            and unlocked contacts.
          </p>
        </div>
        <Link
          to="/for-you"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-brand/10 hover:bg-brand/15 text-brand border border-brand/25 text-sm font-semibold transition-all hover:scale-102 active:scale-98 shrink-0 shadow-xs"
        >
          <Sparkles size={16} className="text-brand animate-pulse" />
          <span>Ask Bran AI</span>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-brand/20 text-brand uppercase">
            Agent
          </span>
        </Link>
      </div>

      {/* Search and Filter Toolbar */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 items-stretch sm:items-center bg-card p-2 sm:p-2.5 rounded-2xl border border-border/60 shadow-sm subtle-shadow">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder={
                isMobile
                  ? "Search brand, industry, or niche..."
                  : "Search brand name, industry, product, category, or country..."
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

          {/* Action buttons */}
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
                <option value="recent">Recently Added / Verified</option>
                <option value="az">Company A–Z</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Filter Drawer / Panel */}
        {isFilterOpen && (
          <>
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
                    ? "fixed bottom-0 left-0 right-0 max-h-[85vh] rounded-t-3xl p-5 pb-8 overflow-y-auto flex flex-col"
                    : "rounded-2xl p-6 slide-in-from-top-2"
                }
              `}
            >
              <div className="flex items-center justify-between mb-5 shrink-0">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-brand" />
                  <h3 className="font-bold text-foreground text-base sm:text-lg">
                    Filter Brand Opportunities
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
                      {filterLabels[category] || category.replace("_", " ")}
                    </h4>
                    <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                      {options.map((option) => {
                        const isActive =
                          activeFilters[
                            category as keyof typeof activeFilters
                          ]?.includes(option);
                        const label = filterLabels[option] || option;
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
                              {label}
                            </span>
                            <input
                              type="checkbox"
                              className="hidden"
                              checked={Boolean(isActive)}
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
                  {filterLabels[val] || val}
                  <button
                    onClick={() =>
                      toggleFilter(category as keyof typeof activeFilters, val)
                    }
                    className="hover:text-destructive transition-colors ml-0.5"
                    aria-label={`Remove ${val} filter`}
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
            "Connecting brand catalog..."
          ) : (
            <>
              {totalCount === 1
                ? "1 brand"
                : `${totalCount.toLocaleString()} brands`}{" "}
              available
            </>
          )}
        </p>
      </div>

      {/* Main Content: Error, Loading, Empty, or Cards Grid */}
      {isBrandsError ? (
        <div className="flex flex-col items-center justify-center text-center p-8 sm:p-14 bg-destructive/5 border border-destructive/20 rounded-3xl">
          <AlertCircle className="w-12 h-12 text-destructive mb-3" />
          <h2 className="text-lg sm:text-xl font-bold mb-2 text-foreground">
            {brandsError?.message?.includes("limit reached")
              ? "Daily Limit Reached"
              : "Temporary Data Source Interruption"}
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mb-6">
            {brandsError?.message?.includes("limit reached")
              ? "You have reached your daily search limit on your current plan. Upgrade to unlock unlimited discovery."
              : "We could not retrieve brand opportunities at this moment. Both Google Sheets and database fallbacks encountered a network interruption. Please tap retry to reconnect."}
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => refetch()}
              className="flex items-center gap-2 px-6 py-2.5 bg-brand text-brand-foreground rounded-xl text-sm font-semibold hover:bg-brand/90 transition-colors shadow-sm"
            >
              <RotateCcw size={15} />
              Retry Connection
            </button>
            <Link
              to="/pricing"
              className="px-5 py-2.5 bg-muted text-foreground border border-border/50 rounded-xl text-sm font-semibold hover:bg-muted/80 transition-colors"
            >
              View Plan Limits
            </Link>
          </div>
        </div>
      ) : isBrandsLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl sm:rounded-3xl border border-border/50 bg-card p-5 sm:p-6 h-[310px] animate-pulse flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-3 mb-4">
                  <div className="w-10 h-10 bg-muted rounded-xl" />
                  <div className="flex-1">
                    <div className="h-5 w-3/4 bg-muted rounded mb-2" />
                    <div className="h-3 w-1/2 bg-muted rounded" />
                  </div>
                </div>
                <div className="h-3 w-full bg-muted rounded mb-2" />
                <div className="h-3 w-4/5 bg-muted rounded mb-4" />
                <div className="h-6 w-1/3 bg-muted rounded" />
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
          <h2 className="text-xl sm:text-2xl font-bold mb-2 text-foreground">
            {debouncedSearch || activeFiltersCount > 0
              ? "No brands match your search"
              : "No brand listings published"}
          </h2>
          <p className="text-muted-foreground max-w-md mb-6 text-sm sm:text-base">
            {debouncedSearch || activeFiltersCount > 0
              ? "Try adjusting your search query, selecting broader categories, or clearing active filters."
              : "No brand records found in the active catalog. Check back soon or refresh."}
          </p>
          {debouncedSearch || activeFiltersCount > 0 ? (
            <button
              onClick={() => {
                setSearchTerm("");
                clearFilters();
              }}
              className="px-5 py-2.5 bg-brand text-brand-foreground rounded-xl text-sm font-semibold hover:bg-brand/90 transition-colors shadow-sm"
            >
              Clear search & filters
            </button>
          ) : (
            <button
              onClick={() => refetch()}
              className="flex items-center gap-2 px-5 py-2.5 bg-muted text-foreground border border-border/50 rounded-xl text-sm font-semibold hover:bg-muted/80 transition-colors"
            >
              <RotateCcw size={15} />
              Refresh Catalog
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {allBrands.map((brand) => {
              const isSaved = savedIds.has(brand.id);

              let signal = null;
              if (brand.recent_funding) {
                signal = { text: "Recent Funding", type: "success" };
              } else if (brand.recent_launch) {
                signal = { text: "Recent Launch", type: "info" };
              } else if (
                brand.works_with_creators ||
                brand.existing_creator_activity
              ) {
                signal = { text: "Active with Creators", type: "warning" };
              } else if (brand.ugc_activity) {
                signal = { text: "UGC Program", type: "info" };
              }

              const fitScore =
                Number(
                  brand.creator_fit_score ||
                    brand.influencer_fit_score ||
                    brand.opportunity_score,
                ) || 82;
              const leadScore = Number(brand.lead_score) || 80;
              const desc =
                brand.company_description ||
                brand.primary_product_summary ||
                brand.product_description ||
                "Brand partnerships and creator collaboration opportunities.";

              return (
                <div
                  key={brand.id}
                  className="group flex flex-col bg-card rounded-2xl sm:rounded-3xl border border-border/60 hover:border-brand/40 overflow-hidden subtle-shadow transition-all hover:-translate-y-1 duration-300"
                >
                  <div
                    className="p-4 sm:p-6 flex-1 flex flex-col cursor-pointer"
                    onClick={() => setSelectedBrand(brand)}
                  >
                    {/* Brand Top Row */}
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
                        <div className="min-w-0">
                          <h3 className="text-base sm:text-lg font-bold text-foreground leading-tight line-clamp-1 truncate">
                            {brand.company_name}
                          </h3>
                          {brand.website && (
                            <span className="text-[11px] text-muted-foreground truncate block">
                              {brand.domain ||
                                brand.website
                                  .replace(/^https?:\/\//, "")
                                  .split("/")[0]}
                            </span>
                          )}
                        </div>
                      </div>

                      <div
                        className="flex items-center gap-1 bg-muted/80 text-foreground px-2 py-0.5 rounded-full text-[11px] font-bold border border-border/50 shrink-0"
                        title="Lead Score"
                      >
                        <TrendingUp className="w-3 h-3 text-brand" />
                        {leadScore}
                      </div>
                    </div>

                    {/* Industry, Country, Stage Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-2.5">
                      {brand.industry && (
                        <span className="px-2 py-0.5 bg-muted/50 text-muted-foreground border border-border/50 rounded-md text-[11px] font-medium truncate max-w-[140px]">
                          {brand.industry}
                        </span>
                      )}
                      {brand.country && (
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-muted/50 text-muted-foreground border border-border/50 rounded-md text-[11px] font-medium">
                          <Globe className="w-3 h-3" />
                          {brand.country}
                        </span>
                      )}
                      {brand.company_stage && (
                        <span className="px-2 py-0.5 bg-muted/30 text-muted-foreground/80 border border-border/40 rounded-md text-[10px] font-medium">
                          {brand.company_stage}
                        </span>
                      )}
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
                      {desc}
                    </p>

                    {/* Marketing & Creator Signals */}
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

                    {/* Creator Fit Score */}
                    <div className="mt-auto mb-4">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                        <span className="font-semibold text-foreground flex items-center gap-1">
                          <Star className="w-3 h-3 text-brand" /> Fit Score
                        </span>
                        <span className="font-bold text-foreground">
                          {fitScore}/100
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-brand transition-all duration-700"
                          style={{
                            width: `${Math.min(100, Math.max(0, fitScore))}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Bottom Actions: Save button & Quick Details */}
                    <div
                      className="mt-auto pt-1 flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => setSelectedBrand(brand)}
                        className="flex-1 py-2 px-3 min-h-[40px] rounded-xl text-xs font-semibold bg-muted/60 hover:bg-muted text-foreground border border-border/50 transition-colors text-center"
                      >
                        View Details
                      </button>

                      <button
                        disabled={
                          saveMutation.isPending &&
                          saveMutation.variables === brand.id
                        }
                        onClick={() => saveMutation.mutate(brand.id)}
                        className={`py-2 px-3 min-h-[40px] rounded-xl text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5
                          ${
                            isSaved
                              ? "bg-muted text-foreground border border-border/50 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 group/btn"
                              : "bg-brand text-brand-foreground hover:bg-brand/90 shadow-sm"
                          }
                        `}
                        title={
                          isSaved ? "Remove from saved" : "Save to shortlist"
                        }
                      >
                        {saveMutation.isPending &&
                        saveMutation.variables === brand.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : isSaved ? (
                          <>
                            <Check className="w-3.5 h-3.5 group-hover/btn:hidden" />
                            <X className="w-3.5 h-3.5 hidden group-hover/btn:block" />
                            <span className="group-hover/btn:hidden">
                              Saved
                            </span>
                            <span className="hidden group-hover/btn:block">
                              Remove
                            </span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Save</span>
                          </>
                        )}
                      </button>

                      {brand.website && (
                        <a
                          href={brand.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-xl bg-muted/40 hover:bg-muted border border-border/40 text-muted-foreground hover:text-foreground transition-colors"
                          title="Visit Website"
                          aria-label={`Visit ${brand.company_name} website`}
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
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
        isOpen={Boolean(selectedBrand)}
        onClose={() => setSelectedBrand(null)}
        isSaved={selectedBrand ? savedIds.has(selectedBrand.id) : false}
        isSaving={
          selectedBrand
            ? saveMutation.isPending &&
              saveMutation.variables === selectedBrand.id
            : false
        }
        onSave={() => selectedBrand && saveMutation.mutate(selectedBrand.id)}
      />
    </div>
  );
}
