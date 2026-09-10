import { useState, useEffect, type FormEvent, type ChangeEvent, type Dispatch, type SetStateAction } from "react";
import { LayoutDashboard, Image as ImageIcon, Users, MessageSquare, Settings, LogOut, FileText, ChevronRight, Plus, Trash2, Edit2, Lock, Upload, Eye, EyeOff, Home, Menu, X } from "lucide-react";
import { ThemeToggle } from "../components/ThemeToggle";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

export function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [gallery, setGallery] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [dataError, setDataError] = useState("");

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
    setIsAuthenticated(sessionStorage.getItem("spiegel_admin_authenticated") === "true");
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
      
      const interval = setInterval(() => {
        if (activeTab === "enquiries" || activeTab === "dashboard") {
          supabase.from("enquiries").select("*").order("created_at", { ascending: false }).then(({ data }) => {
            if (data) setContacts(data);
          });
        }
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, activeTab]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.from("admin_settings").select("password").eq("id", 1).maybeSingle();
      const storedPassword = data?.password;
      const validPassword = storedPassword ? storedPassword === password : password === "Spiegel123";
      if ((!error && validPassword) || (error && password === "Spiegel123")) {
        setIsAuthenticated(true);
        sessionStorage.setItem("spiegel_admin_authenticated", "true");
        setLoginError("");
      } else {
        setLoginError(error ? "Unable to read admin settings. Try the default password or check Supabase access." : "Invalid password");
      }
    } catch (err) {
      setLoginError("Login failed");
    }
  };

  const handleLogout = async () => {
    sessionStorage.removeItem("spiegel_admin_authenticated");
    setIsAuthenticated(false);
  };

  const fetchData = async () => {
    const queries = await Promise.all([
      (activeTab === "gallery" || activeTab === "dashboard") ? supabase.from("gallery").select("*").order("created_at", { ascending: false }) : Promise.resolve({ data: null }),
      (activeTab === "programs" || activeTab === "dashboard") ? supabase.from("programs").select("*").order("created_at", { ascending: false }) : Promise.resolve({ data: null }),
      (activeTab === "enquiries" || activeTab === "dashboard") ? supabase.from("enquiries").select("*").order("created_at", { ascending: false }) : Promise.resolve({ data: null })
    ]);
    const errors = queries.map((query) => (query as any).error).filter(Boolean);
    setDataError(errors.length > 0 ? errors.map((error: any) => error.message).join(" ") : "");
    if (queries[0].data) setGallery(queries[0].data);
    if (queries[1].data) setPrograms(queries[1].data);
    if (queries[2].data) setContacts(queries[2].data);
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>, setter: Dispatch<SetStateAction<any>>, field: string) => {
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

  const handleAddGallery = async (e: FormEvent) => {
    e.preventDefault();
    try {
      let error;
      if (editingGallery) {
        ({ error } = await supabase.from("gallery").update(newGallery).eq("id", editingGallery.id));
      } else {
        ({ error } = await supabase.from("gallery").insert(newGallery));
      }
      if (error) throw error;
      setEditingGallery(null);
      setNewGallery({ url: "", title: "", type: "image" });
      fetchData();
    } catch (err) {
      alert("Failed to save media. If you uploaded an image, it might be too large.");
      console.error(err);
    }
  };

  const handleDeleteGallery = async (id: string) => {
    const item = gallery.find((galleryItem) => galleryItem.id === id);
    if (!window.confirm(`Delete "${item?.title || "this gallery item"}" permanently?`)) return;

    try {
      const { error } = await supabase.from("gallery").delete().eq("id", id);
      if (error) throw error;
      await fetchData();
    } catch (err) {
      alert("Failed to delete this gallery item. Please try again.");
      console.error(err);
    }
  };

  const handleEditGallery = (item: any) => {
    setEditingGallery(item);
    setNewGallery({ url: item.url, title: item.title, type: item.type });
  };

  const handleAddProgram = async (e: FormEvent) => {
    e.preventDefault();
    try {
      let error;
      if (editingProgram) {
        ({ error } = await supabase.from("programs").update(newProgram).eq("id", editingProgram.id));
      } else {
        ({ error } = await supabase.from("programs").insert(newProgram));
      }
      if (error) throw error;
      setEditingProgram(null);
      setNewProgram({ image: "", title: "", category: "", date: "", description: "" });
      fetchData();
    } catch (err) {
      alert("Failed to save program. If you uploaded an image, it might be too large.");
      console.error(err);
    }
  };

  const handleDeleteProgram = async (id: string) => {
    await supabase.from("programs").delete().eq("id", id);
    fetchData();
  };

  const handleEditProgram = (item: any) => {
    setEditingProgram(item);
    setNewProgram({ image: item.image, title: item.title, category: item.category, date: item.date, description: item.description });
  };

  const handleUpdateEnquiryStatus = async (id: string, status: string) => {
    await supabase.from("enquiries").update({ status }).eq("id", id);
    fetchData();
  };

  const handleDeleteEnquiry = async (id: string) => {
    await supabase.from("enquiries").delete().eq("id", id);
    fetchData();
  };

  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("admin_settings").upsert({ id: 1, password: newPassword });
      if (!error) {
        alert("Password updated successfully.");
      } else {
        alert("Failed to update password: " + error.message);
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

  const selectTab = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex h-dvh min-h-screen min-w-0 bg-muted/30 overflow-hidden">
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
              onClick={() => selectTab(item.id)}
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
      <main className="flex-1 min-w-0 flex flex-col h-full overflow-hidden">
        <header className="min-h-16 bg-card border-b border-border flex items-center justify-between gap-3 px-4 sm:px-6 py-3">
          <div className="flex items-center gap-3 min-w-0">
            <button type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg border border-border text-foreground" aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="text-base md:text-lg font-bold capitalize text-foreground truncate">{activeTab.replace('-', ' ')}</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link to="/" className="text-sm font-medium hover:underline text-primary">View Site</Link>
          </div>
        </header>

        {mobileMenuOpen && (
          <nav className="md:hidden bg-card border-b border-border p-3 space-y-1">
            {menuItems.map((item) => (
              <button key={item.id} onClick={() => selectTab(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${activeTab === item.id ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:bg-muted"}`}>
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
            <Link to="/" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/70 hover:bg-muted"><Home className="w-4 h-4" />Back to Website</Link>
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10"><LogOut className="w-4 h-4" />Logout</button>
          </nav>
        )}

        <div className="flex-1 min-w-0 p-3 sm:p-6 overflow-y-auto overflow-x-hidden">
          {dataError && isAuthenticated && (
            <div className="mb-6 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
              Supabase error: {dataError}. Run the static-hosting SQL policies in Supabase, then refresh.
            </div>
          )}
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
                <div className="bg-card rounded-xl border border-border p-4 sm:p-6">
                  <h3 className="text-base md:text-lg font-bold mb-4">{editingGallery ? "Edit Media" : "Add New Media"}</h3>
                  <form onSubmit={handleAddGallery} className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-end">
                    <div className="flex-1 min-w-0">
                      <label className="block text-sm mb-1 text-muted-foreground">Title</label>
                      <input required type="text" value={newGallery.title} onChange={e => setNewGallery({...newGallery, title: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-border bg-background" placeholder="Event Name" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <label className="block text-sm mb-1 text-muted-foreground">Media URL (Google Drive Link / Direct Link) or Upload</label>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input required type="text" value={newGallery.url} onChange={e => setNewGallery({...newGallery, url: e.target.value})} className="flex-1 px-3 py-2 rounded-lg border border-border bg-background" placeholder="https://..." />
                        <label className="cursor-pointer flex items-center justify-center bg-muted text-muted-foreground hover:bg-muted/80 rounded-lg px-3 border border-border transition-colors">
                          <Upload className="w-4 h-4" />
                          <input type="file" accept="image/*,video/*" className="hidden" onChange={(e) => handleFileUpload(e, setNewGallery, "url")} />
                        </label>
                      </div>
                    </div>
                    <div className="lg:w-32">
                      <label className="block text-sm mb-1 text-muted-foreground">Type</label>
                      <select value={newGallery.type} onChange={e => setNewGallery({...newGallery, type: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-border bg-background">
                        <option value="image">Image</option>
                        <option value="video">Video</option>
                      </select>
                    </div>
                    <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium flex items-center justify-center gap-2 h-10 shrink-0">
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
                        <div className="absolute inset-x-0 bottom-0 sm:inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent sm:bg-black/50 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex items-end sm:items-center justify-center gap-2 p-3 sm:p-0">
                          <button type="button" onClick={() => handleEditGallery(item)} aria-label={`Edit ${item.title}`} className="w-11 h-11 bg-blue-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg">
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button type="button" onClick={() => handleDeleteGallery(item.id)} aria-label={`Delete ${item.title}`} className="w-11 h-11 bg-red-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg">
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
                  {gallery.length === 0 && <p className="text-muted-foreground py-8">No gallery images found in the Supabase gallery table.</p>}
                </div>
              </div>
            )}

            {activeTab === 'programs' && (
              <div className="space-y-6">
                <div className="bg-card rounded-xl border border-border p-4 sm:p-6">
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
                  {programs.length === 0 && <p className="text-muted-foreground py-4">No program images found in the Supabase programs table.</p>}
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

                <div className="space-y-3 md:hidden">
                  {contacts
                    .filter(c => enquiryFilter === "All" || c.status === enquiryFilter)
                    .filter(c => {
                      const s = enquirySearch.toLowerCase(); if (!s) return true;
                      return (c.name?.toLowerCase().includes(s) || c.email?.toLowerCase().includes(s) || c.phone?.toLowerCase().includes(s));
                    })
                    .map((contact: any) => (
                      <div key={contact.id} className="bg-card rounded-xl border border-border p-4 shadow-sm space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="font-semibold truncate">{contact.name}</p>
                            <a href={`mailto:${contact.email}`} className="text-sm text-primary break-all">{contact.email}</a>
                          </div>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">{new Date(contact.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="grid grid-cols-1 gap-1 text-sm">
                          <p className="text-muted-foreground">Phone: <span className="text-foreground">{contact.phone || '-'}</span></p>
                          <p className="text-muted-foreground">Interest: <span className="text-foreground">{contact.course_interest || contact.subject}</span></p>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <select
                            value={contact.status}
                            onChange={(e) => handleUpdateEnquiryStatus(contact.id, e.target.value)}
                            className="min-h-10 flex-1 px-2 py-1 rounded-lg text-xs font-semibold border border-border bg-background"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Interested">Interested</option>
                            <option value="Converted">Converted</option>
                            <option value="Closed">Closed</option>
                          </select>
                          <div className="flex gap-2 shrink-0">
                            <button aria-label="View enquiry" onClick={() => setSelectedEnquiry(contact)} className="min-h-10 min-w-10 p-2 hover:bg-muted rounded-lg text-primary transition-colors">
                              <BookOpen className="w-4 h-4 mx-auto" />
                            </button>
                            <button aria-label="Delete enquiry" onClick={() => handleDeleteEnquiry(contact.id)} className="min-h-10 min-w-10 p-2 hover:bg-red-100 hover:text-red-600 rounded-lg text-muted-foreground transition-colors">
                              <Trash2 className="w-4 h-4 mx-auto" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  {contacts.length === 0 && <p className="bg-card rounded-xl border border-border p-8 text-center text-muted-foreground">No enquiries found</p>}
                </div>

                <div className="hidden md:block bg-card rounded-xl border border-border overflow-x-auto shadow-sm">
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
