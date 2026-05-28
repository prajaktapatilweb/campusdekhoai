"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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
    <section className="w-full bg-gradient-to-b from-white to-slate-100 px-4 py-16 md:px-10">
      <HeadingAndSub data={headList6}></HeadingAndSub>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {colleges.map((item, index) => (
          <motion.div
            key={item.code}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            whileHover={{ scale: 1.05 }}
            className="relative flex flex-col items-center rounded-2xl border border-gray-200 bg-white/70 p-6 text-center shadow-xl backdrop-blur-xl"
          >
            {/* Logo */}
            <div className="relative mb-4 h-30 w-30">
              <Image
                src={item.logo}
                alt={item.name}
                fill
                className="object-contain"
              />
            </div>

            {/* Code badge */}
            <span className="mb-3 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">
              {item.code}
            </span>

            {/* Name */}
            <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>

            {/* Location */}
            <p className="mt-1 text-sm text-gray-500">{item.location}</p>

            {/* Partner tag */}
            <div className="mt-4 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
              Official Partner University
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
