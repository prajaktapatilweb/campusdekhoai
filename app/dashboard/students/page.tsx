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
  course: string;
  city: string;
  createdAt: string;
}

export default function StudentPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { user, loading: authLoading, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const router = useRouter();

  useEffect(() => {
    fetchStudents();
  }, [user, authLoading, router]);

  const fetchStudents = async () => {
    try {
      const response = await fetch("/api/students/getStudent");
      const data = await response.json();
      console.log("Fetch students response:", data);
      if (data.success) {
        setStudents(data.data);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const search = searchTerm.toLowerCase();

      return [
        student.fullname,
        student.email,
        student.phone,
        student.city,
        student.course,
      ]
        .filter(Boolean)
        .some((field) => String(field).toLowerCase().includes(search));
    });
  }, [students, searchTerm]);

  const paginatedStudents = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredStudents.slice(start, end);
  }, [filteredStudents, page, rowsPerPage]);

  const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);

  const stats = useMemo(() => {
    const cities = [...new Set(students.map((s) => s.city))];

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

  const handleExportCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Course",
      "City",
      "Registration Date",
    ];

    const csvData = filteredStudents.map((student) => [
      student.fullname,
      student.email,
      student.phone,
      student.course,
      student.city,
      new Date(student.createdAt).toLocaleDateString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv",
    });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = `students_${new Date().toISOString().split("T")[0]}.csv`;

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
                  <TableHeading title={t("staff.course")} />
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
                          {student.course}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="rounded-full bg-[#1a237e]/10 px-3 py-1 text-xs font-semibold text-[#1a237e]">
                          {student.city}
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
