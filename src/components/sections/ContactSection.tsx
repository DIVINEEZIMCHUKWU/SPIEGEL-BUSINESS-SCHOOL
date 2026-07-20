import { useState } from "react";
import { motion } from "motion/react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useForm } from "react-hook-form";

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  course_interest: string;
  message: string;
};

export function ContactSection() {
  const { register, handleSubmit, reset, formState: { isSubmitting, isSubmitSuccessful, errors } } = useForm<ContactFormData>();
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus("submitting");
    setErrorMessage("");

    try {
      // Send to our backend API, which will both save it and forward to FormSubmit
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        throw new Error('Failed to submit enquiry');
      }

      // Show success
      setSubmitStatus("success");
      reset();
    } catch (error: any) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
      setErrorMessage(error.message || "An unexpected error occurred.");
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-bold mb-4 text-foreground"
          >
            Contact Us
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
            Have questions? We'd love to hear from you. Visit our campus, give us a call, or send us a message.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 bg-background rounded-2xl border border-border shadow-sm flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold mb-2 text-foreground">Phone Number</h3>
                <a href="tel:09030892635" className="text-sm text-muted-foreground hover:text-primary transition-colors">09030892635</a>
                <a href="tel:07017859519" className="text-sm text-muted-foreground hover:text-primary transition-colors">07017859519</a>
                <a href="tel:08130984004" className="text-sm text-muted-foreground hover:text-primary transition-colors">08130984004</a>
              </div>

              <div className="p-6 bg-background rounded-2xl border border-border shadow-sm flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold mb-2 text-foreground">Email</h3>
                <a href="mailto:spiegelbusinessschool@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-colors break-all">spiegelbusinessschool@gmail.com</a>
                <a href="mailto:infospiegelbusinessschool@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-colors break-all mt-1">infospiegelbusinessschool@gmail.com</a>
              </div>
            </div>

            <div className="p-6 bg-background rounded-2xl border border-border shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold mb-2 text-foreground">Address</h3>
              <p className="text-sm text-muted-foreground">
                NO. 6 Magma Plaza,<br />
                Nkwo Nike Amoji,<br />
                Abakpa, Enugu East.
              </p>
            </div>
            
            {/* Google Map */}
            <div className="w-full h-64 rounded-2xl border border-border overflow-hidden relative shadow-sm">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15856.24131580989!2d7.511394199999999!3d6.4526367000000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1044a42b03f0b09d%3A0xc3fbc7d938221b6!2sAbakpa%20Nike%2C%20Enugu!5e0!3m2!1sen!2sng!4v1709400000000!5m2!1sen!2sng" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Spiegel Business School Location"
              ></iframe>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-background rounded-2xl border border-border p-8 shadow-sm h-full"
          >
            <h3 className="text-2xl font-bold mb-6 text-foreground">Send a Message</h3>
            
            {submitStatus === "success" ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <Send className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold mb-2 text-foreground">Message Sent!</h4>
                <p className="text-muted-foreground">Thank you for contacting Spiegel Business School. Your enquiry has been received successfully. A member of our team will contact you shortly.</p>
                <button 
                  onClick={() => setSubmitStatus("idle")}
                  className="mt-6 px-6 py-2 border border-border rounded-lg hover:bg-muted text-sm font-medium"
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {submitStatus === "error" && (
                  <div className="p-3 bg-red-100 text-red-700 text-sm rounded-lg mb-4">
                    {errorMessage}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">Full Name</label>
                    <input 
                      {...register("name", { required: true })}
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-foreground"
                      placeholder="Chioma Terry"
                    />
                    {errors.name && <span className="text-xs text-red-500">Name is required</span>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">Email Address</label>
                    <input 
                      {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-foreground"
                      placeholder="chioma@example.com"
                    />
                    {errors.email && <span className="text-xs text-red-500">Valid email is required</span>}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">Phone Number</label>
                    <input 
                      {...register("phone")}
                      type="tel" 
                      id="phone" 
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-foreground"
                      placeholder="+234..."
                    />
                  </div>
                  <div>
                    <label htmlFor="course_interest" className="block text-sm font-medium text-foreground mb-1">Course Interest</label>
                    <select 
                      {...register("course_interest")}
                      id="course_interest" 
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-foreground"
                    >
                      <option value="">Select a Course</option>
                      <option value="Accounting & Financial Management">Accounting & Financial Management</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Economics & Analytics">Economics & Analytics</option>
                      <option value="Management & Organizational Behavior">Management & Organizational Behavior</option>
                      <option value="Operations Management">Operations Management</option>
                      <option value="Business Law & Ethics">Business Law & Ethics</option>
                      <option value="Business Communication">Business Communication</option>
                      <option value="Data Analysis">Data Analysis</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                      <option value="Business Management">Business Management</option>
                      <option value="UI/UX Design">UI/UX Design</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1">Subject</label>
                  <input 
                    {...register("subject", { required: true })}
                    type="text" 
                    id="subject" 
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-foreground"
                    placeholder="How can we help?"
                  />
                  {errors.subject && <span className="text-xs text-red-500">Subject is required</span>}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">Message</label>
                  <textarea 
                    {...register("message", { required: true })}
                    id="message" 
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none text-foreground"
                    placeholder="Type your message here..."
                  ></textarea>
                  {errors.message && <span className="text-xs text-red-500">Message is required</span>}
                </div>
                <button 
                  type="submit" 
                  disabled={submitStatus === "submitting"}
                  className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {submitStatus === "submitting" ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    <>Send Message <Send className="w-4 h-4" /></>
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
