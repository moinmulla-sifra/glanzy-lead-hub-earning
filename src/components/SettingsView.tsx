import { useState, useEffect } from "react";
import { useMonetization } from "@/lib/useMonetization";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  supabase,
  type Profile,
  type Workspace,
  type WorkspaceMember,
} from "@/lib/supabase";
import { toast } from "sonner";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  User,
  Building2,
  Shield,
  Bell,
  CreditCard,
  AlertTriangle,
  Info,
  LogOut,
  Save,
  Loader2,
  Key,
  Sparkles,
} from "lucide-react";

export function SettingsView({ userId }: { userId: string | null }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("account");

  const profileQuery = useQuery({
    queryKey: ["profile", userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId!)
        .single();
      if (error) throw error;
      return data as Profile;
    },
  });

  const workspaceMemberQuery = useQuery({
    queryKey: ["workspace_member_settings", userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("workspace_members")
        .select("*, workspaces(*)")
        .eq("user_id", userId!)
        .single();

      if (error) throw error;
      return {
        member: data as unknown as WorkspaceMember,
        workspace: data.workspaces as unknown as Workspace,
      };
    },
  });

  const memberInfo = workspaceMemberQuery.data?.member;
  const workspaceInfo = workspaceMemberQuery.data?.workspace;
  const isWorkspaceAdmin =
    memberInfo?.role === "owner" || memberInfo?.role === "admin";

  const [workspaceName, setWorkspaceName] = useState("");
  useEffect(() => {
    if (workspaceInfo?.name) {
      setWorkspaceName(workspaceInfo.name);
    }
  }, [workspaceInfo?.name]);

  const updateWorkspaceMutation = useMutation({
    mutationFn: async (newName: string) => {
      if (!workspaceInfo?.id) throw new Error("Workspace not found");
      const { error } = await supabase
        .from("workspaces")
        .update({ name: newName, updated_at: new Date().toISOString() })
        .eq("id", workspaceInfo.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Workspace settings saved");
      queryClient.invalidateQueries({
        queryKey: ["workspace_member_settings"],
      });
    },
    onError: (err: Error) =>
      toast.error(err.message || "Failed to update workspace"),
  });

  const [password, setPassword] = useState("");
  const updatePasswordMutation = useMutation({
    mutationFn: async (newPassword: string) => {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Password updated successfully");
      setPassword("");
    },
    onError: (err: Error) =>
      toast.error(err.message || "Failed to update password"),
  });

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  const tabs = [
    { id: "account", label: "Account", icon: User },
    { id: "workspace", label: "Workspace", icon: Building2 },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "subscription", label: "Subscription", icon: CreditCard },
    { id: "about", label: "About", icon: Info },
    { id: "danger", label: "Danger Zone", icon: AlertTriangle, danger: true },
  ];

  if (!userId || profileQuery.isLoading || workspaceMemberQuery.isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-brand" />
      </div>
    );
  }

  const profile = profileQuery.data;

  return (
    <div className="flex flex-col lg:flex-row h-full gap-8 pb-12 animate-in fade-in duration-500 max-w-6xl mx-auto w-full">
      {/* Sidebar Navigation */}
      <div className="lg:w-64 shrink-0 flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-4 px-2">
          Settings
        </h1>

        <nav className="flex flex-col gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all
                  ${
                    isActive
                      ? tab.danger
                        ? "bg-destructive/10 text-destructive"
                        : "bg-brand/10 text-brand"
                      : tab.danger
                        ? "text-destructive/70 hover:bg-destructive/10 hover:text-destructive"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }
                `}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-card border border-border/60 rounded-3xl p-6 lg:p-10 subtle-shadow min-h-[500px]">
        {/* ACCOUNT TAB */}
        {activeTab === "account" && (
          <div className="space-y-8 animate-in fade-in">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-1">
                Account
              </h2>
              <p className="text-muted-foreground text-sm">
                Manage your personal profile details.
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-muted border border-border/50 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={32} className="text-muted-foreground" />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-lg font-bold text-foreground">
                  {profile?.full_name || "Anonymous User"}
                </span>
                <span className="text-sm text-muted-foreground">
                  User ID: {profile?.id}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2.5 py-0.5 bg-muted rounded-md text-xs font-semibold capitalize border border-border/50">
                    {profile?.account_type || "Creator"} Account
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-border/50 pt-8 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground">
                  Creator Profile
                </h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Update your niche, connected platforms, and bio used for brand
                  matching.
                </p>
              </div>
              <Link
                to="/profile"
                className="px-5 py-2.5 bg-foreground text-background font-semibold rounded-xl text-sm hover:bg-foreground/90 transition-colors shadow-sm"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        )}

        {/* WORKSPACE TAB */}
        {activeTab === "workspace" && (
          <div className="space-y-8 animate-in fade-in">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-1">
                Workspace
              </h2>
              <p className="text-muted-foreground text-sm">
                Manage shared configuration for your team or agency.
              </p>
            </div>

            <div className="space-y-5 max-w-lg">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">
                  Workspace Name
                </label>
                <input
                  type="text"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  disabled={
                    !isWorkspaceAdmin || updateWorkspaceMutation.isPending
                  }
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 disabled:opacity-50"
                  placeholder="Enter workspace name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/30 p-4 rounded-xl border border-border/50">
                  <p className="text-xs text-muted-foreground font-semibold uppercase mb-1">
                    Type
                  </p>
                  <p className="font-medium capitalize">
                    {workspaceInfo?.workspace_type || "Creator"}
                  </p>
                </div>
                <div className="bg-muted/30 p-4 rounded-xl border border-border/50">
                  <p className="text-xs text-muted-foreground font-semibold uppercase mb-1">
                    Your Role
                  </p>
                  <p className="font-medium capitalize">
                    {memberInfo?.role || "Member"}
                  </p>
                </div>
              </div>

              {isWorkspaceAdmin && (
                <button
                  onClick={() => updateWorkspaceMutation.mutate(workspaceName)}
                  disabled={
                    updateWorkspaceMutation.isPending ||
                    workspaceName === workspaceInfo?.name
                  }
                  className="flex items-center gap-2 px-5 py-2.5 bg-brand text-brand-foreground font-semibold rounded-xl text-sm hover:bg-brand/90 transition-colors shadow-sm disabled:opacity-50"
                >
                  {updateWorkspaceMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save Workspace
                </button>
              )}
            </div>

            {profile?.account_type === "agency" && (
              <div className="border-t border-border/50 pt-8 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">
                    Team Management
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Invite members and manage permissions for your agency.
                  </p>
                </div>
                <button
                  disabled
                  className="px-5 py-2.5 bg-muted text-muted-foreground font-semibold rounded-xl text-sm opacity-50 cursor-not-allowed"
                >
                  Coming Soon
                </button>
              </div>
            )}
          </div>
        )}

        {/* SECURITY TAB */}
        {activeTab === "security" && (
          <div className="space-y-8 animate-in fade-in">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-1">
                Security
              </h2>
              <p className="text-muted-foreground text-sm">
                Manage your password and session.
              </p>
            </div>

            <div className="max-w-md space-y-4">
              <h3 className="font-semibold text-foreground">Change Password</h3>
              <div className="space-y-2">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New password"
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50"
                />
              </div>
              <button
                onClick={() => {
                  if (password.length < 6) {
                    toast.error("Password must be at least 6 characters");
                    return;
                  }
                  updatePasswordMutation.mutate(password);
                }}
                disabled={!password || updatePasswordMutation.isPending}
                className="flex items-center gap-2 px-5 py-2.5 bg-foreground text-background font-semibold rounded-xl text-sm hover:bg-foreground/90 transition-colors shadow-sm disabled:opacity-50"
              >
                {updatePasswordMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Key className="w-4 h-4" />
                )}
                Update Password
              </button>
            </div>

            <div className="border-t border-border/50 pt-8">
              <h3 className="font-semibold text-foreground mb-4">
                Active Session
              </h3>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-5 py-2.5 bg-muted text-foreground font-semibold rounded-xl text-sm hover:bg-muted/80 transition-colors border border-border/50 shadow-sm"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* NOTIFICATIONS TAB */}
        {activeTab === "notifications" && (
          <div className="space-y-8 animate-in fade-in">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-1">
                Notifications
              </h2>
              <p className="text-muted-foreground text-sm">
                Control when and how you are contacted.
              </p>
            </div>

            <div className="space-y-6 max-w-lg">
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border/50">
                <div>
                  <h4 className="font-semibold text-sm">
                    Recommendation Alerts
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Get notified about strong new brand matches.
                  </p>
                </div>
                <div className="w-10 h-6 bg-brand rounded-full relative opacity-50 cursor-not-allowed">
                  <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm"></div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border/50">
                <div>
                  <h4 className="font-semibold text-sm">Product Updates</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Receive news about Branzly features.
                  </p>
                </div>
                <div className="w-10 h-6 bg-brand rounded-full relative opacity-50 cursor-not-allowed">
                  <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm"></div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                Email notification preferences will be available in an upcoming
                release.
              </p>
            </div>
          </div>
        )}

        {/* SUBSCRIPTION TAB */}
        {activeTab === "subscription" && (
          <SubscriptionSettings userId={userId} />
        )}

        {/* ABOUT TAB */}
        {activeTab === "about" && (
          <div className="space-y-8 animate-in fade-in max-w-3xl pb-12">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-1">
                About Branzly
              </h2>
              <p className="text-muted-foreground text-sm">
                Product information and legal details.
              </p>
            </div>

            <div className="space-y-12 mt-8">
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">
                  Who We Are
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Branzly is an AI-powered brand discovery and intelligence
                  platform for creators and agencies. We exist to help creators,
                  influencer marketers, agencies, talent managers, brands, and
                  marketing professionals discover brands, understand their
                  activity and opportunities, organize relevant brand
                  information, evaluate potential partnerships, and make
                  better-informed outreach and collaboration decisions.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Branzly is a product and startup initiative operated through
                  Glanzy Studio under the broader Mirza Group organization. We
                  are currently being developed and operated as a
                  startup/project and our legal structure may evolve over time.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">
                  What Branzly Does
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Branzly organizes useful brand intelligence into one
                  professional workspace:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>
                    <strong>Discovery:</strong> Find relevant brands by niches,
                    countries, and categories.
                  </li>
                  <li>
                    <strong>Brand Intelligence:</strong> Access detailed company
                    information, products, social presence, marketing activity,
                    and creator activity.
                  </li>
                  <li>
                    <strong>Opportunity Signals:</strong> Identify potential
                    partnership opportunities based on recent launches, funding,
                    and marketing signals.
                  </li>
                  <li>
                    <strong>Organization:</strong> Save promising brands to
                    custom lists and team workspaces.
                  </li>
                  <li>
                    <strong>Contact Workflows:</strong> Reveal available
                    business contact information and track outreach status
                    manually (Contacted state).
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">
                  Who Branzly Is For
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Branzly is designed to serve:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Creators and Influencers</li>
                  <li>Creator Agencies and Talent Managers</li>
                  <li>Marketing Professionals</li>
                  <li>Brands and Businesses</li>
                  <li>Creator-economy professionals</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">
                  Why Branzly Exists
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Brand discovery is often fragmented across search engines,
                  social platforms, websites, news, directories, spreadsheets,
                  and disconnected research tools. Creators and agencies often
                  need to discover brands, research company information,
                  understand marketing signals, identify relevant business
                  opportunities, save promising companies, and keep track of
                  outreach. Branzly is intended to bring useful brand
                  intelligence and discovery into a more structured, organized
                  environment.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">
                  How Branzly Works
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  The Branzly workflow is designed to be simple and effective:
                </p>
                <ol className="list-decimal pl-6 text-muted-foreground space-y-2">
                  <li>
                    <strong>Discover:</strong> Search for brands in your niche
                    or explore curated recommendations.
                  </li>
                  <li>
                    <strong>Understand:</strong> Review comprehensive brand
                    profiles, products, social metrics, and funding information.
                  </li>
                  <li>
                    <strong>Save:</strong> Organize relevant brands into lists
                    or workspace folders.
                  </li>
                  <li>
                    <strong>Contact:</strong> Uncover available business contact
                    information and reach out to the brand directly outside the
                    platform.
                  </li>
                  <li>
                    <strong>Track:</strong> Mark brands as "Contacted" and track
                    your outreach pipeline status.
                  </li>
                </ol>
              </section>

              <section className="space-y-4 bg-muted/20 border border-border/50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground">
                  Founder & CEO
                </h2>
                <h3 className="text-lg font-bold text-foreground mt-4">
                  Moin M
                </h3>
                <p className="text-muted-foreground leading-relaxed mt-2">
                  Moin M is the Founder and CEO of Branzly, the brand discovery
                  and intelligence platform built to help creators, agencies,
                  and modern marketing teams discover better opportunities and
                  make more informed decisions. Branzly was created around a
                  simple idea: finding the right brands should be easier,
                  faster, and more intelligent than relying on scattered
                  searches, spreadsheets, and disconnected information sources.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  As the founder of Glanzy Studio and the creator behind
                  Branzly, Moin M is focused on building practical technology
                  for the creator economy and improving how creators, agencies,
                  and brands discover and understand commercial opportunities.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Branzly represents that vision in product form — combining
                  structured brand intelligence, discovery, opportunity signals,
                  and organization into one platform designed for the modern
                  creator and marketing ecosystem.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">
                  Company Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <h4 className="font-semibold text-foreground">
                      Parent Organization
                    </h4>
                    <p className="text-muted-foreground">Mirza Group</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">
                      Operating Organization
                    </h4>
                    <p className="text-muted-foreground">Glanzy Studio</p>
                    <a
                      href="https://www.glanzystudio.dedyn.io"
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand hover:underline text-sm"
                    >
                      glanzystudio.dedyn.io
                    </a>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Founded</h4>
                    <p className="text-muted-foreground">September 16, 2026</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Location</h4>
                    <p className="text-muted-foreground">India</p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">
                  Contact Us
                </h2>
                <div className="space-y-6 mt-4">
                  <div>
                    <h4 className="font-semibold text-foreground">
                      General Support & Legal/Privacy
                    </h4>
                    <p className="text-sm text-muted-foreground mb-1">
                      For general inquiries, help with your account, or
                      questions about our privacy policy.
                    </p>
                    <a
                      href="mailto:support@branzly.dedyn.io"
                      className="text-brand hover:underline font-medium"
                    >
                      support@branzly.dedyn.io
                    </a>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">
                      Leads & Additional Support
                    </h4>
                    <p className="text-sm text-muted-foreground mb-1">
                      For help with brand discovery or issues regarding lead
                      information.
                    </p>
                    <a
                      href="mailto:leads@branzly.dedyn.io"
                      className="text-brand hover:underline font-medium"
                    >
                      leads@branzly.dedyn.io
                    </a>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">
                      Partnerships & Business
                    </h4>
                    <p className="text-sm text-muted-foreground mb-1">
                      For collaboration requests, API access, or enterprise
                      features.
                    </p>
                    <a
                      href="mailto:partners@branzly.dedyn.io"
                      className="text-brand hover:underline font-medium"
                    >
                      partners@branzly.dedyn.io
                    </a>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}

        {/* DANGER ZONE TAB */}
        {activeTab === "danger" && (
          <div className="space-y-8 animate-in fade-in">
            <div>
              <h2 className="text-2xl font-bold text-destructive mb-1">
                Danger Zone
              </h2>
              <p className="text-muted-foreground text-sm">
                Irreversible and destructive actions.
              </p>
            </div>

            <div className="max-w-lg border border-destructive/20 bg-destructive/5 rounded-2xl p-6">
              <h3 className="font-bold text-foreground mb-2">Delete Account</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Permanently delete your account, workspace data, saved brands,
                and outreach history. This action cannot be undone.
              </p>

              <button
                disabled
                className="px-5 py-2.5 bg-destructive/10 text-destructive font-semibold rounded-xl text-sm border border-destructive/20 opacity-50 cursor-not-allowed"
              >
                Account Deletion Unavailable
              </button>
              <p className="text-xs text-muted-foreground mt-3">
                Complete deletion flows are currently disabled in this preview
                environment to prevent accidental data loss.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SubscriptionSettings({
  userId,
  workspaceId,
}: {
  userId: string | null;
  workspaceId?: string;
}) {
  const { currentPlan, planConfig, limits } = useMonetization(userId);
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-in fade-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">
          Subscription & Billing
        </h2>
        <p className="text-muted-foreground text-sm">
          Manage your plan, limits, and billing details.
        </p>
      </div>

      <div className="max-w-md bg-gradient-to-br from-brand/5 to-muted/20 border border-brand/20 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-bold text-brand uppercase tracking-wider mb-1">
              Current Plan
            </p>
            <h3 className="text-2xl font-bold text-foreground">
              {planConfig.name}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center">
            <Sparkles className="text-brand w-6 h-6" />
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="text-sm font-semibold mb-2">Usage Limits</div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Searches / mo</span>
            <span className="font-medium text-foreground">
              {limits.searchesPerMonth} limit
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Brand Views / mo</span>
            <span className="font-medium text-foreground">
              {limits.brandViewsPerMonth} limit
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Saved Brands</span>
            <span className="font-medium text-foreground">
              {limits.savedBrandsTotal} limit
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Team Members</span>
            <span className="font-medium text-foreground">
              {limits.teamMembers} limit
            </span>
          </div>
        </div>

        <button
          onClick={() => navigate({ to: "/pricing" })}
          className="w-full flex justify-center items-center gap-2 py-2.5 px-4 bg-brand text-brand-foreground rounded-xl text-sm font-semibold hover:bg-brand/90 transition-colors shadow-sm"
        >
          View Plans & Upgrade
        </button>
      </div>
    </div>
  );
}
