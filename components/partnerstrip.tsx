"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Sparkles } from "lucide-react";

export default function Partnerstrip() {
  // const Details = [
  //   {
  //     icons: "/images/univercity/dyp.webp",
  //     title: "Dr. D. Y. Patil University",
  //   },
  //   { icons: "/images/univercity/vu.jpg", title: "Vishwakarma University" },
  //   {
  //     icons: "/images/univercity/pcet.jpg",
  //     title: "Pimpri Chinchwad Education Trust",
  //   },
  // ];

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

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  return (
    <div>
      {/* Background Section */}
      <div className="mt-[-20px] w-full bg-[#031968]">
        <div className="max-w-8xl mx-auto">
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 xl:grid-cols-3">
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
                className="relative mt-[-80]"
              >
                {/* Top Logo Section */}
                <div className="relative flex h-[180px] items-center justify-center overflow-hidden">
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
                    className="relative flex h-36 w-36 items-center justify-center rounded-full border border-blue-800 bg-white/80 shadow-xl"
                  >
                    {/* Rotating Ring */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-[-6px] rounded-full border-2 border-dashed border-blue-300/40"
                    />

                    {/* Inner Glow */}
                    <div className="absolute inset-0 rounded-full bg-white" />

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
                <div className="mt-[-50] mb-10 flex flex-col items-center pt-10 text-center md:mb-1">
                  {/* Code Badge */}
                  {/* <motion.div
                    whileHover={{ scale: 1.08 }}
                    className="inline-flex w-fit items-center justify-center rounded-full border border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-1.5 text-xs font-bold tracking-[3px] text-blue-700 shadow-sm"
                  >
                    {item.code}
                  </motion.div> */}

                  {/* Name */}
                  <h3 className="mt-2 text-2xl font-bold text-white">
                    {item.name}
                  </h3>

                  {/* Location */}
                  <p className="mt-0 text-base leading-8 text-white/70">
                    {item.location}
                  </p>
                  {/* Partner Tag */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="mb:md-0 mt-2 mb-10 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700 shadow-sm"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    Official Partner University
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
