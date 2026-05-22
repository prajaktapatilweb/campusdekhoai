"use client";

import React, { useState } from "react";
import { Field } from "formik";
import { motion, AnimatePresence } from "motion/react";


interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
  name: string;
  label: string;
  options: RadioOption[];
}

export default function RadioGroup({
  name,
  label,
  options,
}: RadioGroupProps) {
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
            <label className="block text-sm font-semibold text-[hsl(var(--foreground))]">
              {label}
            </label>

            <div className="flex flex-wrap gap-6">
              {options.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-2 text-sm text--[hsl(var(--foreground))]"
                >
                  <input
                    type="radio"
                    name={name}
                    value={option.value}
                    checked={field.value === option.value}
                    onChange={() =>
                      form.setFieldValue(name, option.value)
                    }
                    className="h-4 w-4"
                  />

                  {option.label}
                </label>
              ))}
            </div>
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