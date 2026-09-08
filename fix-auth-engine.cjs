const fs = require('fs');

let engine = fs.readFileSync('src/lib/research/engine.ts', 'utf8');
engine = engine.replace(/import \{ supabase \} from '\.\.\/supabase';\n/g, "import { SupabaseClient } from '@supabase/supabase-js';\n");
engine = engine.replace(/static async createJob\(/g, "static async createJob(supabase: SupabaseClient, ");
engine = engine.replace(/static async processJob\(/g, "static async processJob(supabase: SupabaseClient, ");
engine = engine.replace(/static async processResult\(result: NormalizedBrandResult, runId: string\)/g, "static async processResult(supabase: SupabaseClient, result: NormalizedBrandResult, runId: string)");
engine = engine.replace(/await this\.processResult\(result, run\.id\);/g, "await this.processResult(supabase, result, run.id);");

fs.writeFileSync('src/lib/research/engine.ts', engine);

let actions = fs.readFileSync('src/lib/research/actions.ts', 'utf8');
actions = actions.replace(/import \{ ResearchEngine \} from "\.\/engine";/g, 
  "import { ResearchEngine } from \"./engine\";\nimport { createClient } from \"@supabase/supabase-js\";");
actions = actions.replace(/\.validator\(\(d: \{([^}]*)\}\) => d\)/g, 
  ".validator((d: {$1, token: string}) => d)");
actions = actions.replace(/const job = await ResearchEngine\.createJob\(payload\.workspaceId,/g, 
  `const supabase = createClient(process.env['VITE_SUPABASE_URL'] || '', process.env['VITE_SUPABASE_ANON_KEY'] || '', {
      global: { headers: { Authorization: \`Bearer \${payload.token}\` } }
    });
    const job = await ResearchEngine.createJob(supabase, payload.workspaceId,`);
actions = actions.replace(/ResearchEngine\.processJob\(job\.id\)/g, "ResearchEngine.processJob(supabase, job.id)");
fs.writeFileSync('src/lib/research/actions.ts', actions);

