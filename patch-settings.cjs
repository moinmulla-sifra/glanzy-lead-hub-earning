const fs = require("fs");

let content = fs.readFileSync("src/components/SettingsView.tsx", "utf8");

const replacement = `{/* SUBSCRIPTION TAB */}
        {activeTab === "subscription" && (
          <SubscriptionSettings userId={userId} workspaceId={workspaceId} />
        )}`;

content = content.replace(
  /\{\/\* SUBSCRIPTION TAB \*\/\}[\s\S]*?Upgrade Options Coming Soon[\s\S]*?<\/button>\s*<\/div>\s*<\/div>\s*\)\}/,
  replacement,
);
fs.writeFileSync("src/components/SettingsView.tsx", content);
console.log("SettingsView patched.");
