const fs = require("fs");
let content = fs.readFileSync("src/components/DiscoverView.tsx", "utf8");

const importStatement = `import { AdSlot } from "./ui/AdSlot";\nimport { useMonetization } from "@/lib/useMonetization";\n`;

if (!content.includes("useMonetization")) {
  content = content.replace(
    'import { useState, useEffect, useMemo, useCallback } from "react";',
    `import { useState, useEffect, useMemo, useCallback } from "react";\n${importStatement}`,
  );
}

const componentHook = `  const { planConfig } = useMonetization(userId);\n  const [showAd, setShowAd] = useState(true);`;

if (!content.includes("const { planConfig } = useMonetization(userId);")) {
  content = content.replace(
    /export function DiscoverView\(\{ userId, onStartOutreach \}: DiscoverViewProps\) \{/,
    `export function DiscoverView({ userId, onStartOutreach }: DiscoverViewProps) {\n${componentHook}`,
  );
}

const adJSX = `
          {!planConfig?.features?.removeAds && showAd && (
            <div className="mb-8">
              <AdSlot placement="discover-feed" />
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">`;

if (
  content.includes(
    '<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">',
  ) &&
  !content.includes('<AdSlot placement="discover-feed" />')
) {
  content = content.replace(
    '<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">',
    adJSX,
  );
}

fs.writeFileSync("src/components/DiscoverView.tsx", content);
console.log("DiscoverView patched.");
