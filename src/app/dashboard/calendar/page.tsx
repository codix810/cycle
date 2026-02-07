"use client";

import { useEffect, useState } from "react";

interface Booking {
  _id: string;
  date: string;
  time: string;
  name: string;
  type: string;
}

export default function CalendarPage() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [appointments, setAppointments] = useState<Booking[]>([]);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const monthName = currentMonth.toLocaleString("ar", { month: "long" });

  // ============================
  //    Load calendar from API
  // ============================
  useEffect(() => {
    loadCalendar(year, month);
  }, [currentMonth]);

  async function loadCalendar(year: number, month: number) {
    try {
      const res = await fetch("/api/booking/calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ year, month }),
      });

      const data = await res.json();
      if (data.success) {
        setAppointments(data.bookings);
      }
    } catch (err) {
      console.log("Error loading calendar:", err);
    }
  }

  // ============================
  //     Generate days grid
  // ============================
  const getDays = () => {
    const days = [];
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const start = firstDay.getDay() === 0 ? 7 : firstDay.getDay();
    for (let i = 1; i < start; i++) days.push(null);

    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push(new Date(year, month, d));
    }

    return days;
  };

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-center">التقويم</h1>

      <div className="bg-white p-6 rounded-xl shadow max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            className="text-lg px-3 py-1 bg-gray-200 rounded"
            onClick={() =>
              setCurrentMonth(new Date(year, month - 1, 1))
            }
          >
            ‹
          </button>

          <h2 className="text-xl font-bold">
            {monthName} {year}
          </h2>

          <button
            className="text-lg px-3 py-1 bg-gray-200 rounded"
            onClick={() =>
              setCurrentMonth(new Date(year, month + 1, 1))
            }
          >
            ›
          </button>
        </div>

        {/* Week days */}
        <div className="grid grid-cols-7 text-center font-semibold text-gray-700 mb-3">
          {["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"].map(
            (d) => (
              <div key={d} className="py-2">
                {d}
              </div>
            )
          )}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-2 text-center">
          {getDays().map((day, i) =>
            day ? (
              <div
                key={i}
                onClick={() => setSelectedDay(day)}
                className={`p-3 border rounded-lg cursor-pointer hover:bg-teal-50 ${
                  selectedDay &&
                  selectedDay.toDateString() === day.toDateString()
                    ? "bg-teal-100 border-teal-600"
                    : ""
                }`}
              >
                <div className="font-bold">{day.getDate()}</div>

                {/* Dot indicator */}
                {appointments.some(
                  (a) => a.date === day.toISOString().slice(0, 10)
                ) && (
                  <div className="mt-1 w-2 h-2 bg-teal-600 rounded-full mx-auto"></div>
                )}
              </div>
            ) : (
              <div key={i}></div>
            )
          )}
        </div>
      </div>

      {/* Day details */}
      {selectedDay && (
        <div className="bg-white p-6 rounded-xl shadow max-w-3xl mx-auto space-y-4">
          <h2 className="text-xl font-bold">
            مواعيد يوم:{" "}
            {selectedDay.toLocaleDateString("ar", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </h2>

          {/* List */}
          {appointments.filter(
            (a) => a.date === selectedDay.toISOString().slice(0, 10)
          ).length === 0 ? (
            <p className="text-gray-500">لا يوجد مواعيد.</p>
          ) : (
            <div className="space-y-3">
              {appointments
                .filter(
                  (a) => a.date === selectedDay.toISOString().slice(0, 10)
                )
                .map((a) => (
                  <div
                    key={a._id}
                    className="p-3 bg-gray-50 border rounded-lg flex justify-between"
                  >
                    <div>
                      <div className="font-semibold">{a.type}</div>
                      <div className="text-gray-600 text-sm">
                        {a.time} — {a.name}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
