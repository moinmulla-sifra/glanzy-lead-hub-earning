import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

async function testRpc() {
  const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
  
  // Try to create the table using RPC if exec_sql exists
  const sql = fs.readFileSync('schema-p11-part2.sql', 'utf8');
  const { data, error } = await supabase.rpc('exec_sql', { sql_string: sql });
  if (error) {
    console.error("RPC exec_sql failed:", error.message);
  } else {
    console.log("RPC exec_sql success!");
  }
}
testRpc();
