const fs = require('fs');
let content = fs.readFileSync('src/components/DiscoverView.tsx', 'utf8');

const regex = /const workspacesQuery = useQuery\(\{[\s\S]*?const workspaceId = [^\;]+\;/m;
content = content.replace(regex, `const { workspaceId } = useMonetization(userId);`);
fs.writeFileSync('src/components/DiscoverView.tsx', content);
