import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FloatingWhatsApp } from "../components/FloatingWhatsApp";
import { CTASection } from "../components/sections/CTASection";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

export function LogisticsPage() {
  const phoneNumber = "2349030892635";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent("Hello Igwe Logistics, I would like to make an enquiry about your delivery services.")}`;

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <Header />
      <main className="flex-1 pt-20">
        
        {/* Professional Hero Section */}
        <div className="bg-[#0A1931] py-20 md:py-32 text-white relative overflow-hidden">
          <motion.div 
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.4, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-800/30 via-[#0A1931] to-[#0A1931]"
          />
          <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 font-poppins tracking-tight uppercase"
            >
              SPIEGEL BUSINESS SCHOOL LOGISTICS
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-block mb-6 px-8 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-lg"
            >
              <span className="text-lg md:text-2xl text-white font-semibold tracking-wide">Trading as IGWE LOGISTICS</span>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-2xl text-white/70 max-w-2xl mx-auto italic font-light"
            >
              Connecting Businesses, Delivering Excellence
            </motion.p>
          </div>
        </div>

        <section className="py-10 md:py-16 bg-background" aria-label="Logistics services">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 items-start">
              {[
                ["https://i.ibb.co/Kx1PbxGc/Birmingham-Same-Day-Delivery.jpg", "Same-day delivery", "md:translate-y-4 md:-rotate-2"],
                ["https://i.ibb.co/JWYmpLzt/Express-service-delivery-man-in-blue-uniform-rides-motorbike-swiftly-AI-Generated.jpg", "Express courier service", "md:-translate-y-2 md:rotate-2"],
                ["https://i.ibb.co/chhTNCNV/World-wide-cargo-transport-concept-3d-rendering-Premium-Photo.jpg", "Worldwide cargo transport", "md:translate-y-6 md:-rotate-1"],
                ["https://i.ibb.co/YB0hBwfv/Shippings.jpg", "Shipping solutions", "md:-translate-y-3 md:rotate-2"],
                ["https://i.ibb.co/xt58ysjj/Best-Logistics-Companies-in-India-Efficient-Supply-Chain-Transportation-Services.jpg", "Supply chain delivery", "md:translate-y-3 md:-rotate-2"],
                ["https://i.ibb.co/2YqYnGxy/Shipping-or-other-fees-1-EUR-1-Piece.jpg", "Shipping fees and delivery", "md:-translate-y-1 md:rotate-1"]
              ].map(([src, alt, transform]) => (
                <figure key={src} className={`group overflow-hidden rounded-2xl border border-border bg-card shadow-lg transition-transform duration-500 hover:-translate-y-2 hover:rotate-0 ${transform}`}>
                  <img src={src} alt={alt} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <figcaption className="p-3 text-sm font-semibold text-foreground">{alt}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
              
              {/* Mission Card (Full Width) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="md:col-span-2 bg-card rounded-3xl p-6 sm:p-8 md:p-12 border border-border shadow-xl shadow-black/5 text-center relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Animated Heading Badge */}
                <motion.div 
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-block mb-8"
                >
                  <span className="px-6 py-2 rounded-full bg-primary text-primary-foreground text-sm font-bold uppercase tracking-widest shadow-md">
                    Our Mission
                  </span>
                </motion.div>

                <p className="text-lg sm:text-xl md:text-3xl text-foreground leading-relaxed max-w-4xl mx-auto font-medium">
                  To provide fast, secure, and reliable logistics solutions while empowering businesses through practical training.
                </p>
                <p className="mt-8 text-xl md:text-2xl font-bold text-[#0A1931]">
                  Your Goods. Our Responsibility. Delivered.
                </p>
              </motion.div>

              {/* Services Card */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-card rounded-3xl p-6 sm:p-8 md:p-10 border border-border shadow-xl shadow-black/5"
              >
                {/* Animated Heading Badge */}
                <motion.div 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-block mb-8"
                >
                  <span className="px-6 py-2 rounded-lg bg-[#0A1931] text-white text-sm font-bold uppercase tracking-widest shadow-md">
                    Our Services
                  </span>
                </motion.div>
                
                <ul className="space-y-6">
                  {[
                    "Nationwide Logistics & Cargo Delivery",
                    "Courier & Last-Mile Distribution",
                    "Business Training, Consulting & Support",
                    "E-commerce Fulfillment Solutions"
                  ].map((service, i) => (
                    <li key={i} className="flex items-center gap-5 p-4 rounded-2xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border">
                      <div className="h-3 w-3 rounded-full bg-primary shrink-0 shadow-sm" />
                      <span className="text-foreground font-semibold text-lg">{service}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Divisions & Info Card */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-card rounded-3xl p-6 sm:p-8 md:p-10 border border-border shadow-xl shadow-black/5 h-full flex flex-col justify-center"
                >
                  <div className="space-y-6">
                    <div className="p-8 rounded-2xl bg-muted/30 border border-border/50 hover:border-[#0A1931]/20 hover:bg-muted/60 transition-all shadow-sm">
                      <h4 className="text-xl font-bold text-[#0A1931] uppercase tracking-wider mb-3">We Move</h4>
                      <p className="text-muted-foreground text-lg font-medium">Logistics | Courier | Cargo | E-commerce Delivery</p>
                    </div>
                    <div className="p-8 rounded-2xl bg-muted/30 border border-border/50 hover:border-[#0A1931]/20 hover:bg-muted/60 transition-all shadow-sm">
                      <h4 className="text-xl font-bold text-[#0A1931] uppercase tracking-wider mb-3">We Train</h4>
                      <p className="text-muted-foreground text-lg font-medium">Business Skills for Growth & Profit</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Head Office Card (Full Width) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.01 }}
                className="md:col-span-2 bg-[#0A1931] rounded-3xl p-6 sm:p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden"
              >
                 <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                 <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />
                 
                 <div className="relative z-10">
                    {/* Animated Heading Badge */}
                    <motion.div 
                      animate={{ y: [0, -3, 0], boxShadow: ["0px 0px 0px rgba(255,255,255,0)", "0px 10px 20px rgba(255,255,255,0.1)", "0px 0px 0px rgba(255,255,255,0)"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="inline-block mb-8"
                    >
                      <span className="px-6 py-2.5 rounded-full border border-white/20 bg-white/10 text-white text-sm font-bold uppercase tracking-widest backdrop-blur-md">
                        Head Office
                      </span>
                    </motion.div>
                    
                    <p className="text-lg sm:text-xl md:text-3xl text-white/90 leading-relaxed font-light max-w-2xl mx-auto">
                      No. 6, Magma Plaza, Nkwo Nike, Amorji<br/>
                      <span className="font-semibold text-white mt-2 block">Enugu East LGA, Enugu State, Nigeria</span>
                    </p>
                 </div>
              </motion.div>

            </div>

            {/* Motto & Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pt-24 text-center max-w-4xl mx-auto"
            >
              <motion.p 
                animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.02, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="text-xl sm:text-2xl md:text-4xl font-bold text-[#0A1931] uppercase tracking-[0.2em] mb-16"
              >
                Fast safe reliable every time
              </motion.p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative overflow-hidden inline-flex h-16 w-full sm:w-auto items-center justify-center rounded-2xl bg-[#25D366] px-10 text-lg font-bold text-white transition-all shadow-2xl shadow-[#25D366]/30"
                >
                  <motion.span 
                    animate={{ x: ["-150%", "250%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                    className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                  />
                  <span className="relative z-10">Chat On WhatsApp</span>
                </motion.a>
                
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                  <Link 
                    to="/contact"
                    className="relative overflow-hidden inline-flex h-16 w-full items-center justify-center rounded-2xl bg-[#0A1931] px-10 text-lg font-bold text-white transition-all shadow-2xl shadow-[#0A1931]/30 border border-[#0A1931]/50"
                  >
                    <motion.span 
                      animate={{ x: ["-150%", "250%"] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
                      className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                    />
                    <span className="relative z-10">Contact Us</span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
