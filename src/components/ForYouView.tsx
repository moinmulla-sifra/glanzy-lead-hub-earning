import { BRAND_SELECT_FIELDS } from "@/lib/constants";
import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase, type Brand, type Profile } from "@/lib/supabase";
import { toast } from "sonner";
import { useMonetization } from "@/lib/useMonetization";
import {
  Sparkles,
  Star,
  Bookmark,
  Send,
  X,
  Copy,
  Check,
  CheckCheck,
  Zap,
  DollarSign,
  Briefcase,
  Target,
  ArrowRight,
  RotateCcw,
  Bot,
  User,
  TrendingUp,
  MessageSquare,
} from "lucide-react";
import { BrandProfileModal } from "./BrandProfileModal";

export interface PerfectFitMatch {
  brandId: string;
  brandName: string;
  matchScore: number;
  fitTier: "Exceptional Match" | "High Synergy" | "Strategic Opportunity";
  whyPerfectFit: string;
  opportunitySignals: string[];
  recommendedPitchAngle: string;
  targetContactRole: string;
  estimatedDealValue: string;
  brandData?: Brand | null;
}

export interface PerfectFitResponse {
  success: boolean;
  model: string;
  aiConfigured: boolean;
  summary: string;
  outreachAdvice: string[];
  matches: PerfectFitMatch[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bran";
  timestamp: Date;
  text?: string;
  outreachAdvice?: string[];
  matches?: PerfectFitMatch[];
  isInitial?: boolean;
}

const PRESET_SCOUT_PROMPTS = [
  {
    label: "🚀 High Budget Sponsors ($2,500+)",
    prompt:
      "Find high-growth brands with strong budget potential ($2,500+) ready for paid creator sponsorships",
  },
  {
    label: "💻 B2B SaaS & Tech",
    prompt:
      "Find tech, developer, and productivity SaaS brands actively sponsoring creator integrations",
  },
  {
    label: "🌿 Eco & Wellness",
    prompt:
      "Find sustainable, eco-friendly, and wellness brands looking for authentic creator voices",
  },
  {
    label: "⚡ Recent Product Launches",
    prompt:
      "Find brands that recently launched a new product or retail presence with immediate marketing needs",
  },
  {
    label: "🎯 Micro-Influencer Friendly",
    prompt:
      "Find brands that actively partner with micro and mid-tier creators for ongoing campaigns",
  },
];

const QUICK_NICHES = [
  "All",
  "Technology",
  "Beauty",
  "Fitness",
  "Food & Beverage",
  "Lifestyle",
  "Fashion",
  "Gaming",
  "Finance",
];

export function ForYouView({ userId }: { userId: string | null }) {
  const queryClient = useQueryClient();
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [savedBrandIds, setSavedBrandIds] = useState<Set<string>>(new Set());

  // Chat conversation state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [selectedNiche, setSelectedNiche] = useState<string>("All");
  const [copiedPitchId, setCopiedPitchId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 1. Fetch Profile
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
      return data as Profile;
    },
  });

  // Sync profile niche initially
  useEffect(() => {
    if (profileQuery.data?.niche) {
      setSelectedNiche(profileQuery.data.niche);
    }
  }, [profileQuery.data?.niche]);

  // 2. Fetch Workspace
  const { workspaceId } = useMonetization(userId);

  // 3. Fetch Saved Brands mapping
  useQuery({
    queryKey: ["saved_brands_set", workspaceId],
    enabled: !!workspaceId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("saved_brands")
        .select("brand_id")
        .eq("workspace_id", workspaceId!);
      if (error) throw error;
      const ids = new Set<string>(data.map((d) => d.brand_id));
      setSavedBrandIds(ids);
      return ids;
    },
  });

  // 4. Save/Unsave Mutation
  const toggleSaveMutation = useMutation({
    mutationFn: async ({
      brandId,
      isSaved,
    }: {
      brandId: string;
      isSaved: boolean;
    }) => {
      if (!workspaceId) throw new Error("No workspace selected");

      if (isSaved) {
        const { error } = await supabase
          .from("saved_brands")
          .delete()
          .eq("workspace_id", workspaceId)
          .eq("brand_id", brandId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("saved_brands").insert({
          workspace_id: workspaceId,
          brand_id: brandId,
        });
        if (error) throw error;
      }
      return { brandId, isSaved: !isSaved };
    },
    onSuccess: ({ brandId, isSaved }) => {
      setSavedBrandIds((prev) => {
        const next = new Set(prev);
        if (isSaved) next.add(brandId);
        else next.delete(brandId);
        return next;
      });
      queryClient.invalidateQueries({
        queryKey: ["saved_brands_set", workspaceId],
      });
      queryClient.invalidateQueries({ queryKey: ["saved_brands"] });
      toast.success(isSaved ? "Saved brand to CRM" : "Removed from CRM");
    },
    onError: () => {
      toast.error("Failed to update saved brand");
    },
  });

  // 5. AI Agent Mutation
  const aiAgentMutation = useMutation({
    mutationFn: async ({
      promptText,
      nicheOverride,
    }: {
      promptText: string;
      nicheOverride?: string;
    }) => {
      const nicheToUse = nicheOverride || selectedNiche;
      const profile = profileQuery.data;

      const response = await fetch("/api/ai/perfect-fit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptText,
          creatorProfile: {
            niche: nicheToUse !== "All" ? nicheToUse : profile?.niche,
            platforms: profile?.primary_platform
              ? [profile.primary_platform]
              : ["YouTube", "Instagram", "TikTok"],
            audienceSize:
              profile?.monthly_reach ||
              profile?.audience_breakdown ||
              "50k - 200k",
            rateRange: "$1,500 - $3,500",
            bio: profile?.bio || "Creator producing high-engagement content",
          },
          limit: 6,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || "Bran could not complete the scout query");
      }

      return (await response.json()) as PerfectFitResponse;
    },
  });

  // Initial welcome message from Bran
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          sender: "bran",
          timestamp: new Date(),
          isInitial: true,
          text: `Hey! I'm Bran, your AI sponsorship scout and partnership strategist. I evaluate verified brand funding, active sponsor budgets, and audience synergy to find high-paying sponsor opportunities and craft tailored pitch hooks for you.\n\nTell me what kind of brands you're looking for, or pick a scenario below to start scouting:`,
        },
      ]);
    }
  }, [messages.length]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, aiAgentMutation.isPending]);

  const handleSendMessage = (textToSend?: string, nicheOverride?: string) => {
    const text = (textToSend ?? inputText).trim();
    if (!text && !textToSend) return;

    const userMsgId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: "user",
      timestamp: new Date(),
      text: text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    const activeNiche = nicheOverride || selectedNiche;

    aiAgentMutation.mutate(
      { promptText: text, nicheOverride: activeNiche },
      {
        onSuccess: (data) => {
          const branMsg: ChatMessage = {
            id: `bran-${Date.now()}`,
            sender: "bran",
            timestamp: new Date(),
            text: data.summary,
            outreachAdvice: data.outreachAdvice,
            matches: data.matches,
          };
          setMessages((prev) => [...prev, branMsg]);
        },
        onError: () => {
          const errorMsg: ChatMessage = {
            id: `bran-${Date.now()}`,
            sender: "bran",
            timestamp: new Date(),
            text: "I ran into a temporary issue scouting brands. Let me check the database again — please retry your query or choose one of the quick scenarios.",
          };
          setMessages((prev) => [...prev, errorMsg]);
        },
      },
    );
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: "bran",
        timestamp: new Date(),
        isInitial: true,
        text: `Chat reset. I'm Bran, ready to scout new brand sponsorships for your audience. What sponsors would you like to explore?`,
      },
    ]);
  };

  const handleCopyPitch = (matchId: string, pitchText: string) => {
    navigator.clipboard.writeText(pitchText);
    setCopiedPitchId(matchId);
    toast.success("Pitch hook copied to clipboard!");
    setTimeout(() => setCopiedPitchId(null), 2500);
  };

  const isScouting = aiAgentMutation.isPending;

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] lg:h-[calc(100vh-5rem)] max-w-5xl mx-auto w-full bg-card/60 backdrop-blur-xl border border-border/60 rounded-3xl overflow-hidden shadow-xl animate-in fade-in duration-300">
      {/* Sleek Chatbot Header */}
      <header className="px-5 py-3.5 border-b border-border/60 bg-card/90 backdrop-blur-md flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand to-brand/70 flex items-center justify-center text-brand-foreground shadow-md shadow-brand/20">
              <Sparkles size={20} />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-card" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-foreground tracking-tight">
                Bran
              </h2>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-brand/15 text-brand border border-brand/20">
                AI Sponsorship Agent
              </span>
            </div>
            <p className="text-xs text-muted-foreground hidden sm:block">
              Partnership strategist scouting verified sponsor budgets & deals
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Active Niche Badge */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-muted/60 border border-border/50 text-xs text-muted-foreground">
            <span>Niche:</span>
            <span className="font-semibold text-foreground">
              {selectedNiche}
            </span>
          </div>

          {/* Reset Conversation */}
          <button
            onClick={handleResetChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/60 hover:bg-muted text-muted-foreground hover:text-foreground text-xs font-medium transition-colors"
            title="Start new consultation"
          >
            <RotateCcw size={13} />
            <span className="hidden sm:inline">New Chat</span>
          </button>
        </div>
      </header>

      {/* Conversation Feed */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scroll-smooth">
        {messages.map((message) => {
          const isUser = message.sender === "user";

          return (
            <div
              key={message.id}
              className={`flex gap-3 sm:gap-4 ${
                isUser ? "justify-end" : "justify-start"
              }`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand shrink-0 mt-0.5 shadow-xs">
                  <Bot size={17} />
                </div>
              )}

              <div
                className={`flex flex-col gap-3 max-w-[90%] sm:max-w-[82%] ${
                  isUser ? "items-end" : "items-start"
                }`}
              >
                {/* Text Bubble */}
                <div
                  className={`p-4 rounded-3xl text-sm leading-relaxed ${
                    isUser
                      ? "bg-brand text-brand-foreground rounded-tr-xs shadow-md shadow-brand/15 whitespace-pre-wrap font-medium"
                      : "bg-muted/60 border border-border/60 text-foreground rounded-tl-xs shadow-xs"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
                </div>

                {/* Quick Prompts on initial welcome message */}
                {message.isInitial && (
                  <div className="w-full pt-1 space-y-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                      <Zap size={12} className="text-brand" /> Quick Scenarios:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {PRESET_SCOUT_PROMPTS.map((preset) => (
                        <button
                          key={preset.label}
                          onClick={() => handleSendMessage(preset.prompt)}
                          disabled={isScouting}
                          className="px-3 py-1.5 rounded-xl bg-card hover:bg-muted text-foreground border border-border/70 hover:border-brand/40 text-xs font-medium transition-all shadow-xs hover:shadow-sm active:scale-98 disabled:opacity-50 text-left"
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Outreach Advice Chips from Bran */}
                {message.outreachAdvice &&
                  message.outreachAdvice.length > 0 && (
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                      {message.outreachAdvice.map((advice, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 p-3 rounded-2xl bg-card border border-border/60 text-xs text-foreground/90 shadow-2xs"
                        >
                          <Target
                            size={14}
                            className="text-brand shrink-0 mt-0.5"
                          />
                          <span>{advice}</span>
                        </div>
                      ))}
                    </div>
                  )}

                {/* Rich Brand Match Cards inside chat response */}
                {message.matches && message.matches.length > 0 && (
                  <div className="w-full mt-2 space-y-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
                      <span className="font-semibold text-foreground flex items-center gap-1.5">
                        <Star
                          size={14}
                          className="text-amber-500 fill-amber-500"
                        />
                        {message.matches.length} Recommended Brand Partnerships
                      </span>
                      <span>Ranked by creator synergy</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {message.matches.map((match) => (
                        <ChatBrandMatchCard
                          key={match.brandId}
                          match={match}
                          isSaved={savedBrandIds.has(match.brandId)}
                          onToggleSave={() =>
                            toggleSaveMutation.mutate({
                              brandId: match.brandId,
                              isSaved: savedBrandIds.has(match.brandId),
                            })
                          }
                          onClickView={() => {
                            if (match.brandData) {
                              setSelectedBrand(match.brandData as Brand);
                            }
                          }}
                          onCopyPitch={(pitch) =>
                            handleCopyPitch(match.brandId, pitch)
                          }
                          isCopied={copiedPitchId === match.brandId}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-xl bg-foreground/10 border border-border flex items-center justify-center text-foreground shrink-0 mt-0.5">
                  <User size={16} />
                </div>
              )}
            </div>
          );
        })}

        {/* Bran Scouting Indicator */}
        {isScouting && (
          <div className="flex gap-3 sm:gap-4 justify-start animate-in fade-in duration-200">
            <div className="w-8 h-8 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand shrink-0 mt-0.5">
              <Bot size={17} />
            </div>
            <div className="p-4 rounded-3xl rounded-tl-xs bg-muted/60 border border-border/60 flex items-center gap-3 text-sm text-muted-foreground shadow-xs">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-brand animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-brand animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-brand animate-bounce [animation-delay:0.4s]" />
              </div>
              <span className="text-xs sm:text-sm font-medium">
                Bran is scouting verified brand databases and evaluating deal
                budgets...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Chat Footer with Niche Selector and Input */}
      <footer className="p-3 sm:p-4 border-t border-border/60 bg-card/90 backdrop-blur-md space-y-2.5 shrink-0">
        {/* Niche Selector Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="text-muted-foreground text-[11px] font-medium shrink-0 mr-1 flex items-center gap-1">
            Niche:
          </span>
          {QUICK_NICHES.map((niche) => {
            const isSelected = selectedNiche === niche;
            return (
              <button
                key={niche}
                onClick={() => {
                  setSelectedNiche(niche);
                  toast.success(`Active niche set to ${niche}`);
                }}
                className={`px-2.5 py-1 rounded-xl text-xs font-medium transition-all shrink-0 ${
                  isSelected
                    ? "bg-brand text-brand-foreground shadow-xs"
                    : "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/50"
                }`}
              >
                {niche}
              </button>
            );
          })}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 bg-muted/40 border border-border/70 rounded-2xl p-1.5 focus-within:border-brand/60 focus-within:ring-2 focus-within:ring-brand/20 transition-all shadow-xs"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Message Bran (e.g. 'Find high budget tech sponsors for YouTube integrations')..."
            disabled={isScouting}
            className="flex-1 px-3 py-2 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />

          {inputText && (
            <button
              type="button"
              onClick={() => setInputText("")}
              className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={16} />
            </button>
          )}

          <button
            type="submit"
            disabled={!inputText.trim() || isScouting}
            className="p-2.5 rounded-xl bg-brand text-brand-foreground hover:bg-brand/90 transition-all shadow-xs disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center shrink-0 active:scale-95"
            title="Send to Bran"
          >
            <Send size={16} />
          </button>
        </form>
      </footer>

      {/* Brand Profile Modal */}
      {selectedBrand && workspaceId && (
        <BrandProfileModal
          brand={selectedBrand}
          isOpen={true}
          onClose={() => setSelectedBrand(null)}
          isSaved={savedBrandIds.has(selectedBrand.id)}
          isSaving={toggleSaveMutation.isPending}
          onSave={() =>
            toggleSaveMutation.mutate({
              brandId: selectedBrand.id,
              isSaved: savedBrandIds.has(selectedBrand.id),
            })
          }
          onStartOutreach={() => {}}
        />
      )}
    </div>
  );
}

function ChatBrandMatchCard({
  match,
  isSaved,
  onToggleSave,
  onClickView,
  onCopyPitch,
  isCopied,
}: {
  match: PerfectFitMatch;
  isSaved: boolean;
  onToggleSave: () => void;
  onClickView: () => void;
  onCopyPitch: (pitch: string) => void;
  isCopied: boolean;
}) {
  const brand = match.brandData;
  const fitTierColor =
    match.fitTier === "Exceptional Match"
      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
      : match.fitTier === "High Synergy"
        ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
        : "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";

  return (
    <div className="bg-card rounded-2xl border border-border/70 overflow-hidden flex flex-col shadow-xs hover:border-brand/40 transition-all duration-200">
      {/* Top Header Card Info */}
      <div
        className="p-4 flex-1 flex flex-col cursor-pointer"
        onClick={onClickView}
      >
        <div className="flex justify-between items-start gap-2 mb-2.5">
          <div className="space-y-1 min-w-0">
            <h4 className="text-base font-bold text-foreground leading-tight truncate">
              {match.brandName}
            </h4>
            <div className="flex flex-wrap gap-1.5 items-center">
              {brand?.industry && (
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border/50">
                  {brand.industry}
                </span>
              )}
              {brand?.budget_potential && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-brand/10 text-brand border border-brand/20">
                  {brand.budget_potential} Budget
                </span>
              )}
            </div>
          </div>

          {/* Match Score Badge */}
          <div className="flex flex-col items-end shrink-0">
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-bold bg-brand/15 text-brand border border-brand/25">
              <Star size={11} className="fill-brand" />
              {match.matchScore}%
            </div>
            <span
              className={`text-[9px] font-semibold mt-1 px-1.5 py-0.5 rounded border ${fitTierColor}`}
            >
              {match.fitTier}
            </span>
          </div>
        </div>

        {/* Why Perfect Fit Analysis */}
        <div className="p-2.5 rounded-xl bg-muted/40 border border-border/50 space-y-1">
          <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            <Sparkles size={11} className="text-brand" />
            Why It Fits
          </div>
          <p className="text-xs text-foreground/90 leading-relaxed line-clamp-3">
            {match.whyPerfectFit}
          </p>
        </div>

        {/* Opportunity Signals */}
        {match.opportunitySignals?.length > 0 && (
          <div className="mt-2.5 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
              <TrendingUp size={11} className="text-brand" /> Signals
            </span>
            <ul className="space-y-1 text-xs text-muted-foreground">
              {match.opportunitySignals.slice(0, 2).map((sig, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <Check
                    size={12}
                    className="text-emerald-500 shrink-0 mt-0.5"
                  />
                  <span className="line-clamp-1">{sig}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommended Pitch Angle & Hook */}
        <div className="mt-3 pt-2.5 border-t border-border/40 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
              <Zap size={11} className="text-amber-500" /> Pitch Hook
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCopyPitch(match.recommendedPitchAngle);
              }}
              className="text-[10px] font-semibold text-brand hover:underline flex items-center gap-1 p-0.5 rounded hover:bg-brand/10 transition-colors"
            >
              {isCopied ? (
                <>
                  <CheckCheck size={11} className="text-emerald-500" />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={11} />
                  Copy Hook
                </>
              )}
            </button>
          </div>
          <div className="p-2 rounded-lg bg-background/80 border border-border/60 text-xs italic text-foreground/80 line-clamp-2">
            "{match.recommendedPitchAngle}"
          </div>
        </div>

        {/* Contact Role & Deal Value */}
        <div className="mt-3 pt-2 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Briefcase size={11} />
            <span className="truncate max-w-[120px] text-[11px]">
              {match.targetContactRole}
            </span>
          </div>
          <div className="flex items-center gap-1 font-semibold text-foreground text-[11px]">
            <DollarSign size={11} className="text-emerald-500" />
            <span>{match.estimatedDealValue}</span>
          </div>
        </div>
      </div>

      {/* Card Action Bar */}
      <div className="p-3 border-t border-border/50 bg-muted/15 flex items-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClickView();
          }}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-foreground text-background rounded-xl text-xs font-semibold hover:bg-foreground/90 transition-colors"
        >
          View Brand Intel
          <ArrowRight size={13} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave();
          }}
          className={`p-2 rounded-xl border transition-colors ${
            isSaved
              ? "bg-brand/10 border-brand/30 text-brand hover:bg-brand/20"
              : "bg-background border-border hover:bg-muted text-muted-foreground"
          }`}
          title={isSaved ? "Remove from Saved" : "Save Brand"}
        >
          <Bookmark size={15} className={isSaved ? "fill-brand" : ""} />
        </button>
      </div>
    </div>
  );
}
