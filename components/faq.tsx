"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is CampusDekho.AI?",
    answer:
      "CampusDekho.AI is a career guidance and admission support platform helping students with CET, CAP rounds, college selection, scholarships, counselling, and admission processes across Maharashtra and India.",
  },
  {
    question: "How can I register for counselling sessions?",
    answer:
      "You can register directly through our website by filling out the registration form. Our team will contact you with available counselling slots and event details.",
  },
  {
    question: "Do you provide scholarship guidance?",
    answer:
      "Yes, we help students explore government scholarships, private funding options, education loans, and merit-based opportunities available for various courses.",
  },
  {
    question: "Which courses do you guide students for?",
    answer:
      "We provide guidance for Engineering, Medical, Pharmacy, Law, Management, Design, Architecture, and many other professional courses.",
  },
  {
    question: "Is the counselling available online?",
    answer:
      "Yes, we offer both online and offline counselling sessions depending on your preference and location.",
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <p className="mb-2 text-sm font-semibold tracking-[0.2em] text-blue-700 uppercase">
            Frequently Asked Questions
          </p>

          <h2 className="font-poppins text-4xl font-bold text-slate-800 md:text-5xl">
            Got Questions? <span className="text-blue-700">We’ve Answers</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-500 md:text-lg">
            Find answers to the most common questions about admissions,
            counselling, scholarships, and career guidance.
          </p>
        </motion.div>

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
