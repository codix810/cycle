"use client";

import { useState } from "react";

export default function AddPatient() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    notes: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return alert("يجب تسجيل الدخول");

    const res = await fetch("/api/patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (data.success) {
      alert("تم إضافة المريض");
      window.location.href = "/dashboard/patients";
    } else {
      alert("خطأ — راجع الكونسل");
      console.log(data);
    }
  };

  return (
    <div className="p-10 space-y-4">
      <h1 className="text-2xl font-bold">إضافة مريض جديد</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          placeholder="اسم المريض"
          className="border p-3 rounded w-full"
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        />

        <input
          placeholder="رقم الهاتف"
          className="border p-3 rounded w-full"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <input
          type="date"
          className="border p-3 rounded w-full"
          onChange={(e) => setForm({ ...form, dob: e.target.value })}
        />

        <select
          className="border p-3 rounded w-full"
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
        >
          <option value="">اختر النوع</option>
          <option value="ذكر">ذكر</option>
          <option value="أنثى">أنثى</option>
        </select>

        <input
          placeholder="العنوان"
          className="border p-3 rounded w-full"
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <textarea
          placeholder="ملاحظات"
          className="border p-3 rounded w-full"
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />

        <button
          type="submit"
          className="bg-teal-600 text-white px-6 py-3 rounded-lg"
        >
          إضافة المريض
        </button>
      </form>
    </div>
  );
}
