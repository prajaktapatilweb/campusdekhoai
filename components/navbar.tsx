"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { mobilenumber1 } from "./constants/contactconst";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Event Registration", href: "#events" },
  { label: "Services", href: "#services" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (lang: "en" | "mr") => {
    setLanguage(lang);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[hsl(0,0%,4%)]/95 shadow-lg shadow-[hsl(43,74%,49%)]/5 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div
        className="mx-auto flex items-center justify-between border-b-2 border-white"
        style={{ background: "#1a237e" }}
      >
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="relative z-[2] flex h-[95px] w-[270px] items-center bg-white px-4 md:w-[400px]"
              style={{
                clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)",
              }}
            >
              <Image
                src="/images/pudharilogo.png"
                alt="Pudhari Campus 2 Career Logo"
                width={320}
                height={120}
                priority
              />
            </div>
          </motion.div>
        </a>

        {/* Desktop Nav */}

        <div className="hidden items-center gap-4 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative overflow-hidden rounded-md px-3 py-2 text-lg font-medium text-white transition-all duration-300 hover:bg-white/10 hover:text-[#facc15]"
            >
              <span className="relative z-10">{link.label}</span>

              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#facc15] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>
        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-4 pr-4">
          <a
            href={`tel:${mobilenumber1}`}
            className="hidden items-center gap-2 rounded-full border border-white bg-[hsl(var(--primary))]/10 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] md:flex"
          >
            <Phone className="h-4 w-4" />
            Call Now
          </a>
          <button
            type="button"
            className="text-[hsl(var(--foreground))] md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-[hsl(var(--border))] bg-[hsl(0,0%,4%)]/98 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  className="rounded-lg px-4 py-3 text-lg font-medium text-white transition-colors hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))]"
                  onClick={() => {
                    setMobileOpen(false);

                    setTimeout(() => {
                      const element = document.querySelector(link.href);
                      if (!element) return;

                      const offset = 90; // adjust if navbar height changes
                      const top =
                        element.getBoundingClientRect().top +
                        window.pageYOffset -
                        offset;

                      window.scrollTo({
                        top,
                        behavior: "smooth",
                      });
                    }, 300); // wait for menu animation to close
                  }}
                >
                  <span className="relative z-10">{link.label}</span>
                  {/* </a> */}
                </button>
              ))}
              <a
                href="tel:9175932227"
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[hsl(var(--primary))] px-5 py-3 text-sm font-semibold text-[hsl(var(--primary-foreground))]"
              >
                <Phone className="h-4 w-4" />
                Call Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
