const fs = require('fs');
let content = fs.readFileSync('src/lib/research/engine.ts', 'utf8');

const oldLock = `.in('status', ['queued', 'running'])
      .limit(1);`;

const newLock = `.in('status', ['queued', 'running'])
      .limit(1);
      
    // Allow overriding a deadlocked job older than 2 hours
    if (activeJob && activeJob.length > 0) {
      const { data: jobDetails } = await supabase.from('research_jobs').select('started_at, created_at').eq('id', activeJob[0].id).single();
      if (jobDetails) {
        const startTime = new Date(jobDetails.started_at || jobDetails.created_at).getTime();
        if (Date.now() - startTime > 2 * 60 * 60 * 1000) {
          console.log("Found stale locked job, marking failed to recover...");
          await supabase.from('research_jobs').update({ status: 'failed', error: 'Stale lock timeout' }).eq('id', activeJob[0].id);
        } else {
          console.log("An automated job is already running or queued.");
          return { status: 'locked' };
        }
      }
    }`;

content = content.replace(oldLock, newLock);
fs.writeFileSync('src/lib/research/engine.ts', content);
