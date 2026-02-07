"use client";

import { useEffect, useState } from "react";

interface Patient {
  _id: string;
  fullName: string;
  phone: string;
  createdAt: string;
}

export default function PatientsPage() {
  const [search, setSearch] = useState("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    (async () => {
      const res = await fetch("/api/patients", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (data.success) setPatients(data.patients);

      setLoading(false);
    })();
  }, []);

  const filtered = patients.filter((p) =>
    p.fullName.toLowerCase().includes(search.toLowerCase()) ||
    p.phone.includes(search)
  );
const deletePatient = async (id: string) => {
  if (!confirm("هل تريد حذف هذا المريض؟")) return;

  const res = await fetch(`/api/patients/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  if (data.success) {
    alert("تم حذف المريض");
    setPatients((prev) => prev.filter((p) => p._id !== id));
  } else {
    alert("فشل حذف المريض");
  }
};

  return (
    <div className="space-y-10 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">قائمة المرضى</h1>

        <a
          href="/dashboard/patients/new"
          className="bg-teal-600 text-white px-4 py-2 rounded-full"
        >
          + مريض جديد
        </a>
      </div>

      <input
        placeholder="بحث..."
        className="w-full border p-3 rounded-lg"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="bg-white rounded-xl shadow p-4">
        {loading ? (
          <div>جاري التحميل...</div>
        ) : (
          <table className="w-full text-center">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm">
                <th className="p-3">الاسم</th>
                <th className="p-3">التاريخ</th>
                <th className="p-3">الهاتف</th>
                <th className="p-3">إجراءات</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((p) => (
                <tr key={p._id} className="border-b">
                  <td className="p-3">{p.fullName}</td>
                  <td className="p-3">
                    {p.createdAt
                      ? new Date(p.createdAt).toLocaleDateString("ar")
                      : "-"}
                  </td>
                  <td className="p-3">{p.phone}</td>

                  <td className="p-3 flex justify-center gap-3">
                    <a
                      href={`/dashboard/patients/${p._id}`}
                      className="bg-gray-100 text-gray-600 px-3 py-2 rounded-full"
                    >
                      👁 عرض
                    </a>

                    <a
                      href={`/dashboard/patients/edit/${p._id}`}
                      className="bg-teal-100 text-teal-700 px-3 py-2 rounded-full"
                    >
                      ✏ تعديل
                    </a>


                    <button
  onClick={() => deletePatient(p._id)}
  className="bg-red-100 text-red-600 px-3 py-2 rounded-full"
>
  🗑 حذف
</button>

                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-6 text-gray-500">
                    لا يوجد نتائج
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
