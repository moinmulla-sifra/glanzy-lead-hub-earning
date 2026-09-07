import { BRAND_SELECT_FIELDS } from "@/lib/constants";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useMonetization } from "@/lib/useMonetization";

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
  ChevronUp,
  Sparkles,
  SlidersHorizontal,
  Loader2,
  Building2,
  AlertCircle,
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

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm.trim()), 400);
    return () => clearTimeout(t);
  }, [searchTerm]);

  const { workspaceId } = useMonetization(userId);

  const savedQuery = useQuery({
    queryKey: ["saved_brands_ids", workspaceId],
    enabled: !!workspaceId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("saved_brands")
        .select("brand_id")
        .eq("workspace_id", workspaceId!);
      if (error) throw error;
      return new Set(data.map((d) => d.brand_id));
    },
  });

  const savedIds = savedQuery.data || new Set();

  const fetchBrands = async ({ pageParam = 0 }) => {
    const pageSize = 12;
    let q = supabase.from("brands").select(BRAND_SELECT_FIELDS, { count: "exact" });

    if (debouncedSearch) {
      q = q.or(
        `company_name.ilike.%${debouncedSearch}%,industry.ilike.%${debouncedSearch}%,country.ilike.%${debouncedSearch}%`,
      );
    }

    // Filters
    if (activeFilters.industry.length > 0) {
      q = q.in("industry", activeFilters.industry);
    }
    if (activeFilters.country.length > 0) {
      q = q.in("country", activeFilters.country);
    }
    if (activeFilters.company_stage.length > 0) {
      q = q.in("company_stage", activeFilters.company_stage);
    }
    if (activeFilters.budget_potential.length > 0) {
      q = q.in("budget_potential", activeFilters.budget_potential);
    }

    // Sorting
    switch (sortOption) {
      case "lead_score":
        q = q.order("lead_score", { ascending: false, nullsFirst: false });
        break;
      case "creator_fit":
        q = q.order("influencer_fit_score", {
          ascending: false,
          nullsFirst: false,
        });
        break;
      case "recent":
        q = q.order("updated_at", { ascending: false });
        break;
      case "az":
        q = q.order("company_name", { ascending: true });
        break;
      case "best_match":
      default:
        // Default combo sort
        q = q
          .order("lead_score", { ascending: false, nullsFirst: false })
          .order("influencer_fit_score", {
            ascending: false,
            nullsFirst: false,
          });
        break;
    }

    // Pagination
    q = q.range(pageParam * pageSize, (pageParam + 1) * pageSize - 1);

    const { data, error, count } = await q;
    if (error) throw error;

    return {
      brands: data as Brand[],
      totalCount: count || 0,
      nextPage: data.length === pageSize ? pageParam + 1 : undefined,
    };
  };

  const {
    data: brandsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isBrandsLoading,
    isError: isBrandsError,
  } = useInfiniteQuery({
    queryKey: ["brands", debouncedSearch, activeFilters, sortOption],
    queryFn: fetchBrands,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const allBrands = brandsData?.pages.flatMap((page) => page.brands) || [];
  const totalCount = brandsData?.pages[0]?.totalCount || 0;

  const saveMutation = useMutation({
    mutationFn: async (brandId: string) => {
      if (!workspaceId) throw new Error("No workspace found");

      const isCurrentlySaved = savedIds.has(brandId);

      if (isCurrentlySaved) {
        // Unsave
        const { error } = await supabase
          .from("saved_brands")
          .delete()
          .match({ workspace_id: workspaceId, brand_id: brandId });
        if (error) throw error;
        return { action: "unsaved", brandId };
      } else {
        // Save
        const { error } = await supabase.from("saved_brands").insert({
          workspace_id: workspaceId,
          brand_id: brandId,
          status: "Saved",
        });
        if (error) throw error;
        return { action: "saved", brandId };
      }
    },
    onSuccess: (result) => {
      if (result.action === "saved") {
        toast.success("Brand saved to Outreach pipeline");
      } else {
        toast.success("Brand removed from pipeline");
      }
      queryClient.invalidateQueries({ queryKey: ["saved_brands_ids"] });
      queryClient.invalidateQueries({ queryKey: ["saved_brands_query"] });
      queryClient.invalidateQueries({ queryKey: ["outreach"] });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Could not update saved status");
    },
  });

  const toggleFilter = (
    category: keyof typeof activeFilters,
    value: string,
  ) => {
    setActiveFilters((prev) => {
      const current = prev[category];
      if (current.includes(value)) {
        return { ...prev, [category]: current.filter((v) => v !== value) };
      } else {
        return { ...prev, [category]: [...current, value] };
      }
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

  const activeFiltersCount = Object.values(activeFilters).reduce(
    (acc, curr) => acc + curr.length,
    0,
  );

  // Fetch unique filter options based on existing data (in a real app, these could be cached lookups)
  const filterOptions = {
    industry: [
      "Beauty",
      "Fashion",
      "Tech",
      "Food & Beverage",
      "Health",
      "Fitness",
      "SaaS",
      "E-commerce",
    ],
    country: [
      "United States",
      "United Kingdom",
      "Canada",
      "Australia",
      "India",
      "Germany",
    ],
    company_stage: ["Startup", "Growing", "Established", "Enterprise"],
    budget_potential: ["Very High", "High", "Medium", "Low", "Unknown"],
  };

  return (
    <div className="flex flex-col gap-6 lg:gap-8 pb-12 animate-in fade-in duration-500 h-full">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
          Discover Brands
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Find brands that could be a strong fit for your next collaboration.
        </p>
      </div>

      {/* Search and Filter Toolbar */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-3 items-center bg-card p-2 rounded-2xl border border-border/60 shadow-sm subtle-shadow">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search brands, industries, products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-transparent border-none focus:ring-0 text-base placeholder:text-muted-foreground"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="hidden sm:block w-px h-8 bg-border" />

          <div className="flex items-center gap-2 w-full sm:w-auto px-2">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors
                ${
                  isFilterOpen || activeFiltersCount > 0
                    ? "bg-brand/10 text-brand"
                    : "bg-muted/50 text-foreground hover:bg-muted"
                }
              `}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] text-white">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            <div className="relative group flex-1 sm:flex-none">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="w-full sm:w-auto appearance-none bg-muted/50 text-foreground text-sm font-semibold px-4 py-2.5 pr-10 rounded-xl cursor-pointer hover:bg-muted transition-colors border-none focus:ring-2 focus:ring-brand"
              >
                <option value="best_match">Best Match</option>
                <option value="lead_score">Highest Lead Score</option>
                <option value="creator_fit">Highest Creator Fit</option>
                <option value="recent">Recently Verified</option>
                <option value="az">Company A–Z</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none group-hover:text-foreground" />
            </div>
          </div>
        </div>

        {/* Expandable Filter Panel */}
        {isFilterOpen && (
          <div className="bg-card border border-border/60 rounded-2xl p-6 shadow-sm animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-foreground">Advanced Filters</h3>
              <button
                onClick={clearFilters}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Clear all
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Filter columns */}
              {Object.entries(filterOptions).map(([category, options]) => (
                <div key={category}>
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                    {category.replace("_", " ")}
                  </h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                    {options.map((option) => {
                      const isActive =
                        activeFilters[
                          category as keyof typeof activeFilters
                        ].includes(option);
                      return (
                        <label
                          key={option}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center transition-colors
                            ${isActive ? "bg-brand border-brand" : "border-input group-hover:border-brand/50"}
                          `}
                          >
                            {isActive && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <span
                            className={`text-sm ${isActive ? "text-foreground font-medium" : "text-muted-foreground"}`}
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
          </div>
        )}

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && !isFilterOpen && (
          <div className="flex flex-wrap items-center gap-2 px-1">
            <span className="text-sm text-muted-foreground mr-2">
              Active filters:
            </span>
            {Object.entries(activeFilters).map(([category, values]) =>
              values.map((val) => (
                <span
                  key={`${category}-${val}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/80 text-xs font-medium text-foreground border border-border/50"
                >
                  {val}
                  <button
                    onClick={() =>
                      toggleFilter(category as keyof typeof activeFilters, val)
                    }
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X size={12} />
                  </button>
                </span>
              )),
            )}
            <button
              onClick={clearFilters}
              className="text-xs font-medium text-brand hover:underline ml-2"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between px-1">
        <p className="text-sm font-medium text-muted-foreground">
          {isBrandsLoading ? (
            "Searching..."
          ) : (
            <>{totalCount === 1 ? "1 brand" : `${totalCount} brands`} found</>
          )}
        </p>
      </div>

      {/* Main Content Area */}
      {isBrandsError ? (
        <div className="flex flex-col items-center justify-center text-center p-12 bg-destructive/5 border border-destructive/20 rounded-3xl">
          <AlertCircle className="w-12 h-12 text-destructive mb-4" />
          <h2 className="text-xl font-bold mb-2">We couldn't load brands</h2>
          <p className="text-muted-foreground max-w-sm mb-6">
            Something went wrong while loading opportunities. Please check your
            connection and try again.
          </p>
          <button
            onClick={() =>
              queryClient.invalidateQueries({ queryKey: ["brands"] })
            }
            className="px-6 py-2.5 bg-background border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors"
          >
            Try again
          </button>
        </div>
      ) : isBrandsLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="rounded-3xl border border-border/50 bg-card p-6 h-[320px] animate-pulse flex flex-col justify-between"
            >
              <div>
                <div className="h-7 w-2/3 bg-muted rounded-lg mb-4" />
                <div className="h-5 w-1/3 bg-muted rounded-md mb-2" />
                <div className="h-5 w-1/2 bg-muted rounded-md" />
              </div>
              <div className="h-11 w-full bg-muted rounded-xl mt-6" />
            </div>
          ))}
        </div>
      ) : allBrands.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center p-16 bg-card border border-border/60 rounded-3xl">
          <div className="w-20 h-20 rounded-3xl bg-muted/50 flex items-center justify-center mb-6 border border-border/50 shadow-sm">
            <Search className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-3">
            {debouncedSearch || activeFiltersCount > 0
              ? "No brands found"
              : "No brands yet"}
          </h2>
          <p className="text-muted-foreground max-w-md mb-8 text-lg">
            {debouncedSearch || activeFiltersCount > 0
              ? "Try changing your search or removing some filters to see more opportunities."
              : "Branzly hasn't added any brand opportunities to your instance yet. New opportunities will appear here once the database is populated."}
          </p>
          {(debouncedSearch || activeFiltersCount > 0) && (
            <button
              onClick={() => {
                setSearchTerm("");
                clearFilters();
              }}
              className="px-6 py-3 bg-brand text-brand-foreground rounded-xl text-sm font-semibold hover:bg-brand/90 transition-colors shadow-sm"
            >
              Clear search & filters
            </button>
          )}
        </div>
      ) : (
        <>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {allBrands.map((brand) => {
              const isSaved = savedIds.has(brand.id);

              // Determine primary signal
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
                  className="group flex flex-col bg-card rounded-3xl border border-border/60 hover:border-brand/40 overflow-hidden subtle-shadow transition-all hover:-translate-y-1 duration-300"
                >
                  <div
                    className="p-6 flex-1 flex flex-col cursor-pointer"
                    onClick={() => setSelectedBrand(brand)}
                  >
                    <div className="flex justify-between items-start mb-4 gap-3">
                      <h3 className="text-xl font-bold text-foreground leading-tight line-clamp-2">
                        {brand.company_name}
                      </h3>
                      {brand.lead_score != null && (
                        <div
                          className="flex items-center gap-1 bg-muted text-foreground px-2.5 py-1 rounded-full text-xs font-bold border border-border/50 shrink-0"
                          title="Lead Score"
                        >
                          <TrendingUp className="w-3 h-3 text-muted-foreground" />
                          {brand.lead_score}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {brand.industry && (
                        <span className="px-2.5 py-1 bg-muted/50 text-muted-foreground border border-border/50 rounded-lg text-xs font-medium">
                          {brand.industry}
                        </span>
                      )}
                      {brand.country && (
                        <span className="flex items-center gap-1 px-2.5 py-1 bg-muted/50 text-muted-foreground border border-border/50 rounded-lg text-xs font-medium">
                          <Globe className="w-3 h-3" />
                          {brand.country}
                        </span>
                      )}
                    </div>

                    {signal && (
                      <div className="mb-4">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md
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
                      <div className="mt-auto mb-6">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                          <span className="font-semibold text-foreground flex items-center gap-1">
                            <Star className="w-3 h-3 text-brand" /> Creator Fit
                          </span>
                          <span className="font-bold text-foreground">
                            {brand.influencer_fit_score}/100
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-brand transition-all duration-1000"
                            style={{ width: `${brand.influencer_fit_score}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div
                      className="mt-auto pt-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        disabled={
                          saveMutation.isPending &&
                          saveMutation.variables === brand.id
                        }
                        onClick={() => saveMutation.mutate(brand.id)}
                        className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200
                          ${
                            isSaved
                              ? "bg-muted text-foreground border border-border/50 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 group/btn"
                              : "bg-brand text-brand-foreground hover:bg-brand/90 shadow-sm hover:shadow-md"
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
            <div className="flex justify-center mt-8">
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="flex items-center gap-2 px-8 py-3 bg-muted text-foreground rounded-xl text-sm font-semibold hover:bg-muted/80 transition-colors border border-border/50 shadow-sm disabled:opacity-50"
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
