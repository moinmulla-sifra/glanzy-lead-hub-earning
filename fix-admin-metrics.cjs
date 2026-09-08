const fs = require("fs");
let content = fs.readFileSync("src/components/AdminResearchView.tsx", "utf8");

const newMetricsCode = `
  const totalJobs = jobs.length;
  const totalLeadsFound = jobs.reduce((acc, job) => acc + (job.result_count || 0), 0);

  const providerStats = jobs.reduce((acc, job) => {
    const p = job.provider || 'unknown';
    if (!acc[p]) acc[p] = { total: 0, failed: 0 };
    acc[p].total++;
    if (job.status === 'failed') acc[p].failed++;
    return acc;
  }, {} as Record<string, { total: number, failed: number }>);
  
  return (
    <div className="space-y-6">
`;

content = content.replace(
  /const jobs = jobsQuery\.data \|\| \[\];\s*return \(\s*<div className="space-y-6">/,
  newMetricsCode,
);

const newMetricsUI = `
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-card rounded-xl border p-6 flex flex-col justify-between">
`;

const afterEngineConfig = `
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-card rounded-xl border p-6 flex flex-col items-center justify-center text-center">
           <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
             <Activity className="w-4 h-4" /> Total Leads Found
           </h3>
           <span className="text-5xl font-bold text-brand my-2">{totalLeadsFound}</span>
           <span className="text-xs text-muted-foreground">from recent {totalJobs} jobs</span>
        </div>
        
        <div className="bg-card rounded-xl border p-6 col-span-1 lg:col-span-2">
           <h3 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
             <BarChart className="w-4 h-4" /> Provider Performance (Recent)
           </h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(providerStats).map(([provider, stats]) => {
                const failRate = stats.total > 0 ? Math.round((stats.failed / stats.total) * 100) : 0;
                return (
                  <div key={provider} className="bg-secondary/50 rounded-lg p-4 border flex justify-between items-center">
                    <div>
                      <div className="font-semibold capitalize">{provider}</div>
                      <div className="text-xs text-muted-foreground">{stats.total} total runs</div>
                    </div>
                    <div className="text-right">
                       <div className={\`font-bold text-lg \${failRate > 20 ? 'text-destructive' : 'text-green-500'}\`}>{failRate}%</div>
                       <div className="text-xs text-muted-foreground">failure rate</div>
                    </div>
                  </div>
                );
              })}
              {Object.keys(providerStats).length === 0 && <div className="text-sm text-muted-foreground">No provider data available</div>}
           </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
`;

content = content.replace(
  /<div className="flex justify-between items-center">/,
  afterEngineConfig,
);

if (!content.includes("BarChart")) {
  content = content.replace(
    /import \{([\s\S]*?)X,([\s\S]*?)\} from "lucide-react";/,
    'import { $1 X, BarChart, $2 } from "lucide-react";',
  );
}

fs.writeFileSync("src/components/AdminResearchView.tsx", content);
