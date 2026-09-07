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
  console.log("Starting RLS Test 2...");
  const timestamp = Date.now();
  const userAEmail = `user_a_${timestamp}@example.com`;
  const userBEmail = `user_b_${timestamp}@example.com`;
  const password = 'TestPassword123!';

  console.log("Signing up User A...");
  await supabase.auth.signUp({ email: userAEmail, password, options: { data: { full_name: 'User A', account_type: 'creator' } } });
  console.log("Signing up User B...");
  await supabase.auth.signUp({ email: userBEmail, password, options: { data: { full_name: 'User B', account_type: 'creator' } } });

  console.log("Signing in as User A...");
  await supabase.auth.signInWithPassword({ email: userAEmail, password });
  
  const { data: workspacesA } = await supabase.from('workspaces').select('id');
  const workspaceIdA = workspacesA[0].id;
  console.log("User A Workspace ID:", workspaceIdA);

  const { data: membersA } = await supabase.from('workspace_members').select('*').eq('workspace_id', workspaceIdA);
  console.log("User A can see their own workspace members:", membersA.length > 0 ? "YES" : "NO");

  console.log("Signing in as User B...");
  await supabase.auth.signInWithPassword({ email: userBEmail, password });
  
  console.log("User B attempting to read Workspace A members...");
  const { data: readMembersA, error: readMembersErr } = await supabase.from('workspace_members').select('*').eq('workspace_id', workspaceIdA);
  
  if (!readMembersA || readMembersA.length === 0) {
    console.log("SUCCESS: User B cannot read Workspace A members.");
  } else {
    console.error("FAIL: User B read Workspace A members!", readMembersA);
  }
}

runTest().catch(console.error);
