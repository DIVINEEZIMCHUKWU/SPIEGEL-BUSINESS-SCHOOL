import { useState } from "react";
import { LayoutDashboard, Image as ImageIcon, Users, MessageSquare, Settings, LogOut, FileText, ChevronRight } from "lucide-react";
import { ThemeToggle } from "../components/ThemeToggle";
import { motion } from "motion/react";

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "flyers", label: "Manage Flyers", icon: FileText },
    { id: "programs", label: "Programs", icon: BookOpenIcon },
    { id: "gallery", label: "Gallery", icon: ImageIcon },
    { id: "testimonials", label: "Testimonials", icon: Users },
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
              <span className="text-xs text-muted-foreground">Spiegel Business School</span>
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
        </nav>

        <div className="p-4 border-t border-border">
          <a href="/" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors">
            <LogOut className="w-4 h-4" />
            Logout to Site
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <h1 className="text-lg font-bold capitalize text-foreground">{activeTab.replace('-', ' ')}</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
              AD
            </div>
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
                <div className="grid md:grid-cols-4 gap-6">
                  {[
                    { label: "Total Enquiries", value: "124" },
                    { label: "Active Programs", value: "8" },
                    { label: "Gallery Items", value: "45" },
                    { label: "Upcoming Events", value: "3" },
                  ].map((stat, idx) => (
                    <div key={idx} className="bg-card p-6 rounded-xl border border-border shadow-sm">
                      <p className="text-sm font-medium text-muted-foreground mb-2">{stat.label}</p>
                      <h3 className="text-3xl font-bold text-foreground">{stat.value}</h3>
                    </div>
                  ))}
                </div>

                <div className="bg-card rounded-xl border border-border shadow-sm p-8 text-center mt-6">
                  <h3 className="text-xl font-bold mb-2">Supabase Backend Ready</h3>
                  <p className="text-muted-foreground max-w-lg mx-auto">
                    The admin interface is fully prototyped and ready for your Supabase integration. You can hook up data fetching for Flyers, Programs, and Enquiries easily from here.
                  </p>
                </div>
              </div>
            )}
            
            {activeTab !== 'dashboard' && (
              <div className="bg-card rounded-xl border border-border shadow-sm h-full min-h-[400px] flex items-center justify-center text-center p-6">
                <div>
                  <h3 className="text-xl font-bold mb-2 capitalize">{activeTab.replace('-', ' ')} Management</h3>
                  <p className="text-muted-foreground">Connect to your Supabase instance to view and edit {activeTab} data.</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}

// Temporary icon for programs
function BookOpenIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>
  );
}
