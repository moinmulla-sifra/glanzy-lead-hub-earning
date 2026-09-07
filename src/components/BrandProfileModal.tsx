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
} from "lucide-react";
import { type Brand } from "@/lib/supabase";
import { useEffect } from "react";

import { toast } from "sonner";

interface BrandProfileModalProps {
  brand: Brand | null;
  isOpen: boolean;
  onClose: () => void;
  isSaved: boolean;
  onSave: () => void;
  isSaving: boolean;
  onStartOutreach: () => void;
}

export function BrandProfileModal({
  brand,
  isOpen,
  onClose,
  isSaved,
  onSave,
  isSaving,
  onStartOutreach,
}: BrandProfileModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !brand) return null;

  const copyEmail = () => {
    if (brand.email) {
      navigator.clipboard.writeText(brand.email);
      toast.success("Email copied to clipboard");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 animate-in fade-in duration-200">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-4xl max-h-[90vh] bg-card border border-border/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col slide-in-from-bottom-8 animate-in duration-300">
        {/* Header */}
        <div className="flex-shrink-0 border-b border-border/50 p-6 sm:px-8 bg-muted/10 flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground truncate">
                {brand.company_name}
              </h2>
              {brand.website && (
                <a
                  href={
                    brand.website.startsWith("http")
                      ? brand.website
                      : `https://${brand.website}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-muted rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors shrink-0"
                  title="Visit Website"
                >
                  <ExternalLink size={18} />
                </a>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              {brand.industry && (
                <span className="flex items-center gap-1.5 text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-lg font-medium">
                  <Building2 size={14} />
                  {brand.industry}
                </span>
              )}
              {brand.country && (
                <span className="text-muted-foreground">{brand.country}</span>
              )}
              {brand.company_stage && (
                <span className="text-muted-foreground border-l border-border pl-3">
                  {brand.company_stage} Stage
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-muted/50 hover:bg-muted rounded-full text-muted-foreground transition-colors shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column (Main Info) */}
            <div className="md:col-span-2 space-y-8">
              {/* Creator Fit & Quality */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-brand/5 border border-brand/20 rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-brand font-semibold mb-2">
                    <Sparkles size={18} />
                    Creator Fit
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-1">
                    {brand.influencer_fit_score || "--"}
                    <span className="text-lg text-muted-foreground font-normal">
                      /100
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-brand/10 rounded-full overflow-hidden mt-3">
                    <div
                      className="h-full bg-brand rounded-full"
                      style={{ width: `${brand.influencer_fit_score || 0}%` }}
                    />
                  </div>
                </div>

                <div className="bg-muted/30 border border-border/50 rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-muted-foreground font-semibold mb-2">
                    <TrendingUp size={18} />
                    Lead Score
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-1">
                    {brand.lead_score || "--"}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Overall opportunity signal
                  </p>
                </div>
              </div>

              {/* Opportunity Details */}
              <div className="space-y-6">
                {(brand.why_now ||
                  brand.recent_funding ||
                  brand.recent_launch) && (
                  <div>
                    <h3 className="text-lg font-bold text-foreground flex items-center gap-2 mb-3">
                      <AlertCircle size={18} className="text-brand" />
                      Why now?
                    </h3>
                    <div className="space-y-3">
                      {brand.why_now && (
                        <p className="text-muted-foreground leading-relaxed">
                          {brand.why_now}
                        </p>
                      )}
                      {brand.recent_funding && (
                        <div className="flex items-start gap-3 bg-muted/20 p-4 rounded-xl border border-border/50">
                          <div className="mt-0.5 w-2 h-2 rounded-full bg-green-500 shrink-0" />
                          <div>
                            <span className="font-medium text-foreground block mb-0.5">
                              Recent Funding
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {brand.recent_funding}
                            </span>
                          </div>
                        </div>
                      )}
                      {brand.recent_launch && (
                        <div className="flex items-start gap-3 bg-muted/20 p-4 rounded-xl border border-border/50">
                          <div className="mt-0.5 w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                          <div>
                            <span className="font-medium text-foreground block mb-0.5">
                              Recent Launch
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {brand.recent_launch}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {(brand.existing_creator_activity ||
                  brand.marketing_activity) && (
                  <div>
                    <h3 className="text-lg font-bold text-foreground flex items-center gap-2 mb-3">
                      <TrendingUp size={18} className="text-brand" />
                      Marketing Activity
                    </h3>
                    <div className="space-y-3">
                      {brand.existing_creator_activity && (
                        <div className="bg-muted/20 p-4 rounded-xl border border-border/50">
                          <span className="font-medium text-foreground block mb-1">
                            Creator Activity
                          </span>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {brand.existing_creator_activity}
                          </p>
                        </div>
                      )}
                      {brand.marketing_activity && (
                        <div className="bg-muted/20 p-4 rounded-xl border border-border/50">
                          <span className="font-medium text-foreground block mb-1">
                            General Marketing
                          </span>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {brand.marketing_activity}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column (Contact & Meta) */}
            <div className="space-y-6">
              <div className="bg-muted/10 border border-border/50 rounded-2xl p-5">
                <h3 className="font-bold text-foreground mb-4">
                  Contact Information
                </h3>

                {brand.contact_person ||
                brand.email ||
                brand.phone ||
                brand.linkedin ? (
                  <div className="space-y-4">
                    {brand.contact_person && (
                      <div>
                        <div className="font-medium text-foreground">
                          {brand.contact_person}
                        </div>
                        {brand.contact_role && (
                          <div className="text-sm text-muted-foreground">
                            {brand.contact_role}
                          </div>
                        )}
                      </div>
                    )}

                    {brand.email && (
                      <div className="flex flex-col gap-2 pt-2 border-t border-border/50">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail
                            size={16}
                            className="text-muted-foreground shrink-0"
                          />
                          <span className="truncate flex-1">{brand.email}</span>
                        </div>
                        <button
                          onClick={copyEmail}
                          className="w-full text-xs font-medium py-1.5 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
                        >
                          Copy Email
                        </button>
                      </div>
                    )}

                    {brand.phone && (
                      <div className="flex items-center gap-2 text-sm pt-2 border-t border-border/50">
                        <Phone
                          size={16}
                          className="text-muted-foreground shrink-0"
                        />
                        <span className="truncate">{brand.phone}</span>
                      </div>
                    )}

                    {brand.linkedin && (
                      <div className="pt-2 border-t border-border/50">
                        <a
                          href={
                            brand.linkedin.startsWith("http")
                              ? brand.linkedin
                              : `https://${brand.linkedin}`
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 text-sm text-[#0a66c2] hover:underline"
                        >
                          <Linkedin size={16} className="shrink-0" />
                          <span className="truncate">LinkedIn Profile</span>
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    No contact information available.
                  </p>
                )}
              </div>

              {brand.budget_potential && (
                <div className="bg-muted/10 border border-border/50 rounded-2xl p-5">
                  <h3 className="font-bold text-foreground mb-2">
                    Budget Potential
                  </h3>
                  <div className="text-lg font-medium text-foreground capitalize">
                    {brand.budget_potential}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex-shrink-0 p-6 sm:px-8 bg-muted/10 border-t border-border/50 flex flex-col sm:flex-row items-center gap-4 justify-between">
          <p className="text-xs text-muted-foreground hidden sm:block">
            Information gathered for discovery purposes.
          </p>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              disabled={isSaving}
              onClick={onSave}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200
                ${
                  isSaved
                    ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 group"
                    : "bg-muted text-foreground hover:bg-muted/80 shadow-sm"
                }
              `}
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4 group-hover:hidden" />
                  <X className="w-4 h-4 hidden group-hover:block" />
                  <span className="group-hover:hidden">Saved</span>
                  <span className="hidden group-hover:block">Remove</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Brand
                </>
              )}
            </button>
            <button
              onClick={() => {
                if (!isSaved) {
                  onSave(); // auto save if not saved when starting outreach
                }
                onStartOutreach();
              }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-brand text-brand-foreground rounded-xl text-sm font-semibold hover:bg-brand/90 transition-colors shadow-sm"
            >
              <Send className="w-4 h-4" />
              Start Outreach
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
