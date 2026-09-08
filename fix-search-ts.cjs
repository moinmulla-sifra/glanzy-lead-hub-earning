const fs = require('fs');
let content = fs.readFileSync('src/routes/_dashboard.outreach.tsx', 'utf8');

content = content.replace(/validateSearch: \(search: Record<string, unknown>\): OutreachSearch => \{\n    return \{\n      \.\.\.\(\(search as Record<string, any>\)\['brandId'\] \|\| null \? \{ brandId: \(\(search as Record<string, any>\)\['brandId'\] as string\) \|\| undefined \} : \{\}\),\n    \};\n  \},/g, `validateSearch: (search: Record<string, unknown>): OutreachSearch => {
    return {
      ...(search.brandId ? { brandId: search.brandId as string } : {}),
    };
  },`);

fs.writeFileSync('src/routes/_dashboard.outreach.tsx', content);
