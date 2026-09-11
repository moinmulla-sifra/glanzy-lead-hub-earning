import { Outlet, useNavigate, useLocation, Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import {
  Compass,
  BarChart,
  Bookmark,
  Send,
  Sparkles,
  LogOut,
  Settings,
  User as UserIcon,
  Menu,
  X,
  Users,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useMonetization } from "@/lib/useMonetization";
import { MonetagScripts } from "@/components/MonetagScripts";

export const Route = createFileRoute("/_dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  const { shouldShowAds } = useMonetization(userId);

  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      if (!data.session) {
        navigate({ to: "/auth", replace: true });
        return;
      }
      setUserId(data.session.user.id);
      setUserEmail(data.session.user.email ?? null);
      setReady(true);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!active) return;
        if (event === "SIGNED_OUT" || !session) {
          setReady(false);
          navigate({ to: "/auth", replace: true });
        } else if (event === "SIGNED_IN" && session) {
          setUserId(session.user.id);
          setUserEmail(session.user.email ?? null);
          setReady(true);
        }
      },
    );

    return () => {
      active = false;
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

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
      return data;
    },
  });

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
  }

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand border-t-transparent" />
          <p className="text-sm font-medium text-muted-foreground animate-pulse">
            Loading Branzly...
          </p>
        </div>
      </div>
    );
  }

  const isAgency = profileQuery.data?.account_type === "agency";

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart, to: "/dashboard" },
    { id: "discover", label: "Discover", icon: Compass, to: "/discover" },
    { id: "saved", label: "Saved", icon: Bookmark, to: "/saved" },
    { id: "contacted", label: "Contacted", icon: Send, to: "/contacted" },
    {
      id: "for-you",
      label: "For You",
      icon: Sparkles,
      to: "/for-you",
    },
  ];

  const bottomNavItems = [
    { id: "profile", label: "Profile", icon: UserIcon, to: "/profile" },
    ...(isAgency
      ? [{ id: "team", label: "Team", icon: Users, to: "/team" }]
      : []),
    { id: "settings", label: "Settings", icon: Settings, to: "/settings" },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden selection:bg-brand/20">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 border-b border-border/50 bg-background/80 backdrop-blur-xl z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <img src="/favicon.png" alt="Branzly Logo" className="w-8 h-8 object-contain drop-shadow-sm" />
          <span className="font-bold text-lg tracking-tight">Branzly</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-40 bg-card border-r border-border/50 flex flex-col transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]
        lg:relative lg:translate-x-0
        ${isMobileMenuOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"}
        ${isSidebarCollapsed ? "lg:w-0 lg:border-r-0 lg:opacity-0 lg:overflow-hidden lg:invisible" : "lg:w-64 lg:opacity-100 lg:visible"}
      `}
      >
        <div className="p-6 hidden lg:flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img src="/favicon.png" alt="Branzly Logo" className="w-8 h-8 object-contain drop-shadow-sm" />
            <span className="font-bold text-xl tracking-tight">Branzly</span>
          </div>
          <button
            onClick={() => setIsSidebarCollapsed(true)}
            className="p-1 text-muted-foreground hover:bg-muted rounded-md transition-colors"
            title="Close sidebar"
          >
            <PanelLeftClose size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 lg:py-2 px-3">
          <nav className="space-y-1">
            <div className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Menu
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.to);
              return (
                <Link
                  key={item.id}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                    ${
                      isActive
                        ? "bg-brand/10 text-brand shadow-sm"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    }
                  `}
                >
                  <Icon
                    size={18}
                    className={isActive ? "text-brand" : "opacity-70"}
                  />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <nav className="space-y-1 mt-8">
            <div className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Account
            </div>
            {bottomNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.to);
              return (
                <Link
                  key={item.id}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                    ${
                      isActive
                        ? "bg-brand/10 text-brand shadow-sm"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    }
                  `}
                >
                  <Icon
                    size={18}
                    className={isActive ? "text-brand" : "opacity-70"}
                  />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-border/50">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center overflow-hidden shrink-0">
              {profileQuery.data?.avatar_url ? (
                <img
                  src={profileQuery.data.avatar_url}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserIcon size={14} className="text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">
                {profileQuery.data?.full_name || userEmail?.split("@")[0]}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {userEmail}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-2">
            <ThemeToggle />
            <button
              onClick={signOut}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-[100dvh] pt-16 lg:pt-0 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand/5 via-background to-background pointer-events-none" />

        {/* Toggle button when sidebar is collapsed (desktop only) */}
        {isSidebarCollapsed && (
          <div className="hidden lg:flex fixed top-4 left-4 z-20">
            <button
              onClick={() => setIsSidebarCollapsed(false)}
              className="p-2 bg-card border border-border/50 text-muted-foreground hover:bg-muted rounded-md shadow-sm transition-all hover:text-foreground"
              title="Open sidebar"
            >
              <PanelLeftOpen size={20} />
            </button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4 lg:p-8 relative z-10">
          <div className="max-w-6xl mx-auto h-full">
            <Outlet />
          </div>
        </div>
      </main>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {shouldShowAds && <MonetagScripts />}
    </div>
  );
}
