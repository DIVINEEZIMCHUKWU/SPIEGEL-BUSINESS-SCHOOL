import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";
async function startServer() {
  const app = express();
  const PORT = 3000;
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));
  app.use(cookieParser());
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Spiegel123";
  const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_do_not_use_in_prod";
  // Set up Supabase
  let supabaseUrl = process.env.SUPABASE_URL || "";
  supabaseUrl = supabaseUrl.replace(/\/rest\/v1\/?$/, "");
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  let supabase: ReturnType<typeof createClient> | null = null;
  if (supabaseUrl && supabaseServiceKey) {
    supabase = createClient(supabaseUrl, supabaseServiceKey);
  }
  // Auth Middleware
  const authMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = req.cookies.admin_token;
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    try {
      jwt.verify(token, JWT_SECRET);
      next();
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  };
  // API Routes
  app.post("/api/login", async (req, res) => {
    const { password } = req.body;
    let currentPassword = ADMIN_PASSWORD;
    if (supabase) {
      const { data, error } = await supabase.from('admin_settings').select('password').eq('id', 1).single();
      if (data && data.password) {
        currentPassword = data.password;
      }
    }
    if (password === currentPassword) {
      const token = jwt.sign({ admin: true }, JWT_SECRET, { expiresIn: '1d' });
      res.cookie('admin_token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: 'none', secure: true });
      res.json({ success: true });
    } else {
      res.status(401).json({ error: "Invalid password" });
    }
  });
  app.post("/api/logout", (req, res) => {
    res.clearCookie('admin_token', { httpOnly: true, sameSite: 'none', secure: true });
    res.json({ success: true });
  });
  app.get("/api/check-auth", authMiddleware, (req, res) => {
    res.json({ success: true });
  });
  app.post("/api/change-password", authMiddleware, async (req, res) => {
    const { newPassword } = req.body;
    if (!newPassword || newPassword.length < 4) {
      return res.status(400).json({ error: "Password too short" });
    }
    if (!supabase) {
      return res.status(500).json({ error: "Database not connected" });
    }
    try {
      const { error } = await supabase.from('admin_settings').upsert({ id: 1, password: newPassword });
      if (error) throw error;
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Fallback in-memory DB
  let localEnquiries: any[] = [];
  let localEnquiryId = 1;
  let localGallery: any[] = [
    { id: "g1", url: "https://i.ibb.co/nN6GRvpR/1119707526127202818.jpg", title: "Training sessions", type: "image", created_at: new Date().toISOString() },
    { id: "g2", url: "https://i.ibb.co/HDBP678Z/1019924646848076011.jpg", title: "Holiday lessons", type: "image", created_at: new Date().toISOString() },
    { id: "g3", url: "https://i.ibb.co/C54jPp11/dddd.jpg", title: "Computer classes", type: "image", created_at: new Date().toISOString() },
    { id: "g4", url: "https://i.ibb.co/0psvNNL1/ppppp.jpg", title: "Workshops", type: "image", created_at: new Date().toISOString() },
    { id: "g5", url: "https://i.ibb.co/ZzNP8ZyB/Akilah.jpg", title: "Graduations", type: "image", created_at: new Date().toISOString() }
  ];
  let localGalleryId = 6;
  let localPrograms: any[] = [
    {
      id: "p1",
      title: "Holiday Lessons (Junior & Secondary School)",
      description: "Structured academic support for Junior and Secondary School students designed to strengthen understanding, improve performance, and build confidence.",
      category: "Academic",
      image: "https://i.ibb.co/zVKj8wcY/grind-o-clock.jpg",
      created_at: new Date().toISOString()
    },
    {
      id: "p2",
      title: "Computer Training",
      description: "Practical digital skills training including Web Development, Coding, Python, Artificial Intelligence, Data Analysis, and essential tools like Microsoft Office Suite and Digital Marketing.",
      category: "Technology",
      image: "https://i.ibb.co/GvHS5zSH/eeee.jpg",
      created_at: new Date().toISOString()
    },
    {
      id: "p3",
      title: "Business and Professional Skills Training",
      description: "Industry-relevant skills that prepare individuals for career advancement and entrepreneurial success.",
      category: "Business",
      image: "https://i.ibb.co/5xBmb9WY/gggg.jpg",
      created_at: new Date().toISOString()
    }
  ];
  let localProgramId = 4;

  // Gallery Routes
  app.get("/api/gallery", async (req, res) => {
    if (supabase) {
      const { data, error } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
      if (error) {
        return res.json([...localGallery].reverse());
      }
      res.json(data);
    } else {
      res.json([...localGallery].reverse());
    }
  });
  app.post("/api/gallery", authMiddleware, async (req, res) => {
    const { url, title, type } = req.body;
    const newItem = { id: String(localGalleryId++), url, title, type, created_at: new Date().toISOString() };
    if (supabase) {
      const { data, error } = await supabase.from('gallery').insert([{ url, title, type }]).select();
      if (error) {
        localGallery.push(newItem);
        return res.json(newItem);
      }
      res.json(data[0]);
    } else {
      localGallery.push(newItem);
      res.json(newItem);
    }
  });
  app.delete("/api/gallery/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    if (supabase) {
      const { error } = await supabase.from('gallery').delete().eq('id', id);
      if (error) {
        localGallery = localGallery.filter(item => item.id !== id);
        return res.json({ success: true });
      }
      res.json({ success: true });
    } else {
      localGallery = localGallery.filter(item => item.id !== id);
      res.json({ success: true });
    }
  });
  // Programs Routes
  app.get("/api/programs", async (req, res) => {
    if (supabase) {
      const { data, error } = await supabase.from('programs').select('*').order('created_at', { ascending: false });
      if (error) {
        return res.json([...localPrograms].reverse());
      }
      res.json(data);
    } else {
      res.json([...localPrograms].reverse());
    }
  });
  app.post("/api/programs", authMiddleware, async (req, res) => {
    const { image, title, category, date, description } = req.body;
    const newItem = { id: String(localProgramId++), image, title, category, date, description, created_at: new Date().toISOString() };
    if (supabase) {
      const { data, error } = await supabase.from('programs').insert([{ image, title, category, date, description }]).select();
      if (error) {
        localPrograms.push(newItem);
        return res.json(newItem);
      }
      res.json(data[0]);
    } else {
      localPrograms.push(newItem);
      res.json(newItem);
    }
  });
  app.delete("/api/programs/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    if (supabase) {
      const { error } = await supabase.from('programs').delete().eq('id', id);
      if (error) {
        localPrograms = localPrograms.filter(item => item.id !== id);
        return res.json({ success: true });
      }
      res.json({ success: true });
    } else {
      localPrograms = localPrograms.filter(item => item.id !== id);
      res.json({ success: true });
    }
  });
  // Enquiries Routes
  app.get("/api/enquiries", authMiddleware, async (req, res) => {
    if (supabase) {
      const { data, error } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false });
      if (error) {
        return res.json([...localEnquiries].reverse());
      }
      res.json(data);
    } else {
      res.json([...localEnquiries].reverse());
    }
  });
  
  app.get("/activate-formsubmit", (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
      <body style="font-family: sans-serif; padding: 40px; text-align: center;">
        <h2>Activate FormSubmit</h2>
        <p>Submit this standard form to trigger a fresh activation email from FormSubmit.</p>
        <form action="https://formsubmit.co/spiegelbusinessschool@gmail.com" method="POST">
          <input type="email" name="email" value="spiegelbusinessschool@gmail.com" required style="padding: 10px; width: 300px; margin-bottom: 20px;">
          <br>
          <button type="submit" style="padding: 10px 20px; background: #2563eb; color: white; border: none; border-radius: 5px; cursor: pointer;">Send Activation Request</button>
        </form>
      </body>
      </html>
    `);
  });

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

    // Forward to FormSubmit
    try {
      const formSubmitData = new URLSearchParams();
      formSubmitData.append("name", name || "");
      formSubmitData.append("email", email || "");
      formSubmitData.append("phone", phone || "");
      formSubmitData.append("course_interest", course_interest || "");
      formSubmitData.append("subject", subject || "");
      formSubmitData.append("message", message || "");
      formSubmitData.append("_subject", "New Website Enquiry - Spiegel Business School");
      formSubmitData.append("_captcha", "false");
      formSubmitData.append("_template", "table");

      const resSubmit = await fetch("https://formsubmit.co/ajax/spiegelbusinessschool@gmail.com", {
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
    } catch (err) {
      console.error("FormSubmit error:", err);
    }

    res.json({ success: true });
  });
  app.put("/api/enquiries/:id/status", authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (supabase) {
      const { error } = await supabase.from('enquiries').update({ status }).eq('id', id);
      if (error) {
        const enquiry = localEnquiries.find(e => e.id === id);
        if (enquiry) enquiry.status = status;
        return res.json({ success: true });
      }
      res.json({ success: true });
    } else {
      const enquiry = localEnquiries.find(e => e.id === id);
      if (enquiry) enquiry.status = status;
      res.json({ success: true });
    }
  });
  app.delete("/api/enquiries/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    if (supabase) {
      const { error } = await supabase.from('enquiries').delete().eq('id', id);
      if (error) {
        localEnquiries = localEnquiries.filter(e => e.id !== id);
        return res.json({ success: true });
      }
      res.json({ success: true });
    } else {
      localEnquiries = localEnquiries.filter(e => e.id !== id);
      res.json({ success: true });
    }
  });
  // Update gallery route
  app.put("/api/gallery/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { url, title, type } = req.body;
    if (supabase) {
      const { error } = await supabase.from('gallery').update({ url, title, type }).eq('id', id);
      if (error) {
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
    }
  });
  // Update program route
  app.put("/api/programs/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { image, title, category, date, description } = req.body;
    if (supabase) {
      const { error } = await supabase.from('programs').update({ image, title, category, date, description }).eq('id', id);
      if (error) {
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
    }
  });
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}
startServer();
