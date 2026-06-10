"use client";

import { motion } from "framer-motion";
import { headList9 } from "./constants/headindconst";
import HeadingAndSub from "./headingandsub";

const agendaData = [
  {
    city: "Ishwarpur",
    date: "12 June 2026",
    venue: "Yashwantrao Chavhan College, Ishwarpur",
    sessions: [
      {
        time: "11:00 AM - 11:20 AM",
        duration: "20 MINS",
        tag: "VU",
        title: "Prof. Prashant Acharya",
      },
      {
        time: "11:20 AM - 11:40 AM",
        duration: "20 MINS",
        tag: "DPU",
        title: "Mr. Mukesh Agarwal",
      },
      {
        time: "11:40 AM - 12:00 PM",
        duration: "20 MINS",
        tag: "PCET",
        title: "Dr. Swapnil Sonkamble / Dr. Milind Ovhal",
      },
      {
        time: "12:00 PM - 12:20 PM",
        duration: "20 MINS",
        tag: "CampusDekho",
        title: "Shantanu Deshpande",
      },
      {
        time: "12:20 PM - 12:40 PM",
        duration: "20 MINS",
        tag: "Digitech Robotic",
        title: "Ajit Gatthe",
      },
    ],
  },

  {
    city: "Karad",
    date: "13 June 2026",
    venue: "Venutai Chavhan Auditorium, Karad",
    sessions: [
      {
        time: "11:00 AM - 11:20 AM",
        duration: "20 MINS",
        tag: "CampusDekho",
        title: "Shantanu Deshpande",
      },
      {
        time: "11:20 AM - 11:40 AM",
        duration: "20 MINS",
        tag: "Digitech Robotic",
        title: "Ajit Gatthe",
      },
      {
        time: "11:40 AM - 12:00 PM",
        duration: "20 MINS",
        tag: "DPU",
        title: "Mr. Mukesh Agarwal",
      },
      {
        time: "12:00 PM - 12:20 PM",
        duration: "20 MINS",
        tag: "PCET",
        title: "Dr. Swapnil Sonkamble / Dr. Milind Ovhal",
      },
      {
        time: "12:20 PM - 12:40 PM",
        duration: "20 MINS",
        tag: "VU",
        title: "Prof. Prashant Acharya",
      },
    ],
  },

  {
    city: "Sangli",
    date: "14 June 2026",
    venue: "Latthe Education Society College Hall, Sangli",
    sessions: [
      {
        time: "11:00 AM - 11:20 AM",
        duration: "20 MINS",
        tag: "DPU",
        title: "Mr. Mukesh Agarwal",
      },
      {
        time: "11:20 AM - 11:40 AM",
        duration: "20 MINS",
        tag: "CampusDekho",
        title: "Shantanu Deshpande",
      },
      {
        time: "11:40 AM - 12:00 PM",
        duration: "20 MINS",
        tag: "Digitech Robotic",
        title: "Ajit Gatthe",
      },
      {
        time: "12:00 PM - 12:20 PM",
        duration: "20 MINS",
        tag: "PCET",
        title: "Dr. Swapnil Sonkamble / Dr. Milind Ovhal",
      },
      {
        time: "12:20 PM - 12:40 PM",
        duration: "20 MINS",
        tag: "VU",
        title: "Prof. Prashant Acharya",
      },
    ],
  },
];

export default function SeminarAgendaNew() {
  return (
    <section className="relative overflow-hidden bg-[#020b2d] px-4 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        {/* HEADING */}

        <HeadingAndSub data={headList9} />

        {/* CARD */}
        {/* <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-[28px] border border-blue-900 bg-[#1a237e]/70"
        > */}
        {/* TOP BAR */}
        {/* <div className="flex flex-col items-start justify-between gap-4 border-b border-blue-900 px-6 py-5 md:flex-row md:items-center">
            <div>
              <p className="mb-1 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                Current Agenda Selected:
              </p>

              <h3 className="text-2xl font-bold">C2C Kolhapur - Tour Track</h3>
            </div>

            <button className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold transition-all duration-300 hover:bg-blue-500">
              Register for Selected Hub
            </button>
          </div> */}

        {/* TIMELINE */}
        <div className="px-6">
          {agendaData.map((location, locationIndex) => (
            <motion.div
              key={location.city}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-10 overflow-hidden rounded-[28px] border border-blue-900 bg-[#1a237e]/70"
            >
              {/* HEADER */}
              <div className="flex flex-col items-start justify-between gap-4 border-b border-blue-900 px-6 py-5 md:flex-row md:items-center">
                <div>
                  <p className="mb-1 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                    Seminar Hub
                  </p>

                  <h3 className="text-2xl font-bold">
                    {location.city} • {location.date}
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    {location.venue}
                  </p>
                </div>

                <button
                  onClick={() => {
                    document
                      .getElementById("events")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold transition-all duration-300 hover:bg-blue-500"
                >
                  Register
                </button>
              </div>

              {/* SESSIONS */}
              <div className="px-6">
                {location.sessions.map((item, index) => (
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
                      index !== location.sessions.length - 1
                        ? "border-b border-blue-900"
                        : ""
                    }`}
                  >
                    <div>
                      <p className="text-sm font-bold tracking-wide text-cyan-400">
                        {item.time}
                      </p>

                      <p className="mt-2 text-xs font-medium tracking-wider text-slate-500 uppercase">
                        {item.duration}
                      </p>
                    </div>

                    <div>
                      <span className="inline-block rounded-md bg-blue-900/70 px-3 py-1 text-xs font-semibold text-blue-200">
                        {item.tag}
                      </span>

                      <h4 className="mt-3 text-2xl leading-snug font-bold text-white">
                        {item.title}
                      </h4>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        {/* </motion.div> */}
      </div>
    </section>
  );
}
