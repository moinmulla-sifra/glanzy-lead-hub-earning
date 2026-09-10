const fs = require("fs");

function processFile(file) {
  let content = fs.readFileSync(file, "utf8");

  // Remove import { startResearchJob } from "@/lib/research/actions";
  content = content.replace(
    /import \{ startResearchJob \} from "@\/lib\/research\/actions";\n/g,
    "",
  );

  // Remove the block const refreshResearchMutation = ...
  // We'll use string manipulation
  const startIdx = content.indexOf(
    "const refreshResearchMutation = useMutation({",
  );
  if (startIdx !== -1) {
    let brackets = 0;
    let endIdx = -1;
    for (let i = startIdx; i < content.length; i++) {
      if (content[i] === "{") brackets++;
      if (content[i] === "}") {
        brackets--;
        if (brackets === 0) {
          // the mutation usually ends with });
          endIdx = i + 2;
          if (content[endIdx] === ";") {
            endIdx++;
          }
          break;
        }
      }
    }
    if (endIdx !== -1) {
      content = content.slice(0, startIdx) + content.slice(endIdx + 1);
    }
  }

  // Find any Button calling refreshResearchMutation.mutate and remove it
  content = content.replace(
    /<Button[^>]*onClick=\{[^}]*refreshResearchMutation\.mutate[^}]*\}[^>]*>[\s\S]*?<\/Button>/g,
    "",
  );
  content = content.replace(
    /<DropdownMenuItem[^>]*onClick=\{[^}]*refreshResearchMutation\.mutate[^}]*\}[^>]*>[\s\S]*?<\/DropdownMenuItem>/g,
    "",
  );

  fs.writeFileSync(file, content);
}

processFile("src/components/DiscoverView.tsx");
processFile("src/components/ForYouView.tsx");
processFile("src/components/SavedView.tsx");

console.log("Done cleaning research mutation");
