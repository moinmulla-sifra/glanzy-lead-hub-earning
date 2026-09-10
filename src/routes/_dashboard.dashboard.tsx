import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Sparkles, Bookmark, Send, TrendingUp, Compass } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useMonetization } from "@/lib/useMonetization";

export const Route = createFileRoute("/_dashboard/dashboard")({
  component: DashboardOverview,
});

function DashboardOverview() {
  const { data: sessionData } = useQuery({
    queryKey: ["auth_session"],
    queryFn: async () => {
      const { data } = await supabase.auth.getSession();
      return data.session;
    },
  });

  const userId = sessionData?.user?.id || null;

  // Dedupes with _dashboard.tsx
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

  const { data: counts } = useQuery({
    queryKey: ["dashboard-counts", workspaceId],
    enabled: !!workspaceId,
    queryFn: async () => {
      const { count: savedCount } = await supabase
        .from("saved_brands")
        .select("*", { count: "exact", head: true })
        .eq("workspace_id", workspaceId!);

      const { count: outreachCount } = await supabase
        .from("outreach")
        .select("*", { count: "exact", head: true })
        .eq("workspace_id", workspaceId!);

      return {
        saved: savedCount || 0,
        outreach: outreachCount || 0,
      };
    },
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Welcome back, {profile?.full_name?.split(" ")[0] || "there"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {workspace
              ? `Active Workspace: ${workspace.name}`
              : "Here's what's happening today."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-brand" />
            </div>
            <h3 className="font-semibold text-foreground">Discover</h3>
          </div>
          <div className="text-2xl font-bold mb-1">New</div>
          <p className="text-sm text-muted-foreground">Opportunities waiting</p>
        </div>

        <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Bookmark className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className="font-semibold text-foreground">Saved Brands</h3>
          </div>
          <div className="text-2xl font-bold mb-1">{counts?.saved || 0}</div>
          <p className="text-sm text-muted-foreground">In your pipeline</p>
        </div>

        <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
              <Send className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="font-semibold text-foreground">Active Outreach</h3>
          </div>
          <div className="text-2xl font-bold mb-1">{counts?.outreach || 0}</div>
          <p className="text-sm text-muted-foreground">Ongoing conversations</p>
        </div>

        <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-500" />
            </div>
            <h3 className="font-semibold text-foreground">Profile</h3>
          </div>
          <div className="text-2xl font-bold mb-1">
            {profile?.onboarding_completed ? "100%" : "50%"}
          </div>
          <p className="text-sm text-muted-foreground">Completion</p>
        </div>
      </div>

      <div className="bg-card border border-border/50 rounded-2xl p-12 text-center shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-brand/10 flex items-center justify-center mx-auto mb-6">
          <Compass className="w-8 h-8 text-brand" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-3">
          Your Branzly workspace is ready.
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto text-lg">
          Start discovering brands that match your niche, save them to your
          pipeline, and manage your outreach.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/discover"
            className="w-full sm:w-auto bg-brand text-brand-foreground font-semibold rounded-xl px-8 py-3 hover:bg-brand/90 transition-all shadow-lg shadow-brand/20"
          >
            Discover Brands
          </Link>
          {!profile?.onboarding_completed && (
            <Link
              to="/onboarding"
              className="w-full sm:w-auto bg-muted text-foreground font-semibold rounded-xl px-8 py-3 hover:bg-muted/80 transition-colors"
            >
              Complete Your Profile
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
