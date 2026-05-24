"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import {
  Plus,
  Trash2,
  Pencil,
  LogOut,
  CalendarDays,
  MapPin,
  Clock3,
  Loader2,
} from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface Event {
  _id: string;
  city: string;
  cityMarathi: string;
  venue: string;
  venueMarathi: string;
  date: string;
  time: string;
  isActive: boolean;
}

export default function AdminDashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const [formData, setFormData] = useState({
    city: "",
    cityMarathi: "",
    venue: "",
    venueMarathi: "",
    date: "",
    time: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { user, loading: authLoading, logout, isAdmin } = useAuth();
  const { language, setLanguage, t } = useLanguage();

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
      const response = await fetch("/api/events");
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
    if (event) {
      setEditingEvent(event);

      setFormData({
        city: event.city,
        cityMarathi: event.cityMarathi,
        venue: event.venue,
        venueMarathi: event.venueMarathi,
        date: event.date,
        time: event.time,
      });
    } else {
      setEditingEvent(null);

      setFormData({
        city: "",
        cityMarathi: "",
        venue: "",
        venueMarathi: "",
        date: "",
        time: "",
      });
    }

    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingEvent(null);
    setError("");
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");

    try {
      const url = editingEvent
        ? `/api/events/${editingEvent._id}`
        : "/api/events";

      const method = editingEvent ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const response = await fetch(`/api/events/${id}`, {
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

  const handleLanguageChange = (lang: "en" | "mr") => {
    setLanguage(lang);
  };

  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300">
        <Loader2 className="h-14 w-14 animate-spin text-[#1a237e]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#1a237e] shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <Image
              src="/images/pudharilogo.png"
              width="200"
              height="50"
              alt="Pudhari Campus 2 Career Logo"
            />

            <span className="rounded-full bg-[#f9a825] px-4 py-1 text-sm font-semibold text-[#1a237e]">
              Admin
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* LANGUAGE */}
            <div className="flex overflow-hidden rounded-lg border border-white/20">
              <button
                onClick={() => handleLanguageChange("en")}
                className={`px-4 py-2 text-sm font-medium transition ${
                  language === "en"
                    ? "bg-[#f9a825] text-[#1a237e]"
                    : "bg-transparent text-white"
                }`}
              >
                EN
              </button>

              <button
                onClick={() => handleLanguageChange("mr")}
                className={`px-4 py-2 text-sm font-medium transition ${
                  language === "mr"
                    ? "bg-[#f9a825] text-[#1a237e]"
                    : "bg-transparent text-white"
                }`}
              >
                मराठी
              </button>
            </div>

            <p className="hidden text-sm font-medium text-white md:block">
              {user?.name}
            </p>

            <button
              onClick={logout}
              className="rounded-lg p-2 text-white transition hover:bg-white/10"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* CONTENT */}
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

        {/* TOP BAR */}
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

        {/* EVENTS GRID */}
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

                  <p className="text-sm">{event.date}</p>
                </div>

                {/* TIME */}
                <div className="flex items-center gap-3 text-slate-600">
                  <Clock3 className="h-4 w-4" />

                  <p className="text-sm">{event.time}</p>
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

      {/* DIALOG */}
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

            {/* MODAL */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="fixed top-1/2 left-1/2 z-50 w-[95%] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-6 shadow-2xl"
            >
              <h2 className="mb-6 text-2xl font-bold text-[#1a237e]">
                {editingEvent ? "Edit Event" : t("admin.add")}
              </h2>

              {error && (
                <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <InputField
                  label="City (English)"
                  value={formData.city}
                  onChange={(value) =>
                    setFormData({ ...formData, city: value })
                  }
                />

                <InputField
                  label="City (Marathi)"
                  value={formData.cityMarathi}
                  onChange={(value) =>
                    setFormData({
                      ...formData,
                      cityMarathi: value,
                    })
                  }
                />

                <InputField
                  label="Venue (English)"
                  value={formData.venue}
                  onChange={(value) =>
                    setFormData({ ...formData, venue: value })
                  }
                />

                <InputField
                  label="Venue (Marathi)"
                  value={formData.venueMarathi}
                  onChange={(value) =>
                    setFormData({
                      ...formData,
                      venueMarathi: value,
                    })
                  }
                />

                <InputField
                  label={t("admin.date")}
                  value={formData.date}
                  placeholder="e.g., June 15, 2026"
                  onChange={(value) =>
                    setFormData({ ...formData, date: value })
                  }
                />

                <InputField
                  label={t("admin.time")}
                  value={formData.time}
                  placeholder="e.g., 10:00 AM - 6:00 PM"
                  onChange={(value) =>
                    setFormData({ ...formData, time: value })
                  }
                />
              </div>

              {/* ACTIONS */}
              <div className="mt-8 flex justify-end gap-3">
                <button
                  onClick={handleCloseDialog}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 font-medium text-slate-600 transition hover:bg-slate-100"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSubmit}
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
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

interface InputFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

function InputField({ label, value, placeholder, onChange }: InputFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 transition outline-none focus:border-[#1a237e] focus:ring-4 focus:ring-[#1a237e]/10"
      />
    </div>
  );
}
