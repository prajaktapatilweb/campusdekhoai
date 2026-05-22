"use client";

import React, { useState } from "react";
import Axios from "axios";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as yup from "yup";
// import { motion, AnimatePresence } from "framer-motion";
import { motion, AnimatePresence } from "motion/react";

import { User, Phone, Mail, MessageSquare, Send, CheckCircle2, GraduationCap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import FormInput from "./Formik/FormInput";
import FormSelect from "./Formik/FormSelect";
import RadioGroup from "./Formik/RadioGroup";
import {
  getDistrictOptions,
  getReferenceOptions,
  getSeminarOptions,
  getTargetStreamOptions,
} from "@/components/constants/formOptions";

interface FormValues {
  fullname: string;
  email: string;
  phone: string;
  whatsapp: string;
  education: string;
  targetStream: string;
  attendedSeminar: string;
  reference: string;
  district: string;
}

const validationSchema: yup.ObjectSchema<FormValues> = yup.object({
  fullname: yup.string().required("Required"),
  email: yup.string().email("Invalid email").required("Required"),

  phone: yup
    .string()
    .required("Required")
    .matches(/^[0-9]+$/, "Only digits allowed")
    .length(10, "Enter 10 digit number"),

  whatsapp: yup
    .string()
    .required("Required")
    .matches(/^[0-9]+$/, "Only digits allowed")
    .length(10, "Enter 10 digit number"),

  education: yup.string().required("Required"),
  targetStream: yup.string().required("Required"),
  attendedSeminar: yup.string().required("Required"),
  reference: yup.string().required("Required"),
  district: yup.string().required("Required"),
});

/* =========================================================
   REUSABLE INPUT COMPONENT
========================================================= */

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function NewContactForm() {
  const { t } = useLanguage();

  const targetStreamOptions = getTargetStreamOptions(t);

  const referenceOptions = getReferenceOptions(t);

  const districtOptions = getDistrictOptions(t);

  const seminarOptions = getSeminarOptions(t);

  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (
    values: FormValues,
    helpers: FormikHelpers<FormValues>,
  ): Promise<void> => {
    try {
      await Axios.post("/api/nodemail", values);

      setSubmitted(true);

      helpers.resetForm();
    } catch (error) {
      console.log(error);

      alert("Error in submission. Please resubmit.");
    } finally {
      helpers.setSubmitting(false);
    }
  };

  return (
    <motion.div
      className="lg:col-span-6"
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
            }}
            transition={{
              duration: 0.4,
            }}
            className="
              flex flex-col items-center justify-center
              rounded-3xl border border-[hsl(var(--border))]
              bg-[hsl(var(--background))/0.7]
              backdrop-blur-xl
              p-10 text-center
            "
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 12,
              }}
            >
              <CheckCircle2 className="mb-5 h-20 w-20 text-[hsl(var(--primary))]" />
            </motion.div>

            <h4 className="mb-2 text-3xl font-bold text-[hsl(var(--foreground))]">Thank You!</h4>

            <p className="max-w-md text-[hsl(var(--muted-foreground))]">
              We've received your message. Our team will get back to you shortly.
            </p>

            <button
              onClick={() => setSubmitted(false)}
              className="
                mt-6 rounded-full border border-[hsl(var(--border))]
                px-5 py-2 text-sm font-medium
                transition-all duration-300
                hover:bg-[hsl(var(--primary))]
                hover:text-[hsl(var(--primary-foreground))]
              "
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Formik<FormValues>
              initialValues={{
                fullname: "",
                email: "",
                phone: "",
                whatsapp: "",
                education: "",
                targetStream: "",
                attendedSeminar: "",
                reference: "",
                district: "",
              }}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form
                  className="
                    rounded-3xl border border-white/10
                    bg-[hsl(var(--background))/0.65]
                    backdrop-blur-xl
                    p-6 md:p-10
                    shadow-2xl
                  "
                >
                  {/* HEADER */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                  >
                    <h3 className="text-3xl font-bold text-[hsl(var(--foreground))]">Contact Us</h3>

                    <p className="mt-2 text-[hsl(var(--muted-foreground))]">
                      Fill the form and our team will contact you shortly.
                    </p>
                  </motion.div>

                  {/* FIELDS */}
                  <motion.div
                    variants={{
                      hidden: {},
                      show: {
                        transition: {
                          staggerChildren: 0.1,
                        },
                      },
                    }}
                    initial="hidden"
                    animate="show"
                    className="space-y-6"
                  >
                    {/* FULL NAME */}

                    <FormInput
                      name="fullname"
                      label={t("form.fullname")}
                      placeholder={t("form.fullname.placeholder")}
                      icon={<User size={18} />}
                    />

                    {/* EMAIL */}

                    <FormInput
                      name="email"
                      label={t("form.email")}
                      placeholder={t("form.email.placeholder")}
                      icon={<Mail size={18} />}
                    />

                    {/* PHONE + WHATSAPP */}

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <FormInput
                        name="phone"
                        label={t("form.phone")}
                        placeholder={t("form.phone.placeholder")}
                        icon={<Phone size={18} />}
                      />

                      <FormInput
                        name="whatsapp"
                        label={t("form.whatsapp")}
                        placeholder={t("form.phone.placeholder")}
                        icon={<MessageSquare size={18} />}
                      />
                    </div>

                    {/* EDUCATION */}

                    <FormInput
                      name="education"
                      label={t("form.education")}
                      placeholder={t("form.education.placeholder")}
                      icon={<GraduationCap size={18} />}
                    />

                    {/* TARGET STREAM */}
                    <FormSelect
                      name="targetStream"
                      label={t("form.targetstream")}
                      options={targetStreamOptions}
                    />

                    <FormSelect
                      name="reference"
                      label={t("form.reference")}
                      options={referenceOptions}
                    />

                    <FormSelect
                      name="district"
                      label={t("form.district")}
                      options={districtOptions}
                    />
                    {/* RADIO */}
                    <RadioGroup
                      name="attendedSeminar"
                      label={t("form.seminar")}
                      options={seminarOptions}
                    />


                    {/* BUTTON */}
                    <motion.button
                      whileHover={{
                        scale: 1.03,
                      }}
                      whileTap={{
                        scale: 0.97,
                      }}
                      disabled={isSubmitting}
                      type="submit"
                      className="
                        group flex w-full items-center justify-center gap-2
                        rounded-2xl
                        bg-[hsl(var(--primary))]
                        px-8 py-4
                        text-sm font-sans font-semibold
                        text-[hsl(var(--primary-foreground))]
                        transition-all duration-300
                        hover:shadow-xl
                        hover:shadow-[hsl(var(--primary))]/30
                        disabled:opacity-70
                      "
                    >
                      {isSubmitting ? (
                        "Submitting..."
                      ) : (
                        <>
                          {t("nav.login")}
                          {/* Submit Message */}
                          <Send
                            size={18}
                            className="
                              transition-transform duration-300
                              group-hover:translate-x-1
                            "
                          />
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                </Form>
              )}
            </Formik>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
