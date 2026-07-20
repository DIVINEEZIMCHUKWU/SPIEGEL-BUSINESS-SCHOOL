import { useState, useEffect } from "react";
import { LayoutDashboard, Image as ImageIcon, Users, MessageSquare, Settings, LogOut, FileText, ChevronRight, Plus, Trash2, Edit2, Lock, Upload, Eye, EyeOff, Home } from "lucide-react";
import { ThemeToggle } from "../components/ThemeToggle";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState("dashboard");
  const [gallery, setGallery] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);

  // Editing state
  const [editingGallery, setEditingGallery] = useState<any>(null);
  const [editingProgram, setEditingProgram] = useState<any>(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState<any>(null);
  const [enquiryFilter, setEnquiryFilter] = useState("All");
  const [enquirySearch, setEnquirySearch] = useState("");

  // Forms
  const [newGallery, setNewGallery] = useState({ url: "", title: "", type: "image" });
  const [newProgram, setNewProgram] = useState({ image: "", title: "", category: "", date: "", description: "" });
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/check-auth", { credentials: "include" });
      if (res.ok) {
        setIsAuthenticated(true);
      }
    } catch (err) {}
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
      
      const interval = setInterval(() => {
        if (activeTab === "enquiries" || activeTab === "dashboard") {
          fetch("/api/enquiries?t=" + Date.now(), { credentials: "include" }).then(res => res.json()).then(data => {
            if (Array.isArray(data)) setContacts(data);
          }).catch(() => {});
        }
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, activeTab]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/login", { credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      if (res.ok) {
        setIsAuthenticated(true);
        setLoginError("");
      } else {
        setLoginError("Invalid password");
      }
    } catch (err) {
      setLoginError("Login failed");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST", credentials: "include" });
    setIsAuthenticated(false);
  };

  const fetchData = async () => {
    if (activeTab === "gallery" || activeTab === "dashboard") {
      const res = await fetch("/api/gallery?t=" + Date.now(), { credentials: "include" });
      const data = await res.json();
      setGallery(Array.isArray(data) ? data : []);
    }
    if (activeTab === "programs" || activeTab === "dashboard") {
      const res = await fetch("/api/programs?t=" + Date.now(), { credentials: "include" });
      const data = await res.json();
      setPrograms(Array.isArray(data) ? data : []);
    }
    if (activeTab === "enquiries" || activeTab === "dashboard") {
      const res = await fetch("/api/enquiries?t=" + Date.now(), { credentials: "include" });
      const data = await res.json();
      setContacts(Array.isArray(data) ? data : []);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<any>>, field: string) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 800;
            const MAX_HEIGHT = 800;
            let width = img.width;
            let height = img.height;

            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
            setter((prev: any) => ({ ...prev, [field]: dataUrl }));
          };
          img.src = reader.result as string;
        };
        reader.readAsDataURL(file);
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          setter((prev: any) => ({ ...prev, [field]: reader.result as string }));
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let res;
      if (editingGallery) {
        res = await fetch(`/api/gallery/${editingGallery.id}`, { credentials: "include",
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newGallery)
        });
      } else {
        res = await fetch("/api/gallery", { credentials: "include",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newGallery)
        });
      }
      if (!res.ok) throw new Error("Server returned " + res.status);
      setEditingGallery(null);
      setNewGallery({ url: "", title: "", type: "image" });
      fetchData();
    } catch (err) {
      alert("Failed to save media. If you uploaded an image, it might be too large.");
      console.error(err);
    }
  };

  const handleDeleteGallery = async (id: string) => {
    await fetch(`/api/gallery/${id}`, { method: "DELETE", credentials: "include" });
    fetchData();
  };

  const handleEditGallery = (item: any) => {
    setEditingGallery(item);
    setNewGallery({ url: item.url, title: item.title, type: item.type });
  };

  const handleAddProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let res;
      if (editingProgram) {
        res = await fetch(`/api/programs/${editingProgram.id}`, { credentials: "include",
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProgram)
        });
      } else {
        res = await fetch("/api/programs", { credentials: "include",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProgram)
        });
      }
      if (!res.ok) throw new Error("Server returned " + res.status);
      setEditingProgram(null);
      setNewProgram({ image: "", title: "", category: "", date: "", description: "" });
      fetchData();
    } catch (err) {
      alert("Failed to save program. If you uploaded an image, it might be too large.");
      console.error(err);
    }
  };

  const handleDeleteProgram = async (id: string) => {
    await fetch(`/api/programs/${id}`, { method: "DELETE", credentials: "include" });
    fetchData();
  };

  const handleEditProgram = (item: any) => {
    setEditingProgram(item);
    setNewProgram({ image: item.image, title: item.title, category: item.category, date: item.date, description: item.description });
  };

  const handleUpdateEnquiryStatus = async (id: string, status: string) => {
    await fetch(`/api/enquiries/${id}/status`, { credentials: "include",
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    fetchData();
  };

  const handleDeleteEnquiry = async (id: string) => {
    await fetch(`/api/enquiries/${id}`, { method: "DELETE", credentials: "include" });
    fetchData();
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/change-password", { credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        alert("Password updated successfully.");
      } else {
        alert("Failed to update password: " + data.error);
      }
    } catch (err) {
      alert("Error updating password.");
    }
    setNewPassword("");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
        <div className="bg-card p-8 rounded-2xl border border-border shadow-lg max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-2xl mx-auto mb-4">
              S
            </div>
            <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>
            <p className="text-muted-foreground mt-2">Enter your password to access the dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none pr-12"
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {loginError && <p className="text-red-500 text-sm text-center">{loginError}</p>}
            <button type="submit" className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors">
              Login to Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "programs", label: "Programs", icon: BookOpen },
    { id: "gallery", label: "Gallery", icon: ImageIcon },
    { id: "enquiries", label: "Enquiries", icon: MessageSquare },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-muted/30 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col h-full hidden md:flex">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-primary-foreground font-bold">
              S
            </div>
            <div>
              <h2 className="font-bold text-foreground leading-none">Admin Panel</h2>
              <span className="text-xs text-muted-foreground">Spiegel Business</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id 
                  ? "bg-primary text-primary-foreground" 
                  : "text-foreground/70 hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
              {activeTab === item.id && <ChevronRight className="w-4 h-4 ml-auto opacity-50" />}
            </button>
          ))}
          
          <div className="pt-4 mt-4 border-t border-border">
            <Link
              to="/"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/70 hover:bg-muted hover:text-foreground transition-colors"
            >
              <Home className="w-4 h-4" />
              Back to Website
            </Link>
          </div>
        </nav>

        <div className="p-4 border-t border-border">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <h1 className="text-base md:text-lg font-bold capitalize text-foreground">{activeTab.replace('-', ' ')}</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <a href="/" target="_blank" className="text-sm font-medium hover:underline text-primary">View Site</a>
          </div>
        </header>

        <div className="flex-1 p-6 overflow-y-auto">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-full"
          >
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Total Enquiries</p>
                    <h3 className="text-3xl font-bold text-foreground">{contacts.length || "0"}</h3>
                  </div>
                  <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Active Programs</p>
                    <h3 className="text-3xl font-bold text-foreground">{programs.length || "0"}</h3>
                  </div>
                  <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Gallery Items</p>
                    <h3 className="text-3xl font-bold text-foreground">{gallery.length || "0"}</h3>
                  </div>
                </div>

              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="text-base md:text-lg font-bold mb-4">{editingGallery ? "Edit Media" : "Add New Media"}</h3>
                  <form onSubmit={handleAddGallery} className="flex gap-4 items-end flex-wrap">
                    <div className="flex-1 min-w-[200px]">
                      <label className="block text-sm mb-1 text-muted-foreground">Title</label>
                      <input required type="text" value={newGallery.title} onChange={e => setNewGallery({...newGallery, title: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-border bg-background" placeholder="Event Name" />
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <label className="block text-sm mb-1 text-muted-foreground">Media URL (Google Drive Link / Direct Link) or Upload</label>
                      <div className="flex gap-2">
                        <input required type="text" value={newGallery.url} onChange={e => setNewGallery({...newGallery, url: e.target.value})} className="flex-1 px-3 py-2 rounded-lg border border-border bg-background" placeholder="https://..." />
                        <label className="cursor-pointer flex items-center justify-center bg-muted text-muted-foreground hover:bg-muted/80 rounded-lg px-3 border border-border transition-colors">
                          <Upload className="w-4 h-4" />
                          <input type="file" accept="image/*,video/*" className="hidden" onChange={(e) => handleFileUpload(e, setNewGallery, "url")} />
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm mb-1 text-muted-foreground">Type</label>
                      <select value={newGallery.type} onChange={e => setNewGallery({...newGallery, type: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-border bg-background">
                        <option value="image">Image</option>
                        <option value="video">Video</option>
                      </select>
                    </div>
                    <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium flex items-center gap-2 h-10">
                      {editingGallery ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />} {editingGallery ? "Update" : "Add"}
                    </button>
                    {editingGallery && (
                      <button type="button" onClick={() => { setEditingGallery(null); setNewGallery({ url: "", title: "", type: "image" }); }} className="px-4 py-2 bg-muted text-foreground rounded-lg font-medium flex items-center gap-2 h-10">
                        Cancel
                      </button>
                    )}
                  </form>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {gallery.map((item: any) => (
                    <div key={item.id} className="bg-card border border-border rounded-xl overflow-hidden group">
                      <div className="aspect-square bg-muted relative">
                        {item.type === 'video' ? (
                           <div className="w-full h-full flex items-center justify-center bg-black/10">Video Link</div>
                        ) : (
                           <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                        )}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button onClick={() => handleEditGallery(item)} className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button onClick={() => handleDeleteGallery(item.id)} className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="font-medium text-sm truncate">{item.title}</p>
                        <p className="text-xs text-muted-foreground capitalize">{item.type}</p>
                      </div>
                    </div>
                  ))}
                  {gallery.length === 0 && <p className="text-muted-foreground py-8">No gallery items found or database not connected.</p>}
                </div>
              </div>
            )}

            {activeTab === 'programs' && (
              <div className="space-y-6">
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="text-base md:text-lg font-bold mb-4">{editingProgram ? "Edit Program Flyer" : "Add New Program Flyer"}</h3>
                  <form onSubmit={handleAddProgram} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-1 text-muted-foreground">Title</label>
                      <input required type="text" value={newProgram.title} onChange={e => setNewProgram({...newProgram, title: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-border bg-background" placeholder="Program Title" />
                    </div>
                    <div>
                      <label className="block text-sm mb-1 text-muted-foreground">Category</label>
                      <input required type="text" value={newProgram.category} onChange={e => setNewProgram({...newProgram, category: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-border bg-background" placeholder="e.g. Computer Training" />
                    </div>
                    <div>
                      <label className="block text-sm mb-1 text-muted-foreground">Date / Status</label>
                      <input required type="text" value={newProgram.date} onChange={e => setNewProgram({...newProgram, date: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-border bg-background" placeholder="e.g. Enrolling Now" />
                    </div>
                    <div>
                      <label className="block text-sm mb-1 text-muted-foreground">Image URL or Upload</label>
                      <div className="flex gap-2">
                        <input required type="text" value={newProgram.image} onChange={e => setNewProgram({...newProgram, image: e.target.value})} className="flex-1 px-3 py-2 rounded-lg border border-border bg-background" placeholder="https://..." />
                        <label className="cursor-pointer flex items-center justify-center bg-muted text-muted-foreground hover:bg-muted/80 rounded-lg px-3 border border-border transition-colors">
                          <Upload className="w-4 h-4" />
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, setNewProgram, "image")} />
                        </label>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm mb-1 text-muted-foreground">Description</label>
                      <textarea required value={newProgram.description} onChange={e => setNewProgram({...newProgram, description: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-border bg-background h-24" placeholder="Detailed description..."></textarea>
                    </div>
                    <div className="md:col-span-2 flex justify-end gap-2">
                      {editingProgram && (
                        <button type="button" onClick={() => { setEditingProgram(null); setNewProgram({ image: "", title: "", category: "", date: "", description: "" }); }} className="px-6 py-2 bg-muted text-foreground rounded-lg font-medium flex items-center gap-2">
                          Cancel
                        </button>
                      )}
                      <button type="submit" className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium flex items-center gap-2">
                        {editingProgram ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />} {editingProgram ? "Update Program" : "Add Program"}
                      </button>
                    </div>
                  </form>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {programs.map((prog: any) => (
                    <div key={prog.id} className="bg-card border border-border rounded-xl p-4 flex gap-4">
                      <img src={prog.image} alt={prog.title} className="w-24 h-24 object-cover rounded-lg bg-muted" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold truncate text-foreground">{prog.title}</h4>
                        <p className="text-xs text-primary font-medium mb-1">{prog.category}</p>
                        <p className="text-xs text-muted-foreground truncate mb-2">{prog.description}</p>
                        <div className="flex gap-2">
                          <button onClick={() => handleEditProgram(prog)} className="text-xs text-blue-500 hover:underline flex items-center gap-1">
                            <Edit2 className="w-3 h-3" /> Edit
                          </button>
                          <button onClick={() => handleDeleteProgram(prog.id)} className="text-xs text-red-500 hover:underline flex items-center gap-1">
                            <Trash2 className="w-3 h-3" /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {programs.length === 0 && <p className="text-muted-foreground py-4">No programs found or database not connected.</p>}
                </div>
              </div>
            )}

            {activeTab === 'enquiries' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-card p-4 rounded-xl border border-border shadow-sm">
                    <p className="text-sm font-medium text-muted-foreground">Total Enquiries</p>
                    <h3 className="text-2xl font-bold text-foreground">{contacts.length}</h3>
                  </div>
                  <div className="bg-card p-4 rounded-xl border border-border shadow-sm">
                    <p className="text-sm font-medium text-muted-foreground">New</p>
                    <h3 className="text-2xl font-bold text-blue-500">{contacts.filter(c => c.status === 'New').length}</h3>
                  </div>
                  <div className="bg-card p-4 rounded-xl border border-border shadow-sm">
                    <p className="text-sm font-medium text-muted-foreground">Contacted</p>
                    <h3 className="text-2xl font-bold text-orange-500">{contacts.filter(c => c.status === 'Contacted').length}</h3>
                  </div>
                  <div className="bg-card p-4 rounded-xl border border-border shadow-sm">
                    <p className="text-sm font-medium text-muted-foreground">Converted</p>
                    <h3 className="text-2xl font-bold text-green-500">{contacts.filter(c => c.status === 'Converted').length}</h3>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <input
                    type="text"
                    placeholder="Search name, email, or phone..."
                    value={enquirySearch}
                    onChange={(e) => setEnquirySearch(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none"
                  />
                  <select
                    value={enquiryFilter}
                    onChange={(e) => setEnquiryFilter(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none"
                  >
                    <option value="All">All Status</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Interested">Interested</option>
                    <option value="Converted">Converted</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <div className="bg-card rounded-xl border border-border overflow-x-auto shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-border bg-muted/30">
                        <th className="p-4 font-medium text-sm text-muted-foreground">Name</th>
                        <th className="p-4 font-medium text-sm text-muted-foreground">Email</th>
                        <th className="p-4 font-medium text-sm text-muted-foreground">Phone</th>
                        <th className="p-4 font-medium text-sm text-muted-foreground">Interest</th>
                        <th className="p-4 font-medium text-sm text-muted-foreground">Date</th>
                        <th className="p-4 font-medium text-sm text-muted-foreground">Status</th>
                        <th className="p-4 font-medium text-sm text-muted-foreground text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts
                        .filter(c => enquiryFilter === "All" || c.status === enquiryFilter)
                        .filter(c => {
                          const s = enquirySearch.toLowerCase(); if (!s) return true;
                          return (c.name?.toLowerCase().includes(s) || c.email?.toLowerCase().includes(s) || c.phone?.toLowerCase().includes(s));
                        })
                        .map((contact: any) => (
                        <tr key={contact.id} className="border-b border-border hover:bg-muted/20">
                          <td className="p-4 text-sm font-medium">{contact.name}</td>
                          <td className="p-4 text-sm">{contact.email}</td>
                          <td className="p-4 text-sm">{contact.phone || '-'}</td>
                          <td className="p-4 text-sm truncate max-w-[150px]">{contact.course_interest || contact.subject}</td>
                          <td className="p-4 text-sm whitespace-nowrap">{new Date(contact.created_at).toLocaleDateString()}</td>
                          <td className="p-4 text-sm">
                            <select
                              value={contact.status}
                              onChange={(e) => handleUpdateEnquiryStatus(contact.id, e.target.value)}
                              className={`px-2 py-1 rounded-full text-xs font-semibold border-0 ${
                                contact.status === 'New' ? 'bg-blue-100 text-blue-700' :
                                contact.status === 'Contacted' ? 'bg-orange-100 text-orange-700' :
                                contact.status === 'Converted' ? 'bg-green-100 text-green-700' :
                                contact.status === 'Interested' ? 'bg-purple-100 text-purple-700' :
                                'bg-gray-100 text-gray-700'
                              }`}
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Interested">Interested</option>
                              <option value="Converted">Converted</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </td>
                          <td className="p-4 text-sm text-right flex items-center justify-end gap-2">
                            <button onClick={() => setSelectedEnquiry(contact)} className="p-2 hover:bg-muted rounded-lg text-primary transition-colors">
                              <BookOpen className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteEnquiry(contact.id)} className="p-2 hover:bg-red-100 hover:text-red-600 rounded-lg text-muted-foreground transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {contacts.length === 0 && (
                        <tr>
                          <td colSpan={7} className="p-8 text-center text-muted-foreground">No enquiries found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Enquiry Modal */}
                <AnimatePresence>
                  {selectedEnquiry && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-card w-full max-w-lg rounded-2xl shadow-xl overflow-hidden"
                      >
                        <div className="p-6 border-b border-border flex justify-between items-center">
                          <h3 className="text-xl font-bold">Enquiry Details</h3>
                          <button onClick={() => setSelectedEnquiry(null)} className="text-muted-foreground hover:text-foreground">✕</button>
                        </div>
                        <div className="p-6 space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-muted-foreground font-medium mb-1">Full Name</p>
                              <p className="text-sm font-semibold">{selectedEnquiry.name}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground font-medium mb-1">Status</p>
                              <p className="text-sm font-semibold">{selectedEnquiry.status}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground font-medium mb-1">Email</p>
                              <a href={`mailto:${selectedEnquiry.email}`} className="text-sm font-semibold text-primary hover:underline">{selectedEnquiry.email}</a>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground font-medium mb-1">Phone Number</p>
                              <a href={`tel:${selectedEnquiry.phone}`} className="text-sm font-semibold text-primary hover:underline">{selectedEnquiry.phone || 'N/A'}</a>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground font-medium mb-1">Course Interest</p>
                              <p className="text-sm font-semibold">{selectedEnquiry.course_interest || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground font-medium mb-1">Submission Date</p>
                              <p className="text-sm font-semibold">{new Date(selectedEnquiry.created_at).toLocaleString()}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground font-medium mb-1">Subject</p>
                            <p className="text-sm font-semibold">{selectedEnquiry.subject}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground font-medium mb-1">Message</p>
                            <div className="p-4 bg-muted/30 rounded-lg text-sm whitespace-pre-wrap mt-1 border border-border">
                              {selectedEnquiry.message}
                            </div>
                          </div>
                        </div>
                        <div className="p-6 bg-muted/20 border-t border-border flex justify-end">
                          <button onClick={() => setSelectedEnquiry(null)} className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium">
                            Close
                          </button>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="max-w-md bg-card p-6 rounded-xl border border-border shadow-sm">
                <h3 className="text-base md:text-lg font-bold mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary" /> Change Admin Password
                </h3>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div className="relative">
                    <label className="block text-sm mb-1 text-muted-foreground">New Password</label>
                    <input 
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none pr-12" 
                      placeholder="Enter new password"
                      required
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-[34px] text-muted-foreground hover:text-foreground p-1"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <button type="submit" className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors">
                    Update Password
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
