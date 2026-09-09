const fs = require('fs');

let code = fs.readFileSync('src/lib/supabase.ts', 'utf8');

// I will remove the block starting with "// New Brand Intelligence fields" up to "source_count: number | null;" 
// except inside "export interface Brand {"

const blockToRemoveRegex = /\s*\/\/ New Brand Intelligence fields[\s\S]*?source_count:\s*number\s*\|\s*null;/g;

const interfaces = code.split('export interface');
for (let i = 1; i < interfaces.length; i++) {
  const name = interfaces[i].trim().split(' ')[0];
  if (name !== 'Brand' && name !== 'BrandSocialProfile' && name !== 'BrandActivity' && name !== 'BrandFunding' && name !== 'BrandContact') {
    interfaces[i] = interfaces[i].replace(blockToRemoveRegex, '');
  }
}
code = interfaces[0] + interfaces.slice(1).map(x => 'export interface' + x).join('');

fs.writeFileSync('src/lib/supabase.ts', code);
