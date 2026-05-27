"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { login } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const user = await login(email, password);

      router.replace(
        user.role === "admin" ? "/dashboard/events" : "/dashboard/students",
      );
    } catch (error: any) {
      setError(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a237e] via-[#0d1452] to-[#1a237e] px-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-[#f9a825]/20"
            style={{
              width: 300 + i * 100,
              height: 300 + i * 100,
              top: `${20 + i * 15}%`,
              right: `${-10 + i * 10}%`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="rounded-3xl bg-white/95 p-6 shadow-2xl backdrop-blur-xl md:p-10">
            {/* Logo */}
            <div className="mb-8 text-center">
              <Link href="/">
                <Image
                  src="/images/pudharilogo.png"
                  alt="CampusDekho.AI Logo"
                  width={300}
                  height={60}
                  className="mx-auto object-contain"
                />
              </Link>
            </div>

            {/* Title */}
            <h1 className="mb-2 text-center text-3xl font-bold text-[#1a237e]">
              {t("login.title")}
            </h1>

            <p className="mb-8 text-center text-gray-500">
              Access your dashboard
            </p>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600"
              >
                {error}
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  {t("login.email")}
                </label>

                <div className="flex items-center rounded-xl border border-gray-300 bg-white px-3 focus-within:border-[#1a237e] focus-within:ring-2 focus-within:ring-[#1a237e]/20">
                  <Mail className="h-5 w-5 text-[#1a237e]" />

                  <input
                    type="email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                    required
                    className="w-full bg-transparent px-3 py-3 outline-none"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  {t("login.password")}
                </label>

                <div className="flex items-center rounded-xl border border-gray-300 bg-white px-3 focus-within:border-[#1a237e] focus-within:ring-2 focus-within:ring-[#1a237e]/20">
                  <Lock className="h-5 w-5 text-[#1a237e]" />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                    required
                    className="w-full bg-transparent px-3 py-3 outline-none"
                    placeholder="Enter your password"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-500 transition hover:text-[#1a237e]"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#f9a825] to-[#ff8f00] px-4 py-3 text-lg font-bold text-[#1a237e] shadow-lg transition hover:from-[#f57f17] hover:to-[#e65100] disabled:opacity-70"
              >
                {loading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  t("login.submit")
                )}
              </button>
            </form>

            {/* Back */}
            <div className="mt-8 text-center">
              <Link
                href="/"
                className="font-medium text-[#1a237e] hover:underline"
              >
                Back to Home
              </Link>
            </div>

            {/* Demo Credentials */}
            {/* <div className="mt-8 rounded-2xl border border-dashed border-[#1a237e]/30 bg-[#1a237e]/5 p-4">
              <p className="mb-2 text-xs text-gray-500">
                Demo Credentials (after setup):
              </p>

              <p className="text-xs text-[#1a237e]">
                Admin: admin@campusdekho.ai / admin123
              </p>

              <p className="mt-1 text-xs text-[#1a237e]">
                Staff: staff@campusdekho.ai / staff123
              </p>
            </div> */}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
