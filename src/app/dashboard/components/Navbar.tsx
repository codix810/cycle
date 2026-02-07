"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "لوحة التحكم", icon: "fa-house" },
  { href: "/dashboard/calendar", label: "التقويم", icon: "fa-calendar-days" },
  { href: "/dashboard/patients", label: "المرضى", icon: "fa-people-group" },
  { href: "/dashboard/settings", label: "الإعدادات", icon: "fa-gear" },
];

export default function Sidebar() {
  const pathname = usePathname();

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <aside className="bg-white fixed right-0 top-0 w-64 h-screen shadow-lg p-5 border-l border-gray-100 flex flex-col justify-between">

      {/* Profile */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img src="/n.jpg" alt="doctor" className="w-full h-full object-cover" />
          </div>

          <div>
            <div className="font-bold text-gray-800">د. أحمد نائل</div>
            <div className="text-sm text-gray-500">اخصائي علاج نفسي</div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-2">
          {links.map((l) => {
            const active = pathname.startsWith(l.href);

            return (
              <Link
                key={l.href}
                href={l.href}
                className={`flex items-center gap-3 p-3 rounded-xl transition ${
                  active
                    ? "bg-teal-100 text-teal-600 font-semibold border-r-4 border-teal-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <i className={`fa-regular ${l.icon} text-lg`} />
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="flex items-center gap-3 p-3 rounded-xl text-red-600 hover:bg-red-50 transition font-semibold"
      >
        <i className="fa-solid fa-arrow-right-from-bracket text-lg"></i>
        تسجيل الخروج
      </button>

    </aside>
  );
}
