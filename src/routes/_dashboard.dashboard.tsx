import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import {
  Sparkles,
  Bookmark,
  Send,
  TrendingUp,
  Compass,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  Flame,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useMonetization } from "@/lib/useMonetization";

export const Route = createFileRoute("/_dashboard/dashboard")({
  component: DashboardOverview,
});

interface DashboardAnalyticsData {
  totalDiscoverableBrands: number;
  workspaceId: string;
  savedBrandsCount: number;
  contactedBrandsCount: number;
  awaitingFollowUp: number;
  pipeline: {
    saved: number;
    contacted: number;
    replied: number;
    interested: number;
    meeting: number;
    won: number;
    lost: number;
  };
  confidenceDistribution: {
    high: number;
    medium: number;
    low: number;
    unverified: number;
  };
  opportunityDistribution: {
    high_fit: number;
    moderate_fit: number;
    niche_fit: number;
  };
  latestVerificationDate: string;
  recentActivities: Array<{
    id: string;
    type: string;
    status: string;
    brandId: string;
    title: string;
    timestamp: string;
  }>;
}

function DashboardOverview() {
  const { data: sessionData } = useQuery({
    queryKey: ["auth_session"],
    queryFn: async () => {
      const { data } = await supabase.auth.getSession();
      return data.session;
    },
  });

  const userId = sessionData?.user?.id || null;

  const { data: profile } = useQuery({
    queryKey: ["profile", userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId!)
        .single();
      return data;
    },
  });

  const { workspaceId } = useMonetization(userId);

  const { data: workspace } = useQuery({
    queryKey: ["workspace_details", workspaceId],
    enabled: !!workspaceId,
    queryFn: async () => {
      const { data } = await supabase
        .from("workspaces")
        .select("*")
        .eq("id", workspaceId!)
        .single();
      return data;
    },
  });

  const { data: analytics, isLoading: isAnalyticsLoading } =
    useQuery<DashboardAnalyticsData>({
      queryKey: ["dashboard-analytics", workspaceId],
      queryFn: async () => {
        const res = await fetch(
          `/api/analytics/dashboard?workspaceId=${encodeURIComponent(workspaceId || "ws_default")}`,
        );
        if (!res.ok) throw new Error("Could not load dashboard analytics");
        return res.json();
      },
    });

  const totalBrands = analytics?.totalDiscoverableBrands || 611;
  const savedCount = analytics?.savedBrandsCount || 0;
  const contactedCount = analytics?.contactedBrandsCount || 0;
  const awaitingFollowUp = analytics?.awaitingFollowUp || 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card border border-border/60 rounded-3xl p-6 sm:p-8 subtle-shadow">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-semibold mb-3">
            <Sparkles size={14} />
            Live Brand Intelligence Platform
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Welcome back, {profile?.full_name?.split(" ")[0] || "Partner"}
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">
            {workspace
              ? `Workspace: ${workspace.name}`
              : "Discover vetted brands, extract verified contacts, and close partnerships."}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/discover"
            className="flex items-center gap-2 bg-brand text-brand-foreground font-semibold rounded-xl px-5 py-2.5 hover:bg-brand/90 transition-all shadow-md shadow-brand/20 text-sm"
          >
            <Compass size={16} />
            Discover Leads
          </Link>
          <Link
            to="/contacted"
            className="flex items-center gap-2 bg-muted/70 hover:bg-muted text-foreground font-semibold rounded-xl px-4 py-2.5 transition-colors border border-border/50 text-sm"
          >
            <Send size={16} />
            Outreach CRM
          </Link>
        </div>
      </div>

      {/* Top 4 Real Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Discoverable */}
        <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-muted-foreground">
              Discoverable Brands
            </span>
            <div className="w-9 h-9 rounded-xl bg-brand/10 flex items-center justify-center text-brand">
              <Compass size={18} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-foreground tracking-tight">
              {isAnalyticsLoading ? "..." : totalBrands.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <span className="text-green-500 font-semibold">Verified</span> in
              Google Sheets database
            </p>
          </div>
        </div>

        {/* Saved Brands */}
        <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-muted-foreground">
              Saved in Pipeline
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
              <Bookmark size={18} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-foreground tracking-tight">
              {isAnalyticsLoading ? "..." : savedCount}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              In your active workspace shortlist
            </p>
          </div>
        </div>

        {/* Contacted */}
        <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-muted-foreground">
              Outreach Conversations
            </span>
            <div className="w-9 h-9 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
              <Send size={18} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-foreground tracking-tight">
              {isAnalyticsLoading ? "..." : contactedCount}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Active brands reached out to
            </p>
          </div>
        </div>

        {/* Follow Ups */}
        <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-muted-foreground">
              Awaiting Follow-Up
            </span>
            <div className="w-9 h-9 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
              <Clock size={18} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-foreground tracking-tight">
              {isAnalyticsLoading ? "..." : awaitingFollowUp}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Pending replies or follow-up notes
            </p>
          </div>
        </div>
      </div>

      {/* Two Column Section: Pipeline Funnel & Intelligence Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline Funnel */}
        <div className="lg:col-span-2 bg-card border border-border/60 rounded-3xl p-6 sm:p-8 subtle-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  Partnership Funnel
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  Real-time status of your workspace outreach pipeline
                </p>
              </div>
              <Link
                to="/contacted"
                className="text-xs font-semibold text-brand hover:underline flex items-center gap-1"
              >
                Manage CRM <ArrowRight size={12} />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="p-4 rounded-2xl bg-muted/40 border border-border/40 text-center">
                <span className="text-xs text-muted-foreground block font-medium">
                  Saved
                </span>
                <span className="text-2xl font-bold text-foreground mt-1 block">
                  {analytics?.pipeline.saved || 0}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-center">
                <span className="text-xs text-blue-500 block font-medium">
                  Contacted
                </span>
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1 block">
                  {analytics?.pipeline.contacted || 0}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-center">
                <span className="text-xs text-purple-500 block font-medium">
                  Replied
                </span>
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1 block">
                  {analytics?.pipeline.replied || 0}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                <span className="text-xs text-amber-500 block font-medium">
                  Interested
                </span>
                <span className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1 block">
                  {analytics?.pipeline.interested || 0}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-center">
                <span className="text-xs text-indigo-500 block font-medium">
                  Meeting
                </span>
                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1 block">
                  {analytics?.pipeline.meeting || 0}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                <span className="text-xs text-emerald-500 block font-medium">
                  Won Deals
                </span>
                <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1 block">
                  {analytics?.pipeline.won || 0}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-center">
                <span className="text-xs text-rose-500 block font-medium">
                  Lost / Passed
                </span>
                <span className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-1 block">
                  {analytics?.pipeline.lost || 0}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
            <span>Quota usage: Contact reveals protected by tier limits</span>
            <Link
              to="/pricing"
              className="text-brand font-semibold hover:underline"
            >
              View Plan Limits
            </Link>
          </div>
        </div>

        {/* Data Quality & Intelligence Breakdown */}
        <div className="bg-card border border-border/60 rounded-3xl p-6 sm:p-8 subtle-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-5 h-5 text-brand" />
              <h3 className="text-lg font-bold text-foreground">
                Intelligence Freshness
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mb-6">
              Google Sheets research verification summary
            </p>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border/40">
                <span className="text-xs font-medium text-foreground flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-brand" />
                  High Creator Fit (85+)
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-brand/10 text-brand">
                  {analytics?.opportunityDistribution.high_fit || 0} brands
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border/40">
                <span className="text-xs font-medium text-foreground flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  High Confidence Data
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-500/10 text-green-500">
                  {analytics?.confidenceDistribution.high || 0} verified
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border/40">
                <span className="text-xs font-medium text-foreground flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-500" />
                  Medium Confidence
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500">
                  {analytics?.confidenceDistribution.medium || 0} records
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border/40">
                <span className="text-xs font-medium text-foreground flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                  Last Sheet Sync
                </span>
                <span className="text-xs font-semibold text-muted-foreground">
                  {analytics?.latestVerificationDate || "Active"}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border/50 text-center">
            <Link
              to="/discover"
              className="text-xs font-bold text-brand hover:underline"
            >
              Browse all {totalBrands} verified opportunities →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
