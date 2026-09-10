const fs = require("fs");
let code = fs.readFileSync("src/cron.ts", "utf8");

code = code.replace(
  /process\.env\["VITE_SUPABASE_URL"\] \|\| ""/g,
  'process.env["VITE_SUPABASE_URL"] || import.meta.env.VITE_SUPABASE_URL || ""',
);
code = code.replace(
  /process\.env\["VITE_SUPABASE_ANON_KEY"\] \|\| ""/g,
  'process.env["VITE_SUPABASE_ANON_KEY"] || import.meta.env.VITE_SUPABASE_ANON_KEY || ""',
);

fs.writeFileSync("src/cron.ts", code);
