"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[hsl(0,0%,4%)]/95 backdrop-blur-md shadow-lg shadow-[hsl(43,74%,49%)]/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex  items-center justify-between border-b-2 border-white" style={{background:'#1a237e'}}>
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="
      relative z-[2]
      flex h-[95px] w-[270px] md:w-[400px]
      
       items-center
      bg-white px-4
    "
              style={{
                clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)",
              }}
            >
              <Image
                src="/images/pudharilogo.png"
                alt="CampusDekho.AI Logo"
                width={320}
                height={120}
                priority
              />
            </div>
          </motion.div>
          {/* <Image src="/logo3.png" width="100" height="100" alt="vakrtuninfotech"></Image> */}
          {/* <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10">
            <span className="font-serif text-xl font-bold text-[hsl(var(--primary))]">
              T
            </span>
          </div>
          <div>
            <span className="font-serif text-xl font-bold tracking-wide text-[hsl(var(--foreground))]">
              Tech
            </span>
            <span className="font-serif text-xl font-bold tracking-wide text-[hsl(var(--primary))]">
              Nova
            </span>
          </div> */}
        </a>
        {/* Togle Button To change Language */}
        <div className="hidden md:flex">
          <div
            className={`flex overflow-hidden rounded-md border ${
              scrolled ? "border-[#1a237e]" : "border-white/50"
            }`}
          >
            <button
              onClick={() => handleLanguageChange("en")}
              className={`px-4 py-1 text-xs transition-all duration-200 ${
                language === "en"
                  ? scrolled
                    ? "bg-[#1a237e] text-white"
                    : "bg-white/20 text-white"
                  : scrolled
                    ? "bg-[rgba(26,35,126,0.1)] text-[#1a237e] hover:bg-[rgba(26,35,126,0.15)]"
                    : "bg-white/20 text-white hover:bg-white/10"
              }`}
            >
              EN
            </button>

            <button
              onClick={() => handleLanguageChange("mr")}
              className={`px-4 py-1 text-xs transition-all duration-200 ${
                language === "mr"
                  ? scrolled
                    ? "bg-[#1a237e] text-white"
                    : "bg-white/20 text-white"
                  : scrolled
                    ? "bg-[rgba(26,35,126,0.1)] text-[#1a237e] hover:bg-[rgba(26,35,126,0.15)]"
                    : "bg-white/20 text-white hover:bg-white/10"
              }`}
            >
              मराठी
            </button>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex ">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-white transition-colors hover:text-[hsl(var(--primary))] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[hsl(var(--primary))] after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-4 pr-4 ">
          <a
            href="tel:9175932227"
            className="hidden items-center  gap-2 rounded-full border border-white bg-[hsl(var(--primary))]/10 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] md:flex"
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
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
                // <a
                //   key={link.href}
                //   href={link.href}
                //   onClick={() => setMobileOpen(false)}
                //   className="rounded-lg px-4 py-3 text-sm font-medium text-[hsl(var(--muted-foreground))] transition-colors hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))]"
                // >

                <button
                  key={link.href}
                  type="button"
                  className="rounded-lg px-4 py-3 text-sm font-medium text-[hsl(var(--muted-foreground))] transition-colors hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))]"
                  onClick={() => {
                    setMobileOpen(false);

                    setTimeout(() => {
                      const element = document.querySelector(link.href);
                      if (!element) return;

                      const offset = 90; // adjust if navbar height changes
                      const top = element.getBoundingClientRect().top + window.pageYOffset - offset;

                      window.scrollTo({
                        top,
                        behavior: "smooth",
                      });
                    }, 300); // wait for menu animation to close
                  }}
                >
                  {link.label}
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
