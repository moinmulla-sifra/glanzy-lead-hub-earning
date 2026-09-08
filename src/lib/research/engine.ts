import { SupabaseClient } from '@supabase/supabase-js';
import { TinyFishProvider } from './providers/tinyfish';
import { ApifyProvider } from './providers/apify';
import { ResearchProvider, ResearchQuery, NormalizedBrandResult } from './providers';

const providers: Record<string, ResearchProvider> = {
  tinyfish: new TinyFishProvider(),
  apify: new ApifyProvider(),
};

export class ResearchEngine {
  
  static async createJob(supabase: SupabaseClient, workspaceId: string, userId: string, type: string, query: ResearchQuery, providerName: string = 'tinyfish') {
    const { data, error } = await supabase.from('research_jobs').insert({
      workspace_id: workspaceId,
      requested_by: userId,
      research_type: type,
      query: query,
      provider: providerName,
      status: 'queued'
    }).select().single();
    
    if (error) throw error;
    return data;
  }
  
  static async processJob(supabase: SupabaseClient, jobId: string) {
    // 1. Mark job as running
    await supabase.from('research_jobs').update({ status: 'running', started_at: new Date().toISOString() }).eq('id', jobId);
    
    const { data: job } = await supabase.from('research_jobs').select('*').eq('id', jobId).single();
    if (!job) return;

    const providerName = job.provider || 'tinyfish';
    const provider = providers[providerName] || providers['tinyfish'];
    if (!provider) throw new Error('Provider not found');

    // 2. Create Run
    const { data: run } = await supabase.from('research_runs').insert({
      research_job_id: job.id,
      provider: provider.name,
      status: 'running'
    }).select().single();

    try {
      // 3. Execute Provider (Raw Results)
      const { results, raw } = await provider.discoverBrands(job.query);
      
      // Update run with raw
      await supabase.from('research_runs').update({ raw_results: raw, status: 'completed', completed_at: new Date().toISOString() }).eq('id', run.id);

      // 4. Normalization + Deduplication + Verification + Qualification
      let newBrandsCount = 0;
      for (const result of results) {
        await this.processResult(supabase, result, run.id);
        newBrandsCount++;
      }

      // 5. Complete Job
      await supabase.from('research_jobs').update({ 
        status: 'completed', 
        completed_at: new Date().toISOString(),
        result_count: newBrandsCount
      }).eq('id', job.id);

    } catch (err: any) {
      await supabase.from('research_runs').update({ status: 'failed', error: err.message, completed_at: new Date().toISOString() }).eq('id', run.id);
      await supabase.from('research_jobs').update({ status: 'failed', error: err.message, completed_at: new Date().toISOString() }).eq('id', job.id);
    }
  }

  static async processResult(supabase: SupabaseClient, result: NormalizedBrandResult, runId: string) {
    if (!result.domain && !result.company_name) return; // Need minimal info

    // Deduplication check
    let query = supabase.from('brands').select('id, lead_score');
    if (result.domain) {
      query = query.eq('domain', result.domain);
    } else {
      query = query.eq('company_name', result.company_name);
    }
    
    const { data: existingBrands } = await query;
    let brandId: string;

    const leadScore = this.calculateLeadScore(result);

    if (existingBrands && existingBrands.length > 0) {
      // Update existing
      brandId = existingBrands[0]?.id || '';
      await supabase.from('brands').update({
        last_researched_at: new Date().toISOString(),
        research_status: 'verified',
        lead_score: leadScore,
        data_confidence: 'high'
      }).eq('id', brandId);
    } else {
      // Create new
      const { data: newBrand, error } = await supabase.from('brands').insert({
        company_name: result.company_name,
        normalized_name: (result.company_name || '').toLowerCase().replace(/[^a-z0-9]/g, ''),
        domain: result.domain,
        website: result.website,
        industry: result.industry,
        country: result.country,
        company_stage: result.company_stage,
        recent_funding: result.recent_funding,
        recent_launch: result.recent_launch,
        marketing_activity: result.marketing_activity,
        existing_creator_activity: result.existing_creator_activity,
        email: result.contact_email,
        contact_person: result.contact_person,
        contact_role: result.contact_role,
        linkedin: result.linkedin,
        lead_score: leadScore,
        influencer_fit_score: 75, // Default or calculated
        last_researched_at: new Date().toISOString(),
        last_verified_at: new Date().toISOString(),
        research_status: 'candidate',
        data_confidence: 'high'
      }).select().single();
      
      if (error) {
        console.error("Failed to insert brand", error);
        return;
      }
      brandId = newBrand.id;
    }

    // Insert evidence
    for (const ev of result.evidence) {
      await supabase.from('brand_evidence').insert({
        brand_id: brandId,
        research_run_id: runId,
        field_name: ev.field_name,
        source_url: ev.source_url,
        source_type: ev.source_type,
        confidence: ev.confidence,
        evidence: ev.data
      });
    }
  }

  
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
      
    // Allow overriding a deadlocked job older than 2 hours
    if (activeJob && activeJob.length > 0) {
      const { data: jobDetails } = await supabase.from('research_jobs').select('started_at, created_at').eq('id', activeJob[0]?.id).single();
      if (jobDetails) {
        const startTime = new Date(jobDetails.started_at || jobDetails.created_at).getTime();
        if (Date.now() - startTime > 2 * 60 * 60 * 1000) {
          console.log("Found stale locked job, marking failed to recover...");
          await supabase.from('research_jobs').update({ status: 'failed', error: 'Stale lock timeout' }).eq('id', activeJob[0]?.id);
        } else {
          console.log("An automated job is already running or queued.");
          return { status: 'locked' };
        }
      }
    }
      
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
      if (!provider) throw new Error('Provider not found');
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
      
      console.log(`Automated run complete. Found ${newBrandsCount} new leads (Target: ${targetPerRun}, Duplicates: ${duplicates}, Rejected: ${rejected})`);
      return { status: 'completed', newLeads: newBrandsCount, duplicates, rejected };

    } catch (err: any) {
      console.error("Automated run failed:", err);
      await supabase.from('research_runs').update({ status: 'failed', error: err.message, completed_at: new Date().toISOString() }).eq('id', run.id);
      await supabase.from('research_jobs').update({ status: 'failed', error: err.message, completed_at: new Date().toISOString() }).eq('id', job.id);
      return { status: 'failed', error: err.message };
    }
  }

  static calculateLeadScore(result: NormalizedBrandResult): number {
    let score = 50; // Base score
    if (result.recent_funding) score += 20;
    if (result.recent_launch) score += 15;
    if (result.marketing_activity) score += 10;
    if (result.existing_creator_activity) score += 10;
    if (result.contact_email) score += 5;
    return Math.min(score, 100);
  }
}
