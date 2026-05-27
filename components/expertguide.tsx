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
import Image from "next/image";

interface ExpertCardProps {
  initials: string;
  img?: string;
  name: string;
  // designation: string;
  experience: string;
  achievement: string;
  highlight: string;
}

const experts: ExpertCardProps[] = [
  {
    initials: "RB",
    img: "/images/Ramdas_Biradar.jpeg",
    name: "Ramdas Biradar",
    // designation: "Outreach & Admission, PCU",
    achievement: "Outreach & Admission, PCU",
    experience:
      "Over 25+ years of core regulatory experience guiding Maharashtra State engineering admissions.",
    highlight: "",
  },
  {
    initials: "SR",
    img: "/images/Shekhar_Rahane.jpeg",
    name: " Dr.Shekhar Rahane",
    // designation: "Associate Professor & Dean",
    achievement: "Associate Professor & Dean",
    experience: "First Year B.Tech,I/C Admissions",
    highlight: "",
  },
  {
    initials: "AK",
    img: "/images/Pallavi_Ahire1.jpeg",

    name: "Dr. Pallavi Pankaj Ahire",
    // designation: "Associate Professor, Head- Computer Science & Engineering",
    achievement: "Associate Professor, Head- Computer Science & Engineering",
    experience: "21 Years of Experience",
    highlight: "",
  },
  {
    initials: "SP",
    img: "/images/Prasannata_Ramtirthe1.jpeg",

    name: "Dr. Prasannata Ramtirthe",
    // designation:"Assistant Professor of English, School of Law, Pimpri Chinchwad University, Pune",
    achievement:
      "Assistant Professor of English, School of Law, Pimpri Chinchwad University, Pune",
    experience:
      "Guides law aspirants on cracking interviews, mastering legal English, and building courtroom-ready communication skills for careers in litigation, judiciary & corporate law.",
    highlight: "",
  },
];

function ExpertCard({
  initials,
  img,
  name,
  // designation,
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
          {/* Avatar / Image */}
          {img ? (
            <div className="relative mb-4 h-15 w-15 overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
              <Image
                src={img}
                alt={name}
                fill
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-700 text-sm font-semibold text-white">
              {initials}
            </div>
          )}

          {/* Name */}
          <div>
            <h3 className="text-xl font-bold text-slate-800">{name}</h3>

            {/* <p className="text-sm font-medium text-blue-700">{designation}</p> */}
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
    <section id="mentors" className="bg-slate-50 py-20">
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
