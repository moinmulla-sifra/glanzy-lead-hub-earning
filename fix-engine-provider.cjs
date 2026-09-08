const fs = require('fs');
let content = fs.readFileSync('src/lib/research/engine.ts', 'utf8');
content = content.replace(/const provider = providers\['tinyfish'\];/g, "const provider = providers['tinyfish'];\n      if (!provider) throw new Error('Provider not found');");
fs.writeFileSync('src/lib/research/engine.ts', content);
