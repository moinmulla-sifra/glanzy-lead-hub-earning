const fs = require("fs");

let code = fs.readFileSync("src/lib/supabase.ts", "utf8");

// Update Outreach
code = code.replace(
  /export interface Outreach \{/,
  `export interface Outreach {\n  contacted_by: string | null;\n  contact_channel: string | null;`,
);

// Add BrandProduct
code += `\nexport interface BrandProduct {
  id: string;
  brand_id: string;
  name: string;
  category: string | null;
  description: string | null;
  positioning: string | null;
  url: string | null;
  price: string | null;
  source: string | null;
  created_at: string;
  updated_at: string;
}\n`;

fs.writeFileSync("src/lib/supabase.ts", code);
