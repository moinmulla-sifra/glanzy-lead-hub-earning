const fs = require('fs');
let content = fs.readFileSync('src/lib/supabase.ts', 'utf8');

const additionalFields = `  last_researched_at?: string | null;
  last_verified_at?: string | null;
  data_confidence?: 'high' | 'medium' | 'low' | 'unverified' | null;
  research_status?: 'candidate' | 'verified' | 'needs_review' | 'rejected' | null;
  source_count?: number;`;

content = content.replace(/updated_at: string;\n\}/, 'updated_at: string;\n' + additionalFields + '\n}');

fs.writeFileSync('src/lib/supabase.ts', content);
