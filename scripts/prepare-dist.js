import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outputDir = path.join(root, ".output");
const publicDir = path.join(outputDir, "public");
const distDir = path.join(root, "dist");

// 1. Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// 2. Recursively copy files from .output/public to dist
function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    for (const file of fs.readdirSync(src)) {
      copyRecursive(path.join(src, file), path.join(dest, file));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

if (fs.existsSync(publicDir)) {
  copyRecursive(publicDir, distDir);
}

// Also copy server artifacts if they exist into dist/server and dist/.output
const serverDir = path.join(outputDir, "server");
if (fs.existsSync(serverDir)) {
  copyRecursive(serverDir, path.join(distDir, "server"));
}
if (fs.existsSync(outputDir)) {
  copyRecursive(outputDir, path.join(distDir, ".output"));
}

// 3. Find main JS and CSS bundles in dist/assets
const assetsDir = path.join(distDir, "assets");
let mainJs = "";
let mainCss = "";

if (fs.existsSync(assetsDir)) {
  const files = fs.readdirSync(assetsDir);
  const jsFiles = files.filter(
    (f) => f.startsWith("index-") && f.endsWith(".js"),
  );
  const cssFiles = files.filter(
    (f) => f.startsWith("styles-") && f.endsWith(".css"),
  );

  if (jsFiles.length > 0) mainJs = `/assets/${jsFiles[0]}`;
  if (cssFiles.length > 0) mainCss = `/assets/${cssFiles[0]}`;
}

// 4. Generate index.html if not already present
const indexHtmlPath = path.join(distDir, "index.html");
const htmlContent = `<!DOCTYPE html>
<html lang="en" data-theme="dark" suppressHydrationWarning>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Branzly - Brand Discovery & Creator Outreach Intelligence Platform</title>
    <meta name="description" content="Discover brand opportunities, verified contacts, and manage outreach workflows for creators and agencies." />
    <meta property="og:title" content="Branzly - Brand Discovery & Creator Outreach Intelligence Platform" />
    <meta property="og:description" content="Discover brand opportunities, verified contacts, and manage outreach workflows for creators and agencies." />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="google-adsense-account" content="ca-pub-4966868337893543" />
    <link rel="icon" href="/favicon.ico" type="image/x-icon" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" />
    ${mainCss ? `<link rel="stylesheet" href="${mainCss}" />` : ""}
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-1C4EYN1KVD"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-1C4EYN1KVD');
    </script>
    <script type="text/javascript">(function(i,m,p,a,c,t){c.ire_o=p;c[p]=c[p]||function(){(c[p].a=c[p].a||[]).push(arguments)};t=a.createElement(m);var z=a.getElementsByTagName(m)[0];t.async=1;t.src=i;z.parentNode.insertBefore(t,z)})('https://utt.impactcdn.com/P-A7946827-08c9-435a-8985-492d36b7d6f51.js','script','impactStat',document,window);impactStat('transformLinks');impactStat('trackImpression');</script>
  </head>
  <body suppressHydrationWarning>
    <div id="root"></div>
    ${mainJs ? `<script type="module" src="${mainJs}"></script>` : ""}
  </body>
</html>`;

fs.writeFileSync(indexHtmlPath, htmlContent, "utf-8");
console.log(
  `[prepare-dist] Successfully populated dist/ with build artifacts (${fs.readdirSync(distDir).length} items)`,
);
