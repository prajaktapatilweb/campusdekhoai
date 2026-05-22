"use client";

import React from "react";
import Axios from "axios";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import {

  Clock,
  Send,
  CheckCircle2,
} from "lucide-react";
import ContactForm from "./contactForm";
import NewContactForm from "./newContactForm";


const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "+91 9175932227 ",
    href: "tel:+9175932227 ",
  },
  {
    icon: Mail,
    label: "Email",
    value: "vakratundtech@gmail.com",
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





const Contact: React.FC = () => {


  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 },
    },
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-[hsl(var(--card))] py-24 md:py-32">
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

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            //  className="w-full lg:w-2/5"
            className="lg:col-span-6"
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
          {/* <ContactForm /> */}
          <NewContactForm />
        </div>
      </div>



    </section>
  );
};

export default Contact;
