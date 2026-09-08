const fs = require('fs');
let content = fs.readFileSync('src/lib/research/engine.ts', 'utf8');

content = content.replace(/activeJob\[0\]\.id/g, "activeJob[0]?.id");

fs.writeFileSync('src/lib/research/engine.ts', content);
