import { MessageCircle } from "lucide-react";
import { motion } from "motion/react";

export function FloatingWhatsApp() {
  const phoneNumber = "2349030892635";
  const message = "Hello Spiegel Business School, I would like to make an enquiry.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#20bd5a] hover:scale-110 transition-all duration-300 group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ y: -5 }}
      aria-label="Chat on WhatsApp"
    >
      <motion.div
        animate={{
          boxShadow: [
            "0 0 0 0 rgba(37, 211, 102, 0.7)",
            "0 0 0 15px rgba(37, 211, 102, 0)",
            "0 0 0 0 rgba(37, 211, 102, 0)"
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="absolute inset-0 rounded-full"
      />
      <MessageCircle className="h-7 w-7 relative z-10" />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-navy px-3 py-1.5 text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none dark:bg-white dark:text-navy">
        Chat with us!
        <span className="absolute right-[-4px] top-1/2 -translate-y-1/2 border-y-4 border-l-4 border-y-transparent border-l-navy dark:border-l-white" />
      </span>
    </motion.a>
  );
}
