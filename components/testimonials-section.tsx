"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import HeadingAndSub from "./headingandsub";
import { headList5 } from "./constants/headindconst";

const testimonials = [
  {
    name: "Priya Sharma",
    course: "B.Tech CSE",
    college: "IIT Bombay",
    rating: 5,
    review:
      "The counselling session was incredibly helpful! I was confused between multiple engineering branches, but the experts helped me understand my strengths and guided me towards Computer Science.",
    avatar: "PS",
  },
  {
    name: "Rahul Verma",
    course: "MBBS",
    college: "AIIMS Delhi",
    rating: 5,
    review:
      "The scholarship guidance helped my family understand the financial options available. Now studying at AIIMS Delhi with a full scholarship!",
    avatar: "RV",
  },
  {
    name: "Ananya Patel",
    course: "MBA",
    college: "IIM Ahmedabad",
    rating: 5,
    review:
      "The CAP round guidance was a lifesaver! The counsellors explained every step of the admission process clearly.",
    avatar: "AP",
  },
  {
    name: "Karthik Reddy",
    course: "B.Arch",
    college: "SPA Delhi",
    rating: 4,
    review:
      "The college comparison feature helped me shortlist the best architecture schools. The portfolio review session was extremely valuable.",
    avatar: "KR",
  },
  {
    name: "Sneha Gupta",
    course: "B.Pharm",
    college: "NIPER Mohali",
    rating: 5,
    review:
      "The education loan guidance was exceptional. Without this support, pursuing my pharmacy dream would have been difficult.",
    avatar: "SG",
  },
  {
    name: "Arjun Singh",
    course: "LLB",
    college: "NLSIU Bangalore",
    rating: 5,
    review:
      "The mentorship program connected me with a practicing lawyer who guided me through CLAT preparation.",
    avatar: "AS",
  },
];

export default function Testimonials() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section
      id="testimonials"
      className="bg-gradient-to-b from-slate-50 to-white py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <HeadingAndSub data={headList5} />
        </motion.div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative">
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Navigation, Autoplay, Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                bulletClass: "swiper-pagination-bullet testimonial-bullet",
                bulletActiveClass:
                  "swiper-pagination-bullet-active testimonial-bullet-active",
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="pt-5 pb-16"
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <div className="h-full rounded-[2rem] border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                    {/* User */}
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-700 text-sm font-semibold text-white">
                        {testimonial.avatar}
                      </div>

                      {/* Info */}
                      <div>
                        <h3 className="font-semibold text-[#1e3a5f]">
                          {testimonial.name}
                        </h3>

                        <p className="text-sm text-slate-500">
                          {testimonial.course} | {testimonial.college}
                        </p>
                      </div>
                    </div>

                    {/* Quote */}
                    <Quote size={40} className="my-3 text-blue-700/20" />

                    {/* Rating */}
                    <div className="mb-3 flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className="fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>

                    {/* Review */}
                    <p className="min-h-[140px] text-[15px] leading-7 text-slate-600">
                      "{testimonial.review}"
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation */}
            <div className="pointer-events-none absolute top-[40%] right-[-20px] left-[-20px] z-10 hidden justify-between md:flex">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 hover:bg-blue-700 hover:text-white"
              >
                <ArrowLeft size={20} />
              </button>

              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 hover:bg-blue-700 hover:text-white"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Pagination Styles */}
      <style jsx global>{`
        .testimonial-bullet {
          width: 10px;
          height: 10px;
          background: #cbd5e1;
          opacity: 1;
        }

        .testimonial-bullet-active {
          width: 30px;
          border-radius: 999px;
          background: #1d4ed8;
        }
      `}</style>
    </section>
  );
}
