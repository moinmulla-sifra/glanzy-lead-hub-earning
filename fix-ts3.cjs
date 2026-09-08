const fs = require("fs");
let outreach = fs.readFileSync("src/routes/_dashboard.outreach.tsx", "utf8");
outreach = outreach.replace(
  /defaultSelectedId={defaultSelectedId}/g,
  "defaultSelectedId={defaultSelectedId || null}",
);
fs.writeFileSync("src/routes/_dashboard.outreach.tsx", outreach);
