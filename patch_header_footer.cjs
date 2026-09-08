const fs = require('fs');
let header = fs.readFileSync('src/components/Header.tsx', 'utf-8');

header = header.replace(
  /\{ name: "Contact", href: "\/contact" \},/,
  `{ name: "Logistics", href: "/logistics" },\n  { name: "Contact", href: "/contact" },`
);
fs.writeFileSync('src/components/Header.tsx', header);

let footer = fs.readFileSync('src/components/Footer.tsx', 'utf-8');
footer = footer.replace(
  /\{ name: 'Contact', path: '\/contact' \}/,
  `{ name: 'Logistics', path: '/logistics' },\n                { name: 'Contact', path: '/contact' }`
);
fs.writeFileSync('src/components/Footer.tsx', footer);
