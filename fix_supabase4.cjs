const fs = require("fs");

let code = fs.readFileSync("src/lib/supabase.ts", "utf8");

// Update BrandContact
code = code.replace(
  /export interface BrandContact \{/,
  `export interface BrandContact {\n  source: string | null;\n  source_url: string | null;\n  updated_at: string | null;\n  verified_at: string | null;`,
);

// Update BrandActivity
code = code.replace(
  /export interface BrandActivity \{/,
  `export interface BrandActivity {\n  confidence: string | null;`,
);

// Update BrandSocialProfile
code = code.replace(
  /export interface BrandSocialProfile \{/,
  `export interface BrandSocialProfile {\n  source: string | null;\n  discovered_at: string | null;\n  updated_at: string | null;`,
);

fs.writeFileSync("src/lib/supabase.ts", code);
