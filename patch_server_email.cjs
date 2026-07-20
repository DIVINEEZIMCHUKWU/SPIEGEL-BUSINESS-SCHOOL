const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf-8');

const replacement = `
      const resSubmit = await fetch("https://formsubmit.co/ajax/spiegelbusiness@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Referer": "https://spiegelbusiness.com",
          "Origin": "https://spiegelbusiness.com",
          "User-Agent": "Spiegel-Backend/1.0"
        },
        body: formSubmitData.toString(),
      });
      const submitData = await resSubmit.json();
      if (submitData.success !== "true" && submitData.success !== true) {
         console.warn("FormSubmit Warning:", submitData);
      }
`;
code = code.replace(/await fetch\("https:\/\/formsubmit\.co\/ajax\/spiegelbusiness@gmail\.com", \{\s*method: "POST",\s*headers: \{\s*"Content-Type": "application\/x-www-form-urlencoded",\s*"Referer": "https:\/\/spiegelbusiness\.com",\s*"Origin": "https:\/\/spiegelbusiness\.com",\s*"User-Agent": "Spiegel-Backend\/1\.0"\s*\},\s*body: formSubmitData\.toString\(\),\s*\}\);/m, replacement.trim());
fs.writeFileSync('server.ts', code);
