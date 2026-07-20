const fs = require('fs');

let serverFile = fs.readFileSync('server.ts', 'utf8');

// Replace GET /api/gallery
serverFile = serverFile.replace(
  /if \(supabase\) \{\s*const \{ data, error \} = await supabase\.from\('gallery'\)\.select\('\*'\)\.order\('created_at', \{ ascending: false \}\);\s*if \(error\) return res\.status\(500\)\.json\(\{ error: error\.message \}\);\s*res\.json\(data\);\s*\} else \{\s*res\.json\(\[\.\.\.localGallery\]\.reverse\(\)\);\s*\}/,
  `if (supabase) {
      const { data, error } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
      if (error) {
        console.warn("Supabase GET gallery error, falling back to local DB:", error.message);
        return res.json([...localGallery].reverse());
      }
      res.json(data);
    } else {
      res.json([...localGallery].reverse());
    }`
);

// Replace POST /api/gallery
serverFile = serverFile.replace(
  /if \(supabase\) \{\s*const \{ data, error \} = await supabase\.from\('gallery'\)\.insert\(\[\{ url, title, type \}\]\)\.select\(\);\s*if \(error\) return res\.status\(500\)\.json\(\{ error: error\.message \}\);\s*res\.json\(data\[0\]\);\s*\} else \{\s*const newItem = \{ id: String\(localGalleryId\+\+\), url, title, type, created_at: new Date\(\)\.toISOString\(\) \};\s*localGallery\.push\(newItem\);\s*res\.json\(newItem\);\s*\}/,
  `const newItem = { id: String(localGalleryId++), url, title, type, created_at: new Date().toISOString() };
    if (supabase) {
      const { data, error } = await supabase.from('gallery').insert([{ url, title, type }]).select();
      if (error) {
        console.warn("Supabase insert gallery error:", error.message);
        localGallery.push(newItem);
        return res.json(newItem);
      }
      res.json(data[0]);
    } else {
      localGallery.push(newItem);
      res.json(newItem);
    }`
);

// Replace DELETE /api/gallery/:id
serverFile = serverFile.replace(
  /if \(supabase\) \{\s*const \{ error \} = await supabase\.from\('gallery'\)\.delete\(\)\.eq\('id', id\);\s*if \(error\) return res\.status\(500\)\.json\(\{ error: error\.message \}\);\s*res\.json\(\{ success: true \}\);\s*\} else \{\s*localGallery = localGallery\.filter\(item => item\.id !== id\);\s*res\.json\(\{ success: true \}\);\s*\}/,
  `if (supabase) {
      const { error } = await supabase.from('gallery').delete().eq('id', id);
      if (error) {
        console.warn("Supabase delete gallery error:", error.message);
        localGallery = localGallery.filter(item => item.id !== id);
        return res.json({ success: true });
      }
      res.json({ success: true });
    } else {
      localGallery = localGallery.filter(item => item.id !== id);
      res.json({ success: true });
    }`
);

// Replace PUT /api/gallery/:id
serverFile = serverFile.replace(
  /if \(supabase\) \{\s*const \{ error \} = await supabase\.from\('gallery'\)\.update\(\{ url, title, type \}\)\.eq\('id', id\);\s*if \(error\) return res\.status\(500\)\.json\(\{ error: error\.message \}\);\s*res\.json\(\{ success: true \}\);\s*\} else \{\s*const item = localGallery\.find\(i => i\.id === id\);\s*if \(item\) \{\s*item\.url = url;\s*item\.title = title;\s*item\.type = type;\s*\}\s*res\.json\(\{ success: true \}\);\s*\}/,
  `if (supabase) {
      const { error } = await supabase.from('gallery').update({ url, title, type }).eq('id', id);
      if (error) {
        console.warn("Supabase update gallery error:", error.message);
        const item = localGallery.find(i => i.id === id);
        if (item) {
          item.url = url;
          item.title = title;
          item.type = type;
        }
        return res.json({ success: true });
      }
      res.json({ success: true });
    } else {
      const item = localGallery.find(i => i.id === id);
      if (item) {
        item.url = url;
        item.title = title;
        item.type = type;
      }
      res.json({ success: true });
    }`
);

