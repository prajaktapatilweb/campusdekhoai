"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import {
  Plus,
  Trash2,
  Pencil,
  CalendarDays,
  MapPin,
  Clock3,
  Loader2,
  Building2,
  Languages,
  Armchair,
  Square,
  User,
  Users,
} from "lucide-react";

import { Formik } from "formik";
import * as Yup from "yup";

import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

import FormInput from "@/components/Formik/FormInput";
import FormInputMarathi from "@/components/Formik/FormInputMarathi";
import {
  FormDateInput,
  FormTimeRangeInput,
} from "@/components/Formik/FormDateTimeInput";

interface Event {
  _id: string;
  city: string;
  cityMarathi: string;
  venue: string;
  venueMarathi: string;
  startDateTime: string;
  endDateTime: string;
  isActive: boolean;
  maxAttendees: number;
}

const validationSchema = Yup.object({
  city: Yup.string().required("Required"),
  cityMarathi: Yup.string().required("Required"),
  venue: Yup.string().required("Required"),
  venueMarathi: Yup.string().required("Required"),
  date: Yup.string().required("Required"),
  // time: Yup.string().required("Required"),
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

const initialValues = {
  city: "",
  cityMarathi: "",
  venue: "",
  venueMarathi: "",
  date: "",
  startTime: "16:00",
  endTime: "19:30",
  maxAttendees: 100,
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formInitialValues, setFormInitialValues] = useState(initialValues);

  const { user, loading: authLoading, isAdmin } = useAuth();

  const { language, t } = useLanguage();

  const router = useRouter();

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/login");
      } else if (!isAdmin) {
        router.push("/dashboard/staff");
      } else {
        fetchEvents();
      }
    }
  }, [user, authLoading, isAdmin, router]);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/event/get");
      if (!response.ok) {
        setLoading(false);
        return;
      }

      const contentType = response.headers.get("content-type");

      if (!contentType?.includes("application/json")) {
        throw new Error("Invalid response type");
      }

      const data = await response.json();

      if (data.success) {
        setEvents(data.data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (event?: Event) => {
    setError("");

    if (event) {
      setEditingEvent(event);

      setFormInitialValues({
        city: event.city,
        cityMarathi: event.cityMarathi,
        venue: event.venue,
        venueMarathi: event.venueMarathi,
        date: event.startDateTime.split("T")[0],

        startTime: new Date(event.startDateTime).toTimeString().slice(0, 5),

        endTime: new Date(event.endDateTime).toTimeString().slice(0, 5),
        maxAttendees: event.maxAttendees,
      });
    } else {
      setEditingEvent(null);
      setFormInitialValues(initialValues);
    }

    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingEvent(null);
    setError("");
  };

  const handleSubmit = async (values: typeof initialValues) => {
    setSubmitting(true);
    setError("");
    console.log("Form values on submit:", values);
    const { date, startTime, endTime, ...rest } = values;

    const startDateTime = new Date(`${date}T${startTime}`);

    const endDateTime = new Date(`${date}T${endTime}`);

    const payload = {
      ...rest,

      startDateTime,
      endDateTime,

      maxAttendees: Number(values.maxAttendees),
    };

    console.log("Submitting values:", payload, editingEvent);
    try {
      const url = editingEvent
        ? `/api/event/edit/${editingEvent._id}`
        : "/api/event/add";

      const method = editingEvent ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(
          editingEvent
            ? "Event updated successfully!"
            : "Event created successfully!",
        );

        handleCloseDialog();

        fetchEvents();

        setTimeout(() => {
          setSuccess("");
        }, 3000);
      } else {
        setError(data.error || "Failed to save event");
      }
    } catch (error) {
      console.error("Error saving event:", error);

      setError("Network error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) {
      return;
    }

    try {
      const response = await fetch(`/api/event/delete/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        setSuccess("Event deleted successfully!");

        fetchEvents();

        setTimeout(() => {
          setSuccess("");
        }, 3000);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300">
        <Loader2 className="h-14 w-14 animate-spin text-[#1a237e]" />
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* SUCCESS */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="mb-6 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-green-700"
            >
              {success}
            </motion.div>
          )}
        </AnimatePresence>

        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold text-[#1a237e]">
            {t("admin.events")}
          </h1>

          <button
            onClick={() => handleOpenDialog()}
            className="flex items-center gap-2 rounded-xl bg-[#f9a825] px-5 py-3 font-semibold text-[#1a237e] shadow-md transition hover:bg-[#f57f17]"
          >
            <Plus className="h-5 w-5" />
            {t("admin.add")}
          </button>
        </div>

        {/* EVENTS */}
        {events.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {events.map((event, index) => (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="rounded-3xl bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                {/* TITLE */}
                <div className="mb-5 flex items-start justify-between">
                  <h2 className="text-2xl font-bold text-[#1a237e]">
                    {language === "mr" ? event.cityMarathi : event.city}
                  </h2>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenDialog(event)}
                      className="rounded-lg p-2 text-[#1a237e] transition hover:bg-slate-100"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(event._id)}
                      className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* VENUE */}
                <div className="mb-3 flex items-start gap-3 text-slate-600">
                  <MapPin className="mt-0.5 h-4 w-4" />

                  <p className="text-sm">
                    {language === "mr" ? event.venueMarathi : event.venue}
                  </p>
                </div>

                {/* DATE */}
                <div className="mb-3 flex items-center gap-3 text-slate-600">
                  <CalendarDays className="h-4 w-4" />

                  <p className="text-sm">
                    {new Date(event.startDateTime).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                {/* TIME */}
                <div className="flex items-center gap-3 text-slate-600">
                  <Clock3 className="h-4 w-4" />

                  <p className="text-sm">
                    {new Date(event.startDateTime).toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {" - "}
                    {new Date(event.endDateTime).toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
            <CalendarDays className="mx-auto mb-5 h-16 w-16 text-slate-300" />

            <h3 className="text-xl font-semibold text-slate-500">
              No events created yet
            </h3>

            <button
              onClick={() => handleOpenDialog()}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#f9a825] px-5 py-3 font-semibold text-[#1a237e] transition hover:bg-[#f57f17]"
            >
              <Plus className="h-5 w-5" />
              Create First Event
            </button>
          </div>
        )}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {dialogOpen && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseDialog}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            />

            {/* DIALOG */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              // className="fixed top-1/2 left-1/2 z-50 w-[95%] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-6 shadow-2xl"
              // className="fixed top-1/2 left-1/2 z-50 max-h-[90vh] w-[95%] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl"
              className="fixed top-1/2 left-1/2 z-50 max-h-[90vh] w-[95%] max-w-2xl -translate-x-1/2 -translate-y-1/2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl"
            >
              <h2 className="mb-6 text-2xl font-bold text-[#1a237e]">
                {editingEvent ? "Edit Event" : "Add Event"}
              </h2>

              {error && (
                <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <Formik
                initialValues={formInitialValues}
                validationSchema={validationSchema}
                enableReinitialize
                onSubmit={handleSubmit}
              >
                {({ handleSubmit, values }) => (
                  <form onSubmit={handleSubmit}>
                    {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
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

                      {/* <FormInput
                        name="date"
                        label="Date"
                        placeholder="June 15, 2026"
                        icon={<CalendarDays size={18} />}
                      />

                      <FormInput
                        name="time"
                        label="Time"
                        placeholder="10:00 AM - 6:00 PM"
                        icon={<Clock3 size={18} />}
                      /> */}
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
                        onClick={handleCloseDialog}
                        className="rounded-xl border border-slate-200 px-5 py-2.5 font-medium text-slate-600 transition hover:bg-slate-100"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="flex min-w-[120px] items-center justify-center rounded-xl bg-[#f9a825] px-5 py-2.5 font-semibold text-[#1a237e] transition hover:bg-[#f57f17] disabled:opacity-70"
                      >
                        {submitting ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          t("admin.save")
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
