const fs = require("fs");

for (const file of [
  "src/components/DiscoverView.tsx",
  "src/components/ForYouView.tsx",
  "src/components/SavedView.tsx",
]) {
  let content = fs.readFileSync(file, "utf8");
  content = content.replace(
    /query: \{ url: brand\.website \|\| brand\.domain, keywords: \[brand\.company_name\] , token\}/g,
    "query: { url: brand.website || brand.domain, keywords: [brand.company_name] },\n          provider: 'tinyfish',\n          token\n        }",
  );

  content = content.replace(
    /provider: 'tinyfish'\n        \}\n      \}\);/g,
    "provider: 'tinyfish',\n          token\n        }\n      });",
  );

  fs.writeFileSync(file, content);
}
