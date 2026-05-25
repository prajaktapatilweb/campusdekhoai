"use client";

import { motion } from "framer-motion";
import {
  Award,
  GraduationCap,
  BadgeCheck,
  BriefcaseBusiness,
  User,
} from "lucide-react";
import { headList7 } from "./constants/headindconst";
import HeadingAndSub from "./headingandsub";

interface ExpertCardProps {
  initials: string;
  name: string;
  designation: string;
  experience: string;
  achievement: string;
  highlight: string;
}

const experts: ExpertCardProps[] = [
  {
    initials: "MK",
    name: "Dr. Milind Kulkarni",
    designation: "Chief Admission Architect, CampusDekho.AI",
    achievement: "Former Directorate of Technical Education Panelist",
    experience:
      "Over 25+ years of core regulatory experience guiding Maharashtra State engineering admissions.",
    highlight:
      "Helping students and parents navigate admissions with trusted expertise.",
  },
  {
    initials: "PS",
    name: "Dr. Priya Sharma",
    designation: "Senior Career Counsellor",
    achievement: "Worked with top CET & NEET counselling boards",
    experience:
      "18+ years of experience mentoring students for engineering and medical admissions.",
    highlight:
      "Focused on helping students discover the right career pathways.",
  },
  {
    initials: "RJ",
    name: "Prof. Rahul Joshi",
    designation: "Admission Strategy Advisor",
    achievement: "Former CAP Round Consultant",
    experience:
      "20+ years of expertise in Maharashtra CAP rounds and counselling systems.",
    highlight:
      "Guiding families with accurate admission planning and college selection.",
  },
  {
    initials: "AP",
    name: "Dr. Anita Patil",
    designation: "Scholarship & Abroad Consultant",
    achievement: "International Education Guidance Specialist",
    experience:
      "15+ years assisting students with scholarships and global opportunities.",
    highlight:
      "Helping ambitious students unlock funding and international careers.",
  },
];

function ExpertCard({
  initials,
  name,
  designation,
  achievement,
  experience,
  highlight,
}: ExpertCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      {/* Glow */}
      <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-blue-100 blur-3xl transition-all duration-500 group-hover:bg-blue-200" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4">
          {/* Avatar */}

          {/* Avatar */}
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-700 text-sm font-semibold text-white">
            {initials}
          </div>

          {/* Name */}
          <div>
            <h3 className="text-xl font-bold text-slate-800">{name}</h3>

            <p className="text-sm font-medium text-blue-700">{designation}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-5 h-px bg-gradient-to-r from-blue-100 via-slate-200 to-transparent" />

        {/* Details */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="mt-1 rounded-lg bg-blue-50 p-2 text-blue-700">
              <GraduationCap size={18} />
            </div>

            <p className="text-sm leading-relaxed text-slate-600">
              {achievement}
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-1 rounded-lg bg-amber-50 p-2 text-amber-600">
              <BriefcaseBusiness size={18} />
            </div>

            <p className="text-sm leading-relaxed text-slate-600">
              {experience}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ExpertGuidesSection() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <HeadingAndSub data={headList7} />
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {experts.map((expert) => (
            <ExpertCard key={expert.name} {...expert} />
          ))}
        </div>
      </div>
    </section>
  );
}
