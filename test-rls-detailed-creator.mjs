import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const env = fs.readFileSync('.env', 'utf8').split('\n').reduce((acc, line) => {
  const [key, ...val] = line.split('=');
  if (key && val.length) acc[key.trim()] = val.join('=').trim();
  return acc;
}, {});

const SUPABASE_URL = env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false, autoRefreshToken: false }
});

async function runTest() {
  console.log("Starting Detailed RLS Security Test...");
  const timestamp = Date.now();
  const emailA = `tenant_a_${timestamp}@example.com`;
  const emailB = `tenant_b_${timestamp}@example.com`;
  const password = 'TestPassword123!';

  // 1. Setup Tenants
  console.log("\n[1] Creating Tenant A...");
  await supabase.auth.signUp({ email: emailA, password, options: { data: { full_name: 'Tenant A', account_type: 'creator' } } });
  
  console.log("[1] Creating Tenant B...");
  await supabase.auth.signUp({ email: emailB, password, options: { data: { full_name: 'Tenant B', account_type: 'creator' } } });

  // 2. Authenticate as Tenant A to get Workspace ID
  console.log("\n[2] Authenticating as Tenant A");
  await supabase.auth.signInWithPassword({ email: emailA, password });
  
  const { data: workspacesA } = await supabase.from('workspaces').select('id');
  const workspaceIdA = workspacesA[0].id;
  console.log("-> Tenant A Workspace ID:", workspaceIdA);

  // 3. Authenticate as Tenant B
  console.log("\n[3] Authenticating as Tenant B");
  await supabase.auth.signInWithPassword({ email: emailB, password });

  // 4. The Test: Tenant B attempts to access Tenant A's data
  console.log("\n[4] Performing Cross-Tenant Data Access Attempts");
  
  console.log("-> Test A: Attempting to SELECT Workspace A record...");
  const { data: readWsA } = await supabase.from('workspaces').select('*').eq('id', workspaceIdA);
  console.log("   Result:", readWsA.length === 0 ? "✅ BLOCKED (0 rows returned)" : "❌ FAILED (Data leaked)");

  console.log("-> Test B: Attempting to SELECT Workspace A members...");
  const { data: readMembersA } = await supabase.from('workspace_members').select('*').eq('workspace_id', workspaceIdA);
  console.log("   Result:", readMembersA.length === 0 ? "✅ BLOCKED (0 rows returned)" : "❌ FAILED (Data leaked)");

  console.log("-> Test C: Attempting to UPDATE Workspace A name...");
  const { data: updateWsA, error: updateErr } = await supabase.from('workspaces').update({ name: 'Hacked by Tenant B' }).eq('id', workspaceIdA).select();
  console.log("   Result:", (!updateWsA || updateWsA.length === 0) ? "✅ BLOCKED (Update prevented)" : "❌ FAILED (Update succeeded)");

  console.log("\nDetailed RLS test complete!");
}

runTest().catch(console.error);
