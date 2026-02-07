"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditPatient({ params }: any) {
  const router = useRouter();

  const [id, setId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    notes: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // --------- فكّ params لأنه Promise ---------
  useEffect(() => {
    if (!params) return;

    Promise.resolve(params).then((p: any) => {
      setId(p.id);
    });
  }, [params]);
  // -------------------------------------------

  // --------- تحميل بيانات المريض ---------
  useEffect(() => {
    if (!id) return;

    (async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token") || "";

        const res = await fetch(`/api/patients/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          setError(data.message || data.error || "فشل جلب بيانات");
        } else {
          const p = data.patient;
          setForm({
            fullName: p.fullName || "",
            phone: p.phone || "",
            dob: p.dob ? p.dob.slice(0, 10) : "",
            gender: p.gender || "",
            address: p.address || "",
            notes: p.notes || "",
          });
        }
      } catch {
        setError("خطأ في الاتصال");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);
  // -------------------------------------------

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    try {
      const token = localStorage.getItem("token") || "";

      const res = await fetch(`/api/patients/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || data.error || "فشل الحفظ");
      } else {
        router.push(`/dashboard/patients/${id}`);
      }
    } catch {
      setError("خطأ في السيرفر");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !id) return <div className="p-6">جاري التحميل...</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">تعديل بيانات المريض</h1>

      {error && <div className="text-red-600">{error}</div>}

      <input
        value={form.fullName}
        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        placeholder="اسم المريض"
        className="border p-3 rounded w-full"
      />

      <input
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        placeholder="رقم الهاتف"
        className="border p-3 rounded w-full"
      />

      <input
        type="date"
        value={form.dob}
        onChange={(e) => setForm({ ...form, dob: e.target.value })}
        className="border p-3 rounded w-full"
      />

      <select
        value={form.gender}
        onChange={(e) => setForm({ ...form, gender: e.target.value })}
        className="border p-3 rounded w-full"
      >
        <option value="">اختر النوع</option>
        <option value="ذكر">ذكر</option>
        <option value="أنثى">أنثى</option>
      </select>

      <input
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
        placeholder="العنوان"
        className="border p-3 rounded w-full"
      />

      <textarea
        value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
        placeholder="ملاحظات"
        className="border p-3 rounded w-full"
      />

      <div className="flex gap-2">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-teal-600 text-white px-4 py-2 rounded"
        >
          {saving ? "جاري الحفظ..." : "حفظ"}
        </button>

        <button
          onClick={() => router.back()}
          className="bg-gray-100 px-4 py-2 rounded"
        >
          إلغاء
        </button>
      </div>
    </div>
  );
}
