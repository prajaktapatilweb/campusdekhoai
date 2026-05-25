"use client";

import { motion, AnimatePresence } from "framer-motion";
import React from "react";

interface Props {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
}

export default function AppModal({
  open,
  title,
  onClose,
  children,
  maxWidth = "max-w-2xl",
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* DIALOG */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 180,
              duration: 0.6,
            }}
            className={`fixed top-1/2 left-1/2 z-50 max-h-[90vh] w-[95%] ${maxWidth} -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl bg-white shadow-2xl`}
          >
            {/* HEADER */}
            <div className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-r from-[#071428] via-[#0b1f3a] to-[#071428] px-6 py-5 md:px-10">
              <div className="absolute top-0 left-0 h-full w-40 bg-cyan-500/10 blur-3xl" />

              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white">{title}</h2>
              </div>

              {/* CLOSE BUTTON */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-red-500"
              >
                ✕
              </button>
            </div>

            {/* CONTENT */}
            <div className="max-h-[calc(90vh-110px)] overflow-y-auto p-6">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
