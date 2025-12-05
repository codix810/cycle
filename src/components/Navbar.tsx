"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Navbar({ role = "guest" }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <h1 className="text-xl font-bold text-blue-600">Houda</h1>

        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
          ☰
        </button>

        <div className="hidden md:flex gap-6 text-gray-700 font-medium">
          <Link href="/">الرئيسية</Link>

          {role === "client" && <Link href="/craftsmen">الصنايعية</Link>}
          {role === "craftsman" && <Link href="/my-work">شغلي</Link>}
          {role === "admin" && <Link href="/admin">لوحة التحكم</Link>}
          {role === "admin" && <Link href="/admin/bookings">لوحة </Link>}

          {role !== "guest" && <Link href="/profile">حسابي</Link>}
          {role !== "guest" && <Link href="/logout">تسجيل خروج</Link>}

          {role === "guest" && <Link href="/login">تسجيل الدخول</Link>}
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white px-4 pb-4 flex flex-col gap-3 text-gray-700 font-medium shadow-lg"
        >
          <Link href="/">الرئيسية</Link>

          {role === "client" && <Link href="/craftsmen">الصنايعية</Link>}
          {role === "craftsman" && <Link href="/my-work">شغلي</Link>}
          {role === "admin" && <Link href="/admin">لوحة التحكم</Link>}

          {role !== "guest" && <Link href="/profile">حسابي</Link>}
          {role !== "guest" && <Link href="/logout">تسجيل خروج</Link>}

          {role === "guest" && <Link href="/login">تسجيل الدخول</Link>}
        </motion.div>
      )}
    </div>
  );
}
