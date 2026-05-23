"use client";

import { motion, AnimatePresence  } from "framer-motion";
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
      const [selectedEvent, setSelectedEvent] = useState<
    null | (typeof events)[0]
  >(null);
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
          <span className="mb-4 inline-block rounded-full border border-white/70 bg-[hsl(var(--primary))]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/80">
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
              className="
                relative cursor-pointer overflow-hidden
                rounded-3xl border border-cyan-400
                bg-[#061547]
                p-6
                shadow-[0_0_25px_rgba(0,200,255,0.15)]
                transition-all duration-300
              "
            >
              {/* Glow */}
              <div
                className="
                  absolute inset-0
                  bg-gradient-to-br
                  from-cyan-500/5
                  via-transparent
                  to-blue-500/10
                "
              />

              {/* Top */}
              <div className="relative z-10 mb-6 flex items-start justify-between">
                <p className="text-sm font-bold tracking-widest text-cyan-400">
                  {event.date}
                </p>

                <span
                  className="
                    rounded-lg
                    bg-pink-500/20
                    px-3 py-1
                    text-xs font-semibold
                    text-pink-300
                  "
                >
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

                <span className="text-lg font-semibold text-white/80 px-3 py-1 rounded-lg border border-cyan-400/20 bg-cyan-500/10">
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
              className="
                fixed inset-0 z-50
                bg-black/70
                backdrop-blur-sm
              "
            />

            {/* MODAL */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
                y: 40,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
                y: 40,
              }}
              transition={{
                duration: 0.3,
              }}
              className="
                fixed left-1/2 top-1/2 z-50
                w-[95%] max-w-3xl
                -translate-x-1/2 -translate-y-1/2
              "
            >
              <div
                className="
                  relative overflow-y-auto
                //   rounded-3xl
                //   border border-cyan-400/20
                //   bg-[#07143d]
                //   p-4 md:p-8
                  shadow-[0_0_60px_rgba(0,200,255,0.2)]
                  max-h-[90vh]
                "
              >
                {/* CLOSE BUTTON */}
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="
                    absolute right-4 top-4
                    flex h-10 w-10 items-center justify-center
                    rounded-full
                    bg-white/10
                    text-white
                    transition-all
                    hover:bg-red-500
                  "
                >
                  ✕
                </button>

                {/* EVENT INFO */}
                {/* <div className="mb-6 border-b border-white/10 pb-4">
                  <p className="text-sm tracking-widest text-cyan-400">
                    {selectedEvent.date}
                  </p>

                  <h2 className="mt-2 text-4xl font-bold text-white">
                    {selectedEvent.city}
                  </h2>

                  <p className="mt-2 text-slate-300">
                    {selectedEvent.venue}
                  </p>

                  <p className="text-cyan-300">
                    {selectedEvent.time}
                  </p>
                </div> */}

                {/* CONTACT FORM */}
                <NewContactForm />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      </>
  );
}