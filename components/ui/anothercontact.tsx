"use client";

import React from "react"

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
} from "lucide-react";
import * as yup from 'yup';
import Axios from 'axios';
import { useRouter } from "next/router";


const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "+9175932227 ",
    href: "tel:+9175932227 ",
  },
  {
    icon: Mail,
    label: "Email",
    value: " vakratundtech@gmail.com ",
    href: "mailto: vakratundtech@gmail.com ",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Office No-4, Jay Shri Hari Building Vinayak Nagar Lane No-2 Kate Puram Chowk Opposite RK Complex Pimple Gurav Pune 411061",
    href: "#",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon - Sat: 9:00 AM - 7:00 PM",
    href: "#",
  },
];

interface FormValues {
  name: string;
  email: string;
  mobilenumber: string;
  msg: string;
  selection: string;
}

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const router = useRouter();
  const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  mobilenumber: yup
    .string()
    .required('Mobile Number is mandatory')
    .matches(/^[0-9]+$/, 'Only digits are allowed for this field ')
    .length(10, 'Only 10 digit mobile number'),
  selection: yup.string(),
  recaptcha: yup.string().required('Please complete the reCAPTCHA'),  // Make reCAPTCHA required
});


  // const handleSubmit = (e: React.FormEvent) => {

  //   e.preventDefault();
  //   setSubmitted(true);
  //   setTimeout(() => {
  //     setSubmitted(false);
  //     setFormData({ name: "", email: "", phone: "", service: "", message: "" });
  //   }, 3000);
  // };
const onSubmit = async (
  values: FormValues,
  helpers:any
  // submitProps: <FormValues>
): Promise<void> => {
  try {
    console.log({ values });

    await Axios.post("/api/nodemail", {
      name: values.name,
      email: values.email,
      mobileno: values.mobilenumber,
      msg: values.msg,
      selection: values.selection,
    });

    router.push("/thankyou");
    helpers.setSubmitting(false);
    helpers.resetForm();
  } catch (error) {
    console.error("Submission error:", error);
    alert("Error in submission. Please resubmit");
    helpers.setSubmitting(false);
  }
};

  return (
    <section id="contact" className="relative overflow-hidden bg-[hsl(var(--card))] py-24 md:py-32">
      {/* Background */}
      <div className="absolute left-1/3 top-0 h-96 w-96 rounded-full bg-[hsl(var(--primary))]/3 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-[hsl(var(--primary))]/30 bg-[hsl(var(--primary))]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[hsl(var(--primary))]">
            Contact Us
          </span>
          <h2 className="font-serif text-4xl font-bold text-[hsl(var(--foreground))] md:text-5xl">
            Get In{" "}
            <span className="text-[hsl(var(--primary))]">Touch</span>
          </h2>
          {/* <p className="mx-auto mt-4 max-w-2xl text-[hsl(var(--muted-foreground))]">
            Ready to elevate your IT infrastructure? Contact us for a free consultation
            and customized quote.
          </p> */}
        </motion.div>

        <div className="flex flex-col gap-12 lg:flex-row">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-2/5"
          >
            <h3 className="mb-6 font-serif text-2xl font-bold text-[hsl(var(--foreground))]">
              Let{"'"}s discuss your requirements
            </h3>
            <p className="mb-8 leading-relaxed text-[hsl(var(--muted-foreground))]">
              Whether you need rental equipment, networking setup, CCTV installation,
              or any IT service - our team is ready to help. We serve Kharadi, Hinjwadi,
              Baner, and deliver across India.
            </p>

            <div className="flex flex-col gap-4">
              {contactInfo.map((info, i) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="group flex items-center gap-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-4 transition-all hover:border-[hsl(var(--primary))]/30 hover:shadow-md hover:shadow-[hsl(var(--primary))]/5"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] transition-colors group-hover:bg-[hsl(var(--primary))]/20">
                    <info.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                      {info.label}
                    </p>
                    <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Service areas */}
            <div className="mt-8 rounded-xl border border-[hsl(var(--primary))]/20 bg-[hsl(var(--primary))]/5 p-5">
              <p className="mb-3 text-sm font-semibold text-[hsl(var(--primary))]">
                We deliver across India
              </p>
              <p className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                Pune (Kharadi, Hinjwadi, Baner) | Chennai | Bangalore | Madurai | Noida | UP
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-3/5"
          >
            <form
              onSubmit={onSubmit}

                initialValues={{
                    name: '',
                    mobilenumber: '',
                    msg: '',
                    selection: '',
                    recaptcha: ''
                  }}
              className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-6 md:p-10"
             validationSchema={validationSchema}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <CheckCircle2 className="mb-4 h-16 w-16 text-[hsl(var(--primary))]" />
                  <h4 className="mb-2 font-serif text-2xl font-bold text-[hsl(var(--foreground))]">
                    Thank You!
                  </h4>
                  <p className="text-[hsl(var(--muted-foreground))]">
                    We{"'"}ve received your message. Our team will get back to you shortly.
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="mb-8 grid gap-6 md:grid-cols-1">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-[hsl(var(--foreground))]"
                      >
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--input))] px-4 py-3 text-sm text-[hsl(var(--foreground))] placeholder-[hsl(var(--muted-foreground))] outline-none transition-all focus:border-[hsl(var(--primary))] focus:ring-1 focus:ring-[hsl(var(--primary))]"
                        placeholder="Your name"
                      />
                    </div>
                    </div>
                    <div className="mb-8 grid gap-6 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-[hsl(var(--foreground))]"
                      >
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--input))] px-4 py-3 text-sm text-[hsl(var(--foreground))] placeholder-[hsl(var(--muted-foreground))] outline-none transition-all focus:border-[hsl(var(--primary))] focus:ring-1 focus:ring-[hsl(var(--primary))]"
                        placeholder="you@company.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-medium text-[hsl(var(--foreground))]"
                      >
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--input))] px-4 py-3 text-sm text-[hsl(var(--foreground))] placeholder-[hsl(var(--muted-foreground))] outline-none transition-all focus:border-[hsl(var(--primary))] focus:ring-1 focus:ring-[hsl(var(--primary))]"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                   
                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-medium text-[hsl(var(--foreground))]"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full resize-none rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--input))] px-4 py-3 text-sm text-[hsl(var(--foreground))] placeholder-[hsl(var(--muted-foreground))] outline-none transition-all focus:border-[hsl(var(--primary))] focus:ring-1 focus:ring-[hsl(var(--primary))]"
                      placeholder="Describe your requirements..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="group flex items-center gap-2 rounded-full bg-[hsl(var(--primary))] px-8 py-3.5 text-sm font-semibold text-[hsl(var(--primary-foreground))] transition-all hover:shadow-lg hover:shadow-[hsl(var(--primary))]/25"
                  >
                    <Send className="h-4 w-4" />
                    Send Message
                  </button>
                </>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
