import React from "react";
import { motion } from "framer-motion";

type Props = {
  data: {
    title: React.ReactNode;
    subtitle: React.ReactNode;
    subtitlespan: React.ReactNode;
  };
};

function HeadingAndSub({ data: { title, subtitle, subtitlespan } }: Props) {
  return (
    <div>
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="pt-7 pb-13 text-center"
      >
        <>
          <p className="mb-4 inline-block rounded-full border border-[hsl(var(--primary))]/30 bg-[hsl(var(--primary))]/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-[hsl(var(--primary))] uppercase">
            {title}
          </p>

          <h2 className="font-serif text-2xl font-bold text-[hsl(var(--foreground))] md:text-5xl">
            {subtitle}
            <span className="text-[hsl(var(--primary))]">{subtitlespan}</span>
          </h2>
        </>
      </motion.div>
    </div>
  );
}

export default HeadingAndSub;
