"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Languages, CalendarDays, Compass } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

export default function MobileAndDesktopNav() {
  const { language, setLanguage } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // Simple UI translations dictionary
  const t = {
    en: { event: "Events", tour: "Campus Tour" },
    mr: { event: "कार्यक्रम", tour: "कॅम्पस टूर" },
  }[language] || { event: "Events", tour: "Campus Tour" };

  // Close language menu when clicking outside (Desktop UX)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="/* Mobile Screen: Fixed Bottom App Bar */ /* Big Screen: Bottom-Right Compact Icon Stack */ fixed right-0 bottom-0 left-0 z-[9999] flex w-full flex-row items-end justify-around border-t border-white/10 px-2 py-2 pb-[calc(env(safe-area-inset-bottom)+6px)] shadow-[0_-10px_30px_rgba(0,0,0,0.3)] backdrop-blur-xl md:top-auto md:right-0 md:bottom-6 md:left-auto md:w-auto md:flex-col md:items-end md:gap-4 md:border-none md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none"
    >
      {/* 1. Event Selection Option */}
      <Link
        href="#events"
        className="group flex w-24 flex-col items-center justify-center gap-0.5 py-1 text-white/80 transition-all hover:text-white md:w-auto md:flex-row-reverse md:gap-0 md:p-0"
      >
        <div className="rounded-full border border-white/10 bg-[#fdc700] p-3 shadow-lg backdrop-blur-md transition-all md:rounded-l-full md:rounded-r-none md:group-hover:bg-[hsl(var(--primary))] md:group-hover:text-black">
          <CalendarDays
            size={20}
            className="text-[hsl(var(--primary))] md:group-hover:text-black"
          />
        </div>
        <span className="text-center text-[10px] font-medium tracking-wide md:pointer-events-none md:mr-2 md:translate-x-2 md:rounded-lg md:border md:border-white/10 md:bg-black/80 md:px-3 md:py-1.5 md:text-sm md:text-white md:opacity-0 md:backdrop-blur-md md:transition-all md:duration-300 md:group-hover:translate-x-0 md:group-hover:opacity-100">
          {t.event}
        </span>
      </Link>

      {/* 2. Campus Tour Option */}
      <Link
        href="#mentors"
        className="group flex w-24 flex-col items-center justify-center gap-0.5 py-1 text-white/80 transition-all hover:text-white md:w-auto md:flex-row-reverse md:gap-0 md:p-0"
      >
        <div className="rounded-full border border-white/10 bg-[#fdc700] p-3 shadow-lg backdrop-blur-md transition-all md:rounded-l-full md:rounded-r-none md:group-hover:bg-[hsl(var(--primary))] md:group-hover:text-black">
          <Compass
            size={20}
            className="text-[hsl(var(--primary))] md:group-hover:text-black"
          />
        </div>
        <span className="text-center text-[10px] font-medium tracking-wide md:pointer-events-none md:mr-2 md:translate-x-2 md:rounded-lg md:border md:border-white/10 md:bg-black/80 md:px-3 md:py-1.5 md:text-sm md:text-white md:opacity-0 md:backdrop-blur-md md:transition-all md:duration-300 md:group-hover:translate-x-0 md:group-hover:opacity-100">
          {t.tour}
        </span>
      </Link>

      {/* 3. Language Selection Option */}
      <div
        ref={langRef}
        className="flex w-24 flex-col items-center justify-center gap-0.5 py-1 md:relative md:w-auto md:flex-row-reverse md:gap-0 md:p-0"
      >
        {/* Language Icon Wrapper */}
        <button
          onClick={() => setIsLangOpen(!isLangOpen)}
          className="/* Mobile Layout: Styled exactly like the other two tabs */ /* Big Screen Override: Rounded only on the left side */ mb-0.5 rounded-full border border-white/10 bg-[#fdc700] p-3 text-black shadow-lg backdrop-blur-md transition-all outline-none md:mb-0 md:rounded-t-none md:rounded-l-full md:rounded-r-none md:p-3"
        >
          <Languages
            size={18}
            className="text-[hsl(var(--primary))] md:text-black"
          />
        </button>

        {/* Language Toggle Options Block */}
        <div
          className={`/* Mobile Layout: Always under the icon */ /* Big Screen Layout: Becomes a floating tray toggled via state */ visible block flex items-center overflow-hidden rounded-full border border-white/15 bg-white/5 md:absolute md:right-16 md:border md:border-white/10 md:bg-black/90 md:p-1 md:backdrop-blur-md md:transition-all md:duration-300 ${
            isLangOpen
              ? "md:pointer-events-auto md:translate-x-0 md:opacity-100"
              : "md:pointer-events-none md:translate-x-2 md:opacity-0"
          } `}
        >
          {/* English Button */}
          <button
            onClick={() => {
              setLanguage("en");
              setIsLangOpen(false); // Close on selection
            }}
            className={`rounded-full px-2.5 py-1 text-[10px] font-bold transition-all duration-300 md:px-4 md:py-1.5 md:text-xs ${
              language === "en"
                ? "bg-[hsl(var(--primary))] text-black shadow-sm"
                : "text-white/70 hover:bg-white/10"
            } `}
          >
            EN
          </button>

          {/* Marathi Button */}
          <button
            onClick={() => {
              setLanguage("mr");
              setIsLangOpen(false); // Close on selection
            }}
            className={`rounded-full px-2.5 py-1 text-[10px] font-bold transition-all duration-300 md:px-4 md:py-1.5 md:text-xs ${
              language === "mr"
                ? "bg-[hsl(var(--primary))] text-black shadow-sm"
                : "text-white/70 hover:bg-white/10"
            } `}
          >
            मराठी
          </button>
        </div>
      </div>
    </motion.div>
  );
}
