import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-navy text-white dark:bg-navy-dark pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <img 
                src="https://i.ibb.co/LW3LJGf/IMG-20260627-WA0048.jpg" 
                alt="Spiegel Business School Logo" 
                className="h-12 w-12 rounded-lg object-cover bg-white transition-transform group-hover:scale-105" 
              />
              <div className="flex flex-col">
                <span className="font-poppins text-xl font-bold leading-none tracking-tight text-white">
                  SPIEGEL
                </span>
                <span className="text-[10px] font-medium uppercase tracking-widest text-white/70">
                  Business School
                </span>
              </div>
            </Link>
            <p className="text-sm text-white/80 leading-relaxed">
              Spiegel Business School is committed to providing quality education and skills training in a conducive learning environment.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-poppins text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Programs', path: '/programs' },
                { name: 'Why Choose Us', path: '/why-us' },
                { name: 'Gallery', path: '/gallery' },
                { name: 'Contact', path: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-white/80 hover:text-white hover:underline underline-offset-4 text-sm transition-all">
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/admin" className="text-white/50 hover:text-white text-sm transition-all mt-4 inline-block">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-poppins text-lg font-semibold mb-6">Our Programs</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/programs" className="text-white/80 hover:text-white hover:underline underline-offset-4 text-sm transition-all">
                  Holiday Lessons (Junior & Secondary School)
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-white/80 hover:text-white hover:underline underline-offset-4 text-sm transition-all">
                  Computer Training
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-white/80 hover:text-white hover:underline underline-offset-4 text-sm transition-all">
                  Business and Professional Skills Training
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-poppins text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/80">
                <MapPin className="h-5 w-5 text-white/60 shrink-0 mt-0.5" />
                <span>NO. 6 Magma Plaza,<br />Nkwo Nike Amoji,<br />Abakpa, Enugu East.</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/80">
                <Phone className="h-5 w-5 text-white/60 shrink-0" />
                <div className="flex flex-col gap-1">
                  <a href="tel:09030892635" className="hover:text-white">09030892635</a>
                  <a href="tel:07017859519" className="hover:text-white">07017859519</a>
                  <a href="tel:08130984004" className="hover:text-white">08130984004</a>
                </div>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/80">
                <Mail className="h-5 w-5 text-white/60 shrink-0" />
                <div className="flex flex-col gap-1">
                  <a href="mailto:spiegelbusinessschool@gmail.com" className="hover:text-white break-all">spiegelbusinessschool@gmail.com</a>
                  <a href="mailto:infospiegelbusinessschool@gmail.com" className="hover:text-white break-all">infospiegelbusinessschool@gmail.com</a>
                </div>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/60 text-center md:text-left">
            © 2026 Spiegel Business School. All Rights Reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-sm text-white/60 hover:text-white">Privacy Policy</a>
            <a href="#" className="text-sm text-white/60 hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
