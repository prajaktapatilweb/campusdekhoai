"use client";

import { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { CalendarDays, Users, UserCog, LogOut } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const { user, logout } = useAuth();
  const { language, setLanguage } = useLanguage();

  const menuItems = [
    {
      title: "Events",
      icon: CalendarDays,
      href: "/dashboard/events",
      adminOnly: true,
    },
    {
      title: "Students",
      icon: Users,
      href: "/dashboard/students",
      adminOnly: false,
    },
    {
      title: "Users",
      icon: UserCog,
      href: "/dashboard/users",
      adminOnly: true,
    },
  ];

  const filteredMenu = menuItems.filter((item) => {
    if (item.adminOnly && user?.role !== "admin") {
      return false;
    }

    return true;
  });

  return (
    <div className="flex min-h-screen bg-[#f5f7fa]">
      {/* SIDEBAR */}
      <aside className="hidden w-[270px] flex-col bg-[#1a237e] text-white lg:flex">
        {/* LOGO */}
        <div className="border-b border-white/10 p-6">
          <Image
            src="/images/logo.png"
            alt="CampusDekho.AI"
            width={160}
            height={50}
            className="brightness-0 invert"
          />
        </div>

        {/* MENU */}
        <div className="flex-1 p-4">
          <div className="space-y-2">
            {filteredMenu.map((item) => {
              const Icon = item.icon;

              const active = pathname === item.href;

              return (
                <button
                  key={item.href}
                  onClick={() => router.push(item.href)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 transition ${
                    active ? "bg-[#f9a825] text-[#1a237e]" : "hover:bg-white/10"
                  }`}
                >
                  <Icon className="h-5 w-5" />

                  <span className="font-medium">{item.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* USER */}
        <div className="border-t border-white/10 p-4">
          <div className="mb-4">
            <p className="text-sm text-white/70">Logged in as</p>

            <p className="font-semibold">{user?.name}</p>
          </div>

          <button
            onClick={logout}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-3 transition hover:bg-white/20"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex flex-1 flex-col">
        {/* HEADER */}
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-bold text-[#1a237e]">Dashboard</h1>

            <div className="flex items-center gap-3">
              {/* LANGUAGE */}
              <div className="flex overflow-hidden rounded-xl border">
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-4 py-2 text-sm font-medium ${
                    language === "en" ? "bg-[#1a237e] text-white" : "bg-white"
                  }`}
                >
                  EN
                </button>

                <button
                  onClick={() => setLanguage("mr")}
                  className={`px-4 py-2 text-sm font-medium ${
                    language === "mr" ? "bg-[#1a237e] text-white" : "bg-white"
                  }`}
                >
                  मराठी
                </button>
              </div>

              <div className="rounded-full bg-[#1a237e]/10 px-4 py-2 text-sm font-semibold text-[#1a237e]">
                {user?.role}
              </div>
            </div>
          </div>
        </header>

        {/* PAGE */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
