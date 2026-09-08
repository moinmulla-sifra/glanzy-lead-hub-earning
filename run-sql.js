import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY);
const sql = fs.readFileSync('fix-rls.sql', 'utf8');
// Assuming we don't have direct SQL execution, we'll use the API for now, since it requires postgres extension
