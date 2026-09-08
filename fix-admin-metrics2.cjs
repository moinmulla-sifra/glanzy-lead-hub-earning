const fs = require('fs');
let content = fs.readFileSync('src/components/AdminResearchView.tsx', 'utf8');

// I accidentally replaced 'const jobs = jobsQuery.data || [];' because I matched:
// const jobs = jobsQuery.data || [];\n  return (\n    <div className="space-y-6">
// So let's add it back properly!

content = content.replace(/const totalJobs = jobs\.length;/, 
  "const jobs = jobsQuery.data || [];\n  const totalJobs = jobs.length;");

// I also need to ensure Activity and BarChart are imported
if (!content.includes('Activity,')) {
  content = content.replace(/BarChart,/, "BarChart, Activity,");
}

fs.writeFileSync('src/components/AdminResearchView.tsx', content);
