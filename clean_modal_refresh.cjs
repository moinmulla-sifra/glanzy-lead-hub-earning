const fs = require("fs");
let modal = fs.readFileSync("src/components/BrandProfileModal.tsx", "utf8");

// The block we want to remove:
/*
                      {onRefreshResearch && (
                        <button 
                          onClick={onRefreshResearch} 
                          disabled={isRefreshing}
                          className="text-xs text-brand hover:underline font-medium"
                        >
                          {isRefreshing ? 'Refreshing...' : 'Refresh'}
                        </button>
                      )}
*/
modal = modal.replace(/\{onRefreshResearch && \([\s\S]*?<\/button>\s*\)\}/, "");
fs.writeFileSync("src/components/BrandProfileModal.tsx", modal);
