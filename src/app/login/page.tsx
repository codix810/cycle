"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError("");
    if (!form.email || !form.password) {
      setError("املأ كل البيانات");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.error || "خطأ في تسجيل الدخول");
        return;
      }

      // حسب الدور ممكن توجهه لمكان معين
if (res.ok) {
   window.location.href = "/";
}
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError("مشكلة في الاتصال");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl"
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-blue-700">
          تسجيل الدخول
        </h2>

        <div className="grid gap-4">
          <input
            name="email"
            type="email"
            onChange={handleChange}
            placeholder="الإيميل"
            className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="password"
            type="password"
            onChange={handleChange}
            placeholder="كلمة المرور"
            className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
          />

          {error && (
            <div className="text-red-500 text-sm mt-1 text-center">
              {error}
            </div>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-bold hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "جاري الدخول..." : "دخول"}
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          معندكش حساب؟{" "}
          <Link href="/register" className="text-blue-600 font-semibold">
            اعمل واحد من هنا
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
