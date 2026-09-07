import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Loader2, ArrowRight, Compass, LogIn, Mail, CheckCircle2 } from "lucide-react";
import { z } from "zod";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
});

type AuthMode = "signin" | "signup" | "forgot" | "reset" | "onboarding";
type AccountType = "creator" | "agency";

function AuthPage() {
  const navigate = useNavigate();
  const search = Route.useSearch() as any;
  const [mode, setMode] = useState<AuthMode>(search.mode || "signin");
  const [loading, setLoading] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [accountType, setAccountType] = useState<AccountType>("creator");
  
  // Onboarding states
  const [niche, setNiche] = useState("");
  const [country, setCountry] = useState("");
  const [agencyName, setAgencyName] = useState("");

  useEffect(() => {
    // Check if coming from a password reset email
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        setMode("reset");
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      if (data.session && mode !== "reset") {
        checkProfile(data.session.user.id);
      } else {
        setSessionChecked(true);
      }
    });
  }, [mode]);

  const checkProfile = async (uid: string) => {
    setUserId(uid);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("account_type, full_name, niche, agency_name")
        .eq("id", uid)
        .single();
        
      if (error && error.code === "PGRST116") {
        // Profile doesn't exist, go to onboarding
        setMode("onboarding");
      } else if (data) {
        // If they chose creator but have no niche, or agency and no agency name
        if (data.account_type === "creator" && !data.niche) {
          setMode("onboarding");
          setAccountType("creator");
        } else if (data.account_type === "agency" && !data.agency_name) {
          setMode("onboarding");
          setAccountType("agency");
        } else {
          navigate({ to: "/discover", replace: true });
        }
      } else {
        setMode("onboarding");
      }
    } catch (err) {
      console.error(err);
      setMode("onboarding");
    } finally {
      setSessionChecked(true);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "signup") {
        if (password.length < 6) throw new Error("Password must be at least 6 characters.");
        if (!fullName) throw new Error("Please enter your name.");
        
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              account_type: accountType
            }
          }
        });
        if (error) throw error;
        
        if (data.user) {
          // Check if email confirmation is required
          if (data.user.identities?.length === 0) {
            toast.error("User already exists or email is taken.");
          } else if (data.session) {
            toast.success("Account created!");
            
            // Create profile
            await supabase.from("profiles").upsert({
              id: data.user.id,
              full_name: fullName,
              account_type: accountType
            });
            
            // Create workspace
            const workspaceName = accountType === "agency" ? `${fullName}'s Agency` : `${fullName}'s Workspace`;
            const { data: wsData, error: wsError } = await supabase
              .from("workspaces")
              .insert({ name: workspaceName, workspace_type: accountType })
              .select("id")
              .single();
              
            if (!wsError && wsData) {
              await supabase.from("workspace_members").insert({
                workspace_id: wsData.id,
                user_id: data.user.id,
                role: "owner"
              });
            }
            
            setUserId(data.user.id);
            setMode("onboarding");
          } else {
            toast.success("Please check your email to verify your account.");
            setMode("signin");
          }
        }
      } else if (mode === "signin") {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (data.session) {
          toast.success("Welcome back!");
          checkProfile(data.user.id);
        }
      } else if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth`
        });
        if (error) throw error;
        toast.success("Password reset email sent! Check your inbox.");
        setMode("signin");
      } else if (mode === "reset") {
        if (password.length < 6) throw new Error("Password must be at least 6 characters.");
        const { error } = await supabase.auth.updateUser({ password });
        if (error) throw error;
        toast.success("Password updated successfully!");
        setMode("signin");
      }
    } catch (err: any) {
      toast.error(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleOnboarding = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    setLoading(true);

    try {
      const updates: any = { country };
      if (accountType === "creator") {
        if (!niche) throw new Error("Please enter your niche.");
        updates.niche = niche;
      } else {
        if (!agencyName) throw new Error("Please enter your agency name.");
        updates.agency_name = agencyName;
        
        // Update workspace name as well
        const { data: wsMember } = await supabase
          .from("workspace_members")
          .select("workspace_id")
          .eq("user_id", userId)
          .eq("role", "owner")
          .single();
          
        if (wsMember) {
          await supabase.from("workspaces").update({ name: agencyName }).eq("id", wsMember.workspace_id);
        }
      }

      const { error } = await supabase.from("profiles").update(updates).eq("id", userId);
      if (error) throw error;
      
      toast.success("Profile completed!");
      navigate({ to: "/discover", replace: true });
    } catch (err: any) {
      toast.error(err.message || "Failed to save profile");
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
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Left panel - Branding */}
      <div className="hidden md:flex flex-col md:w-1/2 lg:w-[55%] bg-muted/30 p-12 relative overflow-hidden border-r border-border/50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-brand/10 via-background to-background pointer-events-none" />
        
        <div className="relative z-10 flex items-center gap-3 mb-16">
          <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center shadow-lg shadow-brand/20">
            <span className="text-white font-bold text-xl leading-none">B</span>
          </div>
          <span className="font-bold text-2xl tracking-tight text-foreground">Branzly</span>
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-lg">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight tracking-tight">
            Discover better brands. Reach out. Close deals.
          </h1>
          <p className="text-lg text-muted-foreground mb-12">
            The complete creator economy CRM. Find the right opportunities, manage your pipeline, and build stronger brand partnerships.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                <Compass className="text-brand w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Smart Discovery</h3>
                <p className="text-sm text-muted-foreground">Find brands that match your niche and audience.</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                <Mail className="text-brand w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Outreach CRM</h3>
                <p className="text-sm text-muted-foreground">Track conversations from saved to won.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {/* Mobile Header */}
          <div className="md:hidden flex items-center gap-3 mb-10 justify-center">
            <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center shadow-lg shadow-brand/20">
              <span className="text-white font-bold text-xl leading-none">B</span>
            </div>
            <span className="font-bold text-2xl tracking-tight text-foreground">Branzly</span>
          </div>

          {mode === "onboarding" ? (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2 tracking-tight">Complete your profile</h2>
                <p className="text-muted-foreground">Let's set up your {accountType} account</p>
              </div>
              
              <form onSubmit={handleOnboarding} className="space-y-4">
                {accountType === "creator" ? (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Your Niche</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tech, Beauty, Gaming"
                      value={niche}
                      onChange={(e) => setNiche(e.target.value)}
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow"
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Agency Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Talent Group"
                      value={agencyName}
                      onChange={(e) => setAgencyName(e.target.value)}
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow"
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Country (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. United States"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-brand text-brand-foreground font-semibold rounded-xl px-4 py-3.5 hover:bg-brand/90 transition-all shadow-lg shadow-brand/20 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Go to Dashboard"}
                  {!loading && <ArrowRight className="w-5 h-5" />}
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2 tracking-tight">
                  {mode === "signin" ? "Welcome back" : mode === "signup" ? "Create an account" : mode === "forgot" ? "Reset password" : "Set new password"}
                </h2>
                <p className="text-muted-foreground">
                  {mode === "signin" ? "Sign in to your account to continue" : mode === "signup" ? "Join Branzly to manage your brand deals" : mode === "forgot" ? "Enter your email to receive a reset link" : "Enter your new password below"}
                </p>
              </div>

              <form onSubmit={handleAuth} className="space-y-4">
                
                {mode === "signup" && (
                  <>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <button
                        type="button"
                        onClick={() => setAccountType("creator")}
                        className={`py-3 px-4 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                          accountType === "creator"
                            ? "bg-brand/10 border-brand/50 text-brand"
                            : "bg-background border-border text-muted-foreground hover:bg-muted/50"
                        }`}
                      >
                        <span className="font-semibold text-sm">Creator</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setAccountType("agency")}
                        className={`py-3 px-4 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                          accountType === "agency"
                            ? "bg-brand/10 border-brand/50 text-brand"
                            : "bg-background border-border text-muted-foreground hover:bg-muted/50"
                        }`}
                      >
                        <span className="font-semibold text-sm">Agency</span>
                      </button>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Full Name</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow"
                      />
                    </div>
                  </>
                )}

                {mode !== "reset" && (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow"
                    />
                  </div>
                )}

                {(mode === "signin" || mode === "signup" || mode === "reset") && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-semibold text-foreground">
                        {mode === "reset" ? "New Password" : "Password"}
                      </label>
                      {mode === "signin" && (
                        <button
                          type="button"
                          onClick={() => setMode("forgot")}
                          className="text-xs font-semibold text-brand hover:underline"
                        >
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-foreground text-background font-semibold rounded-xl px-4 py-3.5 hover:bg-foreground/90 transition-all shadow-lg shadow-foreground/10 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : mode === "signin" ? (
                    "Sign In"
                  ) : mode === "signup" ? (
                    "Create Account"
                  ) : mode === "forgot" ? (
                    "Send Reset Link"
                  ) : (
                    "Update Password"
                  )}
                </button>
              </form>

              <div className="text-center mt-6">
                {mode === "signin" ? (
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <button onClick={() => setMode("signup")} className="font-semibold text-foreground hover:underline">
                      Sign up
                    </button>
                  </p>
                ) : mode === "signup" || mode === "forgot" ? (
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <button onClick={() => setMode("signin")} className="font-semibold text-foreground hover:underline">
                      Sign in
                    </button>
                  </p>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
