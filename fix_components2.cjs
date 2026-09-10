const fs = require("fs");

function processFile(file) {
  let content = fs.readFileSync(file, "utf8");
  content = content.replace(
    /isRefreshing=\{refreshResearchMutation\.isPending\}\n/g,
    "",
  );
  content = content.replace(
    /onRefreshResearch=\{\(\) =>[\s\S]*?refreshResearchMutation\.mutate\([^)]*\)\s*\}/g,
    "",
  );

  // also clean up any empty lines
  content = content.replace(
    /isRefreshing=\{refreshResearchMutation\.isPending\}/g,
    "",
  );

  fs.writeFileSync(file, content);
}

processFile("src/components/DiscoverView.tsx");
processFile("src/components/ForYouView.tsx");
processFile("src/components/SavedView.tsx");

let modal = fs.readFileSync("src/components/BrandProfileModal.tsx", "utf8");
modal = modal.replace(/isRefreshing\?: boolean;/g, "");
modal = modal.replace(/onRefreshResearch\?: \(\) => void;/g, "");
modal = modal.replace(/isRefreshing,/g, "");
modal = modal.replace(/onRefreshResearch,/g, "");

// Also remove the "Refresh Data" button in BrandProfileModal
modal = modal.replace(
  /<Button[^>]*onClick=\{onRefreshResearch\}[^>]*>[\s\S]*?<\/Button>/g,
  "",
);
fs.writeFileSync("src/components/BrandProfileModal.tsx", modal);

console.log("Fixed props");
