require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function test() {
  const email = `test+${Date.now()}@example.com`;
  console.log('Signing up with', email);
  const { data, error } = await supabase.auth.signUp({
    email,
    password: 'Password123!',
  });
  if (error) {
    console.error('Signup error:', error);
  } else {
    console.log('Signup success:', data.user ? data.user.id : 'No user ID');
  }
}
test();
