"use client";

import React, { useState } from "react";
import Image from "next/image";
import Slider, { Settings } from "react-slick";
// import { headList2 } from "../constants/titlefile";

// Define TypeScript interface for data structure
interface ServiceItem {
  img: string;
  title: string;
  para: string;
}

export default function SliderComponent() {
  const DetailObject: ServiceItem[] = [
    {
      img: "/images/univercity/dyp.webp",
      title: "Roundtrip Cabs",
      para: "Agile coaching helps individuals, teams, and organizations adopt Agile methodologies.",
    },
    {
      img: "/images//univercity/pcet.webp",
      title: "Oneway Drops",
      para: "Scrum Master coaching facilitates the adoption of Scrum principles.",
    },
    {
      img: "/images//univercity/vu.webp",
      title: "Local Rentals",
      para: "Life coaching helps individuals achieve their personal and professional goals.",
    },
  ];

  const [activeSlide, setActiveSlide] = useState<number>(0);

  // Strongly typed react-slick settings
  const settings: Settings = {
    className: "center",
    autoplay: true,
    centerMode: true,
    infinite: true,
    centerPadding: "5px",
    slidesToShow: 3,
    speed: 500,
    dots: true,
    arrows: false,
    // Custom dots styling matching your previous MUI StyledDots implementation
    appendDots: (dots: React.ReactNode) => (
      <ul className="slick-dots relative !m-0 !p-0 text-center">{dots}</ul>
    ),
    customPaging: (i: number) => (
      <div
        className={`inline-block h-3.5 w-3.5 rounded-full transition-colors duration-300 ${
          i === activeSlide ? "bg-primary" : "bg-gray-300"
        }`}
      />
    ),
    focusOnSelect: true,
    beforeChange: (current: number, next: number) => setActiveSlide(next),
  };

  return (
    <section id="services">
      <div className="py-[50px]">
        {/* <Heading data={headList2} /> */}

        {/* Container */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="slider-container">
            <Slider {...settings}>
              {DetailObject.map((item, i) => (
                <div key={i} className="p-2">
                  {/* Card Wrapper */}
                  <div
                    style={{
                      transform:
                        i === activeSlide ? "scale(1.1)" : "scale(0.85)",
                    }}
                    className="mt-3 mb-5 flex h-full flex-col items-center justify-center rounded-[10px] bg-white shadow-[0_5px_15px_rgba(0,0,0,0.35)] transition-transform duration-500 ease-in-out"
                  >
                    {/* Image Container */}
                    <div className="relative h-[250px] w-full">
                      <Image
                        src={item.img}
                        fill
                        className="rounded-t-[10px] object-cover"
                        quality={100}
                        alt="car services"
                      />
                    </div>

                    {/* Title & Description */}
                    <div className="px-6 pt-4 pb-8 text-center">
                      <h5 className="paras mb-2 text-xl font-medium text-gray-900">
                        {item.title}
                      </h5>
                      <p className="text-sm text-black">{item.para}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}
