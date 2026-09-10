const fs = require("fs");
let content = fs.readFileSync("src/routes/onboarding.tsx", "utf8");
content = content.replace(/platform:\s*any/g, "platform: string");
content = content.replace(
  /catch\s*\(\s*err\s*:\s*any\s*\)/g,
  "catch (err: unknown)",
);
fs.writeFileSync("src/routes/onboarding.tsx", content);
