"use client";

import { motion, AnimatePresence } from "framer-motion";
import NewContactForm from "./newContactForm";
import { useEffect, useState } from "react";
import moment from "moment";
import { useLanguage } from "@/contexts/LanguageContext";

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

  const getEventStatus = (event: EventType) => {
    const now = new Date();

    const start = new Date(event.startDateTime);

    const end = new Date(event.endDateTime);

    if (now > end) {
      return {
        label: "Event Ended",
        active: false,
      };
    }

    if (now >= start && now <= end) {
      return {
        label: "Event Live",
        active: true,
      };
    }

    return {
      label: `Seats Available`,
      active: true,
    };
  };
  const sortedEvents = [...events].sort(
    (a, b) =>
      new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime(),
  );

  const getDisplaySeats = (event: EventType) => {
    const now = new Date().getTime();
    const start = new Date(event.startDateTime).getTime();
    // Assume registration opened 30 days before event
    const assumedLaunch = start - 30 * 24 * 60 * 60 * 1000;
    const totalDuration = start - assumedLaunch;
    const elapsed = now - assumedLaunch;
    // Progress between 0 and 1
    const progress = Math.min(Math.max(elapsed / totalDuration, 0), 1);
    // Reduce up to 85% seats as event approaches
    const reducedSeats = Math.floor(event.maxAttendees * (1 - progress * 0.85));
    // Random decrease (0–7)
    const randomOffset = Math.floor(Math.random() * 8);
    // Final visible seats
    const visibleSeats = reducedSeats - randomOffset;
    // Always minimum 5 seats
    return Math.max(visibleSeats, 5);
  };

  const getSeatLabel = (seats: number) => {
    if (seats <= 10) return "Almost Full";
    if (seats <= 30) return "Limited Seats";
    return "Seats Available";
  };
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
          {sortedEvents.map((event, index) => {
            const status = getEventStatus(event);
            const displaySeats = getDisplaySeats(event);
            const seatLabel = getSeatLabel(displaySeats);
            return (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => status.active && setSelectedEvent(event)}
                className="relative cursor-pointer overflow-hidden rounded-3xl border border-cyan-400 bg-[#061547] p-6 shadow-[0_0_25px_rgba(0,200,255,0.15)] transition-all duration-300"
              >
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/10" />

                {/* Top */}
                <div className="relative z-10 mb-6 flex items-start justify-between">
                  <p className="text-sm font-bold tracking-widest text-cyan-400">
                    {moment(event.startDateTime).format("DD MMM YYYY")}
                  </p>

                  <span
                    className={`rounded-lg ${status.active ? "bg-pink-500/20" : "bg-red-500/20"} px-3 py-1 text-xs font-semibold ${status.active ? "text-green-300" : "text-red-300"}`}
                  >
                    {/* {status.label} */}
                    {seatLabel}
                  </span>
                </div>

                {/* City */}
                <h3 className="relative z-10 text-3xl font-bold text-white">
                  {language === "en" ? event.city : event.cityMarathi}
                </h3>

                {/* Venue */}
                <p className="relative z-10 mt-2 text-sm text-slate-300">
                  {language === "en" ? event.venue : event.venueMarathi}
                </p>

                {/* Time */}
                <p className="relative z-10 mt-1 text-sm text-cyan-300">
                  {moment(event.startDateTime).format("h:mm A")} -
                  {moment(event.endDateTime).format("h:mm A")}
                </p>

                {/* Divider */}
                <div className="relative z-10 my-6 h-px bg-white/10" />

                {/* Bottom */}
                <div className="relative z-10 flex items-center justify-between">
                  <p className="text-sm tracking-wide text-slate-400">
                    {status.active
                      ? `${displaySeats} ${t("event.seats")}`
                      : t("event.closed")}
                  </p>
                  <span
                    className={`rounded-lg border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-lg font-semibold ${status.active ? "text-white/80" : "text-red-500/80"}`}
                  >
                    {status.active ? t("form.submit") : t("event.closed")}
                  </span>
                </div>
              </motion.div>
            );
          })}
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
