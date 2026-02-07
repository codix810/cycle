"use client";

import { useState } from "react";

export default function PatientProfile({ params }: { params: { id: string } }) {
  const patientId = params.id;

  // Fake data — later Mongo
  const patient = {
    name: "أحمد محمود",
    age: 34,
    gender: "ذكر",
    emergency: "+966 50 123 4567",
    conditions: ["ربو", "حساسية من البنسلين"],
    upcoming: [
      {
        id: 1,
        title: "استشارة متابعة",
        date: "الاثنين، ٣٠ جمادى الآخرة",
        patient: "فاطمة",
        status: "pending",
        number: 25,
      },
      {
        id: 2,
        title: "فحص روتيني",
        date: "الجمعة، ٢٥ جمادى الأولى",
        patient: "فاطمة",
        status: "pending",
        number: 15,
      },
    ],
    files: [
      { id: 1, name: "نتائج فحص الدم", size: "٢.١ ميجا", type: "PDF" },
      { id: 2, name: "الأشعة السينية للصدر", size: "٤.٥ ميجا", type: "Image" },
      { id: 3, name: "تقرير الاستشارة الأولية", size: "٢٥١ كيلوبايت", type: "Document" },
    ],
  };

  const [activeTab, setActiveTab] = useState("medical");

  const tabs = [
    { key: "medical", label: "السجل الطبي" },
    { key: "upcoming", label: "الجلسات القادمة" },
    { key: "history", label: "الزيارات السابقة" },
    { key: "notes", label: "ملاحظات الطبيب" },
  ];

  const uploadFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      alert(`تم رفع ${e.target.files.length} ملف`);
    }
  };

  return (
    <div className="space-y-10">

      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">{patient.name}</h1>
        <p className="text-gray-500">{patient.gender}، {patient.age} سنة</p>
        <p className="text-gray-500">جهة الاتصال الطارئة: {patient.emergency}</p>

        <div className="flex justify-center gap-2 mt-4 flex-wrap">
          {patient.conditions.map((c, i) => (
            <span
              key={i}
              className="bg-teal-600 text-white px-4 py-1 rounded-full text-sm"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-6 border-b pb-3">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`pb-2 text-lg ${
              activeTab === t.key
                ? "text-teal-600 font-bold border-b-4 border-teal-600"
                : "text-gray-500 hover:text-teal-600"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ---------------------- */}
      {/* TAB: Medical Record */}
      {/* ---------------------- */}
      {activeTab === "medical" && (
        <div className="bg-white p-6 rounded-xl shadow space-y-6">
          <h2 className="font-bold text-xl">السجل الطبي</h2>

          {patient.files.map((file) => (
            <div
              key={file.id}
              className="flex justify-between items-center border-b pb-3 last:border-none"
            >
              <div>
                <div className="font-semibold">{file.name}</div>
                <div className="text-gray-500 text-sm">{file.size}</div>
              </div>
              <span className="text-sm text-gray-600">{file.type}</span>
            </div>
          ))}

          {/* Upload Area */}
          <div
            className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-teal-600"
            onClick={() => document.getElementById("fileUpload")?.click()}
          >
            <i className="fa-regular fa-cloud text-4xl text-teal-600 mb-3"></i>
            <p className="text-teal-600 font-semibold">رفع ملف جديد</p>
          </div>

          <input
            type="file"
            id="fileUpload"
            multiple
            className="hidden"
            onChange={uploadFiles}
          />
        </div>
      )}

      {/* ---------------------- */}
      {/* TAB: Upcoming Sessions */}
      {/* ---------------------- */}
      {activeTab === "upcoming" && (
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h2 className="font-bold text-xl mb-4">الجلسات القادمة</h2>

          {patient.upcoming.map((u) => (
            <div
              key={u.id}
              className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border"
            >
              <div className="flex items-center gap-4">
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                  منتظرة
                </span>

                <div>
                  <div className="font-semibold">{u.title}</div>
                  <div className="text-gray-500 text-sm">
                    {u.date} - {u.patient}
                  </div>
                </div>
              </div>

              <div className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full font-bold">
                {u.number}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ---------------------- */}
      {/* TAB: History */}
      {/* ---------------------- */}
      {activeTab === "history" && (
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold text-xl">الزيارات السابقة</h2>
          <p className="text-gray-500 mt-2">لا يوجد سجل حتى الآن.</p>
        </div>
      )}

      {/* ---------------------- */}
      {/* TAB: Doctor Notes */}
      {/* ---------------------- */}
      {activeTab === "notes" && (
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h2 className="font-bold text-xl">ملاحظات الطبيب</h2>

          <textarea
            className="w-full p-4 border rounded-xl h-40 focus:outline-teal-600"
            placeholder="اكتب الملاحظات هنا..."
          ></textarea>

          <button className="bg-teal-600 text-white px-6 py-3 rounded-full hover:bg-teal-700">
            حفظ الملاحظة
          </button>
        </div>
      )}

      {/* SAVE Button */}
      <div className="text-center">
        <button
          className="bg-teal-600 text-white px-10 py-3 rounded-full text-lg font-semibold hover:bg-teal-700"
        >
          حفظ التعديلات
        </button>
      </div>
    </div>
  );
}
