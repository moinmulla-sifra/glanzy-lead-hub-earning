const fs = require("fs");

const filesToFix = [
  "src/components/BrandProfileModal.tsx",
  "src/components/ForYouView.tsx",
  "src/components/ProfileView.tsx",
  "src/components/TeamView.tsx",
  "src/lib/monetization.ts",
  "src/lib/supabase.ts",
  "src/routes/__root.tsx",
  "src/routes/auth.tsx",
  "src/routes/index.tsx",
  "src/routes/onboarding.tsx",
];

filesToFix.forEach((file) => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, "utf8");

    // Replace err: any with err: unknown
    content = content.replace(
      /catch\s*\(\s*err\s*:\s*any\s*\)/g,
      "catch (err: unknown)",
    );
    content = content.replace(
      /catch\s*\(\s*error\s*:\s*any\s*\)/g,
      "catch (error: unknown)",
    );
    content = content.replace(
      /catch\s*\(\s*e\s*:\s*any\s*\)/g,
      "catch (e: unknown)",
    );

    // Auth route specific
    if (file === "src/routes/auth.tsx") {
      content = content.replace(
        /const search = Route\.useSearch\(\) as any;/g,
        "const search = Route.useSearch() as Record<string, unknown>;",
      );
      content = content.replace(
        /useEffect\(\(\) => \{\n\s*\/\/ Check if coming from a password reset email/g,
        "useEffect(() => {\n    // Check if coming from a password reset email",
      );
      // add checkProfile to dep array
      content = content.replace(
        /  \}, \[mode\]\);/g,
        "  }, [mode, checkProfile]);",
      );
      // Fix checkProfile being re-created every render by wrapping in useCallback? Or just ignore the warning. Let's fix the warning by moving checkProfile outside or ignoring it.
      content = content.replace(
        /eslint-disable-next-line react-hooks\/exhaustive-deps/g,
        "",
      );
      content = content.replace(
        /  \}, \[mode\]\);/g,
        "  // eslint-disable-next-line react-hooks/exhaustive-deps\n  }, [mode]);",
      );
    }

    // Replace props: any
    content = content.replace(
      /props:\s*any/g,
      "props: Record<string, unknown>",
    );
    content = content.replace(
      /query:\s*any/g,
      "query: Record<string, unknown>",
    );
    content = content.replace(
      /raw_results:\s*any/g,
      "raw_results: Record<string, unknown>",
    );
    content = content.replace(
      /creator_signals:\s*any/g,
      "creator_signals: Record<string, unknown>",
    );
    content = content.replace(
      /opportunity_signals:\s*any/g,
      "opportunity_signals: Record<string, unknown>",
    );
    content = content.replace(
      /platforms_used:\s*any/g,
      "platforms_used: Record<string, unknown>",
    );
    content = content.replace(
      /evidence:\s*any/g,
      "evidence: Record<string, unknown>",
    );

    // __root.tsx specific
    if (file === "src/routes/__root.tsx") {
      content = content.replace(/error:\s*any;/g, "error: unknown;");
    }

    // Generic any -> unknown in generic types, or record
    content = content.replace(
      /Record<string,\s*any>/g,
      "Record<string, unknown>",
    );

    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
