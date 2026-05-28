"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  GraduationCap,
  BadgePercent,
  FileCheck,
  GitCompareArrows,
  Users,
  Building2,
  Landmark,
} from "lucide-react";
import HeadingAndSub from "./headingandsub";
import { headList3 } from "./constants/headindconst";

interface ServiceCard {
  title: string;
  image: string;
  description: string;
  points: string[];
}

const features = [
  {
    icon: Brain,
    title: "Career Counselling",
    description:
      "Expert guidance to help you discover the right career path based on your interests and aptitude.",
    color: "#3b82f6",
  },
  {
    icon: GraduationCap,
    title: "Admission Guidance",
    description:
      "Step-by-step support through the entire college admission process from application to enrollment.",
    color: "#10b981",
  },
  {
    icon: BadgePercent,
    title: "Scholarship Assistance",
    description:
      "Information about various scholarships and financial aid options to fund your education.",
    color: "#f59e0b",
  },
  {
    icon: FileCheck,
    title: "CAP Round Guidance",
    description:
      "Complete assistance for centralized admission process rounds and seat allotment procedures.",
    color: "#ef4444",
  },
  {
    icon: GitCompareArrows,
    title: "College Comparison",
    description:
      "Detailed comparison of colleges based on rankings, placements, infrastructure, and more.",
    color: "#8b5cf6",
  },
  {
    icon: Users,
    title: "Expert Mentorship",
    description:
      "Connect with industry experts and alumni for personalized career advice and mentorship.",
    color: "#06b6d4",
  },
  {
    icon: Building2,
    title: "Hostel Guidance",
    description:
      "Information about accommodation options, hostel facilities, and living arrangements.",
    color: "#ec4899",
  },
  {
    icon: Landmark,
    title: "Education Loan Support",
    description:
      "Guidance on education loans, documentation, and connecting with banking partners.",
    color: "#14b8a6",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative scroll-mt-24 overflow-hidden bg-[hsl(var(--card))] py-15 md:py-15"
    >
      {/* Background accents */}
      <div className="absolute top-1/4 left-0 h-96 w-96 rounded-full bg-[hsl(var(--primary))]/3 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-[hsl(var(--primary))]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header */}

        <HeadingAndSub data={headList3} />

        {/* <p className="mx-auto mt-4 max-w-2xl text-[hsl(var(--muted-foreground))]">
            Comprehensive IT solutions tailored to meet the demands of modern
            businesses. From rentals to infrastructure, we{"'"}ve got you covered.
          </p> */}

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10 flex flex-wrap items-center justify-center gap-3"
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <div className="group h-full cursor-pointer rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  {/* Icon */}
                  <div
                    className="feature-icon mb-5 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${feature.color}15`,
                    }}
                  >
                    <feature.icon
                      className="h-8 w-8 transition-all duration-300 group-hover:text-white"
                      style={{
                        color: feature.color,
                      }}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-xl font-semibold text-[#1e3a5f]">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-7 text-slate-500">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
