"use client";

import { Loader2, Trash2 } from "lucide-react";
import AppModal from "./AppModal";

interface Props {
  open: boolean;
  title?: string;
  message?: string;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteDialog({
  open,
  title = "Delete Item",
  message = "Are you sure you want to delete this item?",
  loading = false,
  onClose,
  onConfirm,
}: Props) {
  return (
    <AppModal open={open} title={title} onClose={onClose} maxWidth="max-w-md">
      <div className="text-center">
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <Trash2 className="h-10 w-10 text-red-500" />
        </div>

        <p className="mb-8 text-slate-600">{message}</p>

        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-2.5"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex min-w-[120px] items-center justify-center rounded-xl bg-red-500 px-5 py-2.5 font-semibold text-white"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Delete"}
          </button>
        </div>
      </div>
    </AppModal>
  );
}
