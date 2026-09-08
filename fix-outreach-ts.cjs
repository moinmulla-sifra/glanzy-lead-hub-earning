const fs = require('fs');
let outreach = fs.readFileSync('src/routes/_dashboard.outreach.tsx', 'utf8');

outreach = outreach.replace(/const brandId = \(\(search as Record<string, any>\)\['brandId'\] as string\) \|\| null;/g,
  "const brandId = ((search as Record<string, any>)['brandId'] as string) || null;");

outreach = outreach.replace(/<OutreachView userId=\{userId\} defaultSelectedId=\{brandId\} \/>/g,
  "<OutreachView userId={userId} defaultSelectedId={brandId || null} />");

fs.writeFileSync('src/routes/_dashboard.outreach.tsx', outreach);
