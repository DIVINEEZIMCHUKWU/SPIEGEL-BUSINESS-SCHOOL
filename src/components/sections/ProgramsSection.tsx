import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { BookOpen, Laptop, Briefcase, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

export function ProgramsSection() {
  const [programsData, setProgramsData] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/programs?t=" + Date.now())
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProgramsData(data);
        }
      })
      .catch(() => {
        // Handle error if needed
      });
  }, []);

  const defaultPrograms = [
    {
      id: "holiday-lessons",
      title: "Holiday Lessons (Junior & Secondary School)",
      description: "Structured academic support for Junior and Secondary School students designed to strengthen understanding, improve performance, and build confidence.",
      icon: BookOpen,
      category: "Academic",
      image: "https://i.ibb.co/zVKj8wcY/grind-o-clock.jpg"
    },
    {
      id: "computer-training",
      title: "Computer Training",
      description: "Practical digital skills training including Web Development, Coding, Python, Artificial Intelligence, Data Analysis, and essential tools like Microsoft Office Suite and Digital Marketing, designed for students, professionals, entrepreneurs, and job seekers.",
      icon: Laptop,
      category: "Technology",
      image: "https://i.ibb.co/GvHS5zSH/eeee.jpg"
    },
    {
      id: "business-skills",
      title: "Business and Professional Skills Training",
      description: "Industry-relevant skills that prepare individuals for career advancement and entrepreneurial success.",
      icon: Briefcase,
      category: "Business",
      image: "https://i.ibb.co/5xBmb9WY/gggg.jpg"
    }
  ];

  return (
    <section id="programs" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-bold mb-4 text-foreground"
          >
            Our Programs
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-20 h-1.5 bg-primary mx-auto rounded-full mb-6"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg text-muted-foreground"
          >
            Discover our comprehensive range of educational and professional development programs tailored for your success.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programsData.map((program, idx) => {
            const Icon = program.icon || GraduationCap;
            return (
              <motion.div
                key={program.id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-background rounded-2xl overflow-hidden shadow-sm border border-border group hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors z-10" />
                  <img 
                    src={program.image} 
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 z-20 w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-lg">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                
                <div className="p-8 flex flex-col h-[calc(100%-12rem)]">
                  <div className="text-xs font-bold text-primary mb-2 uppercase tracking-wider">{program.category}</div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">{program.title}</h3>
                  <p className="text-muted-foreground mb-6 flex-1">
                    {program.description}
                  </p>
                  
                  <Link to="/contact" className="inline-flex items-center justify-center w-full py-3 px-4 bg-muted hover:bg-primary hover:text-primary-foreground text-foreground font-medium rounded-lg transition-colors mt-auto">
                    Learn More
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
