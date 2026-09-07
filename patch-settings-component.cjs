const fs = require("fs");

let content = fs.readFileSync("src/components/SettingsView.tsx", "utf8");

const importStatement = `import { useState, useEffect } from "react";\nimport { useMonetization } from "@/lib/useMonetization";\nimport { useNavigate } from "@tanstack/react-router";\n`;

// add imports
if (!content.includes("useMonetization")) {
  content = content.replace(
    'import { useState, useEffect } from "react";',
    importStatement,
  );
}

const componentCode = `
function SubscriptionSettings({ userId, workspaceId }: { userId: string | null; workspaceId?: string }) {
  const { currentPlan, planConfig, limits } = useMonetization(userId);
  const navigate = useNavigate();
  
  return (
    <div className="space-y-8 animate-in fade-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">
          Subscription & Billing
        </h2>
        <p className="text-muted-foreground text-sm">
          Manage your plan, limits, and billing details.
        </p>
      </div>

      <div className="max-w-md bg-gradient-to-br from-brand/5 to-muted/20 border border-brand/20 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-bold text-brand uppercase tracking-wider mb-1">
              Current Plan
            </p>
            <h3 className="text-2xl font-bold text-foreground">{planConfig.name}</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center">
            <Sparkles className="text-brand w-6 h-6" />
          </div>
        </div>

        <div className="space-y-4 mb-8">
           <div className="text-sm font-semibold mb-2">Usage Limits</div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Searches / mo</span>
            <span className="font-medium text-foreground">{limits.searchesPerMonth} limit</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Brand Views / mo</span>
            <span className="font-medium text-foreground">{limits.brandViewsPerMonth} limit</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Saved Brands</span>
            <span className="font-medium text-foreground">{limits.savedBrandsTotal} limit</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Team Members</span>
            <span className="font-medium text-foreground">{limits.teamMembers} limit</span>
          </div>
        </div>

        <button 
          onClick={() => navigate({ to: "/pricing" })}
          className="w-full flex justify-center items-center gap-2 py-2.5 px-4 bg-brand text-brand-foreground rounded-xl text-sm font-semibold hover:bg-brand/90 transition-colors shadow-sm"
        >
          View Plans & Upgrade
        </button>
      </div>
    </div>
  );
}
`;

if (!content.includes("function SubscriptionSettings")) {
  content = content + "\n\n" + componentCode;
  fs.writeFileSync("src/components/SettingsView.tsx", content);
  console.log("SubscriptionSettings component added.");
}
