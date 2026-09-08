const fs = require("fs");
let content = fs.readFileSync("src/components/ForYouView.tsx", "utf8");

if (!content.includes("import { startResearchJob }")) {
  content = content.replace(
    /import \{ supabase, type Brand, type Profile \} from "@\/lib\/supabase";/,
    'import { supabase, type Brand, type Profile } from "@/lib/supabase";\nimport { startResearchJob } from "@/lib/research/actions";',
  );
}

if (!content.includes("const refreshResearchMutation = useMutation")) {
  const mutation = `
  const workspaceId = memberData?.workspace_id;
  
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
  content = content.replace(
    /const brandsQuery = useQuery/,
    mutation + "\n  const brandsQuery = useQuery",
  );
}

fs.writeFileSync("src/components/ForYouView.tsx", content);
