"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PatientView({ params }: any) {
  const [id, setId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [patient, setPatient] = useState<any>(null);
  const [booking, setBooking] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // --------- حل مشكلة Promise params ---------
  useEffect(() => {
    if (!params) return;

    Promise.resolve(params).then((p: any) => {
      setId(p.id);
    });
  }, [params]);
  // -------------------------------------------

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
          setError(data.message || data.error || "فشل جلب بيانات المريض");
          setPatient(null);
        } else {
          setPatient(data.patient);
          setBooking(data.booking || null);
        }
      } catch {
        setError("خطأ في الاتصال");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading || !id) return <div className="p-6">جاري التحميل...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!patient) return <div className="p-6">لا يوجد بيانات للمريض.</div>;

  return (
    <>
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">{patient.fullName}</h1>
            <p className="text-sm text-gray-500">
              تسجيل: {new Date(patient.createdAt).toLocaleString("ar")}
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              href={`/dashboard/patients/edit/${id}`}
              className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full"
            >
              ✏ تعديل
            </Link>

            <Link
              href="/dashboard/patients"
              className="px-4 py-2 bg-gray-100 rounded-full"
            >
              رجوع
            </Link>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold">الهاتف</h4>
              <p>{patient.phone || "-"}</p>
            </div>

            <div>
              <h4 className="font-semibold">تاريخ الميلاد</h4>
              <p>
                {patient.dob
                  ? new Date(patient.dob).toLocaleDateString("ar")
                  : "-"}
              </p>
            </div>

            <div>
              <h4 className="font-semibold">النوع</h4>
              <p>{patient.gender || "-"}</p>
            </div>

            <div>
              <h4 className="font-semibold">العنوان</h4>
              <p>{patient.address || "-"}</p>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold">ملاحظات</h4>
            <p className="whitespace-pre-wrap">{patient.notes || "-"}</p>
          </div>
        </div>
      </div>

      {booking && (
        <div className="bg-white p-4 rounded-xl shadow mt-6">
          <h2 className="text-xl font-bold mb-3">آخر حجز للمريض</h2>

          <p>
            <b>نوع الاستشارة:</b> {booking.consultationType || booking.type || "-"}
          </p>

          <p>
            <b>التاريخ:</b> {booking.date || "-"}
          </p>

          <p>
            <b>الوقت:</b> {booking.time || "-"}
          </p>

          <p>
            <b>الحالة:</b> {booking.status || "-"}
          </p>
        </div>
      )}
    </>
  );
}
