"use client";

import React from "react";
import Image from "next/image";
import { Phone } from "lucide-react";
import { mobilenumber1 } from "@/components/constants/contactconst";

const AppThemeSetting: React.FC = () => {
  return (
    <div className="fixed right-0 bottom-[50px] z-[1110] flex flex-col items-end gap-3 xl:bottom-[125px]">
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${mobilenumber1}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group h-[50px] w-[50px] overflow-hidden rounded-l-full shadow-lg transition-all duration-300 hover:scale-105"
      >
        <Image
          src="/images/whatsapp.webp"
          alt="WhatsApp"
          width={50}
          height={50}
          className="h-full w-full object-cover"
        />
      </a>

      {/* Call Button */}
      {/* <a
        href={`tel:${contactno2}`}
        className="group flex items-center justify-center 
                   bg-orange-500 hover:bg-orange-700 
                   w-[50px] h-[50px] 
                   rounded-l-full 
                   shadow-lg transition-all duration-300"
      >
        <Phone className="text-white w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
      </a> */}
    </div>
  );
};

export default AppThemeSetting;
