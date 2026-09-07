import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PLANS, type PlanType } from "@/lib/monetization";
import { Check, X, CreditCard, Sparkles, Zap, Building2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
});

function PricingPage() {
  const [currentPlan, setCurrentPlan] = useState<PlanType>("free");
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState<PlanType | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadPlan() {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session) {
        setLoading(false);
        return;
      }

      // Get workspace
      const { data: memberData } = await supabase
        .from("workspace_members")
        .select("workspace_id")
        .eq("user_id", session.session.user.id)
        .limit(1)
        .single();

      if (memberData) {
        setWorkspaceId(memberData.workspace_id);
        const { data: subData } = await supabase
          .from("subscriptions")
          .select("plan")
          .eq("workspace_id", memberData.workspace_id)
          .single();

        if (subData) {
          setCurrentPlan(subData.plan as PlanType);
        }
      }
      setLoading(false);
    }
    loadPlan();
  }, []);

  const handleUpgrade = async (plan: PlanType) => {
    if (!workspaceId) {
      navigate({ to: "/auth" });
      return;
    }

    // Simulate checkout process
    setUpgrading(plan);
    try {
      // In a real app, we'd redirect to Stripe Checkout here.
      // For now, we simulate a successful upgrade by directly updating the database.

      const { data: existingSub } = await supabase
        .from("subscriptions")
        .select("id")
        .eq("workspace_id", workspaceId)
        .single();

      if (existingSub) {
        await supabase
          .from("subscriptions")
          .update({ plan, updated_at: new Date().toISOString() })
          .eq("id", existingSub.id);
      } else {
        await supabase.from("subscriptions").insert({
          workspace_id: workspaceId,
          plan,
          status: "active",
        });
      }

      setCurrentPlan(plan);
      toast.success(`Successfully upgraded to ${PLANS[plan].name} plan!`);
    } catch (err) {
      toast.error("Failed to process upgrade. Please try again.");
    } finally {
      setUpgrading(null);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-muted-foreground">
            Find the perfect plan for your creator business or agency. Scale as
            you grow.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {Object.values(PLANS).map((plan) => {
              const isCurrentPlan = currentPlan === plan.type;

              let Icon = Sparkles;
              if (plan.type === "pro") Icon = Zap;
              if (plan.type === "agency") Icon = Building2;

              return (
                <div
                  key={plan.type}
                  className={`bg-card rounded-3xl border-2 p-8 flex flex-col h-full transition-all duration-200
                    ${
                      isCurrentPlan
                        ? "border-brand shadow-lg shadow-brand/10 relative scale-105 md:-mt-4 md:mb-4 z-10"
                        : "border-border/50 hover:border-border"
                    }
                  `}
                >
                  {isCurrentPlan && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand text-brand-foreground px-4 py-1 rounded-full text-sm font-bold shadow-sm">
                      Current Plan
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`p-2 rounded-xl ${isCurrentPlan ? "bg-brand/10 text-brand" : "bg-muted text-muted-foreground"}`}
                    >
                      <Icon size={24} />
                    </div>
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                  </div>

                  <div className="mb-6">
                    <span className="text-4xl font-extrabold">
                      ${plan.priceMonthly}
                    </span>
                    <span className="text-muted-foreground font-medium">
                      /month
                    </span>
                  </div>

                  <p className="text-muted-foreground mb-8 min-h-[3rem]">
                    {plan.type === "free" &&
                      "Perfect for getting started and exploring opportunities."}
                    {plan.type === "pro" &&
                      "For serious creators actively pitching and growing."}
                    {plan.type === "agency" &&
                      "For agencies managing multiple creators and campaigns."}
                  </p>

                  <button
                    onClick={() => handleUpgrade(plan.type)}
                    disabled={isCurrentPlan || upgrading !== null}
                    className={`w-full py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-200 mb-8
                      ${
                        isCurrentPlan
                          ? "bg-muted text-muted-foreground cursor-default"
                          : plan.type === "pro"
                            ? "bg-brand text-brand-foreground hover:bg-brand/90 shadow-sm"
                            : "bg-foreground text-background hover:bg-foreground/90 shadow-sm"
                      }
                    `}
                  >
                    {upgrading === plan.type ? (
                      <span className="animate-pulse">Processing...</span>
                    ) : isCurrentPlan ? (
                      "Current Plan"
                    ) : plan.priceMonthly === 0 ? (
                      "Get Started"
                    ) : (
                      <>
                        <CreditCard size={18} />
                        Upgrade to {plan.name}
                      </>
                    )}
                  </button>

                  <div className="space-y-4 flex-1">
                    <div className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
                      Features & Limits
                    </div>

                    <FeatureItem included={true}>
                      <span className="font-semibold">
                        {plan.limits.brandViewsPerMonth}
                      </span>{" "}
                      Brand Views /mo
                    </FeatureItem>
                    <FeatureItem included={true}>
                      <span className="font-semibold">
                        {plan.limits.searchesPerMonth}
                      </span>{" "}
                      Searches /mo
                    </FeatureItem>
                    <FeatureItem included={true}>
                      <span className="font-semibold">
                        {plan.limits.savedBrandsTotal}
                      </span>{" "}
                      Saved Brands
                    </FeatureItem>
                    <FeatureItem included={true}>
                      <span className="font-semibold">
                        {plan.limits.outreachActiveTotal}
                      </span>{" "}
                      Active Outreach
                    </FeatureItem>
                    <FeatureItem included={true}>
                      <span className="font-semibold">
                        {plan.limits.teamMembers}
                      </span>{" "}
                      Team Member{plan.limits.teamMembers > 1 ? "s" : ""}
                    </FeatureItem>

                    <div className="my-4 border-t border-border/50"></div>

                    <FeatureItem included={plan.features.advancedDiscovery}>
                      Advanced Discovery Filters
                    </FeatureItem>
                    <FeatureItem included={plan.features.removeAds}>
                      Ad-Free Experience
                    </FeatureItem>
                    <FeatureItem included={plan.features.exportData}>
                      Export Data
                    </FeatureItem>
                    <FeatureItem included={plan.features.prioritySupport}>
                      Priority Support
                    </FeatureItem>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function FeatureItem({
  children,
  included,
}: {
  children: React.ReactNode;
  included: boolean;
}) {
  return (
    <div
      className={`flex items-start gap-3 ${included ? "text-foreground" : "text-muted-foreground opacity-60"}`}
    >
      {included ? (
        <Check className="w-5 h-5 text-green-500 shrink-0" />
      ) : (
        <X className="w-5 h-5 shrink-0" />
      )}
      <span className="text-sm">{children}</span>
    </div>
  );
}
