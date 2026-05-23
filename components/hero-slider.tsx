"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
        className="absolute inset-0"
      >
        <Image
          src="/images/guide1.jpg"
          alt="career guidence"
          fill
          priority
          className="object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, rgba(31, 31, 31, 0.85) 0%, rgba(31, 31, 31, 0.75) 50%, rgba(41, 46, 90, 0.3) 100%)',
        }} />

        {/* Bottom Fade */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" /> */}
      </motion.div>

      {/* Floating Glow */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
        }}

      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen  items-center  px-4 sm:px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
          }}
          className="max-w-2xl"
        >

          {/* Subtitle */}
          {/* <div className="mb-6 flex items-center gap-1 py-2 px-4
              border-3 border-white/20 borderadius rounded-full w-max  bg-white/10 px-4 py-2
    backdrop-blur-sm">
              <p
            className="
              text-md
              font-medium
              text-white/80
              md:text-md
            
            "
          >
           Maharashtra's Premier Direct Admission Support & Career guidance Carnival 2026
          </p>
          </div> */}
          {/* Small Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          // className="
          //   mb-5 inline-flex items-center
          //   rounded-full border border-[hsl(var(--primary))]/30
          //   bg-[hsl(var(--primary))]/10
          //   px-4 py-1.5
          //   text-xs font-semibold uppercase tracking-[0.2em]
          //   // text-[hsl(var(--primary))]
          //   backdrop-blur-md
          // "
          >
            {/* Subtitle */}
            <div className=" mt-4 mb-3 flex w-fit items-center gap-1
    rounded-full border border-white/20
    bg-white/10 px-4 py-2
    backdrop-blur-sm">
              <p
                className="
              text-xs
              font-medium
              text-white/80
              md:text-md
            
            "
              >
                Maharashtra's Premier Direct Admission Support & Career guidance Carnival 2026
              </p>
            </div>
          </motion.div>

          {/* Heading */}
          <h1
            className="
              mb-4
              font-[var(--font-playfair)]
             
              font-bold
              leading-tight
              text-white
              text-3xl
              md:text-6xl
              sm:text-3xl
            "
          >
            Meet Top Colleges.<br></br> Get Expert Guidance.<br></br> Secure Your Future.
          </h1>




          {/* Description */}
          <p
            className="
              mb-8
              max-w-xl
             text-sm sm:text-base md:text-lg
              leading-relaxed
              text-white/75
              md:text-lg
            "
          >
          Connect with top colleges, career experts, and admission counsellors across multiple cities in Maharashtra for complete guidance after 12th including CET, CAP rounds, scholarships, and career planning.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#services"
              className="
                group flex items-center gap-2
                rounded-full
                bg-[hsl(var(--primary))]
                px-8 py-2
                text-md font-semibold
                text-white
                transition-all duration-300
                hover:scale-105
                hover:shadow-2xl
                hover:shadow-[hsl(var(--primary))]/30
              "
            >
             Register Now

              <ArrowRight
                className="
                  h-4 w-4
                  transition-transform duration-300
                  group-hover:translate-x-1
                "
              />
            </a>

            {/* <a
              href="#contact"
              className="
                rounded-full
                border border-white/20
                px-8 py-3.5
                text-sm font-semibold
                text-white
                backdrop-blur-md
                transition-all duration-300
                hover:border-[hsl(var(--primary))]
                hover:text-[hsl(var(--primary))]
              "
            >
              Get a Quote
            </a> */}
          </div>
        </motion.div>
      </div>

      {/* Scroll Hint */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
        className="absolute bottom-5 left-6 z-20 hidden md:block"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-[0.2em] text-white/60">
            Scroll
          </span>

          <div className="h-10 w-px bg-gradient-to-b from-[hsl(var(--primary))] to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}