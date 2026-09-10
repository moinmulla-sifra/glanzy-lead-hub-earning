const fs = require("fs");

function replaceAny(file) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, "utf8");

    // Replace map((item: any) =>
    content = content.replace(
      /\(contact:\s*any\)/g,
      "(contact: Record<string, unknown>)",
    );
    content = content.replace(
      /\(profile:\s*any\)/g,
      "(profile: Record<string, unknown>)",
    );
    content = content.replace(
      /\(prod:\s*any\)/g,
      "(prod: Record<string, unknown>)",
    );
    content = content.replace(
      /\(funding:\s*any\)/g,
      "(funding: Record<string, unknown>)",
    );
    content = content.replace(
      /\(activity:\s*any\)/g,
      "(activity: Record<string, unknown>)",
    );

    // ForYouView
    content = content.replace(
      /\(signal:\s*any\)/g,
      "(signal: Record<string, unknown>)",
    );
    content = content.replace(/\(b:\s*any\)/g, "(b: Record<string, unknown>)");

    // ProfileView
    content = content.replace(
      /\(e:\s*any\)/g,
      "(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)",
    );

    // TeamView
    content = content.replace(/newEmail:\s*any/g, "newEmail: string");
    content = content.replace(/newRole:\s*any/g, "newRole: string");
    content = content.replace(
      /\(member:\s*any\)/g,
      "(member: Record<string, unknown>)",
    );

    // monetization
    content = content.replace(
      /data\?\.plan\s*as\s*any/g,
      "data?.plan as string",
    );
    content = content.replace(
      /data\?\.status\s*as\s*any/g,
      "data?.status as string",
    );

    // onboarding
    content = content.replace(/platform:\s*any/g, "platform: string");
    content = content.replace(/as\s*any/g, "as unknown");

    fs.writeFileSync(file, content);
  }
}

const filesToFix = [
  "src/components/BrandProfileModal.tsx",
  "src/components/ForYouView.tsx",
  "src/components/ProfileView.tsx",
  "src/components/TeamView.tsx",
  "src/lib/monetization.ts",
  "src/routes/onboarding.tsx",
  "src/routes/auth.tsx",
];

filesToFix.forEach(replaceAny);

// Fix auth checkProfile deps warning
let auth = fs.readFileSync("src/routes/auth.tsx", "utf8");
auth = auth.replace(
  /const checkProfile = async \(uid: string\) => \{/,
  "const checkProfile = React.useCallback(async (uid: string) => {",
);
// replace closing brace of checkProfile with });
auth = auth.replace(
  /    \} finally \{\n      setSessionChecked\(true\);\n    \}\n  \};/,
  "    } finally {\n      setSessionChecked(true);\n    }\n  }, [navigate]);",
);
// import React in auth.tsx if not there
if (!auth.includes("import React")) {
  auth = auth.replace(
    /import \{ useState, useEffect \} from "react";/,
    'import React, { useState, useEffect } from "react";',
  );
}
fs.writeFileSync("src/routes/auth.tsx", auth);
console.log("Updated");
