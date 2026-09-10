const fs = require("fs");

function replaceAny(file) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, "utf8");

    // Replace Record<string, unknown> issues if needed or specific leftovers
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

    fs.writeFileSync(file, content);
  }
}
