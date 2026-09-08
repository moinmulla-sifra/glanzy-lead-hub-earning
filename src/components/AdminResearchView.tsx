import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { triggerAutomatedResearch } from "@/lib/research/actions";

import { useQuery } from "@tanstack/react-query";
import { supabase, type ResearchJob } from "@/lib/supabase";
import {
  Loader2,
  Search,
  AlertCircle,
  CheckCircle2,
  PlayCircle,
  Clock,
  BarChart,
  Activity,
} from "lucide-react";

export function AdminResearchView() {
  const queryClient = useQueryClient();
  const [isTriggering, setIsTriggering] = useState(false);

  const configQuery = useQuery({
    queryKey: ["admin_research_config"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("app_config")
        .select("value")
        .eq("key", "research_scheduler")
        .single();
      if (error && error.code !== "PGRST116") throw error;
      return (
        data?.value || { enabled: true, frequency: "hourly", target_per_run: 6 }
      );
    },
  });

  const toggleMutation = useMutation({
    mutationFn: async (currentConfig: any) => {
      const newConfig = { ...currentConfig, enabled: !currentConfig.enabled };
      const { error } = await supabase.from("app_config").upsert({
        key: "research_scheduler",
        value: newConfig,
      });
      if (error) throw error;
      return newConfig;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_research_config"] });
      toast.success("Scheduler configuration updated");
    },
  });

  const triggerMutation = useMutation({
    mutationFn: async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const token = session?.access_token || "";
      return await triggerAutomatedResearch({ data: { token } });
    },
    onMutate: () => setIsTriggering(true),
    onSuccess: (result) => {
      setIsTriggering(false);
      if (result.status === "completed") {
        toast.success(
          `Run complete: ${result.newLeads} new leads found (Duplicates: ${result.duplicates}, Rejected: ${result.rejected})`,
        );
      } else if (result.status === "locked") {
        toast.error("An automated job is already running");
      } else if (result.status === "disabled") {
        toast.error("Scheduler is disabled");
      } else if (result.status === "empty_queue") {
        toast.error("No active topics in queue");
      } else {
        toast.error(result.error || "Run failed");
      }
      queryClient.invalidateQueries({ queryKey: ["admin_research_jobs"] });
    },
    onError: (err) => {
      setIsTriggering(false);
      toast.error(err.message || "Failed to trigger run");
    },
  });

  const jobsQuery = useQuery({
    queryKey: ["admin_research_jobs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("research_jobs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      return data as ResearchJob[];
    },
  });

  if (jobsQuery.isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-brand" />
      </div>
    );
  }

  const jobs = jobsQuery.data || [];
  const totalJobs = jobs.length;
  const totalLeadsFound = jobs.reduce(
    (acc, job) => acc + (job.result_count || 0),
    0,
  );

  const providerStats = jobs.reduce(
    (acc, job) => {
      const p = job.provider || "unknown";
      if (!acc[p]) acc[p] = { total: 0, failed: 0 };
      acc[p].total++;
      if (job.status === "failed") acc[p].failed++;
      return acc;
    },
    {} as Record<string, { total: number; failed: number }>,
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-card rounded-xl border p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-brand" />
              Automated Hourly Engine
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Discovers up to 6 new qualified brand leads every hour (144/day).
              Uses a rotated queue of research queries.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => triggerMutation.mutate()}
              disabled={isTriggering || !configQuery.data?.enabled}
              className="bg-brand text-brand-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-brand/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isTriggering ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <PlayCircle className="w-4 h-4" />
              )}
              Run Engine Now
            </button>
            <button
              onClick={() => toggleMutation.mutate(configQuery.data)}
              disabled={configQuery.isLoading}
              className="border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md text-sm font-medium"
            >
              {configQuery.data?.enabled
                ? "Pause Scheduler"
                : "Enable Scheduler"}
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
                {configQuery.data?.enabled ? (
                  <span className="text-green-500 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Active
                  </span>
                ) : (
                  <span className="text-destructive flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> Paused
                  </span>
                )}
              </span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Frequency</span>
              <span className="font-medium capitalize">
                {configQuery.data?.frequency || "Hourly"}
              </span>
            </div>
            <div className="flex justify-between pb-2">
              <span className="text-muted-foreground">Target Leads/Run</span>
              <span className="font-medium">
                {configQuery.data?.target_per_run || 6} leads
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-card rounded-xl border p-6 flex flex-col items-center justify-center text-center">
          <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
            <Activity className="w-4 h-4" /> Total Leads Found
          </h3>
          <span className="text-5xl font-bold text-brand my-2">
            {totalLeadsFound}
          </span>
          <span className="text-xs text-muted-foreground">
            from recent {totalJobs} jobs
          </span>
        </div>

        <div className="bg-card rounded-xl border p-6 col-span-1 lg:col-span-2">
          <h3 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
            <BarChart className="w-4 h-4" /> Provider Performance (Recent)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(providerStats).map(
              ([provider, stats]: [string, any]) => {
                const failRate =
                  stats.total > 0
                    ? Math.round((stats.failed / stats.total) * 100)
                    : 0;
                return (
                  <div
                    key={provider}
                    className="bg-secondary/50 rounded-lg p-4 border flex justify-between items-center"
                  >
                    <div>
                      <div className="font-semibold capitalize">{provider}</div>
                      <div className="text-xs text-muted-foreground">
                        {stats.total} total runs
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`font-bold text-lg ${failRate > 20 ? "text-destructive" : "text-green-500"}`}
                      >
                        {failRate}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        failure rate
                      </div>
                    </div>
                  </div>
                );
              },
            )}
            {Object.keys(providerStats).length === 0 && (
              <div className="text-sm text-muted-foreground">
                No provider data available
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Research Jobs History</h2>
        <span className="text-sm text-muted-foreground">
          {jobs.length} recent jobs
        </span>
      </div>

      <div className="bg-card rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">Job ID</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Provider</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Results</th>
                <th className="px-6 py-4">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {jobs.map((job) => (
                <tr
                  key={job.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <td className="px-6 py-4 font-mono text-xs" title={job.id}>
                    {job.id.substring(0, 8)}...
                  </td>
                  <td className="px-6 py-4 font-medium">{job.research_type}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs">
                      {job.provider || "unknown"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {job.status === "completed" && (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      )}
                      {job.status === "failed" && (
                        <AlertCircle className="w-4 h-4 text-destructive" />
                      )}
                      {job.status === "running" && (
                        <PlayCircle className="w-4 h-4 text-brand animate-pulse" />
                      )}
                      {job.status === "queued" && (
                        <Clock className="w-4 h-4 text-muted-foreground" />
                      )}
                      <span className="capitalize">{job.status}</span>
                    </div>
                    {job.error && (
                      <div
                        className="text-xs text-destructive mt-1 max-w-xs truncate"
                        title={job.error}
                      >
                        {job.error}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">{job.result_count}</td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {new Date(job.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-muted-foreground"
                  >
                    No research jobs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
