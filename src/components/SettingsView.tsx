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
import { applyTheme, getStoredTheme, type Theme } from "@/lib/theme";
import {
  User,
  Building2,
  Paintbrush,
  Shield,
  Bell,
  CreditCard,
  AlertTriangle,
  LogOut,
  Moon,
  Sun,
  Monitor,
  Save,
  Loader2,
  Key,
  Sparkles,
} from "lucide-react";

export function SettingsView({ userId }: { userId: string | null }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [theme, setTheme] = useState<Theme>("system");
  const [activeTab, setActiveTab] = useState("account");

  useEffect(() => {
    setTheme(getStoredTheme());
    const handleThemeChange = (e: CustomEvent<Theme>) => {
      setTheme(e.detail);
    };
    window.addEventListener("theme-change", handleThemeChange as EventListener);
    return () =>
      window.removeEventListener(
        "theme-change",
        handleThemeChange as EventListener,
      );
  }, []);

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

  const handleThemeChange = (newTheme: Theme) => {
    applyTheme(newTheme);
  };

  const tabs = [
    { id: "account", label: "Account", icon: User },
    { id: "workspace", label: "Workspace", icon: Building2 },
    { id: "appearance", label: "Appearance", icon: Paintbrush },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "subscription", label: "Subscription", icon: CreditCard },
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

        {/* APPEARANCE TAB */}
        {activeTab === "appearance" && (
          <div className="space-y-8 animate-in fade-in">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-1">
                Appearance
              </h2>
              <p className="text-muted-foreground text-sm">
                Customize how Branzly looks on your device.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl">
              <button
                onClick={() => handleThemeChange("light")}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all ${theme === "light" ? "border-brand bg-brand/5" : "border-border/50 bg-muted/20 hover:bg-muted/50"}`}
              >
                <div className="w-12 h-12 rounded-full bg-background border border-border shadow-sm flex items-center justify-center">
                  <Sun className="text-amber-500" />
                </div>
                <span className="font-semibold text-sm">Light</span>
              </button>

              <button
                onClick={() => handleThemeChange("dark")}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all ${theme === "dark" ? "border-brand bg-brand/5" : "border-border/50 bg-muted/20 hover:bg-muted/50"}`}
              >
                <div className="w-12 h-12 rounded-full bg-slate-950 border border-slate-800 shadow-sm flex items-center justify-center">
                  <Moon className="text-blue-400" />
                </div>
                <span className="font-semibold text-sm">Dark</span>
              </button>

              <button
                onClick={() => handleThemeChange("system")}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all ${theme === "system" ? "border-brand bg-brand/5" : "border-border/50 bg-muted/20 hover:bg-muted/50"}`}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-background to-muted border border-border shadow-sm flex items-center justify-center">
                  <Monitor className="text-foreground/70" />
                </div>
                <span className="font-semibold text-sm">System</span>
              </button>
            </div>
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
