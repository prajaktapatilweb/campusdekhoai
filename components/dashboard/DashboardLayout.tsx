"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CalendarDays, Users, UserCog, LogOut, Menu, X } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobileMenu = () => setMobileOpen(false);
  const { user, logout, loading } = useAuth();
  const { language, setLanguage } = useLanguage();

  const menuItems = [
    {
      title: "Events",
      icon: CalendarDays,
      href: "/dashboard/events",
      allowedRoles: ["admin"],
    },
    {
      title: "Students",
      icon: Users,
      href: "/dashboard/students",
      allowedRoles: ["admin", "staff", "college"],
    },
    {
      title: "Users",
      icon: UserCog,
      href: "/dashboard/users",
      allowedRoles: ["admin"],
    },
  ];

  const filteredMenu = menuItems.filter((item) => {
    return user && item.allowedRoles.includes(user.role);
  });

  console.log("Filtered Menu Items", filteredMenu, user?.role);

  useEffect(() => {
    if (loading) return;
    // Not logged in
    if (!user) {
      router.replace("/login");
      return;
    }
    const currentRoute = menuItems.find((item) =>
      pathname.startsWith(item.href),
    );

    if (currentRoute && !currentRoute.allowedRoles.includes(user.role)) {
      router.replace("/dashboard/students");
    }
  }, [user, pathname, loading]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }
  return (
    <div className="flex min-h-screen bg-[#f5f7fa]">
      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 z-50 flex h-screen w-[270px] flex-col bg-[#1a237e] text-white transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* MOBILE CLOSE */}
        <div className="flex items-center justify-between border-b border-white/10 p-4 lg:hidden">
          <h2 className="text-lg font-bold">Menu</h2>

          <button onClick={closeMobileMenu}>
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* LOGO */}
        <div className="border-b border-white/10 p-6">
          <Image
            src="/images/pudharilogo.png"
            alt="Pudhari Campus 2 Career Logo"
            width={320}
            height={120}
            priority
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
                  onClick={() => {
                    router.push(item.href);
                    closeMobileMenu();
                  }}
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-300 ${
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
      <div className="flex flex-1 flex-col lg:ml-0">
        {/* HEADER */}
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
          <div className="flex items-center justify-between px-4 py-4 lg:px-6">
            {/* LEFT */}
            <div className="flex items-center gap-3">
              {/* MOBILE MENU BUTTON */}
              <button
                onClick={() => setMobileOpen(true)}
                className="rounded-xl border p-2 text-[#1a237e] lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>

              <h1 className="text-xl font-bold text-[#1a237e] lg:text-2xl">
                Dashboard
              </h1>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">
              {/* LANGUAGE */}
              <div className="flex overflow-hidden rounded-xl border">
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-3 py-2 text-sm font-medium lg:px-4 ${
                    language === "en" ? "bg-[#1a237e] text-white" : "bg-white"
                  }`}
                >
                  EN
                </button>

                <button
                  onClick={() => setLanguage("mr")}
                  className={`px-3 py-2 text-sm font-medium lg:px-4 ${
                    language === "mr" ? "bg-[#1a237e] text-white" : "bg-white"
                  }`}
                >
                  मराठी
                </button>
              </div>

              <div className="rounded-full bg-[#1a237e]/10 px-3 py-2 text-xs font-semibold text-[#1a237e] lg:px-4 lg:text-sm">
                {user?.role}
              </div>
            </div>
          </div>
        </header>

        {/* PAGE */}
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
