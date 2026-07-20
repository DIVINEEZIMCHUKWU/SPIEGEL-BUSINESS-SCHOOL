import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

export function SuccessSection() {
  const testimonials = [
    {
      name: "Chukwudi Eze",
      role: "Digital Marketing Alumnus",
      image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=1935&auto=format&fit=crop",
      text: "The practical approach to learning at Spiegel Business School gave me the confidence to start my own digital agency. The instructors are exceptional.",
      rating: 5
    },
    {
      name: "Sarah Okafor",
      role: "Parent (Holiday Lessons)",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1974&auto=format&fit=crop",
      text: "Enrolling my kids for the holiday lessons was the best decision. Their academic performance improved significantly, especially in Sciences.",
      rating: 5
    },
    {
      name: "David Nnamdi",
      role: "Business Owner",
      image: "https://i.ibb.co/rR2Nj0V5/aaaa.jpg",
      text: "The Business Management training transformed how I run my company. Real-world case studies and experienced tutors made all the difference.",
      rating: 5
    }
  ];

  return (
    <section id="success" className="py-16 md:py-24 bg-navy text-white dark:bg-navy-dark relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-bold mb-4"
          >
            Student Success Stories
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-20 h-1.5 bg-blue-500 mx-auto rounded-full mb-6"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg text-white/80"
          >
            Don't just take our word for it. Hear from those who have experienced the Spiegel difference.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 relative"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-white/10" />
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-white/90 mb-8 italic leading-relaxed">"{testimonial.text}"</p>
              
              <div className="flex items-center gap-4 mt-auto">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-white/30"
                />
                <div>
                  <h4 className="font-bold text-white">{testimonial.name}</h4>
                  <span className="text-xs text-white/70">{testimonial.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-t border-white/20 text-center"
        >
          <div>
            <div className="text-3xl md:text-4xl font-bold mb-2">500+</div>
            <div className="text-sm text-white/70 uppercase tracking-wider font-medium">Graduates</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold mb-2">95%</div>
            <div className="text-sm text-white/70 uppercase tracking-wider font-medium">Success Rate</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold mb-2">50+</div>
            <div className="text-sm text-white/70 uppercase tracking-wider font-medium">Expert Tutors</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold mb-2">20+</div>
            <div className="text-sm text-white/70 uppercase tracking-wider font-medium">Active Programs</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
