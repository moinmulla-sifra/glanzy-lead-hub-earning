const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const env = fs.readFileSync('.env', 'utf8').split('\n').reduce((acc, line) => {
  const [key, val] = line.split('=');
  if (key) acc[key] = val;
  return acc;
}, {});

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);
// just a quick API test to fetch a brand that has these fields
async function test() {
   const { data, error } = await supabase.from('brands').select('id, company_name, logo_url').limit(1);
   console.log(error ? error : "Success!");
}
test();