// Replace GET /api/programs
serverFile = serverFile.replace(
  /if \(supabase\) \{\s*const \{ data, error \} = await supabase\.from\('programs'\)\.select\('\*'\)\.order\('created_at', \{ ascending: false \}\);\s*if \(error\) return res\.status\(500\)\.json\(\{ error: error\.message \}\);\s*res\.json\(data\);\s*\} else \{\s*res\.json\(\[\.\.\.localPrograms\]\.reverse\(\)\);\s*\}/,
  `if (supabase) {
      const { data, error } = await supabase.from('programs').select('*').order('created_at', { ascending: false });
      if (error) {
        console.warn("Supabase GET programs error:", error.message);
        return res.json([...localPrograms].reverse());
      }
      res.json(data);
    } else {
      res.json([...localPrograms].reverse());
    }`
);

// Replace POST /api/programs
serverFile = serverFile.replace(
  /if \(supabase\) \{\s*const \{ data, error \} = await supabase\.from\('programs'\)\.insert\(\[\{ image, title, category, date, description \}\]\)\.select\(\);\s*if \(error\) return res\.status\(500\)\.json\(\{ error: error\.message \}\);\s*res\.json\(data\[0\]\);\s*\} else \{\s*const newItem = \{ id: String\(localProgramId\+\+\), image, title, category, date, description, created_at: new Date\(\)\.toISOString\(\) \};\s*localPrograms\.push\(newItem\);\s*res\.json\(newItem\);\s*\}/,
  `const newItem = { id: String(localProgramId++), image, title, category, date, description, created_at: new Date().toISOString() };
    if (supabase) {
      const { data, error } = await supabase.from('programs').insert([{ image, title, category, date, description }]).select();
      if (error) {
        console.warn("Supabase insert programs error:", error.message);
        localPrograms.push(newItem);
        return res.json(newItem);
      }
      res.json(data[0]);
    } else {
      localPrograms.push(newItem);
      res.json(newItem);
    }`
);

// Replace DELETE /api/programs/:id
serverFile = serverFile.replace(
  /if \(supabase\) \{\s*const \{ error \} = await supabase\.from\('programs'\)\.delete\(\)\.eq\('id', id\);\s*if \(error\) return res\.status\(500\)\.json\(\{ error: error\.message \}\);\s*res\.json\(\{ success: true \}\);\s*\} else \{\s*localPrograms = localPrograms\.filter\(item => item\.id !== id\);\s*res\.json\(\{ success: true \}\);\s*\}/,
  `if (supabase) {
      const { error } = await supabase.from('programs').delete().eq('id', id);
      if (error) {
        console.warn("Supabase delete programs error:", error.message);
        localPrograms = localPrograms.filter(item => item.id !== id);
        return res.json({ success: true });
      }
      res.json({ success: true });
    } else {
      localPrograms = localPrograms.filter(item => item.id !== id);
      res.json({ success: true });
    }`
);

// Replace PUT /api/programs/:id
serverFile = serverFile.replace(
  /if \(supabase\) \{\s*const \{ error \} = await supabase\.from\('programs'\)\.update\(\{ image, title, category, date, description \}\)\.eq\('id', id\);\s*if \(error\) return res\.status\(500\)\.json\(\{ error: error\.message \}\);\s*res\.json\(\{ success: true \}\);\s*\} else \{\s*const item = localPrograms\.find\(i => i\.id === id\);\s*if \(item\) \{\s*item\.image = image;\s*item\.title = title;\s*item\.category = category;\s*item\.date = date;\s*item\.description = description;\s*\}\s*res\.json\(\{ success: true \}\);\s*\}/,
  `if (supabase) {
      const { error } = await supabase.from('programs').update({ image, title, category, date, description }).eq('id', id);
      if (error) {
        console.warn("Supabase update programs error:", error.message);
        const item = localPrograms.find(i => i.id === id);
        if (item) {
          item.image = image;
          item.title = title;
          item.category = category;
          item.date = date;
          item.description = description;
        }
        return res.json({ success: true });
      }
      res.json({ success: true });
    } else {
      const item = localPrograms.find(i => i.id === id);
      if (item) {
        item.image = image;
        item.title = title;
        item.category = category;
        item.date = date;
        item.description = description;
      }
      res.json({ success: true });
    }`
);

