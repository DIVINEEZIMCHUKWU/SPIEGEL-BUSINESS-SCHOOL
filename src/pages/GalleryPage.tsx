import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FloatingWhatsApp } from "../components/FloatingWhatsApp";
import { GallerySection } from "../components/sections/GallerySection";
import { CTASection } from "../components/sections/CTASection";
import { motion } from "motion/react";

export function GalleryPage() {
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
              Campus & Culture Gallery
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Take a visual tour of our modern facilities, training sessions, and vibrant student community.
            </motion.p>
          </div>
        </div>
        <GallerySection />
        <CTASection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
