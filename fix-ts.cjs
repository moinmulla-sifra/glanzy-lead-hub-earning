const fs = require("fs");

// engine.ts
let engine = fs.readFileSync("src/lib/research/engine.ts", "utf8");
engine = engine.replace(
  /const providerName = job\.provider \|\| 'tinyfish';\n    const provider = providers\[providerName\] \|\| providers\['tinyfish'\];/g,
  "const providerName = job.provider || 'tinyfish';\n    const provider = providers[providerName] || providers['tinyfish'];\n    if (!provider) throw new Error('Provider not found');",
);
engine = engine.replace(
  /result\.company_name\.toLowerCase\(\)\.replace/g,
  "(result.company_name || '').toLowerCase().replace",
);
fs.writeFileSync("src/lib/research/engine.ts", engine);

// apify.ts
let apify = fs.readFileSync("src/lib/research/providers/apify.ts", "utf8");
apify = apify.replace(
  /process\.env\.APIFY_API_TOKEN/g,
  "process.env['APIFY_API_TOKEN']",
);
fs.writeFileSync("src/lib/research/providers/apify.ts", apify);

// tinyfish.ts
let tinyfish = fs.readFileSync(
  "src/lib/research/providers/tinyfish.ts",
  "utf8",
);
tinyfish = tinyfish.replace(
  /process\.env\.TINYFISH_API_KEY/g,
  "process.env['TINYFISH_API_KEY']",
);
fs.writeFileSync("src/lib/research/providers/tinyfish.ts", tinyfish);

// supabase.ts
let supabase = fs.readFileSync("src/lib/supabase.ts", "utf8");
supabase = supabase.replace(
  /import\.meta\.env\.VITE_SUPABASE_URL/g,
  "import.meta.env['VITE_SUPABASE_URL']",
);
supabase = supabase.replace(
  /import\.meta\.env\.VITE_SUPABASE_ANON_KEY/g,
  "import.meta.env['VITE_SUPABASE_ANON_KEY']",
);
supabase = supabase.replace(
  /import\.meta\.env\.VITE_SUPABASE_PUBLISHABLE_KEY/g,
  "import.meta.env['VITE_SUPABASE_PUBLISHABLE_KEY']",
);
fs.writeFileSync("src/lib/supabase.ts", supabase);

// outreach.tsx
let outreach = fs.readFileSync("src/routes/_dashboard.outreach.tsx", "utf8");
outreach = outreach.replace(/search\.brandId/g, "search['brandId']");
outreach = outreach.replace(
  /defaultSelectedId: string \| undefined;/g,
  "defaultSelectedId?: string | null;",
);
fs.writeFileSync("src/routes/_dashboard.outreach.tsx", outreach);
