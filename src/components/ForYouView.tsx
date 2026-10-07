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
  CheckCheck,
  Zap,
  DollarSign,
  Briefcase,
  ArrowRight,
  RotateCcw,
  Bot,
  User,
  ExternalLink,
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
}

const INITIAL_BRAN_MESSAGE =
  "Hi, I'm Bran, your AI Brand Finder. Tell me about your creator profile, niche, or audience, and I'll discover the best sponsorship matches and partnership opportunities for you.";

export function ForYouView({ userId }: { userId: string | null }) {
  const queryClient = useQueryClient();
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [savedBrandIds, setSavedBrandIds] = useState<Set<string>>(new Set());

  // Chat conversation state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
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
    mutationFn: async (promptText: string) => {
      const profile = profileQuery.data;

      const response = await fetch("/api/ai/perfect-fit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptText,
          creatorProfile: {
            niche: profile?.niche || "Creator",
            platforms: profile?.primary_platform
              ? [profile.primary_platform]
              : ["YouTube", "Instagram", "TikTok"],
            audienceSize:
              profile?.monthly_reach ||
              profile?.audience_breakdown ||
              "50k - 250k",
            rateRange: "$1,500 - $4,000",
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
          text: INITIAL_BRAN_MESSAGE,
        },
      ]);
    }
  }, [messages.length]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, aiAgentMutation.isPending]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend ?? inputText).trim();
    if (!text) return;

    const userMsgId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: "user",
      timestamp: new Date(),
      text: text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    aiAgentMutation.mutate(text, {
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
          text: "I couldn't complete that search right now. Please tell me again what brands or niche you're looking for.",
        };
        setMessages((prev) => [...prev, errorMsg]);
      },
    });
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: "bran",
        timestamp: new Date(),
        text: INITIAL_BRAN_MESSAGE,
      },
    ]);
  };

  const handleCopyPitch = (matchId: string, pitchText: string) => {
    navigator.clipboard.writeText(pitchText);
    setCopiedPitchId(matchId);
    toast.success("Pitch hook copied to clipboard");
    setTimeout(() => setCopiedPitchId(null), 2500);
  };

  const isScouting = aiAgentMutation.isPending;

  return (
    <div className="flex flex-col h-[calc(100vh-8.5rem)] lg:h-[calc(100vh-6.5rem)] max-w-4xl mx-auto w-full bg-card/60 backdrop-blur-xl border border-border/60 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl transition-all">
      {/* Classy & Minimalist Header */}
      <header className="px-5 py-3.5 border-b border-border/50 bg-card/85 backdrop-blur-md flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand to-brand/70 flex items-center justify-center text-brand-foreground shadow-sm shadow-brand/20">
              <Sparkles size={18} />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-card" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-semibold text-foreground tracking-tight">
                Bran
              </h2>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-brand/10 text-brand border border-brand/20">
                AI Brand Finder
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground hidden sm:block">
              Intelligent brand discovery and sponsorship scouting
            </p>
          </div>
        </div>

        {/* Minimal Reset Action */}
        <button
          onClick={handleResetChat}
          className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/70 border border-transparent hover:border-border/60 transition-all text-xs flex items-center gap-1.5"
          title="Start new conversation"
        >
          <RotateCcw size={14} />
          <span className="hidden sm:inline text-xs font-medium">Reset</span>
        </button>
      </header>

      {/* Clean Conversation Feed */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 scroll-smooth">
        {messages.map((message) => {
          const isUser = message.sender === "user";

          return (
            <div
              key={message.id}
              className={`flex gap-3 sm:gap-3.5 ${
                isUser ? "justify-end" : "justify-start"
              }`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand shrink-0 mt-0.5 shadow-xs">
                  <Bot size={16} />
                </div>
              )}

              <div
                className={`flex flex-col gap-3 max-w-[88%] sm:max-w-[78%] ${
                  isUser ? "items-end" : "items-start"
                }`}
              >
                {/* Text Bubble */}
                <div
                  className={`px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl text-sm leading-relaxed ${
                    isUser
                      ? "bg-brand text-brand-foreground rounded-tr-xs shadow-md shadow-brand/15 font-medium whitespace-pre-wrap"
                      : "bg-muted/50 border border-border/60 text-foreground rounded-tl-xs shadow-xs"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
                </div>

                {/* Subtle Brand Recommendations (if any) */}
                {message.matches && message.matches.length > 0 && (
                  <div className="w-full mt-2 space-y-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground px-0.5">
                      <span className="font-medium text-foreground flex items-center gap-1.5">
                        <Star
                          size={13}
                          className="text-amber-500 fill-amber-500"
                        />
                        {message.matches.length} Recommended Brand Matches
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
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
                <div className="w-8 h-8 rounded-xl bg-foreground/10 border border-border/70 flex items-center justify-center text-foreground shrink-0 mt-0.5">
                  <User size={15} />
                </div>
              )}
            </div>
          );
        })}

        {/* Bran Scouting Indicator */}
        {isScouting && (
          <div className="flex gap-3 sm:gap-3.5 justify-start animate-in fade-in duration-200">
            <div className="w-8 h-8 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand shrink-0 mt-0.5">
              <Bot size={16} />
            </div>
            <div className="px-4 py-3 rounded-2xl rounded-tl-xs bg-muted/50 border border-border/60 flex items-center gap-3 text-sm text-muted-foreground shadow-xs">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-brand animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-brand animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-brand animate-bounce [animation-delay:0.4s]" />
              </div>
              <span className="text-xs sm:text-sm font-normal text-muted-foreground">
                Bran is scouting brand databases for you...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Classy Minimalist Input Footer — Text Bar & Send Button Only */}
      <footer className="p-3 sm:p-4 border-t border-border/50 bg-card/85 backdrop-blur-md shrink-0">
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
            placeholder="Ask Bran to find brands, sponsorships, or partnership deals..."
            disabled={isScouting}
            className="flex-1 px-3.5 py-2 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none font-normal"
          />

          {inputText && (
            <button
              type="button"
              onClick={() => setInputText("")}
              className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={15} />
            </button>
          )}

          <button
            type="submit"
            disabled={!inputText.trim() || isScouting}
            className="p-2.5 rounded-xl bg-brand text-brand-foreground hover:bg-brand/90 transition-all shadow-xs disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center shrink-0 active:scale-95"
            title="Send"
          >
            <Send size={15} />
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

  return (
    <div className="bg-card rounded-2xl border border-border/70 overflow-hidden flex flex-col shadow-xs hover:border-brand/40 transition-all duration-200">
      <div
        className="p-3.5 sm:p-4 flex-1 flex flex-col cursor-pointer"
        onClick={onClickView}
      >
        <div className="flex justify-between items-start gap-2 mb-2">
          <div className="space-y-0.5 min-w-0">
            <h4 className="text-sm font-bold text-foreground leading-tight truncate">
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
                  {brand.budget_potential}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-bold bg-brand/15 text-brand border border-brand/25 shrink-0">
            <Star size={11} className="fill-brand" />
            {match.matchScore}%
          </div>
        </div>

        {/* Why It Fits */}
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mt-1">
          {match.whyPerfectFit}
        </p>

        {/* Pitch Hook */}
        {match.recommendedPitchAngle && (
          <div className="mt-2.5 pt-2 border-t border-border/40 space-y-1">
            <div className="flex items-center justify-between text-[10px] text-muted-foreground">
              <span className="font-medium flex items-center gap-1">
                <Zap size={11} className="text-amber-500" /> Pitch Angle
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCopyPitch(match.recommendedPitchAngle);
                }}
                className="font-medium text-brand hover:underline flex items-center gap-1"
              >
                {isCopied ? (
                  <>
                    <CheckCheck size={11} className="text-emerald-500" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={11} />
                    Copy
                  </>
                )}
              </button>
            </div>
            <div className="text-xs italic text-foreground/80 line-clamp-2 bg-muted/30 p-1.5 rounded-lg border border-border/40">
              "{match.recommendedPitchAngle}"
            </div>
          </div>
        )}

        {/* Contact info & value */}
        <div className="mt-2.5 pt-2 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground">
          <div className="flex items-center gap-1 truncate max-w-[130px]">
            <Briefcase size={11} />
            <span className="truncate">{match.targetContactRole}</span>
          </div>
          <div className="flex items-center gap-1 font-semibold text-foreground">
            <DollarSign size={11} className="text-emerald-500" />
            <span>{match.estimatedDealValue}</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-3 py-2 border-t border-border/50 bg-muted/20 flex items-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClickView();
          }}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-foreground text-background rounded-xl text-xs font-semibold hover:bg-foreground/90 transition-colors"
        >
          View Details
          <ArrowRight size={12} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave();
          }}
          className={`p-1.5 rounded-xl border transition-colors ${
            isSaved
              ? "bg-brand/10 border-brand/30 text-brand"
              : "bg-background border-border text-muted-foreground hover:bg-muted"
          }`}
          title={isSaved ? "Remove from Saved" : "Save Brand"}
        >
          <Bookmark size={14} className={isSaved ? "fill-brand" : ""} />
        </button>
      </div>
    </div>
  );
}
