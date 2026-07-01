import { motion } from "motion/react";
import { BookOpen, Briefcase, GraduationCap, BarChart, Settings, Users, Monitor, ShieldCheck, CheckCircle2, Target, TrendingUp } from "lucide-react";

export function CurriculumSection() {
  const coreCourses = [
    {
      title: "Accounting & Financial Management",
      icon: BarChart,
      description: "Principles of financial accounting, managerial accounting, corporate finance, investment analysis, and risk management."
    },
    {
      title: "Marketing",
      icon: Target,
      description: "Market research, consumer behavior, advertising, branding, and sales strategy development."
    },
    {
      title: "Economics & Analytics",
      icon: TrendingUp,
      description: "Microeconomics, Macroeconomics, Business Statistics, and Data Analysis for evidence-based decision-making."
    },
    {
      title: "Management & Organizational Behavior",
      icon: Users,
      description: "Principles of Management, Organizational Leadership, Human Resource Management, and Project Management."
    },
    {
      title: "Operations Management",
      icon: Settings,
      description: "The design, management, and improvement of production and distribution processes, including logistics, supply chain, and quality management."
    },
    {
      title: "Business Law & Ethics",
      icon: ShieldCheck,
      description: "Legal frameworks governing business operations, including contract law, regulatory compliance, corporate governance, and corporate social responsibility."
    }
  ];

  const specializations = [
    "Human Resource Management",
    "Entrepreneurship & Innovation",
    "International Business / Global Management",
    "Management Information Systems [MIS]",
    "Supply Chain Management",
    "Industry-Focused Management"
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-foreground"
          >
            Academic Curriculum Overview
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
            className="text-lg text-muted-foreground leading-relaxed"
          >
            SPIEGEL BUSINESS SCHOOL offers a comprehensive and rigorous business curriculum designed to provide students with foundational knowledge and opportunities for specialization in key functional areas.
          </motion.p>
        </div>

        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl p-8 border border-border shadow-sm mb-12"
          >
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-foreground">
              <Briefcase className="text-primary w-6 h-6" /> Program Structure
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Our core curriculum is structured to deliver a broad understanding of organizational operations and management principles. It is integrated across all undergraduate programs, including BBA and B.Com, and graduate programs such as the MBA. These foundational courses ensure all students master the essential functions of business before advancing to specialized tracks.
            </p>
          </motion.div>

          <h3 className="text-2xl font-bold mb-8 text-foreground text-center">Core Foundational Courses</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreCourses.map((course, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-background rounded-xl p-6 border border-border hover:shadow-md transition-shadow"
              >
                <course.icon className="w-10 h-10 text-primary mb-4" />
                <h4 className="text-xl font-semibold mb-2 text-foreground">{course.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{course.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-foreground">
              <BookOpen className="text-primary w-6 h-6" /> Business Communication
            </h3>
            <div className="bg-card rounded-xl p-8 border border-border h-[calc(100%-4rem)]">
              <h4 className="text-lg font-semibold mb-2 text-foreground">Business Communication & Professional Skills</h4>
              <p className="text-muted-foreground leading-relaxed">
                Development of advanced written and verbal communication competencies, including professional presentations, report writing, and negotiation strategies.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-foreground">
              <GraduationCap className="text-primary w-6 h-6" /> Specializations
            </h3>
            <div className="bg-card rounded-xl p-8 border border-border h-[calc(100%-4rem)]">
              <p className="text-muted-foreground mb-6">
                Beyond the core curriculum, students may select a specialization or elective track aligned with their career objectives. Available concentrations include:
              </p>
              <ul className="space-y-3">
                {specializations.map((spec, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="font-medium text-foreground">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
