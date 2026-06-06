"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

import {
  Search,
  LogOut,
  Download,
  Users,
  MapPin,
  CalendarDays,
  Loader2,
} from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface Student {
  _id: string;
  fullname: string;
  email: string;
  phone: string;
  evenetLocation: string;
  district: string;
  createdAt: string;
  // New fields matching your backend response format:
  attendingSeminar?: string;
  education?: string;
  helpNeeded?: string[];
  reference?: string;
  targetStream?: string;
  whatsapp?: string;
  phoneVerified?: boolean;
  verified?: boolean;
}
export default function StudentPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const [eventCounts, setEventCounts] = useState<
    { _id: string; count: number }[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEventLocation, setSelectedEventLocation] =
    useState<string>("all");

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { user, loading: authLoading, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const router = useRouter();

  useEffect(() => {
    if (authLoading) return;
    let isFetching = false;
    const loadData = async () => {
      if (isFetching) return;
      try {
        isFetching = true;
        await fetchStudents();
      } finally {
        isFetching = false;
      }
    };
    loadData();
    const interval = setInterval(loadData, 60000);
    return () => clearInterval(interval);
  }, [authLoading]);

  const fetchStudents = async () => {
    try {
      const response = await fetch("/api/students/summary");
      const data = await response.json();
      console.log("Fetch students response:", data);
      if (data.success) {
        setStudents(data.students);
        setEventCounts(data.eventCounts);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesLocation =
        selectedEventLocation === "all" ||
        student.evenetLocation === selectedEventLocation;

      const search = searchTerm.toLowerCase();

      const matchesSearch = [
        student.fullname,
        student.email,
        student.phone,
        student.district,
        student.evenetLocation,
      ]
        .filter(Boolean)
        .some((field) => String(field).toLowerCase().includes(search));

      return matchesLocation && matchesSearch;
    });
  }, [students, searchTerm, selectedEventLocation]);
  const paginatedStudents = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredStudents.slice(start, end);
  }, [filteredStudents, page, rowsPerPage]);

  const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);

  const stats = useMemo(() => {
    const cities = [...new Set(students.map((s) => s.district))];
    console.log("Unique cities extracted:", cities);
    const today = new Date().toDateString();

    const todayCount = students.filter(
      (s) => new Date(s.createdAt).toDateString() === today,
    ).length;

    return {
      total: students.length,
      cities: cities.length,
      today: todayCount,
    };
  }, [students]);

  const eventLocationSummary = eventCounts.map((item) => ({
    location: item._id,
    count: item.count,
  }));

  const handleExportCSV = () => {
    // 1. Defined all available data columns as headers
    const headers = [
      "Name",
      "Email",
      "Phone",
      // "WhatsApp",
      "Event Location",
      "City/District",
      // "Education",
      "Target Stream",
      "Attending Seminar",
      // "Help Needed",
      "Reference Source",
      "Phone Verified",
      "Registration Date",
    ];

    // 2. Map through the complete raw backend data array
    const csvData = filteredStudents.map((student) => {
      // Process the array fields safely so they don't break CSV formatting
      const helpNeededStr = Array.isArray(student.helpNeeded)
        ? student.helpNeeded.join("; ")
        : "";

      return [
        `"${student.fullname?.replace(/"/g, '""') || ""}"`,
        `"${student.email || ""}"`,
        `"${student.phone || ""}"`,
        // `"${student.whatsapp || ""}"`,
        `"${student.evenetLocation?.replace(/"/g, '""') || ""}"`,
        `"${student.district?.replace(/"/g, '""') || ""}"`,
        // `"${student.education || ""}"`,
        `"${student.targetStream || ""}"`,
        `"${student.attendingSeminar || ""}"`,
        // `"${helpNeededStr.replace(/"/g, '""')}"`,
        `"${student.reference?.replace(/"/g, '""') || ""}"`,
        `"${student.phoneVerified ? "Yes" : "No"}"`,
        `"${new Date(student.createdAt).toLocaleDateString()}"`,
      ];
    });

    // 3. Construct CSV String layout
    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n");

    // 4. Create and trigger download payload with UTF-8 BOM encoding for Excel support
    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `complete_students_report_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();

    window.URL.revokeObjectURL(url);
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
      {/* CONTENT */}
      <div className="mx-auto max-w-7xl px-4 py-1">
        {/* STATS */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* TOTAL */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl bg-gradient-to-br from-[#1a237e] to-[#3949ab] p-6 text-white shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-white/20 p-4">
                <Users className="h-10 w-10" />
              </div>

              <div>
                <h2 className="text-4xl font-bold">{stats.total}</h2>

                <p className="mt-1 text-sm text-white/80">{t("staff.total")}</p>
              </div>
            </div>
          </motion.div>

          {/* CITIES */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl bg-gradient-to-br from-[#f9a825] to-[#ff8f00] p-6 text-[#1a237e] shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-[#1a237e]/20 p-4">
                <MapPin className="h-10 w-10" />
              </div>

              <div>
                <h2 className="text-4xl font-bold">{stats.cities}</h2>

                <p className="mt-1 text-sm font-medium">Cities</p>
              </div>
            </div>
          </motion.div>

          {/* TODAY */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-3xl bg-gradient-to-br from-[#43a047] to-[#66bb6a] p-6 text-white shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-white/20 p-4">
                <CalendarDays className="h-10 w-10" />
              </div>

              <div>
                <h2 className="text-4xl font-bold">{stats.today}</h2>

                <p className="mt-1 text-sm text-white/80">
                  Today&apos;s Registrations
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-[#1a237e]">
            Event Registrations
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {eventLocationSummary.map((item) => (
              <div
                key={item.location}
                className="rounded-2xl border border-slate-200 p-4"
              >
                <p className="text-sm text-slate-500">Event Location</p>

                <h3 className="mt-1 text-lg font-semibold text-[#1a237e]">
                  {item.location}
                </h3>

                <p className="mt-2 text-2xl font-bold text-[#43a047]">
                  {item.count}
                </p>

                <p className="text-sm text-slate-500">Students Registered</p>
              </div>
            ))}
          </div>
        </div>

        {/* SEARCH + EXPORT */}
        <div className="mb-6 flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#1a237e]">
              {t("staff.title")}
            </h1>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* SEARCH */}
            <div className="relative">
              <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                placeholder={t("staff.search")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pr-4 pl-11 transition outline-none focus:border-[#1a237e] focus:ring-4 focus:ring-[#1a237e]/10 sm:w-[280px]"
              />
            </div>

            {/* EXPORT */}
            <button
              onClick={handleExportCSV}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#1a237e] px-5 py-3 font-medium text-white transition hover:bg-[#0d1452]"
            >
              <Download className="h-5 w-5" />
              {t("staff.export")}
            </button>
          </div>
        </div>
        <select
          value={selectedEventLocation}
          onChange={(e) => {
            setSelectedEventLocation(e.target.value);
            setPage(1);
          }}
          className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-[#1a237e] focus:ring-4 focus:ring-[#1a237e]/10"
        >
          <option value="all">All Events</option>

          {eventLocationSummary.map((item) => (
            <option key={item.location} value={item.location}>
              {item.location} ({item.count})
            </option>
          ))}
        </select>

        {/* TABLE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="overflow-hidden rounded-3xl bg-white shadow-sm"
        >
          {/* <pre>{JSON.stringify(students, null, 2)}</pre> */}
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-100">
                <tr>
                  <TableHeading title={t("staff.name")} />
                  <TableHeading title={t("staff.email")} />
                  <TableHeading title={t("staff.phone")} />
                  <TableHeading title={t("staff.eventLocation")} />
                  <TableHeading title={t("staff.city")} />
                  <TableHeading title={t("staff.date")} />
                </tr>
              </thead>

              <tbody>
                {paginatedStudents.length > 0 ? (
                  paginatedStudents.map((student) => (
                    <tr
                      key={student._id}
                      className="border-t border-slate-100 transition hover:bg-[#1a237e]/[0.03]"
                    >
                      <td className="px-6 py-4 font-medium whitespace-nowrap text-slate-700">
                        {student.fullname}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                        {student.email}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                        {student.phone}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="rounded-full bg-[#f9a825]/20 px-3 py-1 text-xs font-semibold text-[#f57f17]">
                          {student.evenetLocation}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="rounded-full bg-[#1a237e]/10 px-3 py-1 text-xs font-semibold text-[#1a237e]">
                          {student.district}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                        {new Date(student.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6}>
                      <div className="flex flex-col items-center justify-center px-6 py-16">
                        <Users className="mb-4 h-16 w-16 text-slate-300" />

                        <p className="text-slate-500">
                          No students registered yet
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          {filteredStudents.length > 0 && (
            <div className="flex flex-col gap-4 border-t border-slate-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-500">Rows per page</span>

                <select
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setPage(1);
                  }}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#1a237e]"
                >
                  {[10, 25, 50, 100].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-4">
                <p className="text-sm text-slate-500">
                  Page {page} of {totalPages}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage((prev) => prev - 1)}
                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Prev
                  </button>

                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage((prev) => prev + 1)}
                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

interface TableHeadingProps {
  title: string;
}

function TableHeading({ title }: TableHeadingProps) {
  return (
    <th className="px-6 py-4 text-left text-sm font-bold whitespace-nowrap text-[#1a237e]">
      {title}
    </th>
  );
}
