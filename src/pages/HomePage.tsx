import { HeroSection } from "../components/sections/HeroSection";
import { AboutSection } from "../components/sections/AboutSection";
import { CurriculumSection } from "../components/sections/CurriculumSection";
import { ProgramsSection } from "../components/sections/ProgramsSection";
import { WhyChooseUsSection } from "../components/sections/WhyChooseUsSection";
import { SuccessSection } from "../components/sections/SuccessSection";
import { FlyerSection } from "../components/sections/FlyerSection";
import { LearningSection } from "../components/sections/LearningSection";
import { CTASection } from "../components/sections/CTASection";
import { ContactSection } from "../components/sections/ContactSection";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FloatingWhatsApp } from "../components/FloatingWhatsApp";
import { useEffect } from "react";

export function HomePage() {
  // Handle hash scroll on initial load if present
  useEffect(() => {
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <CurriculumSection />
        <ProgramsSection />
        <WhyChooseUsSection />
        <SuccessSection />
        <FlyerSection />
        <LearningSection />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
