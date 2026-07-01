/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { HomePage } from "./pages/HomePage";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AboutPage } from "./pages/AboutPage";
import { ProgramsPage } from "./pages/ProgramsPage";
import { WhyUsPage } from "./pages/WhyUsPage";
import { GalleryPage } from "./pages/GalleryPage";
import { ContactPage } from "./pages/ContactPage";

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="spiegel-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/why-us" element={<WhyUsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
