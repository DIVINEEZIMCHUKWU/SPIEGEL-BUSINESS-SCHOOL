const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const importStatement = `import { LogisticsPage } from "./pages/LogisticsPage";`;
code = code.replace(/import \{ ContactPage \} from "\.\/pages\/ContactPage";/, `import { ContactPage } from "./pages/ContactPage";\n${importStatement}`);

const routeStatement = `<Route path="/logistics" element={<LogisticsPage />} />`;
code = code.replace(/<Route path="\/contact" element=\{<ContactPage \/>\} \/>/, `<Route path="/contact" element={<ContactPage />} />\n          ${routeStatement}`);

fs.writeFileSync('src/App.tsx', code);
