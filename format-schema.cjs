const fs = require("fs");

let schema = fs.readFileSync("schema.sql", "utf8");

// Replace any occurrences of "CASCADE;DROP" with "CASCADE;\nDROP" just in case they got concatenated
schema = schema.replace(/CASCADE;DROP/g, "CASCADE;\nDROP");
schema = schema.replace(/CASCADE;--/g, "CASCADE;\n--");

fs.writeFileSync("schema.sql", schema);
console.log("Ensured proper newlines in schema.sql");
