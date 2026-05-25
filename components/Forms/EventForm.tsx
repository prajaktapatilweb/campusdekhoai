"use client";

import { Formik } from "formik";
import * as Yup from "yup";
import { Building2, Languages, Loader2, MapPin, Users } from "lucide-react";
import FormInput from "@/components/Formik/FormInput";
import FormInputMarathi from "@/components/Formik/FormInputMarathi";
import {
  FormDateInput,
  FormTimeRangeInput,
} from "@/components/Formik/FormDateTimeInput";
import { useLanguage } from "@/contexts/LanguageContext";

const validationSchema = Yup.object({
  city: Yup.string().required("Required"),
  cityMarathi: Yup.string().required("Required"),
  venue: Yup.string().required("Required"),
  venueMarathi: Yup.string().required("Required"),
  date: Yup.string().required("Required"),
  startTime: Yup.string().required("Start time required"),
  endTime: Yup.string()
    .required("End time required")
    .test("is-greater", "End time must be after start time", function (value) {
      const { startTime } = this.parent;

      if (!startTime || !value) return true;

      return value > startTime;
    }),
  maxAttendees: Yup.number()
    .required("Required")
    .min(1, "Must be at least 1")
    .max(10000, "Must be less than 10000"),
});

interface Props {
  initialValues: any;
  loading?: boolean;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

export default function EventForm({
  initialValues,
  loading = false,
  onSubmit,
  onCancel,
}: Props) {
  const { t } = useLanguage();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={onSubmit}
    >
      {({ handleSubmit, errors }) => (
        <form onSubmit={handleSubmit}>
          <pre>{JSON.stringify(errors, null, 2)}</pre>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormInput
              name="city"
              label="City (English)"
              placeholder="Enter city"
              icon={<Building2 size={18} />}
            />

            <FormInputMarathi
              name="cityMarathi"
              label="City (Marathi)"
              placeholder="शहर प्रविष्ट करा"
              icon={<Languages size={18} />}
            />

            <FormInput
              name="venue"
              label="Venue (English)"
              placeholder="Enter venue"
              icon={<MapPin size={18} />}
            />

            <FormInputMarathi
              name="venueMarathi"
              label="Venue (Marathi)"
              placeholder="स्थळ प्रविष्ट करा"
              icon={<MapPin size={18} />}
            />

            <FormDateInput name="date" label="Event Date" />

            <FormInput
              name="maxAttendees"
              label="Maximum Seats for the event"
              placeholder="500"
              icon={<Users size={18} />}
            />
          </div>
          <FormTimeRangeInput
            startName="startTime"
            endName="endTime"
            label="Event Time"
          />
          {/* ACTIONS */}
          <div className="mt-8 flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-xl border border-slate-200 px-5 py-2.5 font-medium text-slate-600 transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex min-w-[120px] items-center justify-center rounded-xl bg-[#f9a825] px-5 py-2.5 font-semibold text-[#1a237e] transition hover:bg-[#f57f17] disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                t("admin.save")
              )}
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
}
