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
  const [pendingPlan, setPendingPlan] = useState<PlanType | null>(null);
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
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
      
      setUserId(session.session.user.id);

      try {
        // Get workspace
        const { data: memberData } = await supabase
          .from("workspace_members")
          .select("workspace_id")
          .eq("user_id", session.session.user.id)
          .limit(1)
          .maybeSingle();

        if (memberData) {
          setWorkspaceId(memberData.workspace_id);
          
          const { data: legacySub } = await supabase
            .from("subscriptions")
            .select("plan")
            .eq("workspace_id", memberData.workspace_id)
            .maybeSingle();

          const { data: approvedReq } = await supabase
            .from("subscription_requests")
            .select("requested_plan")
            .eq("workspace_id", memberData.workspace_id)
            .eq("status", "approved")
            .order("reviewed_at", { ascending: false })
            .limit(1)
            .maybeSingle();

          const { data: pendingReq } = await supabase
            .from("subscription_requests")
            .select("requested_plan")
            .eq("workspace_id", memberData.workspace_id)
            .eq("status", "pending")
            .order("requested_at", { ascending: false })
            .limit(1)
            .maybeSingle();

          const activePlan = approvedReq?.requested_plan
            ? (approvedReq.requested_plan as PlanType)
            : (legacySub?.plan as PlanType) || "free";

          setCurrentPlan(activePlan);
          
          if (pendingReq?.requested_plan) {
            setPendingPlan(pendingReq.requested_plan as PlanType);
          }
        }
      } catch (err) {
        console.error("Failed to load plan:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPlan();
  }, []);

  const handleUpgrade = async (plan: PlanType) => {
    if (!workspaceId || !userId) {
      navigate({ to: "/auth" });
      return;
    }
    
    if (pendingPlan === plan) {
      toast.info("Upgrade request already pending");
      return;
    }

    const confirmMessage = `You are requesting an upgrade to the ${PLANS[plan].name} plan. Your request will be reviewed manually.\n\nContinue with request?`;
    if (!window.confirm(confirmMessage)) {
      return;
    }

    setUpgrading(plan);
    try {
      const { error } = await supabase.from("subscription_requests").insert({
        workspace_id: workspaceId,
        user_id: userId,
        requested_plan: plan,
        current_plan: currentPlan,
        status: "pending"
      });
      
      if (error) {
        throw error;
      }

      setPendingPlan(plan);
      toast.success(`Your request for the ${PLANS[plan].name} plan has been submitted for review. Your current access remains unchanged until the request is approved.`);
    } catch (err) {
      console.error("Upgrade request error:", err);
      toast.error("Failed to submit request. Please try again.");
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
                    disabled={isCurrentPlan || upgrading !== null || pendingPlan === plan.type}
                    className={`w-full py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-200 mb-8
                      ${
                        isCurrentPlan || pendingPlan === plan.type
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
                    ) : pendingPlan === plan.type ? (
                      "Pending Approval"
                    ) : plan.priceMonthly === 0 ? (
                      "Get Started"
                    ) : (
                      <>
                        <CreditCard size={18} />
                        Request Upgrade to {plan.name}
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
