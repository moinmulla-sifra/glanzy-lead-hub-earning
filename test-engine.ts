import { createClient } from '@supabase/supabase-js';
import { TinyFishProvider } from './src/lib/research/providers/tinyfish';

async function test() {
  const provider = new TinyFishProvider();
  console.log("Testing TinyFishProvider...");
  const { results, raw } = await provider.discoverBrands({ industry: 'Beauty', country: 'US' });
  console.log("TinyFish returned", results.length, "results.");
  results.forEach(r => {
    console.log(` - ${r.company_name} (${r.domain})`);
    console.log(`   Confidence/Evidence:`, r.evidence.length, "points");
  });
}
test().catch(console.error);
