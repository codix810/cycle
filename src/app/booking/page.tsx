"use client";

import { useState } from "react";

// أيام الأسبوع
const dayNames = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

// أوقات الفروع
const branchTimes: any = {
  cairo: [
    "09:00 ص - 10:00 ص",
    "10:00 ص - 11:00 ص",
    "11:00 ص - 12:00 م",
    "12:00 م - 01:00 م",
    "01:00 م - 02:00 م",
    "02:00 م - 03:00 م",
  ],
  alex: [
    "09:00 ص - 10:00 ص",
    "10:00 ص - 11:00 ص",
    "11:00 ص - 12:00 م",
    "01:00 م - 02:00 م",
    "02:00 م - 03:00 م",
  ],
};

const onlineTimes = [
  "09:00 ص - 10:00 ص",
  "10:00 ص - 11:00 ص",
  "11:00 ص - 12:00 م",
  "01:00 م - 02:00 م",
  "02:00 م - 03:00 م",
];

export default function Booking() {
  // form states
  const [consultType, setConsultType] = useState("");
  const [place, setPlace] = useState("");
  const [branch, setBranch] = useState("cairo");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [fee, setFee] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // preview image
  const [preview, setPreview] = useState<string | null>(null);

  // calendar state
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [selectedTime, setSelectedTime] = useState<any>(null);

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // get day object
  const getDayObj = (day: number) => {
    const d = new Date(year, month, day);
    return {
      dayNumber: day,
      dayName: dayNames[d.getDay()],
      dateStr: d.toISOString().slice(0, 10),
      disabled:
        d < new Date(today.toDateString()) || d.getDay() === 5,
    };
  };

  // submit
  const handleSubmit = async () => {
    if (!consultType) return alert("اختر نوع الاستشارة");
    if (!place) return alert("اختر مكان الاستشارة");
    if (!name.trim()) return alert("ادخل اسم المريض");
    if (!phone.trim()) return alert("ادخل رقم الهاتف");
    if (place === "online" && (!fee || Number(fee) <= 0))
      return alert("ادخل مبلغ الحجز");
    if (!selectedDate) return alert("اختر التاريخ");
    if (!selectedTime) return alert("اختر الوقت");

    try {
      const formData = new FormData();
      formData.append("consultType", consultType);
      formData.append("place", place);
      formData.append("branch", branch);
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("date", selectedDate);
      formData.append("time", selectedTime);
      if (fee) formData.append("fee", fee);
      if (notes) formData.append("notes", notes);
      if (file) formData.append("file", file);

      const res = await fetch("/api/bookings", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        return alert(data.message || "حدث خطأ أثناء الحجز");
      }

      alert("تم تسجيل الحجز بنجاح");

      // reset
      setConsultType("");
      setPlace("");
      setBranch("cairo");
      setName("");
      setPhone("");
      setFee("");
      setNotes("");
      setFile(null);
      setPreview(null);
      setSelectedDate(null);
      setSelectedTime(null);
    } catch (err) {
      console.error(err);
      alert("خطأ في السيرفر");
    }
  };

  return (
    <div className="max-w-[1100px] mx-auto p-4">

      {/* Title */}
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold">حجز موعد</h1>
        <p className="text-gray-500 mt-2">يرجى ملء البيانات التالية</p>
      </div>

      <div className="mt-10 space-y-6">

        {/* نوع الاستشارة */}
        <div>
          <label className="font-semibold">نوع الاستشارة *</label>
          <select
            value={consultType}
            onChange={(e) => setConsultType(e.target.value)}
            className="w-full border p-3 rounded-xl mt-2"
          >
            <option value="">اختر نوع الاستشارة</option>
            <option value="كشف">كشف</option>
            <option value="متابعة">متابعة</option>
            <option value="استشارة">استشارة</option>
          </select>
        </div>

        {/* مكان الاستشارة */}
        {consultType && (
          <div>
            <label className="font-semibold">مكان الاستشارة *</label>

            <div className="flex gap-4 mt-3">
              <button
                onClick={() => setPlace("offline")}
                className={`flex-1 p-3 rounded-xl border ${
                  place === "offline"
                    ? "border-teal-600 bg-teal-50"
                    : "border-gray-300"
                }`}
              >
                في العيادة
              </button>

              <button
                onClick={() => setPlace("online")}
                className={`flex-1 p-3 rounded-xl border ${
                  place === "online"
                    ? "border-teal-600 bg-teal-50"
                    : "border-gray-300"
                }`}
              >
                أونلاين
              </button>
            </div>
          </div>
        )}

        {/* بيانات المريض */}
        {place && (
          <>
            <div>
              <label className="font-semibold">اسم المريض *</label>
              <input
                className="w-full border p-3 rounded-xl mt-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="font-semibold">رقم الهاتف *</label>
              <input
                className="w-full border p-3 rounded-xl mt-2"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </>
        )}

        {/* الفرع */}
        {place === "offline" && (
          <div>
            <label className="font-semibold">اختر الفرع *</label>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full border p-3 rounded-xl mt-2"
            >
              <option value="cairo">فرع القاهرة</option>
              <option value="alex">فرع الإسكندرية</option>
            </select>
          </div>
        )}

        {/* مبلغ الحجز */}
        {place === "online" && (
          <div>
            <label className="font-semibold">مبلغ الحجز *</label>
            <input
              type="number"
              className="w-full border p-3 rounded-xl mt-2"
              value={fee}
              onChange={(e) => setFee(e.target.value)}
            />
          </div>
        )}

        {/* ملاحظات */}
        {place && (
          <div>
            <label className="font-semibold">ملاحظات للطبيب</label>
            <textarea
              className="w-full border p-3 rounded-xl mt-2"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        )}

        {/* رفع صورة الدفع */}
        {place === "online" && (
          <div>
            <label className="font-semibold">رفع سكرين شوت التحويل *</label>

            <div
              className="border-dashed border-2 p-10 text-center rounded-xl mt-3 cursor-pointer hover:bg-blue-50"
              onClick={() => document.getElementById("fileUpload")?.click()}
            >
              <i className="fa-solid fa-arrow-up text-4xl text-teal-600"></i>
              <p className="text-gray-600 mt-2">اضغط لرفع ملف الدفع</p>

              {file && (
                <p className="text-green-600 mt-3 font-semibold">
                  {file.name}
                </p>
              )}

              {preview && (
                <img
                  src={preview}
                  className="w-40 mx-auto mt-4 rounded-xl shadow"
                />
              )}

              <input
                id="fileUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e: any) => {
                  const f = e.target.files[0];
                  setFile(f);
                  setPreview(URL.createObjectURL(f));
                }}
              />
            </div>
          </div>
        )}

        {/* Calendar */}
        {place && (
          <div>
            <label className="font-semibold">اختيار التاريخ *</label>

            <div className="bg-white p-4 rounded-xl border mt-3">
              {/* Calendar Header */}
              <div className="flex justify-between items-center mb-4">
                <button
                  className="p-2 bg-teal-600 text-white rounded-lg"
                  onClick={() => setMonth(month === 0 ? 11 : month - 1)}
                >
                  <i className="fa-solid fa-chevron-right" />
                </button>

                <h3 className="font-bold text-lg">
                  {year} / {month + 1}
                </h3>

                <button
                  className="p-2 bg-teal-600 text-white rounded-lg"
                  onClick={() => setMonth(month === 11 ? 0 : month + 1)}
                >
                  <i className="fa-solid fa-chevron-left" />
                </button>
              </div>

              {/* Days */}
              <div className="grid grid-cols-7 gap-3 text-center">
                {[...Array(daysInMonth)].map((_, i) => {
                  const d = getDayObj(i + 1);
                  return (
                    <div
                      key={i}
                      onClick={() => !d.disabled && setSelectedDate(d.dateStr)}
                      className={`p-3 rounded-xl cursor-pointer ${
                        d.disabled
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white border hover:bg-teal-50"
                      } ${
                        selectedDate === d.dateStr
                          ? "border-teal-600 bg-teal-100"
                          : ""
                      }`}
                    >
                      <div className="text-sm text-gray-500">{d.dayName}</div>
                      <div className="text-lg font-bold">{d.dayNumber}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Time Slots */}
        {selectedDate && (
          <div>
            <label className="font-semibold">اختيار الوقت *</label>

            <div className="mt-3 grid md:grid-cols-3 gap-4">
              {(place === "online" ? onlineTimes : branchTimes[branch]).map(
                (time: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 rounded-xl border text-center ${
                      selectedTime === time
                        ? "border-teal-600 bg-teal-100"
                        : "border-gray-300 hover:bg-teal-50"
                    }`}
                  >
                    {time}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full p-4 bg-green-600 text-white font-bold rounded-xl mt-10 hover:bg-green-700"
        >
          احجز الآن
        </button>
      </div>
    </div>
  );
}
