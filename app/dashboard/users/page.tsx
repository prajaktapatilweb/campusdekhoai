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
  User2,
  Phone,
  Mail,
} from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";

import UserForm from "@/components/Forms/UserForm";
import AppModal from "@/components/@/AppModal";
import DeleteDialog from "@/components/@/DeleteDialog";

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
}

const initialValues = {
  name: "",
  email: "",
  password: "",
  phone: "",
  role: "",
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formInitialValues, setFormInitialValues] = useState(initialValues);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedDeleteUser, setSelectedDeleteUser] = useState<User | null>(
    null,
  );
  const [deleteLoading, setDeleteLoading] = useState(false);

  const { language, t } = useLanguage();

  useEffect(() => {
    fetchFunction();
  }, []);

  const fetchFunction = async () => {
    try {
      const response = await fetch("/api/users/get");
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
        setUsers(data.data);
      }
    } catch (error) {
      console.error("Error fetching Users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (user?: User) => {
    setError("");

    if (user) {
      setEditingUser(user);

      setFormInitialValues({
        name: user.name,
        email: user.email,
        password: "",
        phone: user.phone,
        role: user.role,
      });
    } else {
      setEditingUser(null);
      setFormInitialValues(initialValues);
    }

    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingUser(null);
    setError("");
  };

  const handleSubmit = async (values: typeof initialValues) => {
    setSubmitting(true);
    setError("");

    try {
      const url = editingUser
        ? `/api/user/edit/${editingUser._id}`
        : "/api/user/add";
      const method = editingUser ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(
          editingUser
            ? "User updated successfully!"
            : "User created successfully!",
        );

        handleCloseDialog();
        fetchFunction();
        setTimeout(() => {
          setSuccess("");
        }, 3000);
      } else {
        setError(data.error || "Failed to save user");
      }
    } catch (error) {
      console.error("Error saving user:", error);

      setError("Network error");
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!selectedDeleteUser) return;
    try {
      setDeleteLoading(true);

      const response = await fetch(
        `/api/users/delete/${selectedDeleteUser._id}`,
        {
          method: "DELETE",
        },
      );
      const data = await response.json();
      if (data.success) {
        setSuccess("User deleted successfully!");
        fetchFunction();
        setDeleteOpen(false);
        setSelectedDeleteUser(null);
        setTimeout(() => {
          setSuccess("");
        }, 3000);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
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
          <h1 className="text-3xl font-bold text-[#1a237e]">Manage Users</h1>

          <button
            onClick={() => handleOpenDialog()}
            className="flex items-center gap-2 rounded-xl bg-[#f9a825] px-5 py-3 font-semibold text-[#1a237e] shadow-md transition hover:bg-[#f57f17]"
          >
            <Plus className="h-5 w-5" />
            Add New User
          </button>
        </div>

        {/* Users List */}
        {users.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {users.map((user, index) => (
              <motion.div
                key={user._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="rounded-3xl bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                {/* TITLE */}
                <div className="mb-5 flex items-start justify-between">
                  <h2 className="text-2xl font-bold text-[#1a237e]">
                    {user.name}
                  </h2>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenDialog(user)}
                      className="rounded-lg p-2 text-[#1a237e] transition hover:bg-slate-100"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => {
                        setSelectedDeleteUser(user);
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
                  <User2 className="mt-0.5 h-4 w-4" />

                  <p className="text-sm">{user.role}</p>
                </div>

                {/* DATE */}
                <div className="mb-3 flex items-center gap-3 text-slate-600">
                  <Phone className="h-4 w-4" />

                  <p className="text-sm">{user.phone}</p>
                </div>

                {/* TIME */}
                <div className="flex items-center gap-3 text-slate-600">
                  <Mail className="h-4 w-4" />
                  <p>{user.email}</p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
            <CalendarDays className="mx-auto mb-5 h-16 w-16 text-slate-300" />

            <h3 className="text-xl font-semibold text-slate-500">
              No users created yet
            </h3>

            <button
              onClick={() => handleOpenDialog()}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#f9a825] px-5 py-3 font-semibold text-[#1a237e] transition hover:bg-[#f57f17]"
            >
              <Plus className="h-5 w-5" />
              Create First User
            </button>
          </div>
        )}
      </div>

      {/* MODAL */}
      <AppModal
        open={dialogOpen}
        title={editingUser ? "Edit User" : "Add User"}
        onClose={handleCloseDialog}
      >
        <UserForm
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
        title="Delete User"
        message={`Are you sure you want to delete ${
          selectedDeleteUser?.name || "this user"
        }?`}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedDeleteUser(null);
        }}
        onConfirm={confirmDelete}
      />
    </>
  );
}
