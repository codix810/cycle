"use client";

import { useEffect, useState } from "react";

type BookingStatus = "pending" | "confirmed" | "rejected";

interface Booking {
  _id: string;
  status: BookingStatus;
  consultationType: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  number: number;
  image?: string | null;
}

export default function DashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      const res = await fetch("/api/booking", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError("فشل تحميل الحجوزات");
        return;
      }

      setBookings(data.bookings);
    } catch {
      setError("خطأ أثناء التحميل");
    } finally {
      setLoading(false);
    }
  }

  const toggleStatus = async (id: string, newStatus: BookingStatus) => {
    try {
      setActionLoadingId(id);

      const token = localStorage.getItem("token");

      const res = await fetch("/api/booking/toggle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, newStatus }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert("فشل تغيير الحالة");
        return;
      }

      await loadBookings();
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="space-y-10 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">لوحة التحكم</h1>

      {error && <p className="text-red-600 text-center">{error}</p>}
      {loading && <p className="text-center">جارٍ التحميل...</p>}

      <div className="space-y-6">
        {bookings.map((s) => (
          <div
            key={s._id}
            className="p-5 rounded-xl border bg-white shadow-md flex flex-col gap-5"
          >
            {/* القسم الأول: الصورة + البيانات الأساسية */}
            <div className="flex gap-5 items-center">
              {/* الصورة */}
              {s.image ? (
                <img
                  src={s.image}
                  className="w-16 h-16 rounded-xl border object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-xl bg-gray-200 flex items-center justify-center text-3xl text-gray-600">
                  🧑
                </div>
              )}

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-gray-800">
                  {s.consultationType}
                </h3>

                <div className="text-gray-600 text-sm">
                  <b>الاسم:</b> {s.name}
                </div>

                <div className="text-gray-600 text-sm">
                  <b>الهاتف:</b> {s.phone}
                </div>

                <div className="text-gray-600 text-sm">
                  <b>الموعد:</b> {s.date} - {s.time}
                </div>

                <span
                  className={`px-3 py-1 mt-1 inline-block rounded-full text-sm font-semibold ${
                    s.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : s.status === "confirmed"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {s.status === "pending"
                    ? "منتظرة"
                    : s.status === "confirmed"
                    ? "مؤكدة"
                    : "مرفوضة"}
                </span>
              </div>
            </div>

            {/* فاصل */}
            <hr className="border-gray-300" />

            {/* رقم الحجز */}
            <div className="text-lg font-bold text-gray-800">
              رقم الحجز:
              <span className="text-teal-700 ml-2">{s.number}</span>
            </div>

            {/* لو في صورة → زر “عرض الصورة” */}
            {s.image && (
              <button
                onClick={() => s.image && window.open(s.image as string, "_blank")}
                className="px-4 py-2 bg-blue-600 text-white rounded-full w-fit"
              >
                عرض الصورة
              </button>
            )}

            {/* فاصل */}
            <hr className="border-gray-300" />

            {/* أزرار التحكم */}
            <div className="flex gap-3 flex-wrap">
              {s.status === "pending" && (
                <>
                  <button
                    disabled={actionLoadingId === s._id}
                    onClick={() => toggleStatus(s._id, "confirmed")}
                    className="bg-teal-600 text-white px-4 py-2 rounded-full"
                  >
                    {actionLoadingId === s._id ? "..." : "تأكيد"}
                  </button>

                  <button
                    disabled={actionLoadingId === s._id}
                    onClick={() => toggleStatus(s._id, "rejected")}
                    className="bg-red-600 text-white px-4 py-2 rounded-full"
                  >
                    {actionLoadingId === s._id ? "..." : "رفض"}
                  </button>
                </>
              )}

              {s.status === "confirmed" && (
                <button
                  disabled={actionLoadingId === s._id}
                  onClick={() => toggleStatus(s._id, "pending")}
                  className="bg-yellow-600 text-white px-4 py-2 rounded-full"
                >
                  {actionLoadingId === s._id ? "..." : "إرجاع لمنتظرة"}
                </button>
              )}

              {s.status === "rejected" && (
                <button
                  disabled={actionLoadingId === s._id}
                  onClick={() => toggleStatus(s._id, "confirmed")}
                  className="bg-green-600 text-white px-4 py-2 rounded-full"
                >
                  {actionLoadingId === s._id ? "..." : "تأكيد"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
