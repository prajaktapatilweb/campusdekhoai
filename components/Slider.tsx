"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const universities = [
  {
    name: "Dr. D. Y. Patil University",
    desc: "Industry-focused education with world-class infrastructure and placements.",
    logo: "/images/univercity/dyp.webp",
  },
  {
    name: "Pimpri Chinchwad Education Trust",
    desc: "Leading institution known for innovation, engineering excellence, and research.",
    logo: "/images/univercity/pcet.jpg",
  },
  {
    name: "Vishwakarma University",
    desc: "Modern university empowering students with global learning opportunities.",
    logo: "/images/univercity/vu.jpg",
  },
];

export default function UniversityCards() {
  return (
    <section className="bg-[#f5f5f5] px-4 py-20 md:px-10">
      {/* Cards */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
        {universities.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: index * 0.2,
            }}
            whileHover={{
              y: -12,
              scale: 1.03,
            }}
            className={`group relative overflow-hidden rounded-[28px] bg-white shadow-[0_15px_40px_rgba(0,0,0,0.12)] transition-all duration-500 ${
              index === 1 ? "md:scale-110" : ""
            }`}
          >
            {/* Shine Strip Animation */}
            <motion.div
              animate={{
                x: ["-150%", "250%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                delay: index * 0.4,
              }}
              className="absolute top-0 z-20 h-full w-24 rotate-12 bg-white/40 blur-xl"
            />
            {/* Top Logo Area */}
            <div className="relative flex h-[260px] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 p-10">
              {/* Animated Glow */}
              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="absolute h-44 w-44 rounded-full bg-rose-200/40 blur-3xl"
              />

              {/* Rotating Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute h-44 w-44 rounded-full border-2 border-dashed border-rose-300/60"
              />

              {/* Logo */}
              <motion.div
                whileHover={{ scale: 1.08 }}
                className="relative z-10 h-36 w-36 overflow-hidden rounded-full border-4 border-white bg-white shadow-2xl"
              >
                <Image
                  src={item.logo}
                  alt={item.name}
                  fill
                  className="object-contain p-4"
                />
              </motion.div>
            </div>

            {/* Content */}
            <div className="px-6 py-8 text-center">
              <h3 className="text-3xl font-bold text-rose-700">{item.name}</h3>

              <p className="mt-5 text-base leading-8 text-slate-600">
                {item.desc}
              </p>

              {/* Bottom Line */}
              <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-500 group-hover:w-28" />
            </div>

            {/* Hover Glow */}
            <div className="absolute inset-0 rounded-[28px] border border-white/30" />
          </motion.div>
        ))}
      </div>

      {/* Dots */}
      <div className="mt-14 flex items-center justify-center gap-4">
        <div className="h-4 w-4 rounded-full bg-rose-600" />
        <div className="h-4 w-4 rounded-full bg-slate-300" />
        <div className="h-4 w-4 rounded-full bg-slate-300" />
      </div>
    </section>
  );
}
