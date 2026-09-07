import { BRAND_SELECT_FIELDS } from "@/lib/constants";
import { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase, type Brand, type Profile } from "@/lib/supabase";
import { toast } from "sonner";
import { useMonetization } from "@/lib/useMonetization";
import { Link } from "@tanstack/react-router";
import {
  Sparkles,
  Star,
  Bookmark,
  ExternalLink,
  Activity,
  Send,
  Building2,
  TrendingUp,
  X,
} from "lucide-react";
import { BrandProfileModal } from "./BrandProfileModal";

export function ForYouView({ userId }: { userId: string | null }) {
  const queryClient = useQueryClient();
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [savedBrandIds, setSavedBrandIds] = useState<Set<string>>(new Set());

  // 1. Fetch Profile
  const profileQuery = useQuery({
    queryKey: ["profile", userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles").select("*")
        .eq("id", userId!)
        .single();
      if (error) throw error;
      return data as Profile;
    },
  });

  // 2. Fetch Workspace
  const { workspaceId } = useMonetization(userId);

  // 3. Fetch Saved Brands mapping
  const savedBrandsQuery = useQuery({
    queryKey: ["saved_brands_set", workspaceId],
    enabled: !!workspaceId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("saved_brands")
        .select("brand_id")
        .eq("workspace_id", workspaceId!);
      if (error) throw error;
      const ids = new Set<string>(data.map((d) => d.brand_id));
      setSavedBrandIds(ids);
      return ids;
    },
  });

  // 4. Fetch Outreach (to exclude won/lost)
  const outreachQuery = useQuery({
    queryKey: ["outreach_exclusion", workspaceId],
    enabled: !!workspaceId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("outreach")
        .select("brand_id, status")
        .eq("workspace_id", workspaceId!)
        .in("status", ["Won", "Lost"]);
      if (error) throw error;
      return new Set<string>(data.map((d) => d.brand_id));
    },
  });

  // 5. Fetch Candidate Brands
  const brandsQuery = useQuery({
    queryKey: ["foryou_brands"],
    enabled: !!profileQuery.data,
    queryFn: async () => {
      // Just fetch a healthy batch of brands, we will sort them client-side based on profile
      const { data, error } = await supabase
        .from("brands")
        .select(BRAND_SELECT_FIELDS)
        .limit(100)
        .order("influencer_fit_score", { ascending: false, nullsFirst: false });
      if (error) throw error;
      return data as Brand[];
    },
  });

  const toggleSaveMutation = useMutation({
    mutationFn: async ({
      brandId,
      isSaved,
    }: {
      brandId: string;
      isSaved: boolean;
    }) => {
      if (!workspaceId) throw new Error("No workspace selected");
      if (isSaved) {
        const { error } = await supabase
          .from("saved_brands")
          .delete()
          .eq("workspace_id", workspaceId)
          .eq("brand_id", brandId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("saved_brands")
          .insert({ workspace_id: workspaceId, brand_id: brandId });
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
      toast.success(
        variables.isSaved ? "Removed from Saved" : "Added to Saved",
      );
      queryClient.invalidateQueries({ queryKey: ["saved_brands_set"] });
      queryClient.invalidateQueries({ queryKey: ["saved_brands"] });
    },
    onError: (err: Error) =>
      toast.error(err.message || "Failed to update saved status"),
  });

  // 6. Recommendation Logic
  const recommendations = useMemo(() => {
    if (!profileQuery.data || !brandsQuery.data) return [];
    const profile = profileQuery.data;
    const excludeIds = outreachQuery.data || new Set();

    type RecItem = { brand: Brand; score: number; reasons: string[] };
    const scored: RecItem[] = [];

    for (const brand of brandsQuery.data) {
      if (excludeIds.has(brand.id)) continue;

      let score = 0;
      const reasons: string[] = [];
      let isNicheMatch = false;

      // Niche matching
      if (profile.niche && brand.industry) {
        if (
          brand.industry.toLowerCase().includes(profile.niche.toLowerCase()) ||
          profile.niche.toLowerCase().includes(brand.industry.toLowerCase())
        ) {
          score += 40;
          isNicheMatch = true;
          reasons.push(`Strong match for your ${profile.niche} niche`);
        } else if (brand.industry === "General") {
          score += 10;
        }
      }

      // Country matching
      if (
        profile.country &&
        brand.country &&
        profile.country === brand.country
      ) {
        score += 20;
        reasons.push("Based in your country");
      }

      // Fit score
      if (brand.influencer_fit_score && brand.influencer_fit_score > 75) {
        score += brand.influencer_fit_score / 2; // up to 50 pts
        reasons.push("High creator-fit score");
      }

      // Activity signals
      if (brand.recent_funding) {
        score += 15;
        reasons.push("Recently funded");
      }
      if (brand.recent_launch) {
        score += 15;
        reasons.push("Recently launched a campaign");
      }

      // Give a small baseline based on lead score
      if (brand.lead_score) {
        score += brand.lead_score / 10; // up to 10 pts
      }

      // If no niche match but other things match, we can still recommend, but lower priority
      if (score > 30) {
        scored.push({ brand, score, reasons });
      }
    }

    return scored.sort((a, b) => b.score - a.score);
  }, [profileQuery.data, brandsQuery.data, outreachQuery.data]);

  const isLoading = profileQuery.isLoading || brandsQuery.isLoading;
  const isProfileIncomplete =
    profileQuery.isSuccess &&
    !profileQuery.data?.niche &&
    !profileQuery.data?.platforms?.length;

  return (
    <div className="flex flex-col h-full gap-6 lg:gap-8 pb-12 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground flex items-center gap-3">
          <Sparkles className="text-brand" size={32} /> For You
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Brand opportunities picked for your profile and interests.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-card rounded-3xl p-6 border border-border/50 shadow-sm animate-pulse h-64"
            ></div>
          ))}
        </div>
      ) : isProfileIncomplete ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-16 bg-card border border-border/60 rounded-3xl subtle-shadow">
          <div className="w-20 h-20 rounded-3xl bg-brand/10 flex items-center justify-center mb-6 border border-brand/20 shadow-sm">
            <Sparkles className="w-10 h-10 text-brand" />
          </div>
          <h2 className="text-2xl font-bold mb-3 text-foreground">
            Let's improve your matches
          </h2>
          <p className="text-muted-foreground max-w-md mb-8 text-lg">
            Tell us a little more about your content and we'll personalize your
            brand opportunities.
          </p>
          <Link
            to="/profile"
            className="px-6 py-3 bg-brand text-brand-foreground rounded-xl text-sm font-semibold hover:bg-brand/90 transition-colors shadow-sm"
          >
            Complete Profile
          </Link>
        </div>
      ) : brandsQuery.data?.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-16 bg-card border border-border/60 rounded-3xl subtle-shadow">
          <h2 className="text-2xl font-bold mb-3">No opportunities yet</h2>
          <p className="text-muted-foreground max-w-md text-lg">
            Branzly doesn't have enough brand data to build recommendations yet.
          </p>
        </div>
      ) : recommendations.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-16 bg-card border border-border/60 rounded-3xl subtle-shadow">
          <h2 className="text-2xl font-bold mb-3">
            We couldn't find a strong match yet
          </h2>
          <p className="text-muted-foreground max-w-md mb-8 text-lg">
            Try expanding your profile or checking Discover for more
            opportunities.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/profile"
              className="px-6 py-3 bg-muted text-foreground rounded-xl text-sm font-semibold hover:bg-muted/80 transition-colors shadow-sm"
            >
              Complete Profile
            </Link>
            <Link
              to="/discover"
              className="px-6 py-3 bg-brand text-brand-foreground rounded-xl text-sm font-semibold hover:bg-brand/90 transition-colors shadow-sm"
            >
              Explore Discover
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          {/* Top Matches Section */}
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Star className="text-yellow-500 fill-yellow-500" size={20} /> Top
              Matches
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.slice(0, 6).map((rec) => (
                <RecommendationCard
                  key={rec.brand.id}
                  rec={rec}
                  isSaved={savedBrandIds.has(rec.brand.id)}
                  onToggleSave={() => toggleSaveMutation.mutate({ brandId: rec.brand.id, isSaved: savedBrandIds.has(rec.brand.id) })}
                  onClickView={() => setSelectedBrand(rec.brand)}
                />
              ))}
            </div>
          </section>

          {/* Trending Opportunities (Only show if we have enough recs) */}
          {recommendations.length > 6 && (
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="text-brand" size={20} /> Trending For You
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.slice(6, 12).map((rec) => (
                  <RecommendationCard
                    key={rec.brand.id}
                    rec={rec}
                    isSaved={savedBrandIds.has(rec.brand.id)}
                    onToggleSave={() =>
                      toggleSaveMutation.mutate({
                        brandId: rec.brand.id,
                        isSaved: savedBrandIds.has(rec.brand.id),
                      })
                    }
                    onClickView={() => setSelectedBrand(rec.brand)}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {selectedBrand && workspaceId && (
        <BrandProfileModal
          brand={selectedBrand}
          isOpen={true}
                    onClose={() => setSelectedBrand(null)}
          isSaved={savedBrandIds.has(selectedBrand.id)}
          isSaving={toggleSaveMutation.isPending} onSave={() => toggleSaveMutation.mutate({ brandId: selectedBrand.id, isSaved: savedBrandIds.has(selectedBrand.id) })} onStartOutreach={() => {}}
        />
      )}
    </div>
  );
}

function RecommendationCard({
  rec,
  isSaved,
  onToggleSave,
  onClickView,
}: {
  rec: { brand: Brand; score: number; reasons: string[] };
  isSaved: boolean;
  onToggleSave: () => void;
  onClickView: () => void;
}) {
  const { brand, score, reasons } = rec;
  const matchPercentage = Math.min(99, Math.max(65, Math.floor(score)));

  return (
    <div className="bg-card rounded-3xl border border-border/60 overflow-hidden flex flex-col subtle-shadow hover:-translate-y-1 hover:shadow-xl hover:border-brand/30 transition-all duration-300">
      <div
        className="p-6 flex-1 flex flex-col cursor-pointer"
        onClick={onClickView}
      >
        <div className="flex justify-between items-start mb-4 gap-3">
          <h3 className="text-xl font-bold text-foreground leading-tight line-clamp-2">
            {brand.company_name}
          </h3>
          <div className="flex items-center gap-1 bg-brand/10 text-brand px-2.5 py-1 rounded-full text-xs font-bold border border-brand/20 shrink-0">
            <Star className="w-3 h-3" />
            {matchPercentage}% Match
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {brand.industry && (
            <span className="px-2.5 py-1 bg-muted/50 text-muted-foreground border border-border/50 rounded-lg text-xs font-medium">
              {brand.industry}
            </span>
          )}
          {brand.country && (
            <span className="px-2.5 py-1 bg-muted/50 text-muted-foreground border border-border/50 rounded-lg text-xs font-medium">
              {brand.country}
            </span>
          )}
        </div>

        {reasons.length > 0 && (
          <div className="mt-auto bg-muted/30 p-3 rounded-xl border border-border/50 space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Why this brand?
            </p>
            <ul className="text-sm space-y-1">
              {reasons.slice(0, 2).map((reason, i) => (
                <li
                  key={i}
                  className="flex items-start gap-1.5 text-foreground/80"
                >
                  <Check size={14} className="text-brand shrink-0 mt-0.5" />
                  <span className="line-clamp-2 leading-tight">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-border/50 bg-muted/10 flex items-center gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClickView();
          }}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-foreground text-background rounded-xl text-sm font-semibold hover:bg-foreground/90 transition-colors"
        >
          View Brand
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave();
          }}
          className={`p-2.5 rounded-xl border transition-colors ${
            isSaved
              ? "bg-brand/10 border-brand/30 text-brand hover:bg-brand/20"
              : "bg-background border-border hover:bg-muted text-muted-foreground"
          }`}
          title={isSaved ? "Remove from Saved" : "Save Brand"}
        >
          <Bookmark size={20} className={isSaved ? "fill-brand" : ""} />
        </button>
      </div>
    </div>
  );
}

function Check({ size, className }: { size: number; className: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}
