const fs = require('fs');

function addToken(content) {
  return content.replace(/const job = await startResearchJob\(\{[\s\S]*?data: \{([^}]+)\}[\s\S]*?\}\);/g, 
    `const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token || '';
      const job = await startResearchJob({
        data: {$1, token}
      });`);
}

for (const file of ['src/components/DiscoverView.tsx', 'src/components/ForYouView.tsx', 'src/components/SavedView.tsx']) {
  let content = fs.readFileSync(file, 'utf8');
  content = addToken(content);
  fs.writeFileSync(file, content);
}
