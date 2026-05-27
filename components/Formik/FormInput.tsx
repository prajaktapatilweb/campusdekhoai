"use client";

import React, { useState } from "react";
import { Field } from "formik";
import { motion, AnimatePresence } from "motion/react";

interface FormInputProps {
  name: string;
  label: string;
  placeholder?: string;
  icon?: React.ReactNode;
  type?: string;
}

export default function FormInput({
  name,
  label,
  placeholder,
  icon,
  type = "text",
}: FormInputProps) {
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
            {/* LABEL */}
            <label className="block text-sm font-semibold text-[hsl(var(--foreground))]">
              {label}
            </label>

            {/* INPUT WRAPPER */}
            <div className="relative">
              {/* ICON */}
              {icon && (
                <div
                  className={`absolute top-1/2 left-4 z-100 -translate-y-1/2 transition-colors duration-300 ${
                    hasError
                      ? "text-red-500"
                      : "text-[hsl(var(--muted-foreground))]"
                  }`}
                >
                  {icon}
                </div>
              )}

              <input
                {...field}
                suppressHydrationWarning
                type={type}
                placeholder={placeholder}
                onFocus={() => setFocused(true)}
                onBlur={(e) => {
                  setFocused(false);
                  field.onBlur(e);
                }}
                className={`w-full rounded-2xl border bg-[hsl(var(--input))/0.7] py-3.5 pr-4 pl-12 text-sm text-[hsl(var(--foreground))] placeholder-[hsl(var(--muted-foreground))] backdrop-blur-md transition-all duration-300 outline-none ${
                  hasError
                    ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                    : "border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] focus:ring-2 focus:ring-[hsl(var(--primary))]/20"
                } `}
              />
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
