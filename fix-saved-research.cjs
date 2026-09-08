const fs = require('fs');
let content = fs.readFileSync('src/components/SavedView.tsx', 'utf8');

if (!content.includes('import { startResearchJob }')) {
  content = content.replace(/import \{ supabase, type SavedBrand, type OutreachStatus \} from "@\/lib\/supabase";/, 'import { supabase, type SavedBrand, type OutreachStatus, type Brand } from "@/lib/supabase";\nimport { startResearchJob } from "@/lib/research/actions";');
}

if (!content.includes('const refreshResearchMutation = useMutation')) {
  const mutation = `
  const refreshResearchMutation = useMutation({
    mutationFn: async (brand: Brand) => {
      if (!workspaceId || !userId) throw new Error("Missing context");
      const job = await startResearchJob({
        data: {
          workspaceId,
          userId,
          type: 'refresh',
          query: { url: brand.website || brand.domain, keywords: [brand.company_name] },
          provider: 'tinyfish'
        }
      });
      return job;
    },
    onSuccess: () => {
      toast.success("Research started in background. Results will appear shortly.");
    },
    onError: (err: Error) => toast.error(err.message || "Failed to start research"),
  });
`;
  content = content.replace(/const fetchSavedBrands = async/, mutation + '\n  const fetchSavedBrands = async');
}

content = content.replace(/onStartOutreach=\{\(\) => \{/, `isRefreshing={refreshResearchMutation.isPending}
        onRefreshResearch={() => selectedSavedBrand?.brand && refreshResearchMutation.mutate(selectedSavedBrand.brand)}
        onStartOutreach={() => {`);

fs.writeFileSync('src/components/SavedView.tsx', content);
