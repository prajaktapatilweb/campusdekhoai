"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import {
  GraduationCap,
  BriefcaseBusiness,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { headList7 } from "./constants/headindconst";
import HeadingAndSub from "./headingandsub";

interface ExpertCardProps {
  initials: string;
  img?: string;
  name: string;
  experience: string;
  achievement: string;
  highlight: string;
}

const experts: ExpertCardProps[] = [
  {
    initials: "RB",
    img: "/images/Ramdas_Biradar.jpeg",
    name: "Ramdas Biradar",
    achievement: "Outreach & Admission, PCU",
    experience:
      "Over 25+ years of core regulatory experience guiding Maharashtra State engineering admissions.",
    highlight: "",
  },
  {
    initials: "SR",
    img: "/images/Shekhar_Rahane.jpeg",
    name: "Dr. Shekhar Rahane",
    achievement: "Associate Professor & Dean",
    experience: "First Year B.Tech,I/C Admissions",
    highlight: "",
  },
  {
    initials: "AK",
    img: "/images/Pallavi_Ahire1.jpeg",
    name: "Dr. Pallavi Pankaj Ahire",
    achievement: "Associate Professor, Head- Computer Science & Engineering",
    experience: "21 Years of Experience",
    highlight: "",
  },
  {
    initials: "SP",
    img: "/images/Prasannata_Ramtirthe1.jpeg",
    name: "Dr. Prasannata Ramtirthe",
    achievement:
      "Assistant Professor of English, School of Law, Pimpri Chinchwad University, Pune",
    experience:
      "Guides law aspirants on cracking interviews, mastering legal English, and building courtroom-ready communication skills.",
    highlight: "",
  },
  {
    initials: "MS",
    img: "/images/Mohit_shevkar1.jpg",
    name: "Mohit Baban Shevkar",
    achievement: "Assistant professor at PCU, MCA department",
    experience: "Guides Information Technology students.",
    highlight: "",
  },
  {
    initials: "YL",
    img: "/images/Yuvraj_Lahoti.jpeg",
    name: "Dr. Yuvraj Lahoti",
    achievement: "Director and Dean Vishwakarma University, Pune",
    experience:
      "Ph.D. in Commerce & Management with 18 years of academic leadership experience, progressing from Lecturer to Director of and Dean at VIT, Pune.",
    highlight: "",
  },
  {
    initials: "AA",
    img: "/images/Avdhut_Atre.jpeg",
    name: "Prof. Dr. Avadhut Atre",
    achievement: "Director – Infrastructure and Campus Management ",
    experience: "Faculty of Art & Design at VIT, Pune.",
    highlight: "",
  },
  {
    initials: "RB",
    img: "/images/Radhakrishna_Batule.jpeg",
    name: "Prof. Dr. Radhakrishna Bhaskar Batule",
    achievement: "Head, Department of Management Vishwakarma University, Pune ",
    experience: "Faculty of Commerce & Management at VIT, Pune.",
    highlight: "",
  },
  {
    initials: "MP",
    img: "/images/Makarand_Puri.jpeg",
    name: "Prof. Dr. Makarand Puri",
    achievement: "Director- Admissions, Vishwakarma University, Pune",
    experience: "Faculty of Pharmacy at VIT, Pune.",
    highlight: "",
  },
  {
    initials: "UP",
    img: "/images/Umesh_Patwardhan.jpeg",
    name: "Prof. Dr. Umesh Patwardhan",
    achievement: "Dean, Management Studies, Vishwakarma University, Pune.",
    experience: "Faculty of Commerce & Management at VIT, Pune.",
    highlight: "",
  },
  {
    initials: "SJ",
    img: "/images/Saachi_Jain.jpeg",
    name: "Prof. Saachi Jain",
    achievement:
      "Head- Department of Architecture,Deputy Director-Admissions, Vishwakarma University, Pune.",
    experience: "Department of Architecture at VIT, Pune.",
    highlight: "",
  },
];

function ExpertCard({
  initials,
  img,
  name,
  achievement,
  experience,
}: ExpertCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative flex h-[100%] min-h-[570px] flex-col overflow-hidden rounded-[2rem] border border-white/20 bg-white/90 shadow-[0_10px_40px_rgba(0,0,0,0.08)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(24,103,172,0.18)]"
    >
      {/* Glow */}
      <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-blue-200/40 blur-3xl transition-all duration-500 group-hover:bg-blue-300/50" />

      <div className="relative z-10">
        {/* Image */}
        <div className="relative h-72 w-full overflow-hidden rounded-t-[2rem]">
          {img ? (
            <>
              <Image
                src={img}
                alt={name}
                fill
                className="object-cover object-top transition duration-700 group-hover:scale-105"
                priority
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-blue-700 text-2xl font-bold text-white">
              {initials}
            </div>
          )}
        </div>

        {/* Name */}
        <div className="bg-gradient-to-r from-blue-950 to-blue-800 px-5 py-4 text-center">
          <h3 className="text-xl font-bold text-white">{name}</h3>
        </div>

        {/* Content */}
        <div className="space-y-5 p-5">
          {/* Achievement */}
          <div className="flex items-start gap-3">
            <div className="mt-1 rounded-xl bg-blue-50 p-2 text-blue-700">
              <GraduationCap size={18} />
            </div>

            <p className="text-sm leading-relaxed text-slate-600">
              {achievement}
            </p>
          </div>

          {/* Experience */}
          <div className="flex items-start gap-3">
            <div className="mt-1 rounded-xl bg-amber-50 p-2 text-amber-600">
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
    <section
      id="mentors"
      className="relative overflow-hidden bg-[#eaf2fb] py-16"
    >
      {/* Background Blur */}
      {/* <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" /> */}
      {/* <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-cyan-100/40 blur-3xl" /> */}

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        {/* Heading */}
        <HeadingAndSub data={headList7} />

        {/* Slider */}
        <div className="relative mt-7">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={24}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={{
              nextEl: ".mentor-next",
              prevEl: ".mentor-prev",
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 1.2,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
            className="!pb-14"
          >
            {experts.map((expert) => (
              <SwiperSlide key={expert.name} className="h-full">
                <ExpertCard {...expert} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Previous Button */}
          <button className="mentor-prev absolute right-[32px] bottom-[-40px] z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-blue-100 bg-white shadow-xl transition-all duration-300 hover:scale-110 hover:bg-blue-700 hover:text-white">
            <ArrowLeft size={20} />
          </button>

          {/* Next Button */}
          <button className="mentor-next absolute right-[-10px] bottom-[-40px] z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-blue-100 bg-white shadow-xl transition-all duration-300 hover:scale-110 hover:bg-blue-700 hover:text-white">
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
