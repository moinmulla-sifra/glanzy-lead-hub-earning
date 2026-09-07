const fs = require("fs");
let schema = fs.readFileSync("schema.sql", "utf8");

const prefix = `
-- Drop tables if they exist to allow clean recreation
DROP TABLE IF EXISTS notification_preferences CASCADE;
DROP TABLE IF EXISTS usage CASCADE;
DROP TABLE IF EXISTS subscriptions CASCADE;
DROP TABLE IF EXISTS outreach_activity CASCADE;
DROP TABLE IF EXISTS outreach CASCADE;
DROP TABLE IF EXISTS saved_brands CASCADE;
DROP TABLE IF EXISTS brands CASCADE;
DROP TABLE IF EXISTS workspace_members CASCADE;
DROP TABLE IF EXISTS workspaces CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
\n`;

if (!schema.includes("DROP TABLE IF EXISTS profiles")) {
  schema = prefix + schema;
  fs.writeFileSync("schema.sql", schema);
  console.log("Added DROP TABLE statements to schema.sql");
} else {
  console.log("DROP TABLE statements already present.");
}
