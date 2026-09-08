const fs = require("fs");
let content = fs.readFileSync("src/routes/admin.tsx", "utf8");

if (!content.includes("import { AdminResearchView }")) {
  content = content.replace(
    /import \{ Shield, Loader2, ArrowLeft \} from "lucide-react";/,
    'import { Shield, Loader2, ArrowLeft } from "lucide-react";\nimport { AdminResearchView } from "@/components/AdminResearchView";',
  );
}

if (
  content.includes("Active Subscriptions") &&
  !content.includes("<AdminResearchView />")
) {
  content = content.replace(
    /<\/div>\n\n        \{activeTab === "subscriptions"/,
    `</div>\n\n        {activeTab === "research" && <AdminResearchView />}\n\n        {activeTab === "subscriptions"`,
  );
}

// Add the tab
if (!content.includes('activeTab === "research"')) {
  content = content.replace(
    /<button\n            onClick=\{\(\) => setActiveTab\("subscriptions"\)\}/,
    `<button
            onClick={() => setActiveTab("research")}
            className={\`px-6 py-4 text-sm font-semibold transition-colors \${
              activeTab === "research"
                ? "text-brand border-b-2 border-brand"
                : "text-muted-foreground hover:text-foreground"
            }\`}
          >
            Research Jobs
          </button>
          <button
            onClick={() => setActiveTab("subscriptions")}`,
  );
}

fs.writeFileSync("src/routes/admin.tsx", content);
