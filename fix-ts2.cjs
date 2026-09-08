const fs = require("fs");

let engine = fs.readFileSync("src/lib/research/engine.ts", "utf8");
engine = engine.replace(
  /brandId = existingBrands\[0\]\.id;/g,
  "brandId = existingBrands[0]?.id || '';",
);
fs.writeFileSync("src/lib/research/engine.ts", engine);

let outreach = fs.readFileSync("src/routes/_dashboard.outreach.tsx", "utf8");
outreach = outreach.replace(
  /search\['brandId'\]/g,
  "(search as Record<string, any>)['brandId'] || null",
);
fs.writeFileSync("src/routes/_dashboard.outreach.tsx", outreach);
