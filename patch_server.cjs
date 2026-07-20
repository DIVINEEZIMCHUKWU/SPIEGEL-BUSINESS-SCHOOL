const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf-8');

const replacement = `
  app.post("/api/enquiries", async (req, res) => {
    const { name, email, phone, subject, course_interest, message } = req.body;
    // Save to DB
    if (supabase) {
      const { error } = await supabase.from('enquiries').insert([{ name, email, phone, subject, course_interest, message }]);
      if (error) {
        localEnquiries.push({
          id: String(localEnquiryId++),
          name,
          email,
          phone,
          subject,
          course_interest,
          message,
          status: 'New',
          created_at: new Date().toISOString()
        });
      }
    } else {
      localEnquiries.push({
        id: String(localEnquiryId++),
        name,
        email,
        phone,
        subject,
        course_interest,
        message,
        status: 'New',
        created_at: new Date().toISOString()
      });
    }

    res.json({ success: true });
  });
`;

code = code.replace(/app\.post\("\/api\/enquiries", async \(req, res\) => \{[\s\S]*?res\.json\(\{ success: true \}\);\n  \}\);/, replacement.trim());
fs.writeFileSync('server.ts', code);
