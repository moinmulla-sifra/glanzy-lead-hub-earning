const fs = require("fs");

let content = fs.readFileSync("src/routes/index.tsx", "utf8");

// Update footer links
content = content.replace(
  /<a href="#" className="hover:text-foreground">\s*Privacy\s*<\/a>/g,
  '<Link to="/policies" className="hover:text-foreground">Privacy</Link>',
);
content = content.replace(
  /<a href="#" className="hover:text-foreground">\s*Terms\s*<\/a>/g,
  '<Link to="/terms" className="hover:text-foreground">Terms</Link>',
);
content = content.replace(
  /<a href="#" className="hover:text-foreground">\s*Contact\s*<\/a>/g,
  '<Link to="/about" className="hover:text-foreground">About</Link>\n            <Link to="/security" className="hover:text-foreground">Security</Link>\n            <a href="mailto:support@branzly.dedyn.io" className="hover:text-foreground">Contact</a>',
);

fs.writeFileSync("src/routes/index.tsx", content);
console.log("Landing page updated");
