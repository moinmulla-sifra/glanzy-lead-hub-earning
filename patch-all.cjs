const fs = require('fs');
const files = [
  'src/components/SavedView.tsx',
  'src/components/OutreachView.tsx',
  'src/components/ForYouView.tsx'
];

const regex = /const workspacesQuery = useQuery\(\{[\s\S]*?const workspaceId = [^\;]+\;/m;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(regex, `const { workspaceId } = useMonetization(userId);`);
  fs.writeFileSync(file, content);
}
