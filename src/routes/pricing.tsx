import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { PLANS, type PlanType } from "@/lib/monetization";
import { Check, X, Sparkles, Building2, User, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useMonetization } from "@/lib/useMonetization";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
});

function PricingPage() {
  const [billingInterval, setBillingInterval] = useState<"monthly" | "yearly">(
    "yearly",
  );
  const [viewMode, setViewMode] = useState<"account" | "all">("account");
  const [userId, setUserId] = useState<string | null>(null);

  // Use centralized monetization state
  const { currentPlan, workspaceId, workspaceType, isLoading, planConfig } =
    useMonetization(userId);
  const [upgrading, setUpgrading] = useState<PlanType | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      const { data: session } = await supabase.auth.getSession();
      if (session?.session) {
        setUserId(session.session.user.id);
      }
    }
    init();
  }, []);

  const handleUpgrade = async (plan: PlanType) => {
    if (!userId || !workspaceId) {
      toast.error("Please sign in to upgrade");
      navigate({ to: "/auth" });
      return;
    }

    if (currentPlan === plan) {
      toast.info("You are already on this plan");
      return;
    }

    const selectedPlanConfig = PLANS[plan];
    if (
      selectedPlanConfig.accountType !== "all" &&
      workspaceType &&
      selectedPlanConfig.accountType !== workspaceType
    ) {
      toast.error(
        `Account mismatch: You are trying to purchase a ${selectedPlanConfig.accountType} plan on a ${workspaceType} workspace. Please create a new workspace or contact support to change your account type.`,
      );
      return;
    }

    setUpgrading(plan);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const userEmail = sessionData?.session?.user?.email;

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: plan,
          workspaceId,
          interval: billingInterval,
          userEmail,
          returnUrl: window.location.origin + "/settings",
        }),
      });

      const data = await response.json();
      if (data.url) {
        if (data.sandbox) {
          toast.info("Redirecting to complete checkout in sandbox mode...");
        }
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Failed to start checkout");
      }
    } catch (err: unknown) {
      console.warn("Upgrade checkout notice:", err);
      const errorObj = err as { message?: string } | undefined;
      toast.error(
        errorObj?.message || "Failed to initiate checkout. Please try again.",
      );
      setUpgrading(null);
    }
  };

  // Filter plans based on viewMode and user's account type
  let displayedPlans = Object.values(PLANS);
  if (viewMode === "account" && workspaceType) {
    if (workspaceType === "creator") {
      displayedPlans = displayedPlans.filter(
        (p) => p.accountType === "creator" || p.type === "free",
      );
    } else if (workspaceType === "agency") {
      displayedPlans = displayedPlans.filter(
        (p) => p.accountType === "agency" || p.type === "free",
      );
    }
  }

  return (
    <div className="min-h-screen bg-background pt-8 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => {
              if (window.history.length > 2) {
                window.history.back();
              } else {
                navigate({ to: "/settings" });
              }
            }}
            className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>

          <button
            onClick={() =>
              setViewMode((prev) => (prev === "all" ? "account" : "all"))
            }
            className="text-sm font-medium text-brand hover:underline"
          >
            {viewMode === "all" ? "View My Plans" : "View All Plans"}
          </button>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-muted-foreground">
            Find the perfect plan for your business.
          </p>

          <div className="mt-8 flex justify-center">
            <div className="bg-muted p-1 rounded-xl inline-flex relative">
              <button
                onClick={() => setBillingInterval("monthly")}
                className={`relative z-10 px-6 py-2.5 text-sm font-bold rounded-lg transition-all ${
                  billingInterval === "monthly"
                    ? "text-foreground shadow-sm bg-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingInterval("yearly")}
                className={`relative z-10 px-6 py-2.5 text-sm font-bold rounded-lg transition-all flex items-center gap-2 ${
                  billingInterval === "yearly"
                    ? "text-foreground shadow-sm bg-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Yearly
                <span className="bg-green-500/10 text-green-600 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold">
                  Save 16%
                </span>
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 md:grid-cols-${Math.min(displayedPlans.length, 3)} lg:grid-cols-${displayedPlans.length} gap-6 items-stretch justify-center`}
          >
            {displayedPlans.map((plan) => {
              const isCurrentPlan = currentPlan === plan.type;
              const isPro = plan.type.includes("pro");
              const isAgency = plan.accountType === "agency";

              const price =
                billingInterval === "yearly"
                  ? plan.priceYearly
                  : plan.priceMonthly;
              const formattedPrice = new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
              }).format(price);

              return (
                <div
                  key={plan.type}
                  className={`bg-card rounded-3xl border-2 p-6 flex flex-col h-full transition-all duration-200
                    ${
                      isCurrentPlan
                        ? "border-brand shadow-lg shadow-brand/10 relative z-10 scale-105"
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
                      {isAgency ? (
                        <Building2 className="w-5 h-5" />
                      ) : (
                        <User className="w-5 h-5" />
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-foreground">
                      {plan.name}
                    </h3>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-foreground">
                        {price === 0 ? "Free" : formattedPrice}
                      </span>
                      {price > 0 && (
                        <span className="text-muted-foreground font-medium">
                          /{billingInterval === "yearly" ? "yr" : "mo"}
                        </span>
                      )}
                    </div>
                    {billingInterval === "yearly" && price > 0 && (
                      <p className="text-sm text-green-600 font-medium mt-1">
                        2 months free messaging
                      </p>
                    )}
                  </div>

                  <div className="space-y-4 mb-8 flex-1">
                    <Feature included={true}>
                      <span className="font-semibold">
                        {plan.limits.daily_brand_leads === "unlimited"
                          ? "Unlimited"
                          : plan.limits.daily_brand_leads}
                      </span>{" "}
                      brand leads/day
                    </Feature>
                    <Feature included={true}>
                      <span className="font-semibold">
                        {plan.limits.daily_brand_searches === "unlimited"
                          ? "Unlimited"
                          : plan.limits.daily_brand_searches}
                      </span>{" "}
                      searches/day
                    </Feature>
                    <Feature included={true}>
                      <span className="font-semibold">
                        {plan.limits.saved_brand_limit === "unlimited"
                          ? "Unlimited"
                          : plan.limits.saved_brand_limit}
                      </span>{" "}
                      saved brands
                    </Feature>
                    <Feature included={true}>
                      <span className="font-semibold">
                        {plan.limits.monthly_contact_reveals}
                      </span>{" "}
                      contact reveals/mo
                    </Feature>
                    <Feature included={true}>
                      <span className="font-semibold">
                        {plan.limits.team_seats}
                      </span>{" "}
                      team seat{plan.limits.team_seats > 1 ? "s" : ""}
                    </Feature>

                    <div className="h-px bg-border/50 my-4" />

                    <Feature included={plan.features.advanced_filters}>
                      Advanced filters
                    </Feature>
                    <Feature included={plan.features.full_brand_intelligence}>
                      Full Brand Intelligence
                    </Feature>
                    <Feature included={plan.features.product_intelligence}>
                      Product, Funding, & Marketing Intelligence
                    </Feature>
                    <Feature
                      included={plan.features.outreach_tracker === "full"}
                    >
                      Full Outreach Tracker
                    </Feature>
                    <Feature included={plan.features.csv_export !== "none"}>
                      {plan.features.csv_export === "custom"
                        ? "Custom CSV exports"
                        : "CSV exports"}
                    </Feature>
                    <Feature included={plan.features.new_brand_alerts}>
                      In-app brand alerts
                    </Feature>
                    <Feature included={plan.features.shared_workspace_crm}>
                      Shared Workspace CRM
                    </Feature>
                    <Feature included={plan.features.whitelabel_reporting}>
                      Whitelabel reporting
                    </Feature>
                    <Feature included={plan.features.dedicated_account_manager}>
                      Dedicated Account Manager
                    </Feature>
                    <Feature
                      included={plan.features.support_level === "priority"}
                    >
                      Priority support
                    </Feature>
                  </div>

                  <button
                    onClick={() => handleUpgrade(plan.type)}
                    disabled={
                      isCurrentPlan ||
                      upgrading === plan.type ||
                      plan.type === "free"
                    }
                    className={`w-full py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2
                      ${
                        isCurrentPlan
                          ? "bg-muted text-muted-foreground cursor-default"
                          : isPro || isAgency
                            ? "bg-brand text-brand-foreground hover:bg-brand/90 shadow-sm"
                            : plan.type === "free"
                              ? "bg-muted text-muted-foreground cursor-not-allowed"
                              : "bg-foreground text-background hover:bg-foreground/90 shadow-sm"
                      }
                    `}
                  >
                    {upgrading === plan.type ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </div>
                    ) : isCurrentPlan ? (
                      "Current Plan"
                    ) : plan.type === "free" ? (
                      "Free Tier"
                    ) : (
                      "Upgrade to " + plan.name
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function Feature({
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
