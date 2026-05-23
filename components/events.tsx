"use client";

import { motion, AnimatePresence } from "framer-motion";
import NewContactForm from "./newContactForm";
import { useState } from "react";

const events = [
  {
    id: 1,
    date: "23 MAY",
    city: "Kolhapur",
    venue: "Swami Vivekanand Hall",
    time: "10:00 AM",
    seats: 42,
    status: "FAST",
    selected: true,
  },
  {
    id: 2,
    date: "25 MAY",
    city: "Pune",
    venue: "Bal Gandharva Hall",
    time: "11:30 AM",
    seats: 28,
    status: "HOT",
    selected: false,
  },
  {
    id: 3,
    date: "28 MAY",
    city: "Mumbai",
    venue: "Nesco Center",
    time: "02:00 PM",
    seats: 15,
    status: "LIMITED",
    selected: false,
  },
  {
    id: 4,
    date: "28 MAY",
    city: "Satara",
    venue: "Nesco Center",
    time: "02:00 PM",
    seats: 15,
    status: "LIMITED",
    selected: false,
  },
  {
    id: 5,
    date: "28 MAY",
    city: "Sangali",
    venue: "Nesco Center",
    time: "02:00 PM",
    seats: 15,
    status: "LIMITED",
    selected: false,
  },
  {
    id: 6,
    date: "28 MAY",
    city: "Chatrapati Sambhajinagar",
    venue: "Nesco Center",
    time: "02:00 PM",
    seats: 15,
    status: "LIMITED",
    selected: false,
  },
];

export default function EventCards() {
  const [selectedEvent, setSelectedEvent] = useState<null | (typeof events)[0]>(
    null,
  );
  return (
    <>
      <section className="bg-[#020b2d] px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-white/70 bg-[hsl(var(--primary))]/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-white/80 uppercase">
            Select Your City
          </span>
          <h2 className="font-serif text-2xl font-bold text-white/90 md:text-4xl">
            Choose your nearest event location and register for free
          </h2>
        </motion.div>
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{
                opacity: 0,
                y: 80,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              onClick={() => setSelectedEvent(event)}
              className="relative cursor-pointer overflow-hidden rounded-3xl border border-cyan-400 bg-[#061547] p-6 shadow-[0_0_25px_rgba(0,200,255,0.15)] transition-all duration-300"
            >
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/10" />

              {/* Top */}
              <div className="relative z-10 mb-6 flex items-start justify-between">
                <p className="text-sm font-bold tracking-widest text-cyan-400">
                  {event.date}
                </p>

                <span className="rounded-lg bg-pink-500/20 px-3 py-1 text-xs font-semibold text-pink-300">
                  {event.status}
                </span>
              </div>

              {/* City */}
              <h3 className="relative z-10 text-3xl font-bold text-white">
                {event.city}
              </h3>

              {/* Venue */}
              <p className="relative z-10 mt-2 text-sm text-slate-300">
                {event.venue}
              </p>

              {/* Time */}
              <p className="relative z-10 mt-1 text-sm text-cyan-300">
                {event.time}
              </p>

              {/* Divider */}
              <div className="relative z-10 my-6 h-px bg-white/10" />

              {/* Bottom */}
              <div className="relative z-10 flex items-center justify-between">
                <p className="text-sm tracking-wide text-slate-400">
                  {event.seats} seats left
                </p>

                <span className="rounded-lg border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-lg font-semibold text-white/80">
                  Register
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* POPUP */}
      <AnimatePresence>
        {selectedEvent && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            />

            {/* MODAL */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 60 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 60 }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 180,
                duration: 0.6,
              }}
              className="fixed top-1/2 left-1/2 z-50 max-h-[90vh] w-[95%] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto"
            >
              <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white shadow-[0_0_60px_rgba(0,255,255,0.10)] backdrop-blur-2xl">
                {/* Glow Effects */}
                <div className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-r from-[#071428] via-[#0b1f3a] to-[#071428] px-6 py-5 md:px-10">
                  {/* Glow */}
                  <div className="absolute top-0 left-0 h-full w-40 bg-cyan-500/10 blur-3xl" />
                  {/* TOP EVENT BAR */}

                  <div className="relative z-10 flex flex-wrap items-center gap-4">
                    {/* City */}
                    <div>
                      <h2 className="text-3xl font-bold text-white">
                        {selectedEvent.city}
                      </h2>

                      <p className="mt-1 text-sm text-slate-400">
                        {selectedEvent.venue}
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="hidden h-10 w-px bg-white/10 md:block" />

                    {/* Pills */}
                    <div className="flex flex-wrap gap-3">
                      <span className="rounded-full border border-cyan-400/10 bg-cyan-500/10 px-4 py-1.5 text-sm text-cyan-200 backdrop-blur-md">
                        📅 {selectedEvent.date}
                      </span>

                      <span className="rounded-full border border-cyan-400/10 bg-cyan-500/10 px-4 py-1.5 text-sm text-cyan-200 backdrop-blur-md">
                        ⏰ {selectedEvent.time}
                      </span>

                      <span className="rounded-full border border-pink-400/10 bg-pink-500/10 px-4 py-1.5 text-sm text-pink-200">
                        {selectedEvent.seats} Seats Left
                      </span>
                    </div>
                  </div>

                  {/* CLOSE BUTTON */}
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="absolute top-5 right-5 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-red-500"
                  >
                    ✕
                  </button>
                </div>

                {/* FORM */}
                <div className="relative z-10 max-h-[70vh] overflow-y-auto">
                  <NewContactForm selectedEvent={selectedEvent} />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
