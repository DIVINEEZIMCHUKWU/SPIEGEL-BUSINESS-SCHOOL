import { motion } from "motion/react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function CTASection() {
  const phoneNumber = "2349030892635";
  const message = "Hello Spiegel Business School, I would like to make an enquiry.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-[#0A1931] text-white">
      {/* Decorative bg */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-full text-white">
          <path d="M0,0 L1000,0 L1000,1000 L0,1000 Z" fill="none" />
          <circle cx="200" cy="800" r="400" fill="currentColor" />
          <circle cx="800" cy="200" r="300" fill="currentColor" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-bold mb-6 text-white"
          >
            Take The Next Step Toward Success
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Join hundreds of learners building brighter futures through quality education and practical skill development.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              to="/contact" 
              className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-white text-[#0A1931] font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              Enroll Now <ArrowRight className="w-5 h-5" />
            </Link>
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#20bd5a] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20"
            >
              <MessageCircle className="w-5 h-5" /> Chat On WhatsApp
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
