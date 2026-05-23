"use client";

import { motion } from "motion/react";
import { Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="
        fixed
        right-4
        bottom-6
        z-[9999]
      "
    >
      <div
        className="
          flex items-center overflow-hidden
          rounded-full
          border border-white/10
          bg-black/70
          backdrop-blur-xl
          shadow-2xl
        "
      >
        {/* Icon */}
        <div className="px-3 text-white/70">
          <Languages size={18} />
        </div>

        {/* English */}
        <button
          onClick={() => setLanguage("en")}
          className={`
            px-4 py-2 text-sm font-medium
            transition-all duration-300

            ${
              language === "en"
                ? "bg-[hsl(var(--primary))] text-black"
                : "text-white/80 hover:bg-white/10"
            }
          `}
        >
          English
        </button>

        {/* Marathi */}
        <button
          onClick={() => setLanguage("mr")}
          className={`
            px-4 py-2 text-sm font-medium
            transition-all duration-300

            ${
              language === "mr"
                ? "bg-[hsl(var(--primary))] text-black"
                : "text-white/80 hover:bg-white/10"
            }
          `}
        >
          मराठी
        </button>
      </div>
    </motion.div>
  );
}