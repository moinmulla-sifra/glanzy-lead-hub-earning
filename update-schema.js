const fs = require("fs");

let schema = fs.readFileSync("schema.sql", "utf8");

const dropPrefix = `
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

`;

if (!schema.startsWith("-- Drop tables")) {
  fs.writeFileSync("schema.sql", dropPrefix + schema);
  console.log("Prepended DROP TABLE IF EXISTS to schema.sql");
} else {
  console.log("schema.sql already has DROP statements");
}
