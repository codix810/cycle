"use client";

import { useEffect, useState } from "react";

type SlotMap = {
  [branch: string]: {
    [date: string]: string[];
  };
};

export default function BookingPage() {
  const months = [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ];

  const onlineTimes = [
    "09:00 ص",
    "10:00 ص",
    "11:00 ص",
    "12:00 م",
    "01:00 م",
    "02:00 م",
    "03:00 م",
    "04:00 م",
  ];

  const branchTimes: Record<string, string[]> = {
    cairo: ["10:00 ص", "11:00 ص", "12:00 م", "01:00 م", "02:00 م"],
    alex: ["09:00 ص", "10:00 ص", "11:00 ص", "01:00 م"],
  };

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth())
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [bookedSlots, setBookedSlots] = useState<SlotMap>({});
  const [place, setPlace] = useState<"online" | "offline">("online");
  const [branch, setBranch] = useState("cairo");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    type: "استشارة",
    notes: "",
  });

  const [showSummary, setShowSummary] = useState(false);

  // Load localStorage booked slots
  useEffect(() => {
    const saved = localStorage.getItem("bookedSlots");
    if (saved) setBookedSlots(JSON.parse(saved));
  }, []);

  const saveSlot = () => {
    const branchKey = place === "online" ? "online" : branch;

    const updated = {
      ...bookedSlots,
      [branchKey]: {
        ...bookedSlots[branchKey],
        [selectedDate!]: [
          ...(bookedSlots[branchKey]?.[selectedDate!] || []),
          selectedTime!,
        ],
      },
    };

    localStorage.setItem("bookedSlots", JSON.stringify(updated));
    setBookedSlots(updated);
  };

  // Generate days
  const getDays = () => {
    const days = [];
    const firstDay = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const lastDay = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );

    const empty = (firstDay.getDay() + 6) % 7; // Arabic start (Saturday)
    for (let i = 0; i < empty; i++) days.push(null);

    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d)
      );
    }
    return days;
  };

  const times =
    place === "online" ? onlineTimes : branchTimes[branch] || [];

  const bookedForDate =
    bookedSlots[place === "online" ? "online" : branch]?.[selectedDate!] || [];

  const handleSubmit = () => {
    if (!form.name || !form.phone || !selectedDate || !selectedTime) return;
    saveSlot();
    setShowSummary(true);
  };

  return (
    <div className="space-y-10 max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-center">حجز موعد</h1>

      {/* Patient Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow">
        <input
          type="text"
          placeholder="اسم المريض"
          className="border p-3 rounded-lg"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="رقم الموبايل"
          className="border p-3 rounded-lg"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <select
          className="p-3 border rounded-lg"
          onChange={(e) => setPlace(e.target.value as any)}
        >
          <option value="online">أونلاين</option>
          <option value="offline">أوفلاين (العيادة)</option>
        </select>

        {place === "offline" && (
          <select
            className="p-3 border rounded-lg"
            onChange={(e) => setBranch(e.target.value)}
          >
            <option value="cairo">القاهرة</option>
            <option value="alex">الإسكندرية</option>
          </select>
        )}

        <select
          className="p-3 border rounded-lg"
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="استشارة">استشارة</option>
          <option value="متابعة">متابعة</option>
          <option value="فحص دوري">فحص دوري</option>
        </select>
      </div>

      {/* Calendar */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between mb-4">
          <button
            className="px-3 py-1 bg-gray-200 rounded"
            onClick={() =>
              setCurrentMonth(
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth() - 1
                )
              )
            }
          >
            ‹
          </button>

          <h2 className="text-lg font-bold">
            {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h2>

          <button
            className="px-3 py-1 bg-gray-200 rounded"
            onClick={() =>
              setCurrentMonth(
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth() + 1
                )
              )
            }
          >
            ›
          </button>
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-2 text-center">
          {getDays().map((day, i) =>
            day ? (
              <div
                key={i}
                className={`p-3 border rounded-lg cursor-pointer hover:bg-teal-50 ${
                  selectedDate === day.toISOString().slice(0, 10)
                    ? "bg-teal-100 border-teal-600"
                    : ""
                }`}
                onClick={() =>
                  setSelectedDate(day.toISOString().slice(0, 10))
                }
              >
                {day.getDate()}
              </div>
            ) : (
              <div key={i}></div>
            )
          )}
        </div>
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h3 className="text-lg font-bold text-center">اختر الوقت</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {times.map((t) => {
              const disabled = bookedForDate.includes(t);
              return (
                <div
                  key={t}
                  onClick={() => !disabled && setSelectedTime(t)}
                  className={`p-3 rounded-lg border cursor-pointer text-center ${
                    disabled
                      ? "bg-gray-200 text-gray-400 line-through cursor-not-allowed"
                      : selectedTime === t
                      ? "bg-teal-600 text-white border-teal-600"
                      : "hover:bg-teal-50"
                  }`}
                >
                  {t}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Notes */}
      <textarea
        placeholder="ملاحظات..."
        className="w-full p-4 border rounded-lg shadow"
        rows={4}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
      ></textarea>

      {/* Submit */}
      <button
        className="w-full bg-teal-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-teal-700"
        onClick={handleSubmit}
      >
        تأكيد الحجز
      </button>

      {/* Summary */}
      {showSummary && (
        <div className="bg-white p-6 rounded-xl shadow mt-6 space-y-3 border">
          <h2 className="text-xl font-bold text-teal-700 text-center">
            تم الحجز بنجاح
          </h2>

          <p>الاسم: {form.name}</p>
          <p>الهاتف: {form.phone}</p>
          <p>نوع الجلسة: {form.type}</p>
          <p>
            المكان: {place === "online" ? "أونلاين" : "العيادة – " + branch}
          </p>

          <p>التاريخ: {selectedDate}</p>
          <p>الوقت: {selectedTime}</p>

          {form.notes && <p>ملاحظات: {form.notes}</p>}
        </div>
      )}
    </div>
  );
}
