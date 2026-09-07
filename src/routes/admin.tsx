import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { Shield, Loader2, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate({ to: "/auth", replace: true });
      } else {
        setUserId(data.session.user.id);
      }
    });
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

  if (!userId || profileQuery.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-brand" />
      </div>
    );
  }

  // Basic role check - in a real app this should be enforced strictly via RLS and claims
  const isAdmin = profileQuery.data?.account_type === "admin";

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
          <Shield className="w-8 h-8 text-destructive" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Access Denied
        </h2>
        <p className="text-muted-foreground mb-6">
          You do not have permission to access the admin portal.
        </p>
        <Link
          to="/discover"
          className="flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
        >
          <ArrowLeft size={16} /> Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
            <Shield className="text-white w-4 h-4" />
          </div>
          <span className="font-bold text-lg">Branzly Admin</span>
        </div>
        <Link
          to="/discover"
          className="text-sm font-semibold text-muted-foreground hover:text-foreground"
        >
          Exit Admin
        </Link>
      </header>

      <main className="p-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Platform Administration</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-1">
              Total Users
            </h3>
            <p className="text-3xl font-bold">---</p>
          </div>
          <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-1">
              Total Brands
            </h3>
            <p className="text-3xl font-bold">---</p>
          </div>
          <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-1">
              Active Subscriptions
            </h3>
            <p className="text-3xl font-bold">---</p>
          </div>
        </div>

        <div className="bg-card border border-border/50 rounded-2xl p-8 text-center text-muted-foreground">
          <p>
            Admin tools are currently in development. Database operations should
            be performed via the Supabase Dashboard until the internal admin
            suite is ready.
          </p>
        </div>
      </main>
    </div>
  );
}
