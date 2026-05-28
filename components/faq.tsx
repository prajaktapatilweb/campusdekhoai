"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import HeadingAndSub from "./headingandsub";
import { headList10 } from "./constants/headindconst";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Is registration free?",
    answer:
      "Yes. C2C Campus to Career is an outreach initiative backed by Pudhari Media Group & leading academic sponsors, meaning entry passes are 100% free for students and parents.",
  },
  {
    question: "What should I bring to the event?",
    answer:
      "We highly recommend bringing your MHT-CET/JEE scorecards, mock percentiles, and 10th/12th marksheets so our expert panel can curate your tailored choice codes list.",
  },
  {
    question: "Can parents attend along with students?",
    answer:
      "Absolutely. Parents play an integral role in admissions decision-making and are highly encouraged to attend for the special CAP Round option form training.",
  },
  {
    question: "  Where can I get help if my preferred city is full?",
    answer:
      "Please contact our principal local coordinator, Aniket Kadam, at the help desk or register for adjacent district hubs.",
  },
];

interface FAQCardProps {
  faq: FAQItem;
  isOpen: boolean;
  onClick: () => void;
}

function FAQCard({ faq, isOpen, onClick }: FAQCardProps) {
  return (
    <motion.div
      layout
      transition={{ duration: 0.3 }}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      {/* Question */}
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <h3 className="text-base font-semibold text-slate-800 md:text-lg">
          {faq.question}
        </h3>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="h-5 w-5 text-blue-700" />
        </motion.div>
      </button>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="border-t border-slate-100 px-6 pt-4 pb-5">
              <p className="leading-7 text-slate-600">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}

        <HeadingAndSub data={headList10} />

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQCard
              key={index}
              faq={faq}
              isOpen={activeIndex === index}
              onClick={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
