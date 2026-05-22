"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, ArrowUp } from "lucide-react";
import Image from "next/image";

const services = [
  "Laptop & Desktop Rentals",
  "Hardware & Accessories",
  "Networking Solutions",
  "CCTV & Surveillance",
  "Software Installation",
  "Refurbished Devices",
  "Accessories Supply",
];

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const locations = [
  "Kharadi, Pune",
  "Hinjwadi, Pune",
  "Baner, Pune",
  "Chennai",
  "Bangalore",
  "Madurai",
  "Noida",
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-[hsl(var(--border))] bg-[hsl(0,0%,3%)]">
      {/* Gold line accent */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[hsl(var(--primary))] to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 flex items-center gap-2">
                        <Image src='/logo3.png' width='100' height='100' alt="vakrtuninfotech"></Image>
              
            
            </div>
            <p className="mb-6 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
              Your trusted IT solutions partner since 2022. We provide premium
              rental equipment, hardware solutions, networking infrastructure,
              and comprehensive IT services across India.
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="tel:9175932227 "
                className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--primary))]"
              >
                <Phone className="h-4 w-4 text-[hsl(var(--primary))]" />
                +91 9175932227
              </a>
              <a
                href="mailto:vakratundtech@gmail.com"
                className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--primary))]"
              >
                <Mail className="h-4 w-4 text-[hsl(var(--primary))]" />
               vakratundtech@gmail.com 
              </a>
              <span className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                <MapPin className="h-4 w-12 text-[hsl(var(--primary))]" />
                Office No-4, Jay Shri Hari Building Vinayak Nagar Lane No-2 Kate Puram Chowk Opposite RK 
Complex Pimple Gurav Pune 411061
              </span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="mb-5 font-serif text-lg font-bold text-[hsl(var(--foreground))]">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--primary))]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="mb-5 font-serif text-lg font-bold text-[hsl(var(--foreground))]">
              Our Services
            </h4>
            <ul className="flex flex-col gap-3">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-sm text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--primary))]"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Locations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="mb-5 font-serif text-lg font-bold text-[hsl(var(--foreground))]">
              Service Locations
            </h4>
            <ul className="flex flex-col gap-3">
              {locations.map((loc) => (
                <li
                  key={loc}
                  className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]"
                >
                  <MapPin className="h-3 w-3 text-[hsl(var(--primary))]" />
                  {loc}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[hsl(var(--border))]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 md:flex-row">
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            &copy; {new Date().getFullYear()} Vakrtunda Infotech. All rights reserved.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--primary))]"
          >
            Back to Top
            <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </footer>
  );
}
