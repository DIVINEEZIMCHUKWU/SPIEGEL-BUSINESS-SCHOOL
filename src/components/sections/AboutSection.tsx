import { motion } from "motion/react";
import { CheckCircle2, Target, Lightbulb, TrendingUp } from "lucide-react";

export function AboutSection() {
  const values = [
    "Excellence", "Integrity", "Innovation", "Leadership", "Professionalism", "Lifelong Learning"
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl md:text-4xl font-bold mb-4 text-foreground">About Us</h2>
              <div className="w-20 h-1.5 bg-primary rounded-full mb-6"></div>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                <strong className="text-foreground">SPIEGEL BUSINESS SCHOOL</strong> will provide innovative, future-focused, and comprehensive education for students in Grades 1–12. In its initial phase, the school will focus exclusively on Grades 9–12 to establish academic excellence and operational standards, with a strategic plan to expand across the full K–12 spectrum in subsequent years.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 pt-6">
              <div className="p-6 bg-card rounded-2xl border border-border shadow-sm">
                <Target className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-bold text-xl mb-2 text-foreground">Mission</h3>
                <p className="text-sm text-muted-foreground">To equip students for success in a rapidly evolving global economy by delivering a challenging, supportive, and inclusive learning environment that cultivates critical thinking, creativity, and character.</p>
              </div>
              <div className="p-6 bg-card rounded-2xl border border-border shadow-sm">
                <Lightbulb className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-bold text-xl mb-2 text-foreground">Academic Focus</h3>
                <p className="text-sm text-muted-foreground">SPIEGEL will offer a well-rounded, interdisciplinary curriculum spanning Business, Science, Arts, and Technology. Beyond rigorous academics, students will engage in leadership development programs and community service initiatives to foster civic responsibility and holistic personal growth.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] lg:aspect-auto lg:h-[600px]">
              <img 
                src="https://i.ibb.co/ZzNP8ZyB/Akilah.jpg" 
                alt="Spiegel Business School Campus" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6" /> Core Values
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {values.map((value, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-white/90">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                      <span className="font-medium text-sm">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -z-10 -top-6 -right-6 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -z-10 -bottom-6 -left-6 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
