const fs = require("fs");
let content = fs.readFileSync("src/components/AdminResearchView.tsx", "utf8");

// The replacement might have failed if it was already imported, let's just make sure both are imported cleanly
content = content.replace(
  /import \{([\s\S]*?)\} from "lucide-react";/,
  'import { $1, BarChart, Activity } from "lucide-react";',
);

fs.writeFileSync("src/components/AdminResearchView.tsx", content);
