import { motion } from "motion/react";
import { ArrowRight, GraduationCap, Users, Target, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
  const stats = [
    { label: "Quality Education", icon: BookOpen },
    { label: "Expert Tutors", icon: GraduationCap },
    { label: "Practical Learning", icon: Target },
    { label: "Career Growth", icon: Users },
  ];

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://i.ibb.co/tMQMGQ8k/wwww.jpg" 
          alt="Students learning" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-navy/85 dark:bg-navy-dark/95 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent opacity-90 dark:from-navy-dark" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium tracking-wider uppercase mb-6 backdrop-blur-sm">
              Welcome to Spiegel
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Transforming Learners Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-200">Future Leaders</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Empowering students, professionals, entrepreneurs, and future leaders with quality education, digital skills, and practical business knowledge for success in today's competitive world.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link 
              to="/contact" 
              className="w-full sm:w-auto px-8 py-4 bg-white text-navy font-semibold rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              Apply Now <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/about" 
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center"
            >
              Explore Spiegel
            </Link>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-8 border-t border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center justify-center p-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-3 backdrop-blur-sm">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-white/90 font-medium text-sm md:text-base">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
