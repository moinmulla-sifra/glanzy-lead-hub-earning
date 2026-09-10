import {
  createFileRoute,
  useNavigate,
  useSearch,
  Link,
} from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import {
  Loader2,
  ArrowRight,
  Compass,
  LogIn,
  Mail,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
});

type AuthMode = "signin" | "signup" | "forgot" | "reset";
type AccountType = "creator" | "agency";

function AuthPage() {
  const navigate = useNavigate();
  const search = Route.useSearch() as Record<string, unknown>;
  const [mode, setMode] = useState<AuthMode>(search.mode || "signin");
  const [loading, setLoading] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [accountType, setAccountType] = useState<AccountType>("creator");

  const checkProfile = React.useCallback(
    async (uid: string) => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("account_type, onboarding_completed")
          .eq("id", uid)
          .single();

        if (error && error.code === "PGRST116") {
          // Profile doesn't exist, go to onboarding
          navigate({ to: "/onboarding", replace: true });
        } else if (data) {
          if (!data.onboarding_completed) {
            navigate({ to: "/onboarding", replace: true });
          } else {
            navigate({ to: "/dashboard", replace: true });
          }
        } else {
          navigate({ to: "/onboarding", replace: true });
        }
      } catch (err) {
        console.error(err);
        navigate({ to: "/onboarding", replace: true });
      } finally {
        setSessionChecked(true);
      }
    },
    [navigate],
  );

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
  }, [mode, checkProfile]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "signup") {
        if (password.length < 6)
          throw new Error("Password must be at least 6 characters.");
        if (!fullName) throw new Error("Please enter your name.");

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              account_type: accountType,
            },
          },
        });
        if (error) throw error;

        if (data.user) {
          if (data.user.identities?.length === 0) {
            toast.error("User already exists or email is taken.");
          } else if (data.session) {
            toast.success("Account created!");
            navigate({ to: "/onboarding", replace: true });
          } else {
            toast.success("Please check your email to verify your account.");
            setMode("signin");
          }
        }
      } else if (mode === "signin") {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        if (data.session) {
          toast.success("Welcome back!");
          checkProfile(data.user.id);
        }
      } else if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth`,
        });
        if (error) throw error;
        toast.success("Password reset email sent! Check your inbox.");
        setMode("signin");
      } else if (mode === "reset") {
        if (password.length < 6)
          throw new Error("Password must be at least 6 characters.");
        const { error } = await supabase.auth.updateUser({ password });
        if (error) throw error;
        toast.success("Password updated successfully!");
        setMode("signin");
      }
    } catch (err: unknown) {
      toast.error(err.message || "Authentication failed");
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
          <span className="font-bold text-2xl tracking-tight text-foreground">
            Branzly
          </span>
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-lg">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight tracking-tight">
            Discover better brands. Reach out. Close deals.
          </h1>
          <p className="text-lg text-muted-foreground mb-12">
            The complete creator economy CRM. Find the right opportunities,
            manage your pipeline, and build stronger brand partnerships.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                <Compass className="text-brand w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  Smart Discovery
                </h3>
                <p className="text-sm text-muted-foreground">
                  Find brands that match your niche and audience.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                <Mail className="text-brand w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Outreach CRM</h3>
                <p className="text-sm text-muted-foreground">
                  Track conversations from saved to won.
                </p>
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
              <span className="text-white font-bold text-xl leading-none">
                B
              </span>
            </div>
            <span className="font-bold text-2xl tracking-tight text-foreground">
              Branzly
            </span>
          </div>

          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2 tracking-tight">
                {mode === "signin"
                  ? "Welcome back"
                  : mode === "signup"
                    ? "Create an account"
                    : mode === "forgot"
                      ? "Reset password"
                      : "Set new password"}
              </h2>
              <p className="text-muted-foreground">
                {mode === "signin"
                  ? "Sign in to your account to continue"
                  : mode === "signup"
                    ? "Join Branzly to manage your brand deals"
                    : mode === "forgot"
                      ? "Enter your email to receive a reset link"
                      : "Enter your new password below"}
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
                    <label className="text-sm font-semibold text-foreground">
                      Full Name
                    </label>
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
                  <label className="text-sm font-semibold text-foreground">
                    Email
                  </label>
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
                  <button
                    onClick={() => setMode("signup")}
                    className="font-semibold text-foreground hover:underline"
                  >
                    Sign up
                  </button>
                </p>
              ) : mode === "signup" || mode === "forgot" ? (
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <button
                    onClick={() => setMode("signin")}
                    className="font-semibold text-foreground hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
