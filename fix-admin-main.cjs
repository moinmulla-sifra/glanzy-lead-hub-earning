const fs = require('fs');
let content = fs.readFileSync('src/routes/admin.tsx', 'utf8');

content = content.replace(
  /<div className="bg-card border border-border\/50 rounded-2xl p-8 text-center text-muted-foreground">\s*<p>\s*Admin tools are currently in development. Database operations should\s*be performed via the Supabase Dashboard until the internal admin\s*suite is ready.\s*<\/p>\s*<\/div>/g,
  '<AdminResearchView />'
);

fs.writeFileSync('src/routes/admin.tsx', content);
