"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Image from "next/image";

const slides = [
    {
    image: "/images/hardservice.jpg",
    title: "Hardware Services",
    subtitle: "Advanced Hardware Repair & IT Support Services",
    description:
      "Professional laptop and desktop repair, AMC services, accessories, data recovery, and complete networking solutions — all under one roof.",
  },
  
  {
    image: "/images/itrentals.jpg",
    title: "Premium IT Rentals",
    subtitle: "On-Demand IT Infrastructure Rentals",
    description:
      "From everyday laptops and desktops to enterprise-grade servers and projectors — we provide flexible rental solutions tailored to your requirements.",
  },
  {
    image: "/images/softservice.jpg",
    title: "Software Services",
    subtitle: "Professional Software Deployment & Support",
    description:
      "We deliver end-to-end software solutions including Microsoft 365, design tools, accounting software, industrial applications, and security systems. Boost productivity with reliable setup and expert support.",
  },

    {
    image: "/images/networking.jpg",
    title: "Networking & Infrastructure",
    subtitle: "Secure Networks. Smart Surveillance.",
    description:
      "From structured cabling and network rack setup to switch configuration and WiFi management, we deliver reliable IT infrastructure. We also offer CCTV installation and annual maintenance contracts for complete protection.",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slides[current].image || "/placeholder.svg"}
            alt={slides[current].title}
            fill
            className="object-cover"
            priority
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(0,0%,0%)]/85 via-[hsl(0,0%,10%)]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0,0%,4%)] via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 mt-4">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-4 inline-block rounded-full border border-[hsl(var(--primary))]/30 bg-[hsl(var(--primary))]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[hsl(var(--primary))]"
              >
                Since 2022
              </motion.span> */}

              <h1 className="mb-2 font-serif text-5xl font-bold leading-tight text-[hsl(var(--foreground))] md:text-7xl">
                {slides[current].title}
              </h1>

              <p className="mb-4 font-serif text-xl text-[hsl(var(--primary))] md:text-2xl">
                {slides[current].subtitle}
              </p>

              <p className="mb-8 max-w-lg text-base leading-relaxed text-[hsl(var(--muted-foreground))] md:text-lg">
                {slides[current].description}
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#services"
                  className="group flex items-center gap-2 rounded-full bg-[hsl(var(--primary))] px-8 py-3.5 text-sm font-semibold text-[hsl(var(--primary-foreground))] transition-all hover:shadow-lg hover:shadow-[hsl(var(--primary))]/25"
                >
                  Explore Services
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#contact"
                  className="rounded-full border border-[hsl(var(--foreground))]/20 px-8 py-3.5 text-sm font-semibold text-[hsl(var(--foreground))] transition-all hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))]"
                >
                  Get a Quote
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-8 right-6 z-20 flex items-center gap-3 md:bottom-12 md:right-12">
        <button
          type="button"
          onClick={prevSlide}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[hsl(var(--foreground))]/20 text-[hsl(var(--foreground))] transition-all hover:border-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))]"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={nextSlide}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[hsl(var(--foreground))]/20 text-[hsl(var(--foreground))] transition-all hover:border-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))]"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            type="button"
            key={`indicator-${slides[i].title}`}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === current
                ? "w-10 bg-[hsl(var(--primary))]"
                : "w-4 bg-[hsl(var(--foreground))]/30"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-6 z-20 hidden md:block"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
            Scroll
          </span>
          <div className="h-10 w-[1px] bg-gradient-to-b from-[hsl(var(--primary))] to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
