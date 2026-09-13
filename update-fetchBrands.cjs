const fs = require("fs");
let code = fs.readFileSync("src/components/DiscoverView.tsx", "utf-8");

const replacement = `const fetchBrands = async ({ pageParam = 0 }) => {
    const pageSize = 12;
    const { data: session } = await supabase.auth.getSession();
    const token = session?.session?.access_token;
    
    if (!token) throw new Error("Unauthorized");
    
    // We pass our state to the backend
    const response = await fetch('/api/brands/discover', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${token}\`
      },
      body: JSON.stringify({
        workspaceId,
        pageParam,
        pageSize,
        search: debouncedSearch,
        filters: activeFilters,
        sortOption
      })
    });
    
    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || "Failed to fetch brands");
    }
    
    const data = await response.json();
    if (data.error) throw new Error(data.error);
    
    return data;
  };`;

code = code.replace(
  /const fetchBrands = async \(\{ pageParam = 0 \}\) => \{[\s\S]*?return \{[\s\S]*?\};[\s\S]*?\};/,
  replacement,
);
fs.writeFileSync("src/components/DiscoverView.tsx", code);
