import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

type Flyer = {
  id: number;
  title: string;
  date: string;
  image: string;
  category: string;
  description: string;
};

export function FlyerSection() {
  const [selectedFlyer, setSelectedFlyer] = useState<Flyer | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flyersData, setFlyersData] = useState<Flyer[]>([]);

  useEffect(() => {
    fetch("/api/programs")
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setFlyersData(data);
        } else {
          setFlyersData(defaultFlyers);
        }
      })
      .catch(() => {
        setFlyersData(defaultFlyers);
      });
  }, []);

  const defaultFlyers: Flyer[] = [
    {
      id: 1,
      title: "Data Analysis Training",
      date: "Upcoming",
      image: "https://i.ibb.co/whpbF6H8/IMG-20260627-WA0053.jpg",
      category: "Computer Training",
      description: "Master the art of data analysis. Learn to collect, process, and analyze data to extract meaningful insights using modern tools and techniques."
    },
    {
      id: 2,
      title: "Digital Marketing Skills",
      date: "Enrolling Now",
      image: "https://i.ibb.co/DHdZb9cR/IMG-20260627-WA0054.jpg",
      category: "Professional Skills",
      description: "Comprehensive digital marketing training covering SEO, social media marketing, content strategy, and email marketing. Elevate your brand online."
    },
    {
      id: 3,
      title: "Business Management",
      date: "Upcoming",
      image: "https://i.ibb.co/B5D6ph4h/IMG-20260627-WA0055.jpg",
      category: "Business",
      description: "Learn essential business management principles, leadership strategies, and organizational behavior to drive business growth and success."
    },
    {
      id: 4,
      title: "Holiday Lessons Academy",
      date: "Summer Holiday",
      image: "https://i.ibb.co/S4V9qTMK/IMG-20260627-WA0056.jpg",
      category: "Academic",
      description: "Engaging and structured holiday lessons for students. Keep young minds active and prepare them for the upcoming academic session."
    },
    {
      id: 5,
      title: "UI/UX Design Masterclass",
      date: "Enrolling Now",
      image: "https://i.ibb.co/1GbJctHr/IMG-20260627-WA0057.jpg",
      category: "Computer Training",
      description: "Dive into user interface and user experience design. Learn design thinking, wireframing, prototyping, and modern design tools."
    },
    {
      id: 6,
      title: "Website Development",
      date: "Upcoming",
      image: "https://i.ibb.co/mr9gDyXt/IMG-20260627-WA0058.jpg",
      category: "Computer Training",
      description: "Build responsive and dynamic websites from scratch. Covering HTML, CSS, JavaScript, and modern web frameworks."
    },
    {
      id: 7,
      title: "Leadership Development",
      date: "Enrolling Now",
      image: "https://i.ibb.co/G3dJfVgn/IMG-20260627-WA0059.jpg",
      category: "Business",
      description: "Develop crucial leadership skills, emotional intelligence, and team management strategies to lead with confidence."
    },
    {
      id: 8,
      title: "AI Tools Workshop",
      date: "Special Event",
      image: "https://i.ibb.co/6cR7F03g/IMG-20260627-WA0041.jpg",
      category: "Workshop",
      description: "Hands-on workshop exploring the latest AI tools and how to integrate them into your workflow for increased productivity."
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === flyersData.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? flyersData.length - 1 : prev - 1));
  };

  return (
    <section id="events" className="py-16 md:py-24 bg-background border-y border-border overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-4xl font-bold mb-4 text-foreground"
            >
              Upcoming Programs & Events
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-20 h-1.5 bg-primary rounded-full"
            ></motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {flyersData.map((flyer) => (
            <motion.div 
              key={flyer.id}
              whileHover={{ y: -5 }}
              className="bg-card rounded-2xl border border-border overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 h-full"
              onClick={() => setSelectedFlyer(flyer)}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                <img 
                  src={flyer.image} 
                  alt={flyer.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 bg-white text-navy text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  {flyer.category}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                  <div className="flex items-center gap-2 mb-2 text-white/80 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{flyer.date}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{flyer.title}</h3>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-blue-300 group-hover:text-white transition-colors">
                    View Details <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedFlyer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedFlyer(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white z-50 bg-black/50 p-2 rounded-full"
              onClick={() => setSelectedFlyer(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-card max-w-4xl w-full rounded-2xl overflow-hidden flex flex-col md:flex-row relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="md:w-1/2 bg-muted relative">
                <img 
                  src={selectedFlyer.image} 
                  alt={selectedFlyer.title} 
                  className="w-full h-[40vh] md:h-full object-cover md:object-contain bg-black"
                />
              </div>
              <div className="md:w-1/2 p-8 flex flex-col justify-center bg-background">
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4 w-fit">
                  {selectedFlyer.category}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2 text-foreground">{selectedFlyer.title}</h3>
                <div className="flex items-center gap-2 mb-6 text-muted-foreground font-medium">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>{selectedFlyer.date}</span>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {selectedFlyer.description}
                </p>
                <Link 
                  to="/contact" 
                  className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  Enroll Now <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
