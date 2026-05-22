"use client";

import React, { useState } from "react";
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

interface FormValues {
    name: string;
    mobilenumber: string;
    msg: string;
    email: string;
    // recaptcha: string;
}

const validationSchema: yup.ObjectSchema<FormValues> = yup.object({
    name: yup.string().required("Name is required"),
    mobilenumber: yup
        .string()
        .required("Mobile Number is mandatory")
        .matches(/^[0-9]+$/, "Only digits allowed")
        .length(10, "Only 10 digit mobile number"),
    msg: yup.string().required(),
    email: yup.string().required(),
    //   recaptcha: yup.string()
    //   .required("Please complete the reCAPTCHA"),
});


export default function ContactForm() {
    const router = useRouter();
    const [submitted, setSubmitted] = useState(false);

    const onSubmit = async (
        values: FormValues,
        helpers: FormikHelpers<FormValues>
    ): Promise<void> => {
        try {
            await Axios.post("/api/nodemail", {
                name: values.name,
                mobileno: values.mobilenumber,
                msg: values.msg,
                email: values.email,
            });
            setSubmitted(true);
            // router.push("/thankyou");
            helpers.resetForm();
        } catch (error) {
            console.log('SSS', error)
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
            {/* RIGHT SIDE FORM */}
            {
                submitted ? (
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
                            We've received your message. Our team will get back to you shortly.
                        </p>
                        <button
                            onClick={() => setSubmitted(false)}
                            className="mt-6 text-sm text-[hsl(var(--primary))] underline"
                        >
                            Send another message
                        </button>

                    </motion.div>
                ) : (

                    < Formik<FormValues>
                        initialValues={{
                            name: "",
                            mobilenumber: "",
                            msg: "",
                            email: "",
                            // recaptcha: "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}

                    >
                        {({ isSubmitting }) => (
                            <Form className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-6 md:p-10">
                                <div className="mb-8 grid gap-6 md:grid-cols-1">
                                    {/* Name */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-[hsl(var(--foreground))]"
                                        >
                                            Name
                                        </label>
                                        <Field
                                            name="name"
                                            type="text"
                                            className="w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--input))] px-4 py-3 text-sm text-[hsl(var(--foreground))] placeholder-[hsl(var(--muted-foreground))] outline-none transition-all focus:border-[hsl(var(--primary))] focus:ring-1 focus:ring-[hsl(var(--primary))]"
                                            placeholder="Your name"
                                        />
                                        <ErrorMessage
                                            name="name"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>

                                    {/* Mobile */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-[hsl(var(--foreground))]">
                                            Mobile Number
                                        </label>
                                        <Field
                                            name="mobilenumber"
                                            type="text"
                                            className="w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--input))] px-4 py-3 text-sm text-[hsl(var(--foreground))] placeholder-[hsl(var(--muted-foreground))] outline-none transition-all focus:border-[hsl(var(--primary))] focus:ring-1 focus:ring-[hsl(var(--primary))]"
                                            placeholder="+91 XXXXX XXXXX" />
                                        <ErrorMessage
                                            name="mobilenumber"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>

                                    {/* Select */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-[hsl(var(--foreground))]">
                                            Email
                                        </label>
                                        <Field
                                            name="email"
                                            type="text"
                                            className="w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--input))] px-4 py-3 text-sm text-[hsl(var(--foreground))] placeholder-[hsl(var(--muted-foreground))] outline-none transition-all focus:border-[hsl(var(--primary))] focus:ring-1 focus:ring-[hsl(var(--primary))]"
                                            placeholder="you@company.com" />
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>


                                    {/* Message */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-[hsl(var(--foreground))]">
                                            Message
                                        </label>
                                        <Field
                                            as="textarea"
                                            name="msg"
                                            rows={4}
                                            className="w-full resize-none rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--input))] px-4 py-3 text-sm text-[hsl(var(--foreground))] placeholder-[hsl(var(--muted-foreground))] outline-none transition-all focus:border-[hsl(var(--primary))] focus:ring-1 focus:ring-[hsl(var(--primary))]"
                                            placeholder="Describe your requirements..." />
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}

                                        className="group flex items-center gap-2 rounded-full bg-[hsl(var(--primary))] px-8 py-3.5 text-sm font-semibold text-[hsl(var(--primary-foreground))] transition-all hover:shadow-lg hover:shadow-[hsl(var(--primary))]/25"
                                    >
                                        {isSubmitting ? "Submitting..." : "Submit"}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>)}


        </motion.div >
    )
}
