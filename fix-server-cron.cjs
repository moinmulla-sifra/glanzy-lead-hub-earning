const fs = require("fs");
let content = fs.readFileSync("src/server.ts", "utf8");

if (!content.includes("setupCronJobs")) {
  content = `import { setupCronJobs } from "./cron";\n` + content;
  // setupCronJobs should be called synchronously when the module loads
  content = content + `\n// Start the background cron jobs\nsetupCronJobs();\n`;
  fs.writeFileSync("src/server.ts", content);
}
