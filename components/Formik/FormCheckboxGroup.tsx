"use client";

import React from "react";
import { Field } from "formik";
import { motion, AnimatePresence } from "motion/react";
import {
  GraduationCap,
  BookOpen,
  BriefcaseBusiness,
  BadgeIndianRupee,
  House,
  Compass,
} from "lucide-react";

interface CheckboxOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface FormCheckboxGroupProps {
  name: string;
  label: string;
  options: CheckboxOption[];
}

export default function FormCheckboxGroup({
  name,
  label,
  options,
}: FormCheckboxGroupProps) {
  return (
    <Field name={name}>
      {({ field, form }: any) => {
        const values: string[] = field.value || [];

        const hasError = form.touched[name] && form.errors[name];

        const handleChange = (value: string) => {
          if (values.includes(value)) {
            form.setFieldValue(
              name,
              values.filter((v) => v !== value),
            );
          } else {
            form.setFieldValue(name, [...values, value]);
          }
        };

        return (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            animate={{
              ...(hasError && {
                x: [0, -4, 4, -4, 0],
              }),
            }}
            className="space-y-4"
          >
            {/* LABEL */}
            <label className="block text-sm font-semibold text-[hsl(var(--foreground))]">
              {label}
            </label>

            {/* OPTIONS */}
            <div className="grid gap-4 sm:grid-cols-3">
              {options.map((option) => {
                const selected = values.includes(option.value);

                return (
                  <motion.label
                    key={option.value}
                    whileTap={{ scale: 0.98 }}
                    whileHover={{ y: -2 }}
                    className={`flex cursor-pointer items-center rounded-2xl px-1 py-1 transition-all duration-300`}
                  >
                    {/* CHECKBOX */}
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => handleChange(option.value)}
                        className="h-4 w-4 rounded border-gray-300 text-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))]"
                      />

                      {/* <div
                        className={`flex h-4 w-4 items-center justify-center rounded-lg ${
                          selected
                            ? "bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]"
                            : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]"
                        }`}
                      >
                        {option.icon}
                      </div> */}

                      <span className="font-small text-sm text-[hsl(var(--foreground))]">
                        {option.label}
                      </span>
                    </div>
                  </motion.label>
                );
              })}
            </div>

            {/* ERROR */}
            <AnimatePresence mode="wait">
              {hasError && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
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
