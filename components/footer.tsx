"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, ArrowUp } from "lucide-react";
import Image from "next/image";
import {
  email,
  mobilenumber1,
  socialMediaLinks,
} from "./constants/contactconst";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

const services = [
  "Career Counselling",
  "Admission Guidance",
  "CAP Round Guidance",
  "Expert Mentorship",
  "Scholarship Assistance",
  "Education Loan Support",
];

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Events", href: "#events" },
  { label: "Mentors", href: "#mentors" },
  { label: "Partnerships", href: "#home" },
  // { label: "Contact", href: "#contact" },
];

const locations = [
  "Pune",
  "Sangali",
  "Satara",
  "Baramati",
  "Kolahpur",
  "Bidri",
  "Nashik",
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const { t } = useLanguage();
  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-[hsl(var(--border))] bg-[hsl(0,0%,3%)]"
    >
      {/* Gold line accent */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[hsl(var(--primary))] to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-15 md:grid-cols-12">
          <div className="md:col-span-5">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="mb-4 flex items-center gap-2">
                <Image
                  src="/images/pudharilogo.png"
                  width="300"
                  height="100"
                  alt="Pudhari Campus 2 Career Logo"
                ></Image>
              </div>
              <p className="mb-6 text-sm leading-relaxed text-[hsl(var(--muted-foreground))] text-white/60">
                Pudhari Edu-Disha is the dedicated education vertical of Pudhari
                Media Group, built in partnership with CampusDekho.AI to deliver
                Marathi-language career guidance, college coverage and
                scholarship awareness to Maharashtra’s students and parents.
                Campus 2 Career 2026 is the flagship on-ground outreach
                programme of Pudhari Edu-Disha — taking trusted guidance
                directly into 14 cities across 6 districts of Maharashtra
                through free seminars, digital webinars and university
                partnerships.
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href={`tel:${mobilenumber1}`}
                  className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] text-white/60 transition-colors hover:text-[hsl(var(--primary))]"
                >
                  <Phone className="h-4 w-4 text-white/60" />
                  +91 7498528125
                </a>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-[hsl(var(--primary))]"
                >
                  <Mail className="h-4 w-4 text-white/60" />
                  {email}
                </a>
              </div>
            </motion.div>
          </div>
          {/* Quick Links */}
          <div className="md:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="mb-5 font-serif text-lg font-bold text-white">
                Quick Links
              </h4>
              <ul className="flex flex-col gap-5">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-md text-underline text-white/60 underline underline-offset-2 transition-colors hover:text-[hsl(var(--primary))]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          {/* Services */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="mb-5 font-serif text-lg font-bold text-white">
              Our Services
            </h4>
            <ul className="flex flex-col gap-3">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-sm text-white/60 transition-colors hover:text-[hsl(var(--primary))]"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div> */}
          <div className="md:col-span-4">
            {/* Locations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="mb-5 font-serif text-lg font-bold text-white">
                Service Locations
              </h4>

              <ul className="flex flex-col gap-3">
                {locations.map((loc) => (
                  <li
                    key={loc}
                    className="flex items-center gap-2 text-sm text-white/60"
                  >
                    <MapPin className="h-3 w-3 text-[hsl(var(--primary))]" />
                    {loc}
                  </li>
                ))}
              </ul>

              {/* SOCIAL MEDIA */}
              <div className="mt-6 flex items-center gap-4">
                <a
                  href={socialMediaLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all duration-300 hover:border-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-black"
                >
                  <FaInstagram className="h-5 w-5" />
                </a>

                <a
                  href={socialMediaLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all duration-300 hover:border-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-black"
                >
                  <FaFacebookF className="h-5 w-5" />
                </a>

                {/* <a
                href={socialMediaLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all duration-300 hover:border-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-black"
              >
                <FaTwitter className="h-5 w-5" />
              </a> */}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[hsl(var(--border))]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 md:flex-row">
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            &copy; {new Date().getFullYear()}
            Campus Dekho. {t("footer.rights")}
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
