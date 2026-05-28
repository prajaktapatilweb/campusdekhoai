"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, ShieldCheck } from "lucide-react";
import HeadingAndSub from "./headingandsub";
import { headList6 } from "./constants/headindconst";

const colleges = [
  {
    code: "DPU",
    name: "Dr. D. Y. Patil University",
    location: "Pune, Maharashtra",
    logo: "/images/univercity/dyp.webp",
  },
  {
    code: "PCET",
    name: "Pimpri Chinchwad Education Trust",
    location: "Pune, Maharashtra",
    logo: "/images/univercity/pcet.jpg",
  },
  {
    code: "VU",
    name: "Vishwakarma University",
    location: "Pune, Maharashtra",
    logo: "/images/univercity/vu.jpg",
  },
];

export default function PartnerColleges() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100 px-4 py-10 md:px-10">
      <div>
        <HeadingAndSub data={headList6} />
        <div
          // className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3"
          className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3"
        >
          {/* <div className="mt-1 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"> */}
          {colleges.map((item, index) => (
            <motion.div
              key={item.code}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: index * 0.2,
              }}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className="group relative overflow-hidden rounded-[32px] bg-white shadow-[0_15px_40px_rgba(0,0,0,0.12)] backdrop-blur-2xl"
            >
              {/* Animated Border Glow */}
              {/* <div className="absolute inset-0 rounded-[32px] bg-gradient-to-r from-blue-500/20 via-cyan-400/20 to-purple-500/20 opacity-0 blur-xl transition-all duration-700 group-hover:opacity-100" /> */}

              {/* Top Logo Section */}
              <div className="relative flex h-[180px] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                {/* Floating Sparkle */}
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 8, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                  className="absolute top-5 right-5"
                >
                  <Sparkles className="h-5 w-5 text-yellow-400" />
                </motion.div>

                {/* Logo Glow */}
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 0px rgba(59,130,246,0.3)",
                      "0 0 35px rgba(59,130,246,0.7)",
                      "0 0 0px rgba(59,130,246,0.3)",
                    ],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                  }}
                  className="relative flex h-36 w-36 items-center justify-center rounded-full border border-blue-100 bg-white shadow-2xl"
                >
                  {/* Rotating Ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-[-6px] rounded-full border-2 border-dashed border-blue-400/40"
                  />

                  {/* Inner Glow */}
                  <div className="absolute inset-0 rounded-full bg-white blur-md" />

                  <div className="relative flex h-35 w-35 items-center justify-center overflow-hidden rounded-full">
                    <Image
                      src={item.logo}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Content */}
              <div className="flex flex-col items-center px-6 py-8 text-center">
                {/* Code Badge */}
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  className="inline-flex w-fit items-center justify-center rounded-full border border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-1.5 text-xs font-bold tracking-[3px] text-blue-700 shadow-sm"
                >
                  {item.code}
                </motion.div>

                {/* Name */}
                <h3 className="mt-5 text-2xl font-bold text-[hsl(var(--primary))]">
                  {item.name}
                </h3>

                {/* Location */}
                <p className="mt-4 text-base leading-8 text-slate-600">
                  {item.location}
                </p>

                {/* Partner Tag */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700 shadow-sm"
                >
                  <ShieldCheck className="h-4 w-4" />
                  Official Partner University
                </motion.div>

                {/* Bottom Line */}
                <div className="mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-blue-800 to-blue-700 transition-all duration-500 group-hover:w-28" />
              </div>

              {/* Hover Border */}
              <div className="absolute inset-0 rounded-[32px] border border-white/30" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
