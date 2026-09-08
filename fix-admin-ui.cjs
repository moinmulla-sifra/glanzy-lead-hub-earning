const fs = require('fs');
let content = fs.readFileSync('src/components/AdminResearchView.tsx', 'utf8');

const newImports = `
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { triggerAutomatedResearch } from "@/lib/research/actions";
`;

content = content.replace(/import \{ useQuery \} from "@tanstack\/react-query";/, newImports + '\nimport { useQuery } from "@tanstack/react-query";');

const newLogic = `
  const queryClient = useQueryClient();
  const [isTriggering, setIsTriggering] = useState(false);

  const configQuery = useQuery({
    queryKey: ["admin_research_config"],
    queryFn: async () => {
      const { data, error } = await supabase.from('app_config').select('value').eq('key', 'research_scheduler').single();
      if (error && error.code !== 'PGRST116') throw error;
      return data?.value || { enabled: true, frequency: 'hourly', target_per_run: 6 };
    }
  });

  const toggleMutation = useMutation({
    mutationFn: async (currentConfig: any) => {
      const newConfig = { ...currentConfig, enabled: !currentConfig.enabled };
      const { error } = await supabase.from('app_config').upsert({
        key: 'research_scheduler',
        value: newConfig
      });
      if (error) throw error;
      return newConfig;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_research_config"] });
      toast.success("Scheduler configuration updated");
    }
  });

  const triggerMutation = useMutation({
    mutationFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token || '';
      return await triggerAutomatedResearch({ data: { token } });
    },
    onMutate: () => setIsTriggering(true),
    onSuccess: (result) => {
      setIsTriggering(false);
      if (result.status === 'completed') {
        toast.success(\`Run complete: \${result.newLeads} new leads found (Duplicates: \${result.duplicates}, Rejected: \${result.rejected})\`);
      } else if (result.status === 'locked') {
        toast.error("An automated job is already running");
      } else if (result.status === 'disabled') {
        toast.error("Scheduler is disabled");
      } else if (result.status === 'empty_queue') {
        toast.error("No active topics in queue");
      } else {
        toast.error(result.error || "Run failed");
      }
      queryClient.invalidateQueries({ queryKey: ["admin_research_jobs"] });
    },
    onError: (err) => {
      setIsTriggering(false);
      toast.error(err.message || "Failed to trigger run");
    }
  });
`;

content = content.replace(/const jobsQuery = useQuery\(\{/, newLogic + '\n  const jobsQuery = useQuery({');

const newHeader = `
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-card rounded-xl border p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-brand" />
              Automated Hourly Engine
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Discovers up to 6 new qualified brand leads every hour (144/day). Uses a rotated queue of research queries.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => triggerMutation.mutate()}
              disabled={isTriggering || !configQuery.data?.enabled}
              className="bg-brand text-brand-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-brand/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isTriggering ? <Loader2 className="w-4 h-4 animate-spin" /> : <PlayCircle className="w-4 h-4" />}
              Run Engine Now
            </button>
            <button
              onClick={() => toggleMutation.mutate(configQuery.data)}
              disabled={configQuery.isLoading}
              className="border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md text-sm font-medium"
            >
              {configQuery.data?.enabled ? 'Pause Scheduler' : 'Enable Scheduler'}
            </button>
          </div>
        </div>

        <div className="bg-card rounded-xl border p-6">
           <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Clock className="w-5 h-5 text-muted-foreground" />
              Engine Configuration
            </h3>
            <div className="space-y-3 mt-4 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Status</span>
                <span className="font-medium">
                  {configQuery.data?.enabled ? 
                    <span className="text-green-500 flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> Active</span> : 
                    <span className="text-destructive flex items-center gap-1"><AlertCircle className="w-4 h-4"/> Paused</span>}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Frequency</span>
                <span className="font-medium capitalize">{configQuery.data?.frequency || 'Hourly'}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-muted-foreground">Target Leads/Run</span>
                <span className="font-medium">{configQuery.data?.target_per_run || 6} leads</span>
              </div>
            </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
`;

content = content.replace(/<div className="flex justify-between items-center">/, newHeader);

fs.writeFileSync('src/components/AdminResearchView.tsx', content);
