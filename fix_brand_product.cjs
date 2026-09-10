const fs = require("fs");
let content = fs.readFileSync("src/components/BrandProfileModal.tsx", "utf8");
content = content.replace(
  /:\s*brand\.product\s*\?\s*\(\s*<p>\{brand\.product\}<\/p>\s*\)\s*:/g,
  ":",
);
fs.writeFileSync("src/components/BrandProfileModal.tsx", content);
