"use client";

import { motion } from "framer-motion";
import { headList9 } from "./constants/headindconst";
import HeadingAndSub from "./headingandsub";

const agendaData = [
  {
    time: "04:00 PM - 04:10 PM",
    duration: "10 MINS",
    tag: "Pudhari Publications",
    title: "Welcoming Address & Session Keynote",
    description:
      "Setting standard expectations for professional counselling and career path selections.",
  },
  {
    time: "04:10 PM - 04:55 PM",
    duration: "45 MINS",
    tag: "CampusDekho.AI",
    title: "Decoding the CAP Round Process",
    description:
      "In-depth masterclass on option forms, seat freezes, floats, and allocation rules.",
  },
  {
    time: "04:55 PM - 05:15 PM",
    duration: "20 MINS",
    tag: "Vishwakarma University",
    title: "Institutional Spotlights & Placements",
    description:
      "Showcasing infrastructure, packages, and direct admission structures.",
  },
  {
    time: "05:15 PM - 05:35 PM",
    duration: "20 MINS",
    tag: "PCET Pune",
    title: "Engineering & Emerging Tech Horizons",
    description:
      "Unlocking opportunities in Artificial Intelligence, Cyber Security, and Aerospace.",
  },
  {
    time: "05:35 PM - 05:55 PM",
    duration: "20 MINS",
    tag: "D.Y. Patil University",
    title: "Healthcare & Pharmacy Specializations",
    description:
      "Deep dive into core B.Pharm, Biotech, and Medical allied fields.",
  },
  {
    time: "05:55 PM - 06:15 PM",
    duration: "20 MINS",
    tag: "All Partner Campuses",
    title: "☕ High Tea & Meet the Deans",
    description:
      "Breakout interaction session directly with college representatives.",
  },
  {
    time: "06:15 PM - 07:30 PM",
    duration: "75 MINS",
    tag: "Direct Advisory Desk",
    title: "1-on-1 Personalized Option Form Assembly",
    description:
      "Bring your marks and expected scores to generate your custom choice sheet.",
  },
];

export default function SeminarAgenda() {
  return (
    <section className="relative overflow-hidden bg-[#020b2d] px-4 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        {/* HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <HeadingAndSub data={headList9} />
        </motion.div>

        {/* CARD */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-[28px] border border-blue-900 bg-[#06133d]"
        >
          {/* TOP BAR */}
          <div className="flex flex-col items-start justify-between gap-4 border-b border-blue-900 px-6 py-5 md:flex-row md:items-center">
            <div>
              <p className="mb-1 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                Current Agenda Selected:
              </p>

              <h3 className="text-2xl font-bold">C2C Kolhapur - Tour Track</h3>
            </div>

            <button className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold transition-all duration-300 hover:bg-blue-500">
              Register for Selected Hub
            </button>
          </div>

          {/* TIMELINE */}
          <div className="px-6">
            {agendaData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                viewport={{ once: true }}
                className={`grid gap-6 border-blue-900 py-8 md:grid-cols-[180px_1fr] ${
                  index !== agendaData.length - 1
                    ? "border-b border-blue-900"
                    : ""
                }`}
              >
                {/* LEFT */}
                <div>
                  <p className="text-sm font-bold tracking-wide text-cyan-400">
                    {item.time}
                  </p>

                  <p className="mt-2 text-xs font-medium tracking-wider text-slate-500 uppercase">
                    {item.duration}
                  </p>
                </div>

                {/* RIGHT */}
                <div>
                  <span className="inline-block rounded-md bg-blue-900/70 px-3 py-1 text-xs font-semibold text-blue-200">
                    {item.tag}
                  </span>

                  <h4 className="mt-3 text-2xl leading-snug font-bold text-white">
                    {item.title}
                  </h4>

                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-400">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
