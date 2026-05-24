"use client";

import { Formik, Form } from "formik";
import {
  Building2,
  Languages,
  MapPin,
  CalendarDays,
  Clock3,
} from "lucide-react";

import FormInput from "@/components/Formik/FormInput";
import FormSelect from "@/components/Formik/FormSelect";
import RadioGroup from "@/components/Formik/RadioGroup";

import { eventInitialValues } from "./eventInitialValues";
import { eventSchema } from "./eventSchema";
import {
  getDistrictOptions,
  getSeminarOptions,
} from "../constants/formOptions";
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  initialValues?: typeof eventInitialValues;
  loading?: boolean;
  onSubmit: (values: typeof eventInitialValues) => void;
}

export default function EventForm({
  initialValues = eventInitialValues,
  loading,
  onSubmit,
}: Props) {
  const { t } = useLanguage();

  const districtOptions = getDistrictOptions(t);

  const seminarOptions = getSeminarOptions(t);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={eventSchema}
      enableReinitialize
      onSubmit={onSubmit}
    >
      {() => (
        <Form>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormInput
              name="city"
              label="City (English)"
              placeholder="Enter city"
              icon={<Building2 size={18} />}
            />

            <FormInput
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

            <FormInput
              name="venueMarathi"
              label="Venue (Marathi)"
              placeholder="स्थळ प्रविष्ट करा"
              icon={<MapPin size={18} />}
            />

            <FormInput
              name="date"
              label="Date"
              placeholder="June 15, 2026"
              icon={<CalendarDays size={18} />}
            />

            <FormInput
              name="time"
              label="Time"
              placeholder="10:00 AM - 8:00 PM"
              icon={<Clock3 size={18} />}
            />

            {/* SELECT */}
            <FormSelect
              name="district"
              label="District"
              options={districtOptions}
            />

            {/* RADIO */}
            <RadioGroup
              name="attendingSeminar"
              label="Attending Seminar?"
              options={seminarOptions}
            />
          </div>

          {/* BUTTONS */}
          <div className="mt-8 flex justify-end gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex min-w-[140px] items-center justify-center rounded-xl bg-[#f9a825] px-5 py-3 font-semibold text-[#1a237e] transition hover:bg-[#f57f17]"
            >
              {loading ? "Saving..." : "Save Event"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
