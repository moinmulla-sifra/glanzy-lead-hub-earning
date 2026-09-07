import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// simple dotenv parser
const env = fs.readFileSync('.env', 'utf8').split('\n').reduce((acc, line) => {
  const [key, ...val] = line.split('=');
  if (key && val.length) acc[key.trim()] = val.join('=').trim();
  return acc;
}, {});

const SUPABASE_URL = env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  }
});

async function runTest() {
  console.log("Starting RLS Test...");
  const timestamp = Date.now();
  const userAEmail = `user_a_${timestamp}@example.com`;
  const userBEmail = `user_b_${timestamp}@example.com`;
  const password = 'TestPassword123!';

  console.log("Signing up User A...");
  const { data: authA, error: errA } = await supabase.auth.signUp({
    email: userAEmail,
    password,
    options: {
      data: {
        full_name: 'User A',
        account_type: 'creator'
      }
    }
  });
  if (errA) throw errA;

  console.log("Signing up User B...");
  const { data: authB, error: errB } = await supabase.auth.signUp({
    email: userBEmail,
    password,
    options: {
      data: {
        full_name: 'User B',
        account_type: 'creator'
      }
    }
  });
  if (errB) throw errB;

  console.log("Signing in as User A...");
  await supabase.auth.signInWithPassword({ email: userAEmail, password });
  
  const { data: workspacesA, error: wErrA } = await supabase.from('workspaces').select('id');
  if (wErrA) throw wErrA;
  const workspaceIdA = workspacesA[0].id;
  console.log("User A Workspace ID:", workspaceIdA);

  console.log("Signing in as User B...");
  await supabase.auth.signInWithPassword({ email: userBEmail, password });
  
  const { data: workspacesB, error: wErrB } = await supabase.from('workspaces').select('id');
  const workspaceIdB = workspacesB[0].id;
  console.log("User B Workspace ID:", workspaceIdB);

  console.log("User B attempting to read Workspace A...");
  const { data: readA, error: readErr } = await supabase.from('workspaces').select('*').eq('id', workspaceIdA);
  console.log("Result:", readA);
  if (readA.length === 0) {
    console.log("SUCCESS: User B cannot read Workspace A.");
  } else {
    console.error("FAIL: User B read Workspace A!");
  }
  
  console.log("User B attempting to update Workspace A...");
  const { data: updateA, error: updateErr } = await supabase.from('workspaces').update({ name: 'Hacked!' }).eq('id', workspaceIdA).select();
  console.log("Update Error (expected):", updateErr?.message || updateErr);
  console.log("Update Result:", updateA);
  
  if (!updateA || updateA.length === 0) {
    console.log("SUCCESS: User B cannot update Workspace A.");
  } else {
    console.error("FAIL: User B updated Workspace A!");
  }
  
  console.log("Done.");
}

runTest().catch(console.error);
