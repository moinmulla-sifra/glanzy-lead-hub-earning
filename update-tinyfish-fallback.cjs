const fs = require('fs');
let content = fs.readFileSync('src/lib/research/providers/tinyfish.ts', 'utf8');

const updatedDemo = `
    if (apiKey === 'DEMO') {
      const demoResults = [
        {
          company_name: "Glow & Co " + Math.floor(Math.random() * 1000),
          domain: "glowandco" + Math.floor(Math.random() * 1000) + ".demo",
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
            { field_name: "recent_funding", source_url: "https://news.demo", source_type: "news", confidence: "high", data: "Seed round announced" }
          ]
        },
        {
          company_name: "Luxe " + query.industry + " " + Math.floor(Math.random() * 1000),
          domain: "luxe" + Math.floor(Math.random() * 1000) + ".demo",
          website: "https://luxe.demo",
          industry: query.industry || "Fashion",
          country: query.country || "UK",
          company_stage: "Series A",
          recent_funding: "$5M Series A",
          recent_launch: "New collection",
          marketing_activity: "Active on Instagram",
          existing_creator_activity: "Working with top tier creators",
          contact_email: "pr@luxe.demo",
          contact_person: "Alice Smith",
          contact_role: "Head of PR",
          linkedin: "https://linkedin.com/company/luxe",
          evidence: [
            { field_name: "recent_launch", source_url: "https://luxe.demo", source_type: "website", confidence: "high", data: "Banner" }
          ]
        },
        {
          company_name: "NutriFit " + Math.floor(Math.random() * 1000),
          domain: "nutrifit" + Math.floor(Math.random() * 1000) + ".demo",
          website: "https://nutrifit.demo",
          industry: "Health",
          country: "USA",
          company_stage: "Bootstrapped",
          recent_funding: undefined,
          recent_launch: undefined,
          marketing_activity: "Strong community engagement",
          existing_creator_activity: "Ambassador program",
          contact_email: "partners@nutrifit.demo",
          contact_person: "Bob Jones",
          contact_role: "Founder",
          linkedin: "https://linkedin.com/company/nutrifit",
          evidence: [
            { field_name: "existing_creator_activity", source_url: "https://nutrifit.demo/ambassadors", source_type: "website", confidence: "high", data: "Public ambassador page" }
          ]
        }
      ];
      
      // Filter based on query loosely if needed, or just return them
      const results = demoResults.slice(0, 3); // Returning 3 to show partial matching of target 6

      return {
        results,
        raw: { source: 'demo_data', query }
      };
    }
`;

content = content.replace(/if \(apiKey === 'DEMO'\) \{[\s\S]*?return \{\s*results: \[result\],\s*raw: \{ source: 'demo_data' \}\s*\};\s*\}/, updatedDemo);

fs.writeFileSync('src/lib/research/providers/tinyfish.ts', content);
