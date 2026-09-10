const fs = require("fs");

function processFile(file) {
  let content = fs.readFileSync(file, "utf8");

  // Remove import { startResearchJob } from "@/lib/research/actions";
  content = content.replace(
    /import \{ startResearchJob \} from "@\/lib\/research\/actions";\n/g,
    "",
  );

  // Remove researchMutation definition
  const mutationStartRegex =
    /const (researchMutation|refreshMutation) = useMutation\(\{[\s\S]*?mutationFn: async \([\s\S]*?\}\);/g;
  content = content.replace(mutationStartRegex, "");

  // Replace calls to researchMutation.mutate(...) with console.log or remove the button.
  // We'll replace the "Start Research" / "Refresh Data" buttons directly.

  // Remove buttons with "Find Leads" or "Start Research"
  // For DiscoverView.tsx:
  // <Button onClick={() => researchMutation.mutate({ keywords: searchKeywords })} ... > ... Find Leads ... </Button>
  content = content.replace(
    /<Button[^>]*onClick=\{[^}]*(researchMutation|refreshMutation)\.mutate[^}]*\}[^>]*>[\s\S]*?<\/Button>/g,
    "",
  );

  // Also if there's a button calling it without explicit match:
  content = content.replace(
    /<Button[^>]*disabled=\{[^}]*(researchMutation|refreshMutation)\.isPending\}[^>]*>[\s\S]*?<\/Button>/g,
    "",
  );

  fs.writeFileSync(file, content);
}

processFile("src/components/DiscoverView.tsx");
processFile("src/components/ForYouView.tsx");
processFile("src/components/SavedView.tsx");

console.log("Cleaned components");
