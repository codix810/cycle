"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (    
      <>
      {/* Header */}
 {/* Header */}
      <header className="bg-white p-4 border border-gray-200 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <i className="fa-regular fa-user text-gray-600" />
          </div>
        </div>

        <nav className="flex gap-6">
          <a href="/" className="text-teal-600 font-semibold">
            الرئيسية
          </a>
          <a href="/profile" className="text-gray-500 hover:text-teal-600 transition">
            ملف الطبيب
          </a>
          <a href="/booking" className="text-gray-500 hover:text-teal-600 transition">
            حجز موعد
          </a>
        </nav>

        <div className="flex items-center gap-2 font-bold text-teal-600">
          <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center">
            <i className="fa-solid fa-file-shield" />
          </div>
          <span>نظام الحجز</span>
        </div>
      </header>

      </>
  );
}
