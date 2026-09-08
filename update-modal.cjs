const fs = require('fs');
let content = fs.readFileSync('src/components/BrandProfileModal.tsx', 'utf8');

content = content.replace(/onStartOutreach: \(\) => void;/g, 'onStartOutreach: () => void;\n  onRefreshResearch?: () => void;\n  isRefreshing?: boolean;');
content = content.replace(/onStartOutreach,\n\}\: BrandProfileModalProps\) \{/g, 'onStartOutreach,\n  onRefreshResearch,\n  isRefreshing,\n}: BrandProfileModalProps) {');

const refreshButton = `
          {onRefreshResearch && (
            <button
              onClick={onRefreshResearch}
              disabled={isRefreshing}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg flex items-center justify-center font-medium border border-border hover:bg-secondary/80 transition-colors shadow-sm disabled:opacity-50"
            >
              {isRefreshing ? <span className="animate-pulse">Researching...</span> : 'Refresh Research'}
            </button>
          )}
`;

content = content.replace(/<button\n\s*disabled=\{isSaving\}/, refreshButton + '\n          <button\n            disabled={isSaving}');

fs.writeFileSync('src/components/BrandProfileModal.tsx', content);
