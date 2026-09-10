import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Loader2, ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/onboarding")({
  component: OnboardingPage,
});

type AccountType = "creator" | "agency";

function OnboardingPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [accountType, setAccountType] = useState<AccountType>("creator");

  // Fields
  const [primaryNiche, setPrimaryNiche] = useState("");
  const [country, setCountry] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [contentCategories, setContentCategories] = useState("");
  const [platforms, setPlatforms] = useState("");
  const [audienceRange, setAudienceRange] = useState("");
  const [website, setWebsite] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate({ to: "/auth", replace: true });
        return;
      }
      setUserId(data.session.user.id);

      supabase
        .from("profiles")
        .select("account_type, onboarding_completed, primary_niche")
        .eq("id", data.session.user.id)
        .single()
        .then(({ data: profile, error }) => {
          if (profile) {
            if (profile.onboarding_completed) {
              navigate({ to: "/dashboard", replace: true });
            } else {
              setAccountType(profile.account_type as AccountType);
              setSessionChecked(true);
            }
          } else {
            setSessionChecked(true); // Need to create profile
          }
        });
    });
  }, [navigate]);

  const handleComplete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    setLoading(true);

    try {
      const updates: any = {
        country,
        onboarding_completed: true,
      };

      if (accountType === "creator") {
        if (!primaryNiche) throw new Error("Please enter your primary niche.");
        updates.primary_niche = primaryNiche;
        updates.niche = primaryNiche;
        updates.content_categories = contentCategories
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
        updates.platforms = platforms
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
        updates.audience_range = audienceRange;
      } else {
        if (!agencyName) throw new Error("Please enter your agency name.");
        // We will update the workspace name to the agency name
        updates.website = website;
        updates.primary_niche = primaryNiche; // Agency categories/niches
        updates.niche = primaryNiche;
        updates.agency_name = agencyName;
        updates.content_categories = contentCategories
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      }

      // 1. Upsert Profile
      // Using upsert in case the profile row doesn't exist due to legacy account
      const profilePayload = {
        id: userId,
        account_type: accountType,
        ...updates,
      };

      const { error: profileError } = await supabase
        .from("profiles")
        .upsert(profilePayload)
        .select()
        .single();

      if (profileError) throw profileError;

      // 2. Ensure workspace exists
      const { data: wsMember } = await supabase
        .from("workspace_members")
        .select("workspace_id")
        .eq("user_id", userId)
        .maybeSingle();

      if (!wsMember) {
        const wsName =
          accountType === "agency" ? agencyName || "My Agency" : "My Workspace";
        const { data: newWs } = await supabase
          .from("workspaces")
          .insert({
            name: wsName,
            type: accountType,
            workspace_type: accountType,
            owner_id: userId,
          })
          .select()
          .maybeSingle();

        if (newWs) {
          await supabase.from("workspace_members").insert({
            workspace_id: newWs.id,
            user_id: userId,
            role: "owner",
          });
        }
      } else if (accountType === "agency" && agencyName) {
        await supabase
          .from("workspaces")
          .update({ name: agencyName, updated_at: new Date().toISOString() })
          .eq("id", wsMember.workspace_id);
      }

      toast.success("Welcome to Branzly!");
      navigate({ to: "/dashboard", replace: true });
    } catch (err: any) {
      toast.error(err.message || "Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  const skipOnboarding = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      await supabase
        .from("profiles")
        .upsert({ id: userId, onboarding_completed: true });

      const { data: wsMember } = await supabase
        .from("workspace_members")
        .select("workspace_id")
        .eq("user_id", userId)
        .maybeSingle();

      if (!wsMember) {
        const { data: newWs } = await supabase
          .from("workspaces")
          .insert({
            name: "My Workspace",
            type: accountType || "creator",
            workspace_type: accountType || "creator",
            owner_id: userId,
          })
          .select()
          .maybeSingle();

        if (newWs) {
          await supabase.from("workspace_members").insert({
            workspace_id: newWs.id,
            user_id: userId,
            role: "owner",
          });
        }
      }

      navigate({ to: "/dashboard", replace: true });
    } catch (err) {
      toast.error("Failed to skip");
    } finally {
      setLoading(false);
    }
  };

  if (!sessionChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-brand" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-lg bg-card border border-border/50 rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-500">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2 tracking-tight">
              Complete your profile
            </h2>
            <p className="text-muted-foreground">
              Let's set up your {accountType} account to get personalized
              recommendations.
            </p>
          </div>

          <form onSubmit={handleComplete} className="space-y-4">
            {accountType === "creator" ? (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">
                    Primary Niche *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tech, Beauty, Gaming"
                    value={primaryNiche}
                    onChange={(e) => setPrimaryNiche(e.target.value)}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">
                    Platforms (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. YouTube, Instagram, TikTok"
                    value={platforms}
                    onChange={(e) => setPlatforms(e.target.value)}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">
                    Audience Range
                  </label>
                  <select
                    value={audienceRange}
                    onChange={(e) => setAudienceRange(e.target.value)}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow appearance-none"
                  >
                    <option value="">Select range...</option>
                    <option value="1k-10k">1k - 10k</option>
                    <option value="10k-50k">10k - 50k</option>
                    <option value="50k-100k">50k - 100k</option>
                    <option value="100k-500k">100k - 500k</option>
                    <option value="500k+">500k+</option>
                  </select>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">
                    Agency Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Talent Group"
                    value={agencyName}
                    onChange={(e) => setAgencyName(e.target.value)}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">
                    Website
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">
                    Focus Categories (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Tech, Fashion, Lifestyle"
                    value={contentCategories}
                    onChange={(e) => setContentCategories(e.target.value)}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow"
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                Country
              </label>
              <input
                type="text"
                placeholder="e.g. United States"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow"
              />
            </div>

            <div className="pt-4 flex flex-col gap-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-brand text-brand-foreground font-semibold rounded-xl px-4 py-3.5 hover:bg-brand/90 transition-all shadow-lg shadow-brand/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Complete Profile"
                )}
                {!loading && <ArrowRight className="w-5 h-5" />}
              </button>

              <button
                type="button"
                onClick={skipOnboarding}
                disabled={loading}
                className="w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Skip for now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
