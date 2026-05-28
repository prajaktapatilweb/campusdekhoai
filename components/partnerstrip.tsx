"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

export default function Partnerstrip() {
  const Details = [
    {
      icons: "/images/univercity/dyp.webp",
      title: "Dr. D. Y. Patil University",
    },
    { icons: "/images/univercity/vu.jpg", title: "Vishwakarma University" },
    {
      icons: "/images/univercity/pcet.jpg",
      title: "Pimpri Chinchwad Education Trust",
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
    <div className="relative z-[1] w-full">
      {/* Background Section */}
      <div className="mt-[-20px] w-full bg-[hsl(var(--primary))] py-4 sm:py-5 md:py-5">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-12 gap-0">
            {Details.map((item, i) => (
              <div
                key={i}
                className="col-span-12 flex pb-2 sm:col-span-6 md:col-span-4"
              >
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="w-full"
                >
                  <div className="flex px-4 sm:px-2 md:px-1">
                    {/* ICON CIRCLE */}
                    <div className="mr-2 flex h-[100px] w-[100px] items-center justify-center rounded-full bg-white">
                      <Image
                        src={item.icons}
                        alt="icon"
                        width={75}
                        height={75}
                        className="p-0.5"
                      />
                    </div>

                    {/* TEXT */}
                    <div className="flex flex-1 items-center">
                      <div className="mr-1 w-full overflow-hidden">
                        <div className="font-medium text-white">
                          {item.title}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
