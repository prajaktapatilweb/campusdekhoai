"use client";

import { useState } from "react";
import HeroContactForm from "@/components/Forms/HeroContactForm";

export default function HeroContactPopup({
  eventLocations,
}: {
  eventLocations: {
    label: string;
    value: string;
    id: string;
  }[];
}) {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 z-50 w-[95%] max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-950 to-blue-700 px-8 py-5 text-white">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-5 text-3xl font-light transition hover:scale-110"
          >
            ×
          </button>

          <h2 className="text-2xl font-bold md:text-3xl">
            🎓 Book Your Free Seminar Seat
          </h2>

          <p className="mt-2 text-sm text-blue-100 md:text-base">
            Register now for the upcoming Career Guidance Seminar in your cityto
            receive admission guidance from experts.
          </p>
        </div>

        {/* Form */}
        <div className="p-6 md:p-8">
          <HeroContactForm eventLocations={eventLocations} />
        </div>
      </div>
    </>
  );
}
