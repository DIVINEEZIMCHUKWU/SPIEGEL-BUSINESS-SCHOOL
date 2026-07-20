import { motion } from "motion/react";
import { GraduationCap, Layout, DollarSign, Target, UserCheck } from "lucide-react";

export function WhyChooseUsSection() {
  const reasons = [
    {
      title: "Qualified and experienced tutors",
      description: "Learn from dedicated educators with deep industry and academic expertise.",
      icon: GraduationCap,
    },
    {
      title: "Conducive learning environment",
      description: "A comfortable, modern environment designed for highly effective learning.",
      icon: Layout,
    },
    {
      title: "Affordable fees",
      description: "Premium quality education and professional training at accessible rates.",
      icon: DollarSign,
    },
    {
      title: "Practical and interactive learning",
      description: "Hands-on learning approach with real-world applications and projects.",
      icon: Target,
    },
    {
      title: "Individual attention for every student",
      description: "Personalized support and guidance to ensure no learner is left behind.",
      icon: UserCheck,
    }
  ];

  return (
    <section id="why-us" className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Decorative bg */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-card -skew-x-12 translate-x-20 -z-10 opacity-50 hidden lg:block" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-4xl font-bold mb-4 text-foreground">Why Choose Us?</h2>
              <div className="w-20 h-1.5 bg-primary rounded-full mb-6"></div>
              <p className="text-base md:text-lg text-muted-foreground mb-8">
                We are committed to providing an exceptional learning experience that empowers you to achieve your personal and professional goals.
              </p>
              <div className="hidden lg:block relative rounded-2xl overflow-hidden aspect-[4/3] shadow-lg">
                <img 
                  src="https://i.ibb.co/tMQMGQ8k/wwww.jpg" 
                  alt="Students collaborating" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-8">
            <div className="grid sm:grid-cols-2 gap-6">
              {reasons.map((reason, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-6 bg-card rounded-2xl border border-border flex gap-4 hover:shadow-md transition-shadow group ${idx === reasons.length - 1 ? 'sm:col-span-2 sm:w-1/2 sm:mx-auto' : ''}`}
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                    <reason.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-foreground">{reason.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
