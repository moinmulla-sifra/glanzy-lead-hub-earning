import { Sparkles, X } from "lucide-react";
import { useState } from "react";

interface AdSlotProps {
  placement: "discover-feed" | "dashboard" | "for-you";
  className?: string;
}

export function AdSlot({ placement, className = "" }: AdSlotProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      className={`bg-muted/30 border border-border/50 rounded-2xl p-6 relative overflow-hidden group ${className}`}
    >
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-3 right-3 p-1.5 text-muted-foreground hover:bg-background hover:text-foreground rounded-lg transition-colors opacity-0 group-hover:opacity-100"
        title="Hide ad"
      >
        <X size={16} />
      </button>

      <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand/10 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="flex items-start gap-4 relative z-10">
        <div className="w-12 h-12 bg-background rounded-xl border border-border/50 flex items-center justify-center shrink-0 shadow-sm">
          <Sparkles className="w-6 h-6 text-brand" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground bg-background px-2 py-0.5 rounded-md border border-border/50">
              Sponsored
            </span>
            <h4 className="font-bold text-foreground">
              Grow your audience faster
            </h4>
          </div>
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
            Discover advanced tools to monetize your content and reach new
            brands today. Try Branzly Pro to unlock advanced filters and export
            capabilities.
          </p>
          <a
            href="/pricing"
            className="text-sm font-semibold text-brand hover:underline inline-flex items-center gap-1"
          >
            Learn more &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
