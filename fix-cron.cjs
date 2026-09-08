const fs = require('fs');
let code = fs.readFileSync('src/cron.ts', 'utf8');
code = code.replace(/const supabaseUrl = process\.env\["VITE_SUPABASE_URL"\] \|\| import\.meta\.env\.VITE_SUPABASE_URL \|\| "https:\/\/placeholder\.supabase\.co";/g, 'const supabaseUrl = process.env["VITE_SUPABASE_URL"] || "https://placeholder.supabase.co";');
code = code.replace(/const supabaseKey = process\.env\["SERVICE_ROLE_KEY"\] \|\| process\.env\["VITE_SUPABASE_ANON_KEY"\] \|\| import\.meta\.env\.VITE_SUPABASE_ANON_KEY \|\| "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder";/g, 'const supabaseKey = process.env["SERVICE_ROLE_KEY"] || process.env["VITE_SUPABASE_ANON_KEY"] || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder";');
fs.writeFileSync('src/cron.ts', code);
