import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FloatingWhatsApp } from "../components/FloatingWhatsApp";
import { WhyChooseUsSection } from "../components/sections/WhyChooseUsSection";
import { LearningSection } from "../components/sections/LearningSection";
import { CTASection } from "../components/sections/CTASection";
import { motion } from "motion/react";

export function WhyUsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-20">
        <div className="bg-muted/30 py-16 border-b border-border">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-foreground mb-4"
            >
              The Spiegel Advantage
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Why ambitious students, professionals, and entrepreneurs choose us to accelerate their growth.
            </motion.p>
          </div>
        </div>
        <WhyChooseUsSection />
        <LearningSection />
        <CTASection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
