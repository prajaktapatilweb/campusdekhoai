"use client";

import { motion } from "framer-motion";
import { CalendarDays, Clock3, MapPin } from "lucide-react";
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

export default function EventCard({
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
    // <motion.div
    //   initial={{ opacity: 0, y: 80 }}
    //   whileInView={{ opacity: 1, y: 0 }}
    //   viewport={{ once: true }}
    //   transition={{ duration: 0.6, delay: index * 0.2 }}
    //   whileHover={{ y: -8, scale: 1.02 }}
    //   // className="relative overflow-hidden rounded-xl border border-cyan-800 shadow-[0_0_25px_rgba(0,200,255,0.15)]"
    //   className="group relative overflow-hidden rounded-3xl border border-2 border-slate-200/40 bg-white/10 shadow-[0_10px_30px_rgba(15,23,42,0.15)] backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(15,23,42,0.25)]"
    //   // className="group relative overflow-hidden rounded-3xl border border-2 border-white/10 bg-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-all duration-500 hover:border-cyan-400/40 hover:shadow-cyan-500/20"
    // >
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.35 }}
      onClick={() => status.active && onSelect(event)}
      className="group relative h-[420px] w-full overflow-hidden rounded-3xl shadow-2xl sm:h-[450px] md:h-[470px] lg:h-[500px]"
    >
      <Image
        src={`/images/city/${event.city}.jpg`}
        alt={event.city}
        fill
        // priority
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        // className="object-cover"
      />
      {/* </div> */}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />

      {/* Top Content */}
      <div className="absolute top-4 left-4 flex w-[calc(100%-32px)] items-start justify-between">
        {/* Date Box */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-xl bg-white shadow-lg"
        >
          <div className="text-md bg-white px-4 py-2 text-center font-semibold text-gray-700">
            {moment(event.startDateTime).format("ddd").toUpperCase()}
          </div>

          <div className="bg-[#1a237e] px-4 py-3 text-center text-white">
            <h3 className="text-3xl leading-none font-bold">
              {moment(event.startDateTime).format("DD")}
            </h3>
            <p className="mt-1 text-sm tracking-wide uppercase">
              {moment(event.startDateTime).format("MMM YYYY")}
            </p>
          </div>
        </motion.div>

        {/* Seats Available */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-xl bg-white/35 px-4 py-2 backdrop-blur-lg"
        >
          <h4
            className={`text-center text-xl font-bold ${status.active ? "text-green-950" : "text-red-400"}`}
          >
            {status.active ? `${displaySeats}` : t("event.closed")}
          </h4>
          <p className="text-xs font-medium tracking-wide text-white/80 uppercase">
            {status.active ? "Seats Lefts" : ""}
          </p>
        </motion.div>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 w-full p-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Location */}
          {/* <div className="mb-2 flex items-center gap-2 text-sm font-medium tracking-[3px] text-white/80 uppercase">
            <CalendarDays size={14} />
            <span>{"location"}</span>
          </div> */}

          {/* Title */}
          <h2 className="max-w-[240px] text-4xl leading-tight font-extrabold text-white">
            {language === "en" ? event.city : event.cityMarathi}
          </h2>

          {/* Venue */}
          <div className="mt-4 flex items-start gap-2 text-lg text-white/80">
            <MapPin size={16} className="mt-[2px] shrink-0" />
            <p> {language === "en" ? event.venue : event.venueMarathi}</p>
          </div>

          {/* Time */}
          <div className="mt-3 flex items-center gap-2 text-sm text-white/80">
            <Clock3 size={15} />
            <p>
              {moment(event.startDateTime).format("h:mm A")} -{" "}
              {moment(event.endDateTime).format("h:mm A")}
            </p>
          </div>

          {/* Bottom Action */}
          <div className="mt-8 flex items-center justify-between gap-3">
            {/* Register Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              className={`w-fit rounded-2xl border-2 border-white bg-blue-950 px-6 py-3 text-lg font-semibold shadow-lg transition-all duration-300 hover:bg-[#0d1830] ${
                status.active ? "text-white" : "text-red-400"
              }`}
            >
              {status.active ? t("form.submit") : t("event.closed")}
            </motion.button>

            {/* Seats Available Count */}
            <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-md">
              {/* <p className="text-xs tracking-wide text-white/70 uppercase">
                Available
              </p> */}

              <h4
                className={`text-md font-bold whitespace-nowrap ${status.active ? "text-green-200" : "text-red-200"}`}
              >
                {seatLabel}
              </h4>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
