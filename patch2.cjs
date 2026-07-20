const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8');

const newAddGallery = `
  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let res;
      if (editingGallery) {
        res = await fetch(\`/api/gallery/\${editingGallery.id}\`, { credentials: "include",
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
`;

const newAddProgram = `
  const handleAddProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let res;
      if (editingProgram) {
        res = await fetch(\`/api/programs/\${editingProgram.id}\`, { credentials: "include",
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
`;

code = code.replace(/const handleAddGallery = [\s\S]*?fetchData\(\);\s*\};/m, newAddGallery.trim());
code = code.replace(/const handleAddProgram = [\s\S]*?fetchData\(\);\s*\};/m, newAddProgram.trim());

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
