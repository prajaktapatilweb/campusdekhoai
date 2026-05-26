"use client";

import { motion } from "framer-motion";
import { CalendarDays, Clock3, MapPin } from "lucide-react";
import Image from "next/image";

interface EventCardProps {
  title: string;
  location: string;
  venue: string;
  time: string;
  seats: number;
  date: string;
  month: string;
  image: string;
}

const events: EventCardProps[] = [
  {
    title: "Hilton Palm Jumeirah",
    location: "Dubai",
    venue: "Palm Jumeirah Road, Dubai Marina",
    time: "4:00 PM - 7:30 PM",
    seats: 94,
    date: "21",
    month: "Jan",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Luxury Marina Event",
    location: "Abu Dhabi",
    venue: "Corniche Business Avenue",
    time: "5:30 PM - 9:00 PM",
    seats: 62,
    date: "15",
    month: "Feb",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Skyline Business Meet",
    location: "Doha",
    venue: "West Bay Conference Center",
    time: "3:00 PM - 6:00 PM",
    seats: 120,
    date: "09",
    month: "Mar",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1200&auto=format&fit=crop",
  },
];

function EventCard({
  title,
  location,
  venue,
  time,
  seats,
  date,
  month,
  image,
}: EventCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.35 }}
      className="group relative h-[470px] w-[320px] overflow-hidden rounded-3xl shadow-2xl"
    >
      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

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
          <div className="bg-white px-4 py-2 text-center text-sm font-semibold text-gray-700">
            Tue
          </div>

          <div className="bg-[#0D2A4A] px-4 py-3 text-center text-white">
            <h3 className="text-3xl leading-none font-bold">{date}</h3>
            <p className="mt-1 text-sm tracking-wide uppercase">{month}</p>
          </div>
        </motion.div>

        {/* Seats Available */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-xl bg-white/15 px-4 py-2 backdrop-blur-md"
        >
          <p className="text-xs font-medium tracking-wide text-white/80 uppercase">
            Seats
          </p>

          <h4 className="text-lg font-bold text-white">{seats}</h4>
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
          <div className="mb-2 flex items-center gap-2 text-sm font-medium tracking-[3px] text-white/80 uppercase">
            <CalendarDays size={14} />
            <span>{location}</span>
          </div>

          {/* Title */}
          <h2 className="max-w-[240px] text-4xl leading-tight font-extrabold text-white">
            {title}
          </h2>

          {/* Venue */}
          <div className="mt-4 flex items-start gap-2 text-sm text-white/80">
            <MapPin size={16} className="mt-[2px] shrink-0" />
            <p>{venue}</p>
          </div>

          {/* Time */}
          <div className="mt-3 flex items-center gap-2 text-sm text-white/80">
            <Clock3 size={15} />
            <p>{time}</p>
          </div>

          {/* Bottom Action */}
          <div className="mt-8 flex items-center gap-3">
            {/* Register Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              className="flex-1 rounded-2xl bg-[#071120] py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#0d1830]"
            >
              Register Now
            </motion.button>

            {/* Seats Available Count */}
            <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-md">
              <p className="text-xs tracking-wide text-white/70 uppercase">
                Available
              </p>

              <h4 className="text-lg font-bold text-white">{seats}</h4>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function EventCardsSection() {
  return (
    <section className="min-h-screen bg-[#071120] px-6 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm tracking-[4px] text-cyan-400 uppercase">
            Upcoming Events
          </p>

          <h1 className="text-4xl font-bold text-white md:text-5xl">
            Premium Event Experiences
          </h1>
        </div>

        {/* Cards */}
        <div className="flex flex-wrap items-center justify-center gap-8">
          {events.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
      </div>
    </section>
  );
}
