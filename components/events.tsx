"use client";

import { motion, AnimatePresence } from "framer-motion";
import NewContactForm from "./Forms/newContactForm";
import { useEffect, useState } from "react";
import moment from "moment";
import { useLanguage } from "@/contexts/LanguageContext";
import HeadingAndSub from "./headingandsub";
import { headList2 } from "./constants/headindconst";
import Image from "next/image";
import EventIndivCard from "./EventIndivCard";
import EventCard from "./EventCard";

interface EventType {
  _id: string;
  city: string;
  cityMarathi: string;
  startDateTime: string;
  endDateTime: string;
  venue: string;
  venueMarathi: string;
  maxAttendees: number;
  status: string;
}
// const events = [
//   {
//     id: 1,
//     date: "23 MAY",
//     city: "Kolhapur",
//     venue: "Swami Vivekanand Hall",
//     time: "10:00 AM",
//     seats: 42,
//     status: "FAST",
//     selected: true,
//   },
//   {
//     id: 2,
//     date: "25 MAY",
//     city: "Pune",
//     venue: "Bal Gandharva Hall",
//     time: "11:30 AM",
//     seats: 28,
//     status: "HOT",
//     selected: false,
//   },
//   {
//     id: 3,
//     date: "28 MAY",
//     city: "Mumbai",
//     venue: "Nesco Center",
//     time: "02:00 PM",
//     seats: 15,
//     status: "LIMITED",
//     selected: false,
//   },
//   {
//     id: 4,
//     date: "28 MAY",
//     city: "Satara",
//     venue: "Nesco Center",
//     time: "02:00 PM",
//     seats: 15,
//     status: "LIMITED",
//     selected: false,
//   },
//   {
//     id: 5,
//     date: "28 MAY",
//     city: "Sangali",
//     venue: "Nesco Center",
//     time: "02:00 PM",
//     seats: 15,
//     status: "LIMITED",
//     selected: false,
//   },
//   {
//     id: 6,
//     date: "28 MAY",
//     city: "Chatrapati Sambhajinagar",
//     venue: "Nesco Center",
//     time: "02:00 PM",
//     seats: 15,
//     status: "LIMITED",
//     selected: false,
//   },
// ];

export default function EventCards() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<null | (typeof events)[0]>(
    null,
  );

  const { language, t } = useLanguage();
  console.log("Events Component Rendered with events:", language);
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/event/get");
      if (!response.ok) {
        setLoading(false);
        return;
      }

      const contentType = response.headers.get("content-type");

      if (!contentType?.includes("application/json")) {
        throw new Error("Invalid response type");
      }

      const data = await response.json();

      if (data.success) {
        setEvents(data.data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const sortedEvents = [...events].sort(
    (a, b) =>
      new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime(),
  );

  return (
    <>
      <section id="events" className="bg-[#e1e8f0] px-4 py-10">
        <HeadingAndSub data={headList2} />

        <div
          // className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3"
          className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3"
        >
          {/* <div className="mx-auto grid max-w-5xl gap-2 md:grid-cols-2 lg:grid-cols-3"> */}
          {sortedEvents.map((event, index) => (
            // <EventIndivCard
            //   key={event._id}
            //   event={event}
            //   index={index}
            //   language={language}
            //   t={t}
            //   onSelect={(event) => setSelectedEvent(event)}
            // />
            <EventCard
              key={event._id}
              event={event}
              index={index}
              language={language}
              t={t}
              onSelect={(event) => setSelectedEvent(event)}
            />
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
                        📅{" "}
                        {moment(selectedEvent.startDateTime).format(
                          "DD MMM YYYY",
                        )}
                      </span>

                      <span className="rounded-full border border-cyan-400/10 bg-cyan-500/10 px-4 py-1.5 text-sm text-cyan-200 backdrop-blur-md">
                        ⏰{" "}
                        {moment(selectedEvent.startDateTime).format("h:mm A")}
                      </span>

                      <span className="rounded-full border border-pink-400/10 bg-pink-500/10 px-4 py-1.5 text-sm text-pink-200">
                        {selectedEvent.maxAttendees} Seats Left
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
