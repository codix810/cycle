"use client";

import { useState, useEffect } from "react";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);

  const [username, setUsername] = useState("Dr.Ahmad");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [newBranch, setNewBranch] = useState("");

  const [branches, setBranches] = useState<any[]>([]);
  const [hours, setHours] = useState<any>({});
const token = localStorage.getItem("token");



  // ================================
  // Load settings from DB
  // ================================
  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
const token = localStorage.getItem("token");

const res = await fetch("/api/settings", {
  headers: {
    Authorization: `Bearer ${token}`,
  },

});    
  const data = await res.json();

      if (data.success) {
        const s = data.settings;

        setUsername(s.username);
        setBranches(s.branches);
        setHours(s.workingHours);
      }
    } catch (err) {
      console.log("LOAD ERROR:", err);
    }

    setLoading(false);
  }

  // ================================
  // Save settings to DB
  // ================================
  async function handleSave() {
    if (password && password !== confirmPass) {
      return alert("كلمتا المرور غير متطابقتين");
    }
const token = localStorage.getItem("token");

const res = await fetch("/api/settings", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    branches,
    workingHours: hours,
    password,
  }),
});



    const data = await res.json();

 if (data.success) {
  alert("تم حفظ التعديلات بنجاح!");
} else {
  console.log("SAVE ERROR:", data);
  alert("فشل الحفظ! شوف console");
}

  }

  // ================================
  // Add new branch
  // ================================
  const addBranch = () => {
    if (!newBranch.trim()) return;

    const updated = [...branches, { name: newBranch, active: false }];
    setBranches(updated);

    setNewBranch("");
  };

  // ================================
  // Add / Edit / Delete working hours
  // ================================
  const addHour = (day: string) => {
    const from = prompt("من:");
    const to = prompt("إلى:");

    if (!from || !to) return;

    setHours({
      ...hours,
      [day]: [...hours[day], { from, to }],
    });
  };

  const editHour = (day: string, index: number) => {
    const item = hours[day][index];
    const newFrom = prompt("من:", item.from);
    const newTo = prompt("إلى:", item.to);

    if (!newFrom || !newTo) return;

    const updated = [...hours[day]];
    updated[index] = { from: newFrom, to: newTo };

    setHours({ ...hours, [day]: updated });
  };

const deleteHour = (day: string, index: number) => {
  if (!confirm("هل أنت متأكد من الحذف؟")) return;

  const updated = hours[day].filter(
    (slot: { from: string; to: string }, i: number) => i !== index
  );

  setHours({ ...hours, [day]: updated });
};


  if (loading) return <p className="text-center mt-10">جارٍ التحميل...</p>;

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-center">الإعدادات المتقدمة</h1>

      {/* User Settings */}
      <section className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">معلومات الحساب</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label>اسم المستخدم</label>
            <input
              type="text"
              readOnly
              value={username}
              className="w-full p-3 mt-1 bg-gray-100 rounded-lg border"
            />
          </div>

          <div>
            <label>كلمة المرور الجديدة</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-1 rounded-lg border"
            />
          </div>

          <div>
            <label>تأكيد كلمة المرور</label>
            <input
              type="password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              className="w-full p-3 mt-1 rounded-lg border"
            />
          </div>
        </div>
      </section>

      {/* Branches */}
      <section className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">إدارة الفروع</h2>

        <div className="flex flex-wrap gap-6 mb-4">
          {branches.map((b, idx) => (
            <label key={idx} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={b.active}
                onChange={() => {
                  const updated = [...branches];
                  updated[idx].active = !updated[idx].active;
                  setBranches(updated);
                }}
              />
              {b.name}
            </label>
          ))}
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="اسم الفرع الجديد"
            value={newBranch}
            onChange={(e) => setNewBranch(e.target.value)}
            className="flex-1 p-3 border rounded-lg"
          />

          <button
            onClick={addBranch}
            className="bg-teal-600 text-white px-4 py-3 rounded-lg"
          >
            + إضافة
          </button>
        </div>
      </section>

      {/* Working Hours */}
      <section className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-6">إدارة ساعات العمل</h2>

        {Object.keys(hours).map((day) => (
          <div key={day} className="mb-6 border-b pb-4">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold">{day}</span>

              <button
                onClick={() => addHour(day)}
                className="bg-gray-200 px-4 py-2 rounded-full hover:bg-teal-600 hover:text-white"
              >
                + إضافة موعد
              </button>
            </div>

            {hours[day].length === 0 ? (
              <p className="text-gray-500 text-sm">لا توجد مواعيد</p>
            ) : (
              hours[day].map((slot: any, i: number) => (
                <div
                  key={i}
                  className="flex justify-between bg-gray-50 border p-3 rounded-xl mb-2"
                >
                  <span>من {slot.from} — إلى {slot.to}</span>

                  <div className="flex gap-3">
                    <button
                      onClick={() => editHour(day, i)}
                      className="w-10 h-10 flex justify-center items-center bg-gray-200 rounded-full hover:bg-teal-600 hover:text-white"
                    >
                      ✏
                    </button>

                    <button
                      onClick={() => deleteHour(day, i)}
                      className="w-10 h-10 flex justify-center items-center bg-red-100 text-red-600 rounded-full hover:bg-red-600 hover:text-white"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        ))}
      </section>

      <div className="text-center">
        <button
          onClick={handleSave}
          className="bg-teal-600 text-white px-10 py-3 rounded-full text-lg font-semibold hover:bg-teal-700"
        >
          حفظ التغييرات
        </button>
      </div>
    </div>
  );
}
