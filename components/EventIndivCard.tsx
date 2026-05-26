"use client";

import { motion } from "framer-motion";
import moment from "moment";
import Image from "next/image";

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

interface EventCardProps {
  event: EventType;
  index: number;
  language: string;
  t: (key: string) => string;
  onSelect: (event: EventType) => void;
}

export default function EventIndivCard({
  event,
  index,
  language,
  t,
  onSelect,
}: EventCardProps) {
  const getEventStatus = () => {
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
  const getDisplaySeats = () => {
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

  const status = getEventStatus();
  const displaySeats = getDisplaySeats();
  const seatLabel = getSeatLabel(displaySeats);

  return (
    <motion.div
      key={event._id}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={() => status.active && onSelect(event)}
      // className="relative overflow-hidden rounded-xl border border-cyan-800 shadow-[0_0_25px_rgba(0,200,255,0.15)]"
      className="group relative overflow-hidden rounded-3xl border border-2 border-slate-200/40 bg-white/10 shadow-[0_10px_30px_rgba(15,23,42,0.15)] backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(15,23,42,0.25)]"
      // className="group relative overflow-hidden rounded-3xl border border-2 border-white/10 bg-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-all duration-500 hover:border-cyan-400/40 hover:shadow-cyan-500/20"
    >
      {/* IMAGE */}
      <div className="absolute inset-0">
        <Image
          src="/images/city/Kolhapur.jpg"
          alt={event.city}
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-slate-900/45" />
      {/* <div className="absolute inset-0 bg-[#04112a]/55" /> */}
      {/* <div className="absolute inset-0 bg-black/30" /> */}

      {/* OPTIONAL GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/10 via-slate-800/30 to-indigo-950/50" />
      {/* <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-[#020817]/40 to-blue-900/50" /> */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" /> */}

      {/* CONTENT */}
      <div className="relative z-10 p-6">
        {/* Top */}

        <div className="mb-6 flex items-start justify-between">
          <p className="text-xs font-semibold tracking-[0.25em] text-slate-200 uppercase">
            {moment(event.startDateTime).format("DD MMM YYYY")}
          </p>

          <span
            className={`rounded-lg ${
              status.active ? "bg-green-500/20" : "bg-red-500/20"
            } px-3 py-1 text-xs font-semibold ${
              status.active ? "text-green-200" : "text-red-200"
            }`}
          >
            {seatLabel}
          </span>
        </div>

        {/* City */}
        <h3 className="text-3xl font-bold text-white drop-shadow-lg">
          {language === "en" ? event.city : event.cityMarathi}
        </h3>

        {/* Venue */}
        <p className="mt-2 text-sm text-white/90">
          {language === "en" ? event.venue : event.venueMarathi}
        </p>

        {/* Time */}
        <p className="mt-1 text-sm font-medium text-cyan-200">
          {moment(event.startDateTime).format("h:mm A")} -
          {moment(event.endDateTime).format("h:mm A")}
        </p>

        {/* Divider */}
        <div className="my-6 h-px bg-white/20" />

        {/* Bottom */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-white/80">
            {status.active
              ? `${displaySeats} ${t("event.seats")}`
              : t("event.closed")}
          </p>

          <span
            className={`rounded-lg border border-cyan-400/30 bg-cyan-500/20 px-3 py-1 text-lg font-semibold ${
              status.active ? "text-white" : "text-red-300"
            }`}
          >
            {status.active ? t("form.submit") : t("event.closed")}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
