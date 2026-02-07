"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    phoneOrUser: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    // ==============================
    // 1) لو المستخدم دخل رقم موبايل → دكتور
    // ==============================
    const isPhone = /^01[0-9]{9}$/.test(form.phoneOrUser);

    const endpoint = isPhone
      ? "/api/auth/doctor/login"
      : "/api/auth/admin/login";

    const body = isPhone
      ? { phone: form.phoneOrUser, password: form.password }
      : { username: form.phoneOrUser, password: form.password };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!data.success) {
      setError("بيانات الدخول غير صحيحة");
      return;
    }

    // ==============================
    // 2) حفظ التوكن
    // ==============================
    localStorage.setItem("token", data.token);
    document.cookie = `token=${data.token}; path=/`;

    // ==============================
    // 3) الانتقال للداشبورد
    // ==============================
    router.push("/dashboard");
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md space-y-5">
        <h1 className="text-2xl font-bold text-center">تسجيل الدخول</h1>

        <input
          className="border p-3 w-full rounded-lg"
          placeholder="رقم الهاتف (للدكتور) أو اسم المستخدم (للأدمين)"
          onChange={(e) =>
            setForm({ ...form, phoneOrUser: e.target.value })
          }
        />

        <input
          type="password"
          className="border p-3 w-full rounded-lg"
          placeholder="كلمة المرور"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {error && (
          <p className="text-red-500 text-center font-semibold">{error}</p>
        )}

        <button
          onClick={handleLogin}
          className="w-full bg-teal-600 text-white py-3 rounded-lg font-bold hover:bg-teal-700"
        >
          تسجيل الدخول
        </button>
      </div>
    </div>
  );
}
