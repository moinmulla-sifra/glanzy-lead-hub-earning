const fs = require("fs");
let content = fs.readFileSync("src/routes/_dashboard.outreach.tsx", "utf8");

content = content.replace(/search\.brandId/g, "search['brandId']");

fs.writeFileSync("src/routes/_dashboard.outreach.tsx", content);
