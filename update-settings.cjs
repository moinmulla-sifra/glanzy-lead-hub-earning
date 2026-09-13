const fs = require('fs');
let code = fs.readFileSync('src/components/SettingsView.tsx', 'utf-8');

// Replace line 735: const { currentPlan, pendingPlan, planConfig, limits } = useMonetization(userId);
code = code.replace(/const \{ currentPlan, pendingPlan, planConfig, limits \} = useMonetization\(userId\);/, 'const { currentPlan, planConfig, limits } = useMonetization(userId);');

// Remove pendingPlan render block
code = code.replace(/\{pendingPlan && \([\s\S]*?\}\)/, '');

// Fix mt-6 if pendingPlan
code = code.replace(/mb-6 \$\{pendingPlan \? 'mt-6' : ''\}/, 'mb-6');

fs.writeFileSync('src/components/SettingsView.tsx', code);
