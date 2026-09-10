const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");

const env = fs
  .readFileSync(".env", "utf8")
  .split("\n")
  .reduce((acc, line) => {
    const [key, val] = line.split("=");
    if (key) acc[key] = val;
    return acc;
  }, {});

// Supabase-js cannot run arbitrary SQL, so I should just leave the script in the workspace.
console.log("Supabase-js cannot run arbitrary SQL");