// Replace GET /api/enquiries
serverFile = serverFile.replace(
  /if \(supabase\) \{\s*const \{ data, error \} = await supabase\.from\('enquiries'\)\.select\('\*'\)\.order\('created_at', \{ ascending: false \}\);\s*if \(error\) return res\.status\(500\)\.json\(\{ error: error\.message \}\);\s*res\.json\(data\);\s*\} else \{\s*res\.json\(\[\.\.\.localEnquiries\]\.reverse\(\)\);\s*\}/,
  `if (supabase) {
      const { data, error } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false });
      if (error) {
        console.warn("Supabase GET enquiries error:", error.message);
        return res.json([...localEnquiries].reverse());
      }
      res.json(data);
    } else {
      res.json([...localEnquiries].reverse());
    }`
);

// Replace POST /api/enquiries fallback
serverFile = serverFile.replace(
  /if \(supabase\) \{\s*const \{ error \} = await supabase\.from\('enquiries'\)\.insert\(\[\{ name, email, phone, subject, course_interest, message \}\]\);\s*if \(error\) console\.error\("Supabase insert error:", error\);\s*\}/,
  `if (supabase) {
      const { error } = await supabase.from('enquiries').insert([{ name, email, phone, subject, course_interest, message }]);
      if (error) {
        console.error("Supabase insert error:", error.message);
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
    }`
);

// Replace PUT /api/enquiries/:id/status
serverFile = serverFile.replace(
  /if \(supabase\) \{\s*const \{ error \} = await supabase\.from\('enquiries'\)\.update\(\{ status \}\)\.eq\('id', id\);\s*if \(error\) return res\.status\(500\)\.json\(\{ error: error\.message \}\);\s*res\.json\(\{ success: true \}\);\s*\} else \{\s*const enquiry = localEnquiries\.find\(e => e\.id === id\);\s*if \(enquiry\) enquiry\.status = status;\s*res\.json\(\{ success: true \}\);\s*\}/,
  `if (supabase) {
      const { error } = await supabase.from('enquiries').update({ status }).eq('id', id);
      if (error) {
        console.warn("Supabase update enquiries error:", error.message);
        const enquiry = localEnquiries.find(e => e.id === id);
        if (enquiry) enquiry.status = status;
        return res.json({ success: true });
      }
      res.json({ success: true });
    } else {
      const enquiry = localEnquiries.find(e => e.id === id);
      if (enquiry) enquiry.status = status;
      res.json({ success: true });
    }`
);

// Replace DELETE /api/enquiries/:id
serverFile = serverFile.replace(
  /if \(supabase\) \{\s*const \{ error \} = await supabase\.from\('enquiries'\)\.delete\(\)\.eq\('id', id\);\s*if \(error\) return res\.status\(500\)\.json\(\{ error: error\.message \}\);\s*res\.json\(\{ success: true \}\);\s*\} else \{\s*localEnquiries = localEnquiries\.filter\(e => e\.id !== id\);\s*res\.json\(\{ success: true \}\);\s*\}/,
  `if (supabase) {
      const { error } = await supabase.from('enquiries').delete().eq('id', id);
      if (error) {
        console.warn("Supabase delete enquiries error:", error.message);
        localEnquiries = localEnquiries.filter(e => e.id !== id);
        return res.json({ success: true });
      }
      res.json({ success: true });
    } else {
      localEnquiries = localEnquiries.filter(e => e.id !== id);
      res.json({ success: true });
    }`
);

fs.writeFileSync('server.ts', serverFile);
