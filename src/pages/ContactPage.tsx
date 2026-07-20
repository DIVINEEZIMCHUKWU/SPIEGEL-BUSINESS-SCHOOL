import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FloatingWhatsApp } from "../components/FloatingWhatsApp";
import { ContactSection } from "../components/sections/ContactSection";
import { motion } from "motion/react";

export function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-20">
        <div className="bg-muted/30 py-12 md:py-16 border-b border-border">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-4xl font-bold text-foreground mb-4"
            >
              Connect With Spiegel
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Our admissions team is ready to answer your questions and guide you toward the right program.
            </motion.p>
          </div>
        </div>
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
