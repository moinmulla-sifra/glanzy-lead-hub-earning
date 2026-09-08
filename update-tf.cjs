const fs = require('fs');
let content = fs.readFileSync('src/lib/research/providers/tinyfish.ts', 'utf8');

const updatedDemo = `
    if (apiKey === 'DEMO') {
      const results = [];
      for(let i = 0; i < 6; i++) {
        results.push({
          company_name: "Glow & Co " + Math.floor(Math.random() * 10000),
          domain: "glowandco" + Math.floor(Math.random() * 10000) + ".demo",
          website: "https://glowandco.demo",
          industry: query.industry || "Beauty",
          country: query.country || "USA",
          company_stage: "Seed",
          recent_funding: "$2M Seed round",
          recent_launch: "Launched new serum",
          marketing_activity: "Active on TikTok",
          existing_creator_activity: "Working with 10+ micro-influencers",
          contact_email: "hello@glowandco.demo",
          contact_person: "Jane Doe",
          contact_role: "CMO",
          linkedin: "https://linkedin.com/company/glowandco",
          evidence: [
            { field_name: "recent_funding", source_url: "https://news.ycombinator.demo", source_type: "news", confidence: "high", data: "Seed round announced" },
            { field_name: "contact_email", source_url: "https://glowandco.demo/contact", source_type: "website", confidence: "medium", data: "Found in footer" }
          ]
        });
      }
      return { results, raw: { source: "TinyFish Demo" } };
    }
`;

content = content.replace(/if \(apiKey === 'DEMO'\) \{[\s\S]*?return \{ results: \[result\], raw: \{ source: "TinyFish Demo" \} \};\s*\}/, updatedDemo);

fs.writeFileSync('src/lib/research/providers/tinyfish.ts', content);
