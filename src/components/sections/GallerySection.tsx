import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ZoomIn } from "lucide-react";

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    { src: "https://i.ibb.co/nN6GRvpR/1119707526127202818.jpg", alt: "Training sessions", class: "md:col-span-2 md:row-span-2" },
    { src: "https://i.ibb.co/HDBP678Z/1019924646848076011.jpg", alt: "Holiday lessons", class: "" },
    { src: "https://i.ibb.co/C54jPp11/dddd.jpg", alt: "Computer classes", class: "" },
    { src: "https://i.ibb.co/0psvNNL1/ppppp.jpg", alt: "Workshops", class: "md:col-span-2" },
    { src: "https://i.ibb.co/ZzNP8ZyB/Akilah.jpg", alt: "Graduations", class: "" },
  ];

  return (
    <section id="gallery" className="py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-foreground"
          >
            Life At Spiegel Business School
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-20 h-1.5 bg-primary mx-auto rounded-full mb-6"
          ></motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative rounded-xl overflow-hidden group cursor-pointer ${img.class}`}
              onClick={() => setSelectedImage(img.src)}
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <ZoomIn className="text-white w-10 h-10 transform scale-50 group-hover:scale-100 transition-transform duration-300" />
                <div className="absolute bottom-4 left-4 text-white font-medium transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  {img.alt}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImage} 
              alt="Gallery Preview" 
              className="max-w-full max-h-full rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
