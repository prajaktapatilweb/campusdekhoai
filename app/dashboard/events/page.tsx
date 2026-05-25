"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Plus,
  Trash2,
  Pencil,
  CalendarDays,
  MapPin,
  Clock3,
  Loader2,
} from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";

import EventForm from "@/components/Forms/EventForm";
import AppModal from "@/components/@/AppModal";
import DeleteDialog from "@/components/@/DeleteDialog";

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
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedDeleteEvent, setSelectedDeleteEvent] = useState<Event | null>(
    null,
  );
  const [deleteLoading, setDeleteLoading] = useState(false);

  const { language, t } = useLanguage();

  useEffect(() => {
    fetchEvents();
  }, []);

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

    const { date, startTime, endTime, ...rest } = values;
    const startDateTime = new Date(`${date}T${startTime}`);
    const endDateTime = new Date(`${date}T${endTime}`);
    const payload = {
      ...rest,
      startDateTime,
      endDateTime,
      maxAttendees: Number(values.maxAttendees),
    };

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

  const confirmDelete = async () => {
    if (!selectedDeleteEvent) return;
    try {
      setDeleteLoading(true);

      const response = await fetch(
        `/api/event/delete/${selectedDeleteEvent._id}`,
        {
          method: "DELETE",
        },
      );
      const data = await response.json();
      if (data.success) {
        setSuccess("Event deleted successfully!");
        fetchEvents();
        setDeleteOpen(false);
        setSelectedDeleteEvent(null);
        setTimeout(() => {
          setSuccess("");
        }, 3000);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    } finally {
      setDeleteLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#1a237e]" />
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
                      onClick={() => {
                        setSelectedDeleteEvent(event);
                        setDeleteOpen(true);
                      }}
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
      <AppModal
        open={dialogOpen}
        title={editingEvent ? "Edit Event" : "Add Event"}
        onClose={handleCloseDialog}
      >
        <EventForm
          initialValues={formInitialValues}
          loading={submitting}
          onSubmit={handleSubmit}
          onCancel={handleCloseDialog}
        />
        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}
      </AppModal>
      <DeleteDialog
        open={deleteOpen}
        loading={deleteLoading}
        title="Delete Event"
        message={`Are you sure you want to delete ${
          selectedDeleteEvent?.city || "this event"
        }?`}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedDeleteEvent(null);
        }}
        onConfirm={confirmDelete}
      />
    </>
  );
}
