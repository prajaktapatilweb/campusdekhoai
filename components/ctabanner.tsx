"use client";

import { motion } from "framer-motion";
import { CalendarDays, ArrowRight } from "lucide-react";
import NewContactForm from "./newContactForm";
import HeadingAndSub from "./headingandsub";
import { headList8 } from "./constants/headindconst";

export default function CTABanner() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1e3a5f] via-[#1e40af] to-[#3b82f6] px-4 py-20 md:py-28">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating Circles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border-2 border-white/10"
          style={{
            width: 100 + i * 50,
            height: 100 + i * 50,
            top: `${10 + i * 15}%`,
            right: `${-5 + i * 10}%`,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Badge */}
          {/* <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/20 px-5 py-2 text-yellow-400">
            <CalendarDays className="h-4 w-4" />

            <span className="text-sm font-semibold">
              Limited Seats Available
            </span>
          </div> */}

          <HeadingAndSub data={headList8} />

          {/* Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {/* <button
              onClick={() => scrollToSection("#cities")}
              className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 px-8 py-4 text-lg font-bold text-[#1e3a5f] shadow-[0_8px_30px_rgba(251,191,36,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(251,191,36,0.5)]"
            >
              Register Now - Free Entry
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button> */}

            <div
              id="contact"
              className="w-full rounded-lg bg-white p-8 shadow-lg"
            >
              <NewContactForm />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
