const fs = require('fs');

let code = fs.readFileSync('src/components/BrandProfileModal.tsx', 'utf8');

// Update contact condition
code = code.replace(/const hasContactInfo = brand\.contact_person \|\| brand\.email \|\| brand\.phone \|\| brand\.linkedin;/, `const hasContactInfo = brand.contact_person || brand.email || brand.phone || brand.linkedin || (contactsData && contactsData.length > 0);`);

// We'll just leave the rendering for later or render them nicely.
fs.writeFileSync('src/components/BrandProfileModal.tsx', code);
