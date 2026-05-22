"use client";

import React, { useState } from "react";
import { Field } from "formik";
import { motion, AnimatePresence } from "motion/react";

interface FormSelectProps {
  name: string;
  label: string;
  options: {
    label: string;
    value: string;
  }[];
  placeholder?: string;
}

export default function FormSelect({
  name,
  label,
  options,
  placeholder = "Select",
}: FormSelectProps) {
  const [focused, setFocused] = useState(false);

  return (
    <Field name={name}>
      {({ field, form }: any) => {
        const hasError = form.touched[name] && form.errors[name];

        return (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            animate={{
              scale: focused ? 1.01 : 1,

              ...(hasError && {
                x: [0, -4, 4, -4, 0],
              }),
            }}
            className="space-y-2"
          >
            <label className="block text-sm font-semibold text-[hsl(var(--foreground))]">{label}</label>

            <select
              {...field}
              className={`
                w-full rounded-xl border bg-[hsl(var(--input))/0.7]
                px-4 py-3 text-sm outline-none transition-all duration-200

                ${hasError ? "border-red-500" : "border-gray-300 focus:border-[#1b2b52]"}
              `}
            >
              <option value="">{placeholder}</option>

              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <AnimatePresence mode="wait">
              {hasError && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -5,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -5,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="text-sm text-red-500"
                >
                  {form.errors[name]}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      }}
    </Field>
  );
}
