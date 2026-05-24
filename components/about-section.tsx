"use client";

import { motion } from "framer-motion";
import { CheckCircle2, MapPin, Calendar, Users, Award } from "lucide-react";
import Image from "next/image";

const stats = [
  { icon: Calendar, value: "2022", label: "Established" },
  { icon: Users, value: "500+", label: "Students Helped" },
  { icon: MapPin, value: "6+", label: "Cities Covered" },
  { icon: Award, value: "100%", label: "Satisfaction" },
];

const highlights = [
  "Free one-on-one counselling sessions",
  "Direct interaction with college representatives",
  "Scholarship and financial aid guidance",
  "Career aptitude assessments",
  "Complete admission process support",
  "Documentation guidance and review",
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative scroll-mt-24 overflow-hidden py-24 md:py-32"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-[hsl(var(--primary))]/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[hsl(var(--primary))]/3 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-[hsl(var(--primary))]/30 bg-[hsl(var(--primary))]/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-[hsl(var(--primary))] uppercase">
            About Us
          </span>
          <h2 className="font-serif text-2xl font-bold text-[hsl(var(--foreground))] md:text-5xl">
            Trusted Admission Guidance
            <span className="text-[hsl(var(--primary))]">
              Across Maharashtra
            </span>
          </h2>
        </motion.div>

        {/* Content grid - info side by side */}
        <div className="flex flex-col items-center gap-16 lg:flex-row">
          {/* Left - Image + Stats */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative">
              <div className="overflow-hidden rounded-2xl border border-[hsl(var(--border))]">
                <Image
                  src="/images/guide2.jpg"
                  alt="Pudhari Campus To Career connect"
                  width={640}
                  height={440}
                  className="h-[320px] w-full object-cover md:h-[440px]"
                />
              </div>
              {/* Floating stat card */}
              {/* <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -right-4 rounded-xl border border-[hsl(var(--primary))]/20 bg-[hsl(var(--card))] p-5 shadow-2xl shadow-[hsl(var(--primary))]/10 md:-right-8"
              >
                <p className="font-serif text-3xl font-bold text-[hsl(var(--primary))]">3+</p>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">Years of Excellence</p>
              </motion.div> */}
            </div>

            {/* Stats grid */}
            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 text-center"
                >
                  <stat.icon className="mx-auto mb-2 h-5 w-5 text-[hsl(var(--primary))]" />
                  <p className="font-serif text-xl font-bold text-[hsl(var(--foreground))]">
                    {stat.value}
                  </p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Text content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-1/2"
          >
            <h3 className="mb-6 font-serif text-2xl font-bold text-[hsl(var(--foreground))] md:text-3xl">
              Complete Guidance After 12th Under One Roof
              <span className="text-[hsl(var(--primary))]"> Across India</span>
            </h3>

            <p className="mb-6 leading-relaxed text-[hsl(var(--muted-foreground))]">
              Pudhari Campus To Career is Maharashtra’s leading education
              counselling platform, dedicated to helping students navigate the
              complex world of college admissions. Our mission is to bridge the
              gap between students and their dream institutions through expert
              guidance, personalized counselling, and comprehensive support.
              With a team of experienced counsellors and partnerships with over
              100+ prestigious institutions, we provide end-to-end admission
              assistance tailored to each student's unique aspirations and
              capabilities.
            </p>

            {/* <p className="mb-8 leading-relaxed text-[hsl(var(--muted-foreground))]">
              From rental laptops and desktops to complete networking infrastructure, CCTV
              surveillance systems, and software configuration - we deliver end-to-end IT
              solutions that keep your business running smoothly. Our commitment to quality and
              rapid service has made us the preferred partner for IT companies and corporate
              offices.
            </p> */}

            {/* Highlights */}
            <div className="mb-8 grid gap-3 md:grid-cols-2">
              {highlights.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--primary))]" />
                  <span className="text-sm text-[hsl(var(--foreground))]">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Location tags */}
            <div className="flex flex-wrap gap-2">
              {[
                "Pune",
                "Kolhapur",
                "Sambhajinagar",
                "Nashik",
                "Satara",
                "Baramati",
              ].map((city) => (
                <span
                  key={city}
                  className="flex items-center gap-1.5 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--secondary))] px-3 py-1.5 text-xs font-medium text-[hsl(var(--secondary-foreground))]"
                >
                  <MapPin className="h-3 w-3 text-[hsl(var(--primary))]" />
                  {city}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
