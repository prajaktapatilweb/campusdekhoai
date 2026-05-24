"use client";

import React, { useState } from "react";
import { Field } from "formik";
import { motion, AnimatePresence } from "motion/react";
import { CalendarDays, Clock3 } from "lucide-react";

interface InputProps {
  name: string;
  label: string;
}

export function FormDateInput({ name, label }: InputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <Field name={name}>
      {({ field, form }: any) => {
        const hasError = form.touched[name] && form.errors[name];

        return (
          <motion.div
            animate={{
              scale: focused ? 1.01 : 1,
            }}
            className="space-y-2"
          >
            <label className="block text-sm font-medium">{label}</label>

            <div className="relative">
              <CalendarDays
                size={18}
                className={`${hasError ? "text-red-500" : "text-[hsl(var(--muted-foreground))]"} absolute top-1/2 left-4 -translate-y-1/2`}
              />

              <input
                {...field}
                type="date"
                onFocus={() => setFocused(true)}
                onBlur={(e) => {
                  setFocused(false);
                  field.onBlur(e);
                }}
                className={`w-full rounded-2xl border py-3.5 pr-4 pl-12 text-sm transition-all outline-none ${
                  hasError
                    ? "border-red-500 focus:ring-red-500/20"
                    : "border-border focus:border-primary focus:ring-primary/20"
                }`}
              />
            </div>

            <AnimatePresence>
              {hasError && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
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

interface TimeRangeProps {
  startName: string;
  endName: string;
  label: string;
}

export function FormTimeRangeInput({
  startName,
  endName,
  label,
}: TimeRangeProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">{label}</label>

      <div className="grid grid-cols-2 gap-4">
        {/* START TIME */}
        <Field name={startName}>
          {({ field, form }: any) => {
            // const hasError = form.touched[startName] && form.errors[startName];
            const hasError = form.errors[startName];
            return (
              <div className="relative">
                <Clock3
                  size={18}
                  className={`${
                    hasError
                      ? "text-red-500"
                      : "text-[hsl(var(--muted-foreground))]"
                  } absolute top-1/2 left-4 -translate-y-1/2`}
                />

                <input
                  {...field}
                  type="time"
                  className={`w-full rounded-2xl border py-3.5 pr-4 pl-12 text-sm transition-all outline-none ${
                    hasError
                      ? "border-red-500"
                      : "border-border focus:border-primary"
                  }`}
                />
                <AnimatePresence>
                  {hasError && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-sm text-red-500"
                    >
                      {form.errors[startName]}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          }}
        </Field>

        {/* END TIME */}
        <Field name={endName}>
          {({ field, form }: any) => {
            // const hasError = form.touched[endName] && form.errors[endName];
            const hasError = form.errors[endName];

            return (
              <div className="relative">
                <Clock3
                  size={18}
                  className={`${
                    hasError
                      ? "text-red-500"
                      : "text-[hsl(var(--muted-foreground))]"
                  } absolute top-1/2 left-4 -translate-y-1/2`}
                />

                <input
                  {...field}
                  type="time"
                  className={`w-full rounded-2xl border py-3.5 pr-4 pl-12 text-sm transition-all outline-none ${
                    hasError
                      ? "border-red-500"
                      : "border-border focus:border-primary"
                  }`}
                />
                <AnimatePresence>
                  {hasError && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-sm text-red-500"
                    >
                      {form.errors[endName]}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          }}
        </Field>
      </div>
    </div>
  );
}
