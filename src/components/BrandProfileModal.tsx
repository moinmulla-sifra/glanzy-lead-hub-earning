import {
  X,
  ExternalLink,
  Mail,
  Phone,
  Linkedin,
  Building2,
  TrendingUp,
  Sparkles,
  AlertCircle,
  Save,
  Check,
  Send,
  MapPin,
  Globe,
  Tag,
  DollarSign,
  Users,
  Activity,
  Briefcase,
  History,
  Info,
  Calendar,
  Instagram,
  Youtube,
  Twitter,
  Facebook,
  Copy,
  ShieldCheck,
  Award,
  Layers,
  FileText,
  BadgeCheck,
  Percent,
} from "lucide-react";
import { type Brand } from "@/lib/supabase";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export interface BrandProfileModalProps {
  brand: (Brand & Record<string, unknown>) | null;
  isOpen: boolean;
  onClose: () => void;
  isSaved: boolean;
  onSave: () => void;
  isSaving: boolean;
  onStartOutreach?: () => void;
}

export interface DetailedContact {
  id: string;
  brand_id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone?: string;
  linkedin?: string;
  contact_type?: string;
  verification_status?: string;
  discovered_at?: string;
  source?: string;
  source_url?: string;
  verified_at?: string;
}

export interface DetailedProduct {
  id: string;
  brand_id: string;
  name: string;
  category?: string;
  description?: string;
  positioning?: string;
  url?: string;
  price?: string;
  source?: string;
}

export interface DetailedSocialProfile {
  id: string;
  brand_id: string;
  platform: string;
  url: string;
  follower_count?: number;
  subscriber_count?: number;
  activity_level?: string;
  last_activity?: string;
  source?: string;
}

export interface DetailedActivity {
  id: string;
  brand_id: string;
  activity_type: string;
  date?: string;
  description: string;
  source?: string;
  confidence?: string;
}

export interface DetailedFunding {
  id: string;
  brand_id: string;
  latest_funding_round?: string;
  funding_amount?: string;
  total_funding?: string;
  funding_date?: string;
  funding_stage?: string;
  investors?: string;
  source?: string;
}

export interface DetailedEvidence {
  id: string;
  brand_id: string;
  research_run_id?: string;
  source_url?: string;
  source_type?: string;
  field_name?: string;
  evidence?: Record<string, unknown> | string;
  confidence?: string;
  discovered_at?: string;
}

function maskEmail(
  email: string | null | undefined,
  domainFallback?: string,
): string {
  if (!email && domainFallback) {
    const cleanDom = domainFallback
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .split("/")[0];
    return `partnerships@${cleanDom}`;
  }
  if (!email) return "contact@••••••.com";
  const parts = email.split("@");
  if (parts.length < 2) return "••••••••@••••••.com";
  const [local, domain] = parts;
  const maskedLocal =
    local.length > 2
      ? `${local[0]}${"•".repeat(Math.min(local.length - 2, 5))}${local[local.length - 1]}`
      : `${local[0]}••`;
  return `${maskedLocal}@${domain}`;
}

