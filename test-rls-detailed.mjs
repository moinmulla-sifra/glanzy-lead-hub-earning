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
  const agencyAEmail = `agency_a_${timestamp}@example.com`;
  const agencyBEmail = `agency_b_${timestamp}@example.com`;
  const password = 'TestPassword123!';

  // 1. Setup Tenants (Agencies)
  console.log("\n[1] Creating Tenant A (Agency A)");
  await supabase.auth.signUp({ email: agencyAEmail, password, options: { data: { full_name: 'Agency A', account_type: 'agency' } } });
  
  console.log("[1] Creating Tenant B (Agency B)");
  await supabase.auth.signUp({ email: agencyBEmail, password, options: { data: { full_name: 'Agency B', account_type: 'agency' } } });

  // Authenticate as Agency A to initialize workspace
  await supabase.auth.signInWithPassword({ email: agencyAEmail, password });
  
  // Since 'agency' account_type doesn't auto-create a workspace in our trigger, we manually create one
  const { data: profileA } = await supabase.from('profiles').select('id').single();
  
  console.log("\n[2] Initializing Workspace for Agency A");
  const { data: newWorkspaceA, error: nwErrA } = await supabase.from('workspaces').insert({
    name: 'Agency A Workspace',
    type: 'agency',
    owner_id: profileA.id
  }).select().single();
  
  if (nwErrA) console.error("Error creating workspace A:", nwErrA);
  
  const workspaceIdA = newWorkspaceA.id;
  
  // Add Agency A to the workspace as owner
  await supabase.from('workspace_members').insert({
    workspace_id: workspaceIdA,
    user_id: profileA.id,
    role: 'owner'
  });
  console.log("-> Agency A Workspace ID:", workspaceIdA);

  // Authenticate as Agency B
  console.log("\n[3] Authenticating as Tenant B (Agency B)");
  await supabase.auth.signInWithPassword({ email: agencyBEmail, password });

  // The Test: Agency B attempts to access Agency A's data
  console.log("\n[4] Performing Cross-Tenant Data Access Attempts");
  
  console.log("-> Test A: Attempting to SELECT Workspace A record...");
  const { data: readWsA } = await supabase.from('workspaces').select('*').eq('id', workspaceIdA);
  console.log("   Result:", readWsA.length === 0 ? "✅ BLOCKED (0 rows returned)" : "❌ FAILED (Data leaked)");

  console.log("-> Test B: Attempting to SELECT Workspace A members...");
  const { data: readMembersA } = await supabase.from('workspace_members').select('*').eq('workspace_id', workspaceIdA);
  console.log("   Result:", readMembersA.length === 0 ? "✅ BLOCKED (0 rows returned)" : "❌ FAILED (Data leaked)");

  console.log("-> Test C: Attempting to UPDATE Workspace A name...");
  const { data: updateWsA } = await supabase.from('workspaces').update({ name: 'Hacked by Agency B' }).eq('id', workspaceIdA).select();
  console.log("   Result:", (!updateWsA || updateWsA.length === 0) ? "✅ BLOCKED (Update prevented)" : "❌ FAILED (Update succeeded)");

  console.log("\nDetailed RLS test complete!");
}

runTest().catch(console.error);
