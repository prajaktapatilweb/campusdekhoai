"use client";

import { motion } from "framer-motion";
import {
  Cpu,
  Stethoscope,
  BriefcaseBusiness,
  FlaskConical,
  Scale,
  Palette,
  Box,
} from "lucide-react";
import HeadingAndSub from "./headingandsub";
import { headList6 } from "./constants/headindconst";

const categories = [
  {
    icon: Cpu,
    name: "Engineering",
    count: "40+ Colleges",
    color: "#3b82f6",
    colleges: ["IIT Delhi", "NIT Trichy", "BITS Pilani", "VIT Vellore"],
  },
  {
    icon: Stethoscope,
    name: "Medical",
    count: "25+ Colleges",
    color: "#ef4444",
    colleges: ["AIIMS Delhi", "CMC Vellore", "JIPMER", "KMC Manipal"],
  },
  {
    icon: BriefcaseBusiness,
    name: "Management",
    count: "30+ Colleges",
    color: "#10b981",
    colleges: ["IIM Ahmedabad", "XLRI Jamshedpur", "SP Jain", "ISB Hyderabad"],
  },
  {
    icon: FlaskConical,
    name: "Pharmacy",
    count: "20+ Colleges",
    color: "#8b5cf6",
    colleges: ["NIPER Mohali", "Manipal College", "ICT Mumbai", "JSS Mysuru"],
  },
  {
    icon: Scale,
    name: "Law",
    count: "15+ Colleges",
    color: "#f59e0b",
    colleges: ["NLSIU Bangalore", "NALSAR Hyderabad", "NLU Delhi", "WBNUJS"],
  },
  {
    icon: Palette,
    name: "Design",
    count: "18+ Colleges",
    color: "#ec4899",
    colleges: ["NID Ahmedabad", "NIFT Delhi", "Srishti", "Pearl Academy"],
  },
];

export default function Colleges() {
  return (
    <section
      id="colleges"
      className="bg-gradient-to-b from-slate-50 to-white py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <HeadingAndSub data={headList6} />
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className="h-full rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                  style={{
                    borderColor: undefined,
                  }}
                >
                  {/* Top */}
                  <div className="mb-6 flex items-center justify-between">
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-2xl"
                      style={{
                        backgroundColor: `${category.color}15`,
                      }}
                    >
                      <Icon size={28} style={{ color: category.color }} />
                    </div>

                    <span
                      className="rounded-full px-3 py-1 text-xs font-semibold"
                      style={{
                        backgroundColor: `${category.color}15`,
                        color: category.color,
                      }}
                    >
                      {category.count}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mb-4 text-2xl font-semibold text-[#1e3a5f]">
                    {category.name}
                  </h3>

                  {/* Colleges */}
                  <div className="flex flex-wrap gap-2">
                    {category.colleges.map((college) => (
                      <span
                        key={college}
                        className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-500 transition-all duration-200 hover:bg-slate-50"
                        style={{
                          borderColor: undefined,
                        }}
                      >
                        {college}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="mt-16 flex flex-col items-center justify-around gap-8 rounded-[2rem] bg-gradient-to-r from-blue-900 to-blue-800 p-8 md:flex-row md:p-10">
            {[
              { value: "150+", label: "Total Institutions" },
              { value: "6", label: "Disciplines" },
              { value: "50,000+", label: "Students Guided" },
              { value: "95%", label: "Success Rate" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <h4 className="font-poppins text-4xl font-bold text-amber-400 md:text-5xl">
                  {stat.value}
                </h4>

                <p className="mt-1 text-white/90">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