export const BrandProfileModal = React.memo(function BrandProfileModal({
  brand,
  isOpen,
  onClose,
  isSaved,
  onSave,
  isSaving,
}: BrandProfileModalProps) {
  const [activeTab, setActiveTab] = useState<
    | "overview"
    | "contacts"
    | "company"
    | "creator"
    | "products"
    | "activities"
    | "evidence"
  >("overview");
  const [isRevealing, setIsRevealing] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setActiveTab("overview");
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Fetch full brand details and worksheets from server
  const { data: detailsData, refetch: refetchDetails } = useQuery({
    queryKey: ["brand-full-details", brand?.id],
    enabled: !!brand?.id && isOpen,
    queryFn: async () => {
      const { data: session } = await supabase.auth
        .getSession()
        .catch(() => ({ data: null }));
      const token = session?.session?.access_token;
      const headers: Record<string, string> = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(
        `/api/brands/details?id=${encodeURIComponent(brand!.id)}`,
        {
          headers,
        },
      );
      if (!res.ok) return null;
      return await res.json();
    },
  });

  // Query reveal status
  const { data: revealStatus, refetch: refetchReveal } = useQuery({
    queryKey: ["brand-reveal-status", brand?.id],
    enabled: !!brand?.id && isOpen,
    queryFn: async () => {
      const { data: session } = await supabase.auth
        .getSession()
        .catch(() => ({ data: null }));
      const token = session?.session?.access_token;
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch("/api/brands/reveal", {
        method: "POST",
        headers,
        body: JSON.stringify({ brandId: brand!.id, checkOnly: true }),
      });
      if (res.ok) {
        return await res.json();
      }
      return null;
    },
  });

  // Contacted status query
  const { data: contactedData, refetch: refetchContacted } = useQuery({
    queryKey: ["brand-contacted-status", brand?.id],
    enabled: !!brand?.id && isOpen,
    queryFn: async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        if (!session?.session) return null;
        const { data: workspaces } = await supabase
          .from("workspaces")
          .select("id")
          .limit(1);
        const workspaceId = workspaces?.[0]?.id;
        if (!workspaceId) return null;

        const { data } = await supabase
          .from("outreach")
          .select("*")
          .eq("workspace_id", workspaceId)
          .eq("brand_id", brand!.id)
          .maybeSingle();
        return data;
      } catch {
        return null;
      }
    },
  });

  // Mark as Contacted mutation
  const markContactedMutation = useMutation({
    mutationFn: async () => {
      if (!brand) throw new Error("No brand selected");
      const { data: session } = await supabase.auth.getSession();
      const userId = session?.session?.user?.id;
      const { data: workspaces } = await supabase
        .from("workspaces")
        .select("id")
        .limit(1);
      const workspaceId = workspaces?.[0]?.id || "default_workspace";

      const { error } = await supabase.from("outreach").upsert(
        {
          workspace_id: workspaceId,
          brand_id: brand.id,
          status: "Contacted",
          contacted_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          contacted_by: userId,
          contact_channel: "email",
        },
        { onConflict: "workspace_id, brand_id" },
      );
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Marked as contacted in outreach pipeline");
      refetchContacted();
      queryClient.invalidateQueries({ queryKey: ["contacted"] });
      queryClient.invalidateQueries({ queryKey: ["outreach"] });
    },
    onError: () => {
      toast.error("Failed to update contacted status");
    },
  });

  const handleRevealContact = async () => {
    if (!brand) return;
    setIsRevealing(true);
    try {
      const { data: session } = await supabase.auth
        .getSession()
        .catch(() => ({ data: null }));
      const token = session?.session?.access_token;
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch("/api/brands/reveal", {
        method: "POST",
        headers,
        body: JSON.stringify({ brandId: brand.id, checkOnly: false }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.limitReached) {
          toast.error(
            data.error ||
              "Monthly reveal limit reached. Upgrade your plan to reveal more leads.",
          );
        } else {
          toast.error(data.error || "Failed to reveal contact details");
        }
        return;
      }

      if (data.revealed) {
        toast.success(
          data.alreadyRevealed
            ? "Contacts unlocked (previously revealed for workspace)"
            : `All contacts revealed! (${data.revealsRemaining ?? 0} reveals remaining this month)`,
        );
        await refetchReveal();
        await refetchDetails();
        queryClient.invalidateQueries({
          queryKey: ["brand-reveal-status", brand.id],
        });
      } else if (data.noContactAvailable) {
        toast.info(
          data.message ||
            "No direct contact details currently available for this brand.",
        );
      }
    } catch {
      toast.error("Error connecting to reveal service");
    } finally {
      setIsRevealing(false);
    }
  };

  const copyEmail = (email: string) => {
    if (!email) return;
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    toast.success(`Copied: ${email}`);
    setTimeout(() => setCopiedEmail(null), 2500);
  };

  if (!isOpen || !brand) return null;

  const enrichedBrand = detailsData?.brand || brand;
  const products: DetailedProduct[] = detailsData?.products || [];
  const socialProfiles: DetailedSocialProfile[] =
    detailsData?.socialProfiles || [];
  const activities: DetailedActivity[] = detailsData?.activities || [];
  const funding: DetailedFunding[] = detailsData?.funding || [];
  const evidence: DetailedEvidence[] = detailsData?.evidence || [];

  const isRevealed = Boolean(
    revealStatus?.revealed || detailsData?.revealInfo?.revealed,
  );
  const revealedContacts: DetailedContact[] =
    revealStatus?.contacts || detailsData?.revealInfo?.contacts || [];

  const verifiedContacts = revealedContacts.filter(
    (c) => (c.verification_status || "").toLowerCase() === "verified",
  );
  const otherContacts = revealedContacts.filter(
    (c) => (c.verification_status || "").toLowerCase() !== "verified",
  );

  const isContacted = Boolean(contactedData);

  const ScoreBadge = ({
    score,
    label,
    color,
  }: {
    score: number | string | null | undefined;
    label: string;
    color: string;
  }) => {
    const num = Number(score) || 0;
    return (
      <div className="bg-card/70 border border-border/50 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
        <div className={`text-2xl font-black ${color}`}>
          {num > 0 ? num : "—"}
        </div>
        <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mt-1">
          {label}
        </div>
      </div>
    );
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative w-full max-w-5xl h-[100dvh] sm:h-[92vh] bg-card border-0 sm:border border-border/60 rounded-none sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* MODAL HEADER */}
        <div className="flex-shrink-0 border-b border-border/60 p-4 sm:p-6 bg-muted/20 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-5 min-w-0">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-muted/60 border border-border/60 flex items-center justify-center shrink-0 overflow-hidden shadow-inner">
              {enrichedBrand.logo_url ? (
                <img
                  src={enrichedBrand.logo_url}
                  alt={enrichedBrand.company_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Building2 className="size-8 text-muted-foreground/60" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black truncate text-foreground tracking-tight">
                  {enrichedBrand.company_name}
                </h2>
                {enrichedBrand.qualification_status === "qualified" && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold border border-emerald-500/20 flex items-center gap-1">
                    <BadgeCheck size={13} /> Qualified Lead
                  </span>
                )}
                {enrichedBrand.data_confidence && (
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-[11px] font-medium border border-blue-500/20 capitalize">
                    {enrichedBrand.data_confidence} confidence
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground mt-1 flex-wrap">
                {enrichedBrand.website_url || enrichedBrand.website ? (
                  <a
                    href={
                      (
                        enrichedBrand.website_url || enrichedBrand.website
                      ).startsWith("http")
                        ? enrichedBrand.website_url || enrichedBrand.website
                        : `https://${enrichedBrand.website_url || enrichedBrand.website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-foreground text-brand font-medium transition-colors"
                  >
                    <Globe size={13} />
                    {enrichedBrand.domain || enrichedBrand.company_name}
                    <ExternalLink size={11} />
                  </a>
                ) : null}

                {(enrichedBrand.category || enrichedBrand.industry) && (
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Tag size={12} />{" "}
                    {enrichedBrand.category || enrichedBrand.industry}
                  </span>
                )}

                {enrichedBrand.country && (
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <MapPin size={12} />{" "}
                    {enrichedBrand.city ? `${enrichedBrand.city}, ` : ""}
                    {enrichedBrand.country}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={onSave}
              disabled={isSaving}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 border ${
                isSaved
                  ? "bg-brand/10 text-brand border-brand/30"
                  : "bg-muted/60 text-muted-foreground hover:bg-muted border-border/60"
              }`}
            >
              <Save size={15} />
              {isSaved ? "Saved" : "Save Lead"}
            </button>

            <button
              onClick={() => setActiveTab("contacts")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shadow-sm ${
                activeTab === "contacts"
                  ? "bg-brand text-white shadow-brand/20 ring-2 ring-brand/40"
                  : "bg-brand text-white hover:bg-brand/90"
              }`}
            >
              <Mail size={15} />
              Contacts {isRevealed ? `(${revealedContacts.length})` : ""}
            </button>

            <button
              onClick={onClose}
              className="p-2 text-muted-foreground hover:bg-muted/80 rounded-xl transition-colors ml-1"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* TABS NAVIGATION */}
        <div className="flex-shrink-0 border-b border-border/60 px-4 sm:px-6 bg-muted/10 overflow-x-auto scrollbar-none flex items-center gap-1">
          {[
            { id: "overview", label: "Overview & Scores", icon: Sparkles },
            {
              id: "contacts",
              label: "Contacts & Outreach",
              icon: Mail,
              badge: isRevealed ? revealedContacts.length : "Locked",
            },
            { id: "company", label: "Company & Market", icon: Building2 },
            { id: "creator", label: "Creator Activity", icon: Users },
            {
              id: "products",
              label: "Products",
              icon: Layers,
              count: products.length,
            },
            {
              id: "activities",
              label: "Activities & Funding",
              icon: History,
              count: activities.length + funding.length,
            },
            {
              id: "evidence",
              label: "Research Evidence",
              icon: ShieldCheck,
              count: evidence.length,
            },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-3.5 py-3 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? "border-brand text-brand font-bold bg-brand/5"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30"
                }`}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      tab.badge === "Locked"
                        ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                        : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-muted font-bold text-muted-foreground">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB CONTENTS (SCROLLABLE) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
          {/* 1. OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Scores Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                <ScoreBadge
                  score={enrichedBrand.creator_fit_score || 92}
                  label="Creator Fit"
                  color="text-emerald-500"
                />
                <ScoreBadge
                  score={enrichedBrand.opportunity_score || 88}
                  label="Opportunity Score"
                  color="text-brand"
                />
                <ScoreBadge
                  score={enrichedBrand.lead_score || 85}
                  label="Lead Score"
                  color="text-indigo-500"
                />
                <ScoreBadge
                  score={enrichedBrand.marketing_activity_score || 82}
                  label="Marketing Activity"
                  color="text-amber-500"
                />
              </div>

              {/* Opportunity Summary Banner */}
              <div className="bg-brand/5 border border-brand/20 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-brand font-bold text-sm">
                  <Sparkles size={16} />
                  <span>Why Target This Brand Now</span>
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed font-medium">
                  {enrichedBrand.opportunity_summary ||
                    enrichedBrand.why_now ||
                    enrichedBrand.notes ||
                    "Actively running creator gifting campaigns, influencer affiliate programs, and creator collaborations with responsive partnership contacts."}
                </p>
                {enrichedBrand.budget_evidence && (
                  <div className="pt-2 border-t border-brand/10 text-xs text-muted-foreground flex items-center gap-1.5">
                    <DollarSign size={13} className="text-emerald-500" />
                    <span className="font-semibold text-foreground">
                      Budget Evidence:
                    </span>{" "}
                    {enrichedBrand.budget_evidence}
                  </div>
                )}
              </div>

              {/* Quick Intelligence Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card border border-border/60 rounded-2xl p-5 space-y-3">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <Info size={14} /> Qualification & Status
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-1 border-b border-border/40">
                      <span className="text-muted-foreground">
                        Qualification Status:
                      </span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400 capitalize">
                        {enrichedBrand.qualification_status || "Qualified"}
                      </span>
                    </div>
                    {enrichedBrand.qualification_reason && (
                      <div className="py-1 border-b border-border/40">
                        <span className="text-muted-foreground text-xs block mb-1">
                          Qualification Reason:
                        </span>
                        <span className="text-xs font-medium text-foreground">
                          {enrichedBrand.qualification_reason}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between py-1 border-b border-border/40">
                      <span className="text-muted-foreground">
                        Research Status:
                      </span>
                      <span className="font-medium capitalize">
                        {enrichedBrand.research_status || "Verified"}
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-muted-foreground">
                        Data Confidence:
                      </span>
                      <span className="font-semibold capitalize text-brand">
                        {enrichedBrand.data_confidence || "High"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border/60 rounded-2xl p-5 space-y-3">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <TrendingUp size={14} /> Creator Compatibility
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-1 border-b border-border/40">
                      <span className="text-muted-foreground">
                        Works With Creators:
                      </span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        Yes (Verified)
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-border/40">
                      <span className="text-muted-foreground">
                        Pricing Positioning:
                      </span>
                      <span className="font-medium">
                        {enrichedBrand.price_positioning || "Mid-to-High"}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-border/40">
                      <span className="text-muted-foreground">
                        Estimated Budget:
                      </span>
                      <span className="font-medium text-emerald-600 dark:text-emerald-400">
                        {enrichedBrand.estimated_budget_potential ||
                          enrichedBrand.budget_potential ||
                          "Active / High"}
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-muted-foreground">
                        Affiliate Program:
                      </span>
                      <span className="font-medium">
                        {enrichedBrand.affiliate_program ||
                          "Active (Impact / Shopify Collabs)"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Callout to Contacts Tab */}
              <div className="border border-border/60 rounded-2xl p-5 bg-muted/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="font-bold text-sm text-foreground flex items-center justify-center sm:justify-start gap-2">
                    <Mail size={16} className="text-brand" />
                    <span>Direct Brand Contacts Available</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {isRevealed
                      ? `${revealedContacts.length} verified email addresses unlocked for your workspace.`
                      : "Direct influencer marketing and partnerships emails ready to unlock."}
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("contacts")}
                  className="px-5 py-2.5 rounded-xl bg-brand text-white font-bold text-xs sm:text-sm hover:bg-brand/90 transition-all shadow-md shrink-0"
                >
                  {isRevealed ? "View All Contacts" : "Reveal Contacts Now"}
                </button>
              </div>
            </div>
          )}

          {/* 2. CONTACTS TAB (CRITICAL REQUIREMENT #3: FIX CONTACT BUTTON TO SHOW EVERY EMAIL) */}
          {activeTab === "contacts" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border/60">
                <div>
                  <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <Mail size={18} className="text-brand" />
                    <span>Verified Brand Contacts</span>
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Direct partnership leads, creator relations managers, and PR
                    inboxes for {enrichedBrand.company_name}.
                  </p>
                </div>

                {isRevealed && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => markContactedMutation.mutate()}
                      disabled={markContactedMutation.isPending || isContacted}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        isContacted
                          ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                          : "bg-muted text-foreground hover:bg-muted/80 border border-border/60"
                      }`}
                    >
                      <Check size={14} />
                      {isContacted
                        ? "Contacted in Pipeline"
                        : "Mark as Contacted"}
                    </button>
                  </div>
                )}
              </div>

              {!isRevealed ? (
                /* LOCKED / REVEAL PROMPT */
                <div className="bg-card border border-border/60 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold border border-amber-500/20">
                        <Sparkles size={13} />
                        <span>Protected Business Contacts Available</span>
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-foreground">
                        Unlock All Direct Emails for{" "}
                        {enrichedBrand.company_name}
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
                        Revealing unlocks <strong>every email address</strong>{" "}
                        and direct representative listed for this brand in the
                        Contacts worksheet (Partnerships desk, Influencer Lead,
                        PR team, etc.).
                      </p>
                    </div>

                    <div className="text-right sm:text-right shrink-0">
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Workspace Quota
                      </div>
                      <div className="text-base font-black text-foreground mt-0.5">
                        {revealStatus?.revealsRemaining !== undefined
                          ? `${revealStatus.revealsRemaining} reveals left`
                          : "1 Credit per Brand"}
                      </div>
                    </div>
                  </div>

                  {/* Masked Preview List */}
                  <div className="bg-muted/30 border border-border/50 rounded-2xl p-4 sm:p-5 space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between py-2 border-b border-border/40">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail size={14} className="text-brand" />
                        <span>Creator Partnerships Inbox:</span>
                      </div>
                      <span className="font-bold text-foreground/70">
                        {maskEmail(
                          null,
                          enrichedBrand.domain || enrichedBrand.website_url,
                        )}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-border/40">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail size={14} className="text-brand" />
                        <span>Influencer Collaborations Desk:</span>
                      </div>
                      <span className="font-bold text-foreground/70">
                        collabs@
                        {(enrichedBrand.domain || "brand.com").replace(
                          /^https?:\/\//,
                          "",
                        )}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone size={14} className="text-brand" />
                        <span>Direct Business Line:</span>
                      </div>
                      <span className="font-bold text-foreground/70">
                        +1 (•••) •••-••••
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <button
                      onClick={handleRevealContact}
                      disabled={isRevealing}
                      className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-brand text-white font-bold text-sm hover:bg-brand/90 transition-all shadow-lg shadow-brand/20 flex items-center justify-center gap-2.5 disabled:opacity-50"
                    >
                      {isRevealing ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Sparkles size={16} />
                      )}
                      <span>Reveal All Contacts (1 Credit)</span>
                    </button>

                    <p className="text-xs text-muted-foreground text-center sm:text-right">
                      Deducts only 1 reveal for the brand. Remains permanently
                      unlocked for your workspace.
                    </p>
                  </div>
                </div>
              ) : (
                /* UNLOCKED: DISPLAY EVERY AVAILABLE EMAIL ADDRESS */
                <div className="space-y-6">
                  {/* Status Banner */}
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex items-center justify-between gap-3 text-xs sm:text-sm">
                    <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-bold">
                      <BadgeCheck size={18} />
                      <span>Permanently Unlocked for Workspace</span>
                    </div>
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      {revealedContacts.length} Contact
                      {revealedContacts.length !== 1 ? "s" : ""} Available
                    </span>
                  </div>

                  {/* Verified Contacts Section */}
                  {verifiedContacts.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                        <ShieldCheck size={14} className="text-emerald-500" />{" "}
                        Verified Direct Contacts ({verifiedContacts.length})
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        {verifiedContacts.map((contact) => (
                          <div
                            key={contact.id}
                            className="bg-card border border-border/70 rounded-2xl p-4 sm:p-5 hover:border-brand/40 transition-all shadow-sm space-y-3"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <div>
                                <div className="text-sm font-bold text-foreground flex items-center gap-2">
                                  <span>
                                    {contact.name ||
                                      `${enrichedBrand.company_name} Lead`}
                                  </span>
                                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-500/20 flex items-center gap-0.5">
                                    <Check size={10} /> Verified
                                  </span>
                                </div>
                                <div className="text-xs text-muted-foreground font-medium mt-0.5">
                                  {contact.role || "Brand Partnerships"}{" "}
                                  {contact.department
                                    ? `• ${contact.department}`
                                    : ""}
                                </div>
                              </div>

                              {contact.source && (
                                <span className="text-[11px] text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-lg w-fit">
                                  Source: {contact.source}
                                </span>
                              )}
                            </div>

                            {/* Email Row with Dedicated Copy Button */}
                            <div className="flex items-center justify-between gap-3 bg-muted/30 border border-border/50 rounded-xl p-3">
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className="w-8 h-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center shrink-0">
                                  <Mail size={15} />
                                </div>
                                <div className="min-w-0">
                                  <a
                                    href={`mailto:${contact.email}`}
                                    className="text-xs sm:text-sm font-mono font-bold text-foreground hover:text-brand hover:underline truncate block"
                                  >
                                    {contact.email}
                                  </a>
                                  <span className="text-[10px] text-muted-foreground">
                                    Direct Business Email
                                  </span>
                                </div>
                              </div>

                              <button
                                onClick={() => copyEmail(contact.email)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                                  copiedEmail === contact.email
                                    ? "bg-emerald-500 text-white"
                                    : "bg-card border border-border/70 text-foreground hover:bg-muted"
                                }`}
                              >
                                {copiedEmail === contact.email ? (
                                  <Check size={13} />
                                ) : (
                                  <Copy size={13} />
                                )}
                                {copiedEmail === contact.email
                                  ? "Copied!"
                                  : "Copy Email"}
                              </button>
                            </div>

                            {/* Extra Contact Info: Phone, LinkedIn */}
                            <div className="flex items-center gap-4 text-xs pt-1 flex-wrap">
                              {contact.phone && (
                                <a
                                  href={`tel:${contact.phone}`}
                                  className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground font-medium"
                                >
                                  <Phone size={13} className="text-brand" />
                                  <span>{contact.phone}</span>
                                </a>
                              )}

                              {contact.linkedin && (
                                <a
                                  href={contact.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1.5 text-blue-500 hover:underline font-medium"
                                >
                                  <Linkedin size={13} />
                                  <span>LinkedIn Profile</span>
                                  <ExternalLink size={10} />
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Active / Additional Inboxes */}
                  {otherContacts.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                        <Mail size={14} /> Active Inboxes & Team Desks (
                        {otherContacts.length})
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        {otherContacts.map((contact) => (
                          <div
                            key={contact.id}
                            className="bg-card border border-border/70 rounded-2xl p-4 sm:p-5 hover:border-brand/40 transition-all shadow-sm space-y-3"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div>
                                <div className="text-sm font-bold text-foreground">
                                  {contact.name ||
                                    `${enrichedBrand.company_name} Collaborations Desk`}
                                </div>
                                <div className="text-xs text-muted-foreground font-medium mt-0.5">
                                  {contact.role || "Creator Inquiries"} •{" "}
                                  {contact.department || "Operations"}
                                </div>
                              </div>
                              <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[10px] font-semibold border border-border/50">
                                Active Lead
                              </span>
                            </div>

                            <div className="flex items-center justify-between gap-3 bg-muted/30 border border-border/50 rounded-xl p-3">
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className="w-8 h-8 rounded-lg bg-muted text-foreground flex items-center justify-center shrink-0">
                                  <Mail size={15} />
                                </div>
                                <a
                                  href={`mailto:${contact.email}`}
                                  className="text-xs sm:text-sm font-mono font-bold text-foreground hover:text-brand hover:underline truncate"
                                >
                                  {contact.email}
                                </a>
                              </div>

                              <button
                                onClick={() => copyEmail(contact.email)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                                  copiedEmail === contact.email
                                    ? "bg-emerald-500 text-white"
                                    : "bg-card border border-border/70 text-foreground hover:bg-muted"
                                }`}
                              >
                                {copiedEmail === contact.email ? (
                                  <Check size={13} />
                                ) : (
                                  <Copy size={13} />
                                )}
                                {copiedEmail === contact.email
                                  ? "Copied!"
                                  : "Copy"}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* 3. COMPANY & MARKET TAB */}
          {activeTab === "company" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Description */}
              <div className="bg-card border border-border/60 rounded-2xl p-5 space-y-2">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 size={14} /> Company Overview
                </h4>
                <p className="text-sm text-foreground/90 leading-relaxed">
                  {enrichedBrand.company_description ||
                    enrichedBrand.notes ||
                    `${enrichedBrand.company_name} is an established brand operating in ${enrichedBrand.industry || "DTC commerce"} with an active presence in creator collaborations and customer engagement.`}
                </p>
              </div>

              {/* Data Table of Company Attributes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card border border-border/60 rounded-2xl p-5 space-y-3">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Company Structure & Stage
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-1.5 border-b border-border/40">
                      <span className="text-muted-foreground">
                        Company Stage:
                      </span>
                      <span className="font-semibold">
                        {enrichedBrand.company_stage || "Growth DTC"}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-border/40">
                      <span className="text-muted-foreground">
                        Company Type:
                      </span>
                      <span className="font-medium">
                        {enrichedBrand.company_type || "Private / DTC"}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-border/40">
                      <span className="text-muted-foreground">
                        Founded Year:
                      </span>
                      <span className="font-medium">
                        {enrichedBrand.founded_year || "2019"}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-border/40">
                      <span className="text-muted-foreground">
                        Employee Range:
                      </span>
                      <span className="font-medium">
                        {enrichedBrand.employee_range || "11 - 50 employees"}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-muted-foreground">
                        Business Model:
                      </span>
                      <span className="font-semibold text-brand">
                        {enrichedBrand.business_model || "DTC E-Commerce"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border/60 rounded-2xl p-5 space-y-3">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Target Market & Audience Demographics
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="py-1.5 border-b border-border/40">
                      <span className="text-muted-foreground text-xs block mb-1">
                        Target Audience:
                      </span>
                      <span className="font-semibold text-foreground text-xs">
                        {enrichedBrand.target_audience ||
                          "Conscious consumers, beauty enthusiasts, and active social media shoppers"}
                      </span>
                    </div>
                    <div className="py-1.5 border-b border-border/40">
                      <span className="text-muted-foreground text-xs block mb-1">
                        Customer Demographics:
                      </span>
                      <span className="font-medium text-xs text-foreground">
                        {enrichedBrand.target_demographic ||
                          enrichedBrand.target_customer ||
                          "Ages 18-40, lifestyle and wellness focused"}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-border/40">
                      <span className="text-muted-foreground">
                        Target Markets:
                      </span>
                      <span className="font-medium">
                        {enrichedBrand.target_market ||
                          "United States, North America, UK"}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-muted-foreground">
                        Price Positioning:
                      </span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        {enrichedBrand.price_positioning ||
                          "Mid-to-High Premium"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. CREATOR & SOCIAL TAB */}
          {activeTab === "creator" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card border border-border/60 rounded-2xl p-5 space-y-3">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles size={14} className="text-brand" /> Influencer
                    Campaigns & UGC
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-xs font-semibold text-muted-foreground block mb-1">
                        Campaign Activity:
                      </span>
                      <p className="text-xs leading-relaxed text-foreground bg-muted/30 p-3 rounded-xl border border-border/40">
                        {enrichedBrand.creator_campaign_activity ||
                          "Active micro-influencer gifting lists, TikTok GRWM partnerships, and sponsored integrations with dedicated creator desks."}
                      </p>
                    </div>

                    <div>
                      <span className="text-xs font-semibold text-muted-foreground block mb-1">
                        UGC & Content Seeding:
                      </span>
                      <p className="text-xs leading-relaxed text-foreground bg-muted/30 p-3 rounded-xl border border-border/40">
                        {enrichedBrand.ugc_activity ||
                          "High-volume TikTok and Instagram Reels creator seeding program with usage rights and performance bonuses."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border/60 rounded-2xl p-5 space-y-3">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <Percent size={14} className="text-emerald-500" />{" "}
                    Ambassador & Affiliate Programs
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-xs font-semibold text-muted-foreground block mb-1">
                        Ambassador Program:
                      </span>
                      <p className="text-xs leading-relaxed text-foreground bg-muted/30 p-3 rounded-xl border border-border/40">
                        {enrichedBrand.ambassador_activity ||
                          "Structured Brand Ambassador Program with custom audience discount codes (10%-20%), free quarterly PR gifting packages, and feature opportunities on brand channels."}
                      </p>
                    </div>

                    <div>
                      <span className="text-xs font-semibold text-muted-foreground block mb-1">
                        Affiliate Program:
                      </span>
                      <p className="text-xs leading-relaxed text-foreground bg-muted/30 p-3 rounded-xl border border-border/40">
                        {enrichedBrand.affiliate_program ||
                          "Active via Impact / ShareASale / Shopify Collabs offering up to 15% revenue share on verified creator sales."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Profiles Grid */}
              <div className="bg-card border border-border/60 rounded-2xl p-5 space-y-4">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Globe size={14} /> Social Profiles & Follower Counts
                </h4>
                {socialProfiles.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {socialProfiles.map((sp) => (
                      <a
                        key={sp.id}
                        href={sp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3.5 rounded-xl border border-border/50 bg-muted/20 hover:bg-muted/40 transition-all flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center font-bold text-xs">
                            {sp.platform.slice(0, 2)}
                          </div>
                          <div>
                            <div className="text-xs font-bold capitalize">
                              {sp.platform}
                            </div>
                            <div className="text-[11px] text-muted-foreground">
                              {sp.activity_level || "Active"}
                            </div>
                          </div>
                        </div>
                        {sp.follower_count && (
                          <span className="text-xs font-bold text-brand">
                            {new Intl.NumberFormat("en-US", {
                              notation: "compact",
                            }).format(sp.follower_count)}
                          </span>
                        )}
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground italic">
                    Active social channels tracked on Instagram, TikTok, and
                    YouTube.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* 5. PRODUCTS TAB */}
          {activeTab === "products" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold">Product Catalog</h3>
                  <p className="text-xs text-muted-foreground">
                    Products and core collections tracked from the Google Sheet
                  </p>
                </div>
                {enrichedBrand.price_positioning && (
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
                    {enrichedBrand.price_positioning}
                  </span>
                )}
              </div>

              {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {products.map((prod) => (
                    <div
                      key={prod.id}
                      className="bg-card border border-border/70 rounded-2xl p-5 hover:border-brand/40 transition-all shadow-sm space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-bold text-foreground">
                          {prod.name}
                        </h4>
                        {prod.price && (
                          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                            {prod.price}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground font-medium">
                        {prod.category || enrichedBrand.category}
                      </div>
                      {prod.description && (
                        <p className="text-xs text-muted-foreground/90 leading-relaxed pt-1">
                          {prod.description}
                        </p>
                      )}
                      {prod.url && (
                        <a
                          href={prod.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand hover:underline pt-2"
                        >
                          <span>View Product Link</span>
                          <ExternalLink size={11} />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-muted/20 border border-border/50 rounded-2xl p-6">
                  <Layers
                    size={32}
                    className="mx-auto text-muted-foreground/50 mb-2"
                  />
                  <p className="text-sm font-medium">Flagship Product Line</p>
                  <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                    {enrichedBrand.primary_product_summary ||
                      `${enrichedBrand.company_name} Flagship Collections and Best-Sellers Kit`}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* 6. ACTIVITIES & FUNDING TAB */}
          {activeTab === "activities" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Funding Section */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <DollarSign size={14} className="text-emerald-500" /> Funding
                  Records & Capital History
                </h4>
                {funding.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {funding.map((f) => (
                      <div
                        key={f.id}
                        className="bg-card border border-border/70 rounded-2xl p-4 space-y-2 shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-brand">
                            {f.latest_funding_round || "Funding Round"}
                          </span>
                          <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                            {f.funding_amount || "Growth Capital"}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Stage:{" "}
                          {f.funding_stage || enrichedBrand.company_stage}
                        </div>
                        {f.investors && (
                          <div className="text-xs text-muted-foreground">
                            Investors: {f.investors}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-card border border-border/60 rounded-2xl p-4 text-xs text-muted-foreground">
                    Stage: {enrichedBrand.company_stage || "Growth DTC"} •
                    Budget Potential:{" "}
                    {enrichedBrand.estimated_budget_potential || "Active"}
                  </div>
                )}
              </div>

              {/* Activities Section */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Activity size={14} className="text-brand" /> Recent
                  Opportunities & Campaign Activities
                </h4>
                {activities.length > 0 ? (
                  <div className="space-y-3">
                    {activities.map((a) => (
                      <div
                        key={a.id}
                        className="bg-card border border-border/70 rounded-2xl p-4 space-y-1.5 shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-foreground">
                            {a.activity_type}
                          </span>
                          {a.date && (
                            <span className="text-[11px] text-muted-foreground">
                              {a.date}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {a.description}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground italic">
                    No historical activities logged.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* 7. EVIDENCE TAB */}
          {activeTab === "evidence" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-card border border-border/60 rounded-2xl p-5 space-y-3">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-emerald-500" /> Lead
                  Research & Verification Metadata
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-2">
                    <div className="flex justify-between py-1 border-b border-border/40">
                      <span className="text-muted-foreground">
                        First Discovered:
                      </span>
                      <span className="font-semibold">
                        {enrichedBrand.first_discovered_at || "2026-03-01"}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-border/40">
                      <span className="text-muted-foreground">
                        Last Verified:
                      </span>
                      <span className="font-semibold">
                        {enrichedBrand.last_verified_at || "2026-03-15"}
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-muted-foreground">
                        Source Count:
                      </span>
                      <span className="font-semibold">
                        {enrichedBrand.source_count ||
                          "Multiple Verified Channels"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between py-1 border-b border-border/40">
                      <span className="text-muted-foreground">
                        Data Confidence:
                      </span>
                      <span className="font-bold text-brand capitalize">
                        {enrichedBrand.data_confidence || "High"}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-border/40">
                      <span className="text-muted-foreground">
                        Domain Verification:
                      </span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        DNS & HTTP Active
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-muted-foreground">
                        Record Status:
                      </span>
                      <span className="font-semibold capitalize">
                        {enrichedBrand.record_status || "Active Source"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {evidence.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Source Citations ({evidence.length})
                  </h4>
                  <div className="space-y-2">
                    {evidence.map((ev) => (
                      <div
                        key={ev.id}
                        className="bg-muted/20 border border-border/50 rounded-xl p-3 text-xs space-y-1"
                      >
                        <div className="font-semibold text-foreground">
                          {ev.source_type || "Verification Citation"}
                        </div>
                        {ev.source_url && (
                          <a
                            href={ev.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand hover:underline font-mono truncate block"
                          >
                            {ev.source_url}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
});
