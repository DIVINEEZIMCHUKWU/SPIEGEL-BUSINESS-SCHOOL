import { motion } from "motion/react";
import { MonitorPlay, Layers, Cpu, Users, Wrench, FileCode } from "lucide-react";

export function LearningSection() {
  const features = [
    {
      title: "Modern Teaching Methods",
      description: "Moving beyond traditional lectures with interactive, student-centered learning approaches.",
      icon: MonitorPlay,
    },
    {
      title: "Interactive Learning",
      description: "Engaging group discussions, case studies, and hands-on exercises.",
      icon: Layers,
    },
    {
      title: "Technology Integration",
      description: "Utilizing the latest digital tools and platforms to enhance the learning experience.",
      icon: Cpu,
    },
    {
      title: "Mentorship",
      description: "Guidance from experienced professionals to navigate career and academic challenges.",
      icon: Users,
    },
    {
      title: "Skill Development",
      description: "Focusing on both hard technical skills and essential soft skills for the modern workplace.",
      icon: Wrench,
    },
    {
      title: "Practical Projects",
      description: "Building a portfolio of real-world projects to demonstrate competence to employers.",
      icon: FileCode,
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-bold mb-4 text-foreground"
          >
            The Learning Experience
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
            We've designed an environment that fosters creativity, critical thinking, and practical application.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-card rounded-2xl p-8 border border-border shadow-sm hover:shadow-lg transition-all duration-300 relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              
              <div className="w-14 h-14 bg-background rounded-xl border border-border flex items-center justify-center mb-6 relative z-10 group-hover:border-primary/30 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-foreground relative z-10">{feature.title}</h3>
              <p className="text-muted-foreground relative z-10">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
