const fs = require('fs');
let code = fs.readFileSync('src/components/SettingsView.tsx', 'utf-8');

// I need to replace from line 748 to the end of the file.
// Let's just create SubscriptionSettings again completely and inject it.
const subSettings = `function SubscriptionSettings({
  userId,
  workspaceId,
}: {
  userId: string | null;
  workspaceId?: string;
}) {
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

      <div className="max-w-md bg-gradient-to-br from-brand/5 to-muted/20 border border-brand/20 rounded-2xl p-6 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-bold text-brand uppercase tracking-wider mb-1">
              Current Plan
            </p>
            <h3 className="text-2xl font-bold text-foreground">
              {planConfig?.name || "Free"}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center">
            <Sparkles className="text-brand w-6 h-6" />
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Searches / Day</span>
            <span className="font-semibold text-foreground">
              {limits?.daily_brand_searches === "unlimited" ? "Unlimited" : limits?.daily_brand_searches}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Brand Leads / Day</span>
            <span className="font-semibold text-foreground">
              {limits?.daily_brand_leads === "unlimited" ? "Unlimited" : limits?.daily_brand_leads}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Saved Brands</span>
            <span className="font-semibold text-foreground">
              {limits?.saved_brand_limit === "unlimited" ? "Unlimited" : limits?.saved_brand_limit}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Team Seats</span>
            <span className="font-semibold text-foreground">
              {limits?.team_seats || 1}
            </span>
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

// Replace everything from `function SubscriptionSettings` to the end of file
code = code.replace(/function SubscriptionSettings\([\s\S]*$/, subSettings);
fs.writeFileSync('src/components/SettingsView.tsx', code);
