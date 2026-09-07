const fs = require("fs");

let content = fs.readFileSync("src/components/SettingsView.tsx", "utf8");

const target = `{/* SUBSCRIPTION TAB */}
        {activeTab === "subscription" && (
          <div className="space-y-8 animate-in fade-in">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-1">
                Subscription
              </h2>
              <p className="text-muted-foreground text-sm">
                Manage your billing and plan limits.
              </p>
            </div>
            <div className="max-w-md bg-gradient-to-br from-brand/5 to-muted/20 border border-brand/20 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs font-bold text-brand uppercase tracking-wider mb-1">
                    Current Plan
                  </p>
                  <h3 className="text-2xl font-bold text-foreground">Free</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center">
                  <Sparkles className="text-brand w-6 h-6" />
                </div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Active Campaigns
                  </span>
                  <span className="font-medium text-foreground">
                    Unlimited (Beta)
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Team Members</span>
                  <span className="font-medium text-foreground">1 / 1</span>
                </div>
              </div>
              <button
                disabled
                className="w-full py-2.5 bg-foreground text-background font-semibold rounded-xl text-sm shadow-sm opacity-50 cursor-not-allowed"
              >
                Upgrade Options Coming Soon
              </button>
            </div>
          </div>
        )}`;

const replacement = `{/* SUBSCRIPTION TAB */}
        {activeTab === "subscription" && (
          <SubscriptionSettings userId={userId} workspaceId={workspaceId} />
        )}`;

if (content.includes("Unlimited (Beta)")) {
  // using regex
  content = content.replace(
    /\{\/\* SUBSCRIPTION TAB \*\/\}[\s\S]*?Upgrade Options Coming Soon[\s\S]*?<\/button>\s*<\/div>\s*<\/div>\s*\)\}/,
    replacement,
  );
  fs.writeFileSync("src/components/SettingsView.tsx", content);
  console.log("SettingsView patched.");
} else {
  console.log("Could not find target block");
}
