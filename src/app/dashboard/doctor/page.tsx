"use client";

import { useState } from "react";

export default function DoctorDashboard() {
  const doctor = {
    name: "د. أحمد نائل",
    title: "أخصائي علاج نفسي",
    img: "/imgs/n.jpg",
  };

  const [activeTab, setActiveTab] = useState("upcoming");

  const upcomingSessions = [
    {
      id: 1,
      status: "pending",
      title: "استشارة متابعة",
      date: "الأحد - 21 جمادى الآخرة",
      patient: "فاطمة",
      number: 25,
    },
    {
      id: 2,
      status: "scheduled",
      title: "جلسة علاج معرفي سلوكي",
      date: "الإثنين - 22 جمادى الآخرة",
      patient: "محمد",
      number: 11,
    },
  ];

  const pastSessions = [
    {
      id: 1,
      title: "جلسة تقييم",
      date: "15 جمادى الآخرة",
      patient: "علي",
    },
    {
      id: 2,
      title: "جلسة متابعة",
      date: "12 جمادى الآخرة",
      patient: "نور",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl shadow flex items-center gap-6">
        <img
          src={doctor.img}
          alt="doctor"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold">{doctor.name}</h1>
          <p className="text-gray-600">{doctor.title}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-8 border-b pb-2">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`pb-2 text-lg ${
            activeTab === "upcoming"
              ? "text-teal-600 font-bold border-b-4 border-teal-600"
              : "text-gray-500"
          }`}
        >
          الجلسات القادمة
        </button>

        <button
          onClick={() => setActiveTab("past")}
          className={`pb-2 text-lg ${
            activeTab === "past"
              ? "text-teal-600 font-bold border-b-4 border-teal-600"
              : "text-gray-500"
          }`}
        >
          الجلسات السابقة
        </button>

        <button
          onClick={() => setActiveTab("actions")}
          className={`pb-2 text-lg ${
            activeTab === "actions"
              ? "text-teal-600 font-bold border-b-4 border-teal-600"
              : "text-gray-500"
          }`}
        >
          نشاط الدكتور
        </button>
      </div>

      {/* ----------------------- */}
      {/* Upcoming Sessions */}
      {/* ----------------------- */}

      {activeTab === "upcoming" && (
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h2 className="text-xl font-bold">الجلسات القادمة</h2>

          {upcomingSessions.map((u) => (
            <div
              key={u.id}
              className="flex justify-between items-center bg-gray-50 border p-4 rounded-xl"
            >
              <div className="flex items-center gap-4">
                {/* Status */}
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    u.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {u.status === "pending" ? "منتظرة" : "مجدولة"}
                </span>

                {/* Info */}
                <div>
                  <div className="font-semibold">{u.title}</div>
                  <div className="text-gray-500 text-sm">
                    {u.date} - {u.patient}
                  </div>
                </div>
              </div>

              <div className="bg-gray-200 px-4 py-2 rounded-full font-bold text-gray-700">
                {u.number}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ----------------------- */}
      {/* Past Sessions */}
      {/* ----------------------- */}

      {activeTab === "past" && (
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h2 className="text-xl font-bold mb-4">الجلسات السابقة</h2>

          {pastSessions.map((s, i) => (
            <div
              key={i}
              className="flex justify-between items-center border-b pb-3"
            >
              <div>
                <div className="font-semibold">{s.title}</div>
                <div className="text-gray-500">{s.date}</div>
              </div>

              <div className="font-bold text-gray-700">{s.patient}</div>
            </div>
          ))}
        </div>
      )}

      {/* ----------------------- */}
      {/* Doctor Activity */}
      {/* ----------------------- */}

      {activeTab === "actions" && (
        <div className="bg-white p-6 rounded-xl shadow space-y-6">
          <h2 className="text-xl font-bold">نشاط الدكتور</h2>

          <p className="text-gray-600">تم عرض تقارير الجلسات الأخيرة.</p>

          <ul className="list-disc pr-6 text-gray-700 space-y-2">
            <li>إضافة مريض جديد</li>
            <li>إلغاء جلسة مجدولة</li>
            <li>تعديل موعد جلسة</li>
            <li>رفع ملف للسجل الطبي</li>
          </ul>
        </div>
      )}

      {/* Footer Buttons */}
      <div className="text-center">
        <button className="bg-teal-600 text-white px-10 py-3 rounded-full text-lg font-semibold hover:bg-teal-700">
          حجز جلسة جديدة
        </button>
      </div>
    </div>
  );
}
