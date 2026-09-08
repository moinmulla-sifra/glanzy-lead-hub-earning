const fs = require('fs');
let outreach = fs.readFileSync('src/routes/_dashboard.outreach.tsx', 'utf8');
// Fix the search param casting
outreach = outreach.replace(/\(search as Record<string, any>\)\['brandId'\] \|\| null as string/g, 
  "((search as Record<string, any>)['brandId'] as string) || undefined");

outreach = outreach.replace(/const defaultSelectedId = \(\(search as Record<string, any>\)\['brandId'\] as string\) \|\| undefined;/g, 
  "const defaultSelectedId = ((search as Record<string, any>)['brandId'] as string) || null;");

outreach = outreach.replace(/defaultSelectedId: string \| undefined;/g, 
  "defaultSelectedId?: string | null;");
fs.writeFileSync('src/routes/_dashboard.outreach.tsx', outreach);
