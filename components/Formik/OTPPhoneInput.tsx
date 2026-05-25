"use client";

import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Field, useFormikContext } from "formik";
import { motion, AnimatePresence } from "motion/react";

import { Phone, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";

interface Props {
  name: string;
  label?: string;
  placeholder?: string;

  onVerified?: (verified: boolean) => void;
}

export default function OTPPhoneInput({
  name,
  label = "Phone Number",
  placeholder = "Enter phone number",
  onVerified,
}: Props) {
  const { values, errors, touched, setFieldValue } = useFormikContext<any>();

  const phone = values[name];

  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);

  const [verified, setVerified] = useState(false);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [countdown, setCountdown] = useState(0);

  // =========================
  // COUNTDOWN TIMER
  // =========================

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [countdown]);

  // =========================
  // SEND OTP
  // =========================

  const sendOtp = async () => {
    try {
      setMessage("");

      if (!phone || phone.length !== 10) {
        setMessage("Enter valid phone number");
        return;
      }

      setLoading(true);

      const response = await Axios.post("/api/otp/send", {
        phone,
      });

      if (response.data.success) {
        setOtpSent(true);

        setCountdown(60);

        setMessage("OTP sent successfully");
      }
    } catch (error: any) {
      setMessage(error?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // VERIFY OTP
  // =========================

  const verifyOtp = async () => {
    try {
      setLoading(true);

      setMessage("");

      const response = await Axios.post("/api/otp/verify", {
        phone,
        otp,
      });

      if (response.data.success) {
        setVerified(true);

        setOtpSent(false);

        setMessage("Phone verified successfully");

        setFieldValue("phoneVerified", true);

        onVerified?.(true);
      }
    } catch (error: any) {
      setMessage(error?.response?.data?.message || "OTP verification failed");

      setFieldValue("phoneVerified", false);

      onVerified?.(false);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // RESET IF PHONE CHANGES
  // =========================

  const [previousPhone, setPreviousPhone] = useState("");

  useEffect(() => {
    if (previousPhone && previousPhone !== phone) {
      setVerified(false);
      setOtp("");
      setOtpSent(false);
      setFieldValue("phoneVerified", false);
    }
    setPreviousPhone(phone);
  }, [phone]);

  const hasError = touched[name] && errors[name];
  const verificationError = touched.phoneVerified && errors.phoneVerified;

  return (
    <div className="space-y-3">
      {/* LABEL */}
      <label className="block text-sm font-medium">{label}</label>

      {/* PHONE FIELD */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Phone
            size={18}
            className={`absolute top-1/2 left-4 -translate-y-1/2 ${
              hasError ? "text-red-500" : "text-[hsl(var(--muted-foreground))]"
            }`}
          />

          <Field name={name}>
            {({ field, form }: any) => (
              <input
                {...field}
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={10}
                disabled={verified}
                placeholder={placeholder}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/\D/g, "") // remove non-digits
                    .slice(0, 10); // limit to 10 digits

                  form.setFieldValue(name, value);
                }}
                className={`w-full rounded-2xl border py-3.5 pr-4 pl-12 text-sm transition-all outline-none ${
                  hasError
                    ? "border-red-500"
                    : "border-border focus:border-primary"
                } ${verified ? "bg-green-50" : ""}`}
              />
            )}
          </Field>
        </div>

        {/* SEND BUTTON */}
        {!verified && (
          <button
            type="button"
            disabled={loading || countdown > 0}
            onClick={sendOtp}
            className="rounded-2xl bg-[hsl(var(--primary))] px-5 py-3 text-sm font-semibold whitespace-nowrap text-[hsl(var(--primary-foreground))] transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : countdown > 0 ? (
              `${countdown}s`
            ) : otpSent ? (
              "Resend OTP"
            ) : (
              "Send OTP"
            )}
          </button>
        )}
      </div>

      {/* FORM ERROR */}
      <AnimatePresence>
        {/* {verificationError && !verified && ( */}
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="text-sm text-red-500"
        >
          {errors.phoneVerified as string}
        </motion.div>
        {/* )} */}
      </AnimatePresence>

      {/* OTP FIELD */}
      <AnimatePresence>
        {otpSent && !verified && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            className="space-y-3"
          >
            <div className="relative">
              <ShieldCheck
                size={18}
                className="absolute top-1/2 left-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]"
              />

              <input
                type="text"
                value={otp}
                maxLength={6}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter 6 digit OTP"
                className="border-border focus:border-primary w-full rounded-2xl border py-3.5 pr-4 pl-12 text-sm transition-all outline-none"
              />
            </div>

            <button
              type="button"
              disabled={loading || otp.length !== 6}
              onClick={verifyOtp}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-green-700 disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <ShieldCheck size={18} />
                  Verify OTP
                </>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SUCCESS */}
      <AnimatePresence>
        {verified && (
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
            className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
          >
            <CheckCircle2 size={18} />
            Phone number verified
          </motion.div>
        )}
      </AnimatePresence>

      {/* MESSAGE */}
      <AnimatePresence>
        {message && !verified && (
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
            className={`text-sm ${
              message.toLowerCase().includes("success")
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
