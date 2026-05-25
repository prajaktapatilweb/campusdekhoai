"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import { ArrowLeft, ArrowRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import HeadingAndSub from "./headingandsub";
import { headList4 } from "./constants/headindconst";

const galleryImages = [
  {
    src: "/images/gallery-1.jpg",
    title: "Campus Life",
    description: "Experience the vibrant campus atmosphere",
  },
  {
    src: "/images/gallery-2.jpg",
    title: "Education Fair",
    description: "Students exploring college options",
  },
  {
    src: "/images/gallery-3.jpg",
    title: "Expert Sessions",
    description: "Interactive workshops and seminars",
  },
  {
    src: "/images/gallery-4.jpg",
    title: "Success Stories",
    description: "Celebrating student achievements",
  },
  {
    src: "/images/hero-bg.jpg",
    title: "Graduation Day",
    description: "Dreams turning into reality",
  },
  {
    src: "/images/about-counselling.jpg",
    title: "Counselling Sessions",
    description: "One-on-one expert guidance",
  },
];

export default function Gallery() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section
      id="gallery"
      className="overflow-hidden py-15 md:py-15"
      style={{ backgroundColor: "rgb(2, 11, 45)" }}
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <HeadingAndSub data={headList4} />
        </motion.div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Navigation, Autoplay, EffectCoverflow]}
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView={1}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 2.5,
              },
            }}
            loop
            className="py-5 pb-10"
          >
            {galleryImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="group relative h-[280px] overflow-hidden rounded-3xl shadow-2xl md:h-[420px]">
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/10 to-transparent" />

                  {/* Content */}
                  <div className="absolute right-0 bottom-0 left-0 p-6 transition-all duration-300 md:translate-y-6 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                    <h3 className="mb-1 text-xl font-semibold text-white">
                      {image.title}
                    </h3>

                    <p className="text-sm text-white/80">{image.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <div className="mt-8 hidden items-center justify-center gap-4 md:flex">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-yellow-400 hover:text-[#1e3a5f]"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-yellow-400 hover:text-[#1e3a5f]"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
