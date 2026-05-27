"use client";

import { Formik } from "formik";
import * as Yup from "yup";
import {
  Building2,
  Languages,
  Loader2,
  Mail,
  MapPin,
  Phone,
  User2,
  Users,
} from "lucide-react";
import FormInput from "@/components/Formik/FormInput";
import FormInputMarathi from "@/components/Formik/FormInputMarathi";
import {
  FormDateInput,
  FormTimeRangeInput,
} from "@/components/Formik/FormDateTimeInput";
import { useLanguage } from "@/contexts/LanguageContext";
import RadioGroup from "../Formik/RadioGroup";
import User from "@/models/User";

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  role: Yup.string().required("Required"),
});

interface Props {
  initialValues: any;
  loading?: boolean;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

export default function UserForm({
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
      {({ handleSubmit, errors, values }) => (
        <form onSubmit={handleSubmit}>
          {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormInput
              name="name"
              label="Name"
              placeholder="Enter Name"
              icon={<User2 size={18} />}
            />

            <FormInputMarathi
              name="email"
              label="Email"
              placeholder="Enter email Id"
              icon={<Mail size={18} />}
            />

            <FormInput
              name="phone"
              label="Phone Number"
              placeholder="Enter 10 digit mobile number"
              icon={<Phone size={18} />}
            />
            <RadioGroup
              name="role"
              label="Select Role of the user"
              options={[
                { label: "Admin", value: "admin" },
                { label: "Staff", value: "staff" },
                { label: "College", value: "college" },
              ]}
            />
          </div>
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
