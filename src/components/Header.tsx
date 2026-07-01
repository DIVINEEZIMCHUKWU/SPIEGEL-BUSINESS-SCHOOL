import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Programs", href: "/programs" },
  { name: "Why Us", href: "/why-us" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border py-2"
          : "bg-background/80 backdrop-blur-sm border-b border-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            <img 
              src="https://i.ibb.co/LW3LJGf/IMG-20260627-WA0048.jpg" 
              alt="Spiegel Business School Logo" 
              className="h-12 w-12 rounded-lg object-cover shadow-sm transition-transform group-hover:scale-105" 
            />
            <div className="flex flex-col">
              <span className="font-poppins text-lg font-bold leading-none tracking-tight text-foreground">
                SPIEGEL
              </span>
              <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                Business School
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      location.pathname === link.href ? "text-primary" : "text-foreground/80"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4 border-l border-border pl-6">
              <ThemeToggle />
              <Link
                to="/programs"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Apply Now
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-border bg-background lg:hidden overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 pb-6">
              <ul className="flex flex-col gap-4">
                {NAV_LINKS.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block text-lg font-medium hover:text-primary ${
                        location.pathname === link.href ? "text-primary" : "text-foreground/80"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
                <li className="pt-4 mt-2 border-t border-border">
                  <Link
                    to="/programs"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex h-12 w-full items-center justify-center rounded-md bg-primary text-base font-medium text-primary-foreground"
                  >
                    Apply Now
                  </Link>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
