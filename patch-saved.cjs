const fs = require('fs');
let content = fs.readFileSync('src/components/SavedView.tsx', 'utf8');

// Add import if missing
if (!content.includes('import { useMonetization }')) {
  content = content.replace('import { BrandProfileModal } from "./BrandProfileModal";', 'import { BrandProfileModal } from "./BrandProfileModal";\nimport { useMonetization } from "@/lib/useMonetization";');
}

// Replace spaces query
const oldQuery = `  const workspacesQuery = useQuery({
    queryKey: ["workspaces", userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("workspace_members")
        .select("workspace_id")
        .eq("user_id", userId!);
      if (error) throw error;
      return data.map((d) => d.workspace_id);
    },
  });

  const workspaceId = workspacesQuery.data?.[0];`;

content = content.replace(oldQuery, `  const { workspaceId } = useMonetization(userId);`);
fs.writeFileSync('src/components/SavedView.tsx', content);
