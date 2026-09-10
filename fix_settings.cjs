const fs = require("fs");

let settings = fs.readFileSync("src/components/SettingsView.tsx", "utf8");

// Insert the About tab in the tabs list
settings = settings.replace(
  /\{ id: "danger", label: "Danger Zone", icon: AlertTriangle \},/g,
  `{ id: "about", label: "About", icon: Sparkles },\n    { id: "danger", label: "Danger Zone", icon: AlertTriangle },`,
);

// Add the About tab content
const aboutTabContent = `
        {/* ABOUT TAB */}
        {activeTab === "about" && (
          <div className="space-y-8 animate-in fade-in max-w-3xl">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-1">About Branzly</h2>
              <p className="text-muted-foreground text-sm">Product information and legal details.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold mb-4 text-brand flex items-center gap-2"><Sparkles className="w-4 h-4" /> Branzly</h3>
                <p className="text-sm text-muted-foreground mb-4">An AI-powered brand discovery and intelligence platform for creators and agencies.</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Version</span><span className="font-medium">1.0.0 (Preview)</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Founded</span><span className="font-medium">September 16, 2026</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Country</span><span className="font-medium">India</span></div>
                </div>
              </div>
              
              <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold mb-4 text-foreground">Organization</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Founder & CEO</span><span className="font-medium">Moin M</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Parent Org</span><span className="font-medium">Mirza Group</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Operating Org</span><span className="font-medium">Glanzy Studio</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Website</span><a href="https://www.glanzystudio.dedyn.io" target="_blank" className="font-medium text-brand hover:underline">glanzystudio.dedyn.io</a></div>
                </div>
              </div>
            </div>

            <div className="bg-muted/20 border border-border/50 rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold mb-3 text-foreground">Moin M — Founder & CEO</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Moin M is the Founder and CEO of Branzly, the brand discovery and intelligence platform built to help creators, agencies, and modern marketing teams discover better opportunities and make more informed decisions. As the founder of Glanzy Studio and the creator behind Branzly, Moin M is focused on building practical technology for the creator economy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold mb-4 text-foreground">Legal & Security</h3>
                <div className="flex flex-col gap-3 text-sm">
                  <Link to="/about" className="text-brand hover:underline">About Page</Link>
                  <Link to="/policies" className="text-brand hover:underline">Privacy Policy</Link>
                  <Link to="/terms" className="text-brand hover:underline">Terms of Service</Link>
                  <Link to="/security" className="text-brand hover:underline">Security Architecture</Link>
                </div>
              </div>

              <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold mb-4 text-foreground">Contact</h3>
                <div className="flex flex-col gap-3 text-sm">
                  <div>
                    <span className="block text-muted-foreground text-xs uppercase mb-1">Support & Privacy</span>
                    <a href="mailto:support@branzly.dedyn.io" className="text-foreground hover:text-brand font-medium">support@branzly.dedyn.io</a>
                  </div>
                  <div>
                    <span className="block text-muted-foreground text-xs uppercase mb-1">Leads & Additional Support</span>
                    <a href="mailto:leads@branzly.dedyn.io" className="text-foreground hover:text-brand font-medium">leads@branzly.dedyn.io</a>
                  </div>
                  <div>
                    <span className="block text-muted-foreground text-xs uppercase mb-1">Partnerships</span>
                    <a href="mailto:partners@branzly.dedyn.io" className="text-foreground hover:text-brand font-medium">partners@branzly.dedyn.io</a>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Branzly is a product and startup initiative operated through Glanzy Studio under the broader Mirza Group organization.<br/>
              © {new Date().getFullYear()} Branzly. All rights reserved.
            </p>
          </div>
        )}
`;

settings = settings.replace(
  /\{\/\* DANGER ZONE TAB \*\/\}/,
  aboutTabContent + "\n        {/* DANGER ZONE TAB */}",
);

fs.writeFileSync("src/components/SettingsView.tsx", settings);
console.log("Settings updated");
