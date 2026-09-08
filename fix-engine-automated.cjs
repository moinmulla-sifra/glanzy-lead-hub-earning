const fs = require("fs");
let content = fs.readFileSync("src/lib/research/engine.ts", "utf8");

// Insert after processResult
const automatedLogic = `
  static async runAutomatedHourlyJob(supabase: SupabaseClient) {
    console.log("Starting automated hourly research run");
    
    // 1. Check if enabled
    const { data: config } = await supabase.from('app_config').select('value').eq('key', 'research_scheduler').single();
    if (config?.value?.enabled === false) {
      console.log("Automated research is disabled.");
      return { status: 'disabled' };
    }
    
    const targetPerRun = config?.value?.target_per_run || 6;

    // 2. Lock check - to prevent simultaneous runs
    // We can use a simple job record with 'automated_hourly' type
    const { data: activeJob } = await supabase
      .from('research_jobs')
      .select('id')
      .eq('research_type', 'automated_hourly')
      .in('status', ['queued', 'running'])
      .limit(1);
      
    if (activeJob && activeJob.length > 0) {
      console.log("An automated job is already running or queued.");
      return { status: 'locked' };
    }

    // 3. Get next from queue
    const { data: queueItem } = await supabase
      .from('research_queue')
      .select('*')
      .eq('enabled', true)
      .order('next_run', { ascending: true })
      .limit(1)
      .single();

    if (!queueItem) {
      console.log("No active items in research queue.");
      return { status: 'empty_queue' };
    }

    // Update queue last_run and next_run
    await supabase.from('research_queue').update({
      last_run: new Date().toISOString(),
      // Add roughly some days/hours depending on how you want it to rotate. Let's add 24 hours to this specific query
      next_run: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    }).eq('id', queueItem.id);

    // 4. Create Job
    const { data: job } = await supabase.from('research_jobs').insert({
      research_type: 'automated_hourly',
      query: queueItem.research_query,
      provider: 'tinyfish', // Could also be rotated
      status: 'running',
      started_at: new Date().toISOString()
    }).select().single();

    // 5. Create Run
    const { data: run } = await supabase.from('research_runs').insert({
      research_job_id: job.id,
      provider: 'tinyfish',
      status: 'running'
    }).select().single();

    try {
      const provider = providers['tinyfish'];
      const { results, raw } = await provider.discoverBrands(queueItem.research_query);
      
      await supabase.from('research_runs').update({ raw_results: raw, status: 'completed', completed_at: new Date().toISOString() }).eq('id', run.id);

      let newBrandsCount = 0;
      let duplicates = 0;
      let rejected = 0;
      
      for (const result of results) {
        if (newBrandsCount >= targetPerRun) break;
        if (!result.domain && !result.company_name) {
          rejected++;
          continue;
        }

        // Deduplication check
        let duplicateQuery = supabase.from('brands').select('id');
        if (result.domain) {
          duplicateQuery = duplicateQuery.eq('domain', result.domain);
        } else {
          duplicateQuery = duplicateQuery.eq('company_name', result.company_name);
        }
        
        const { data: existingBrands } = await duplicateQuery;
        
        if (existingBrands && existingBrands.length > 0) {
          duplicates++;
          continue; // It's a duplicate, automated run only wants NEW leads
        }

        // It's a new lead
        await this.processResult(supabase, result, run.id);
        newBrandsCount++;
      }

      await supabase.from('research_jobs').update({ 
        status: 'completed', 
        completed_at: new Date().toISOString(),
        result_count: newBrandsCount
      }).eq('id', job.id);
      
      console.log(\`Automated run complete. Found \${newBrandsCount} new leads (Target: \${targetPerRun}, Duplicates: \${duplicates}, Rejected: \${rejected})\`);
      return { status: 'completed', newLeads: newBrandsCount, duplicates, rejected };

    } catch (err: any) {
      console.error("Automated run failed:", err);
      await supabase.from('research_runs').update({ status: 'failed', error: err.message, completed_at: new Date().toISOString() }).eq('id', run.id);
      await supabase.from('research_jobs').update({ status: 'failed', error: err.message, completed_at: new Date().toISOString() }).eq('id', job.id);
      return { status: 'failed', error: err.message };
    }
  }
`;

content = content.replace(
  /static calculateLeadScore/g,
  automatedLogic + "\n  static calculateLeadScore",
);

fs.writeFileSync("src/lib/research/engine.ts", content);
