"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const router = useRouter();

  const [role, setRole] = useState<"client" | "craftsman">("client");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    jobTitle: "",
    description: "",
    experienceYears: "",
    address: "",
  });

  const [idCardImage, setIdCardImage] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [workImages, setWorkImages] = useState<FileList | null>(null);

  const [loading, setLoading] = useState(false);

  // Change text input
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const uploadToCloudinary = async (file: File) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "unsigned_dashboard");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY}/image/upload`,
      { method: "POST", body: data }
    );

    const result = await res.json();
    return result.secure_url;
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.phone || !form.password) {
      alert("املأ البيانات الأساسية");
      return;
    }

    if (role === "craftsman") {
      if (
        !form.jobTitle ||
        !form.description ||
        !form.experienceYears ||
        !form.address
      ) {
        alert("املأ بيانات الصنايعي كلها");
        return;
      }

      if (!idCardImage || !profileImage) {
        alert("صور البطاقة والصورة الشخصية مطلوبين");
        return;
      }
    }

    setLoading(true);

    try {
      let idCardURL = "";
      let profileURL = "";
      let workImagesURLs: string[] = [];

      if (role === "craftsman") {
        idCardURL = await uploadToCloudinary(idCardImage!);
        profileURL = await uploadToCloudinary(profileImage!);

        if (workImages) {
          for (let i = 0; i < workImages.length; i++) {
            const img = await uploadToCloudinary(workImages[i]);
            workImagesURLs.push(img);
          }
        }
      }

      const endpoint =
        role === "client"
          ? "/api/auth/register"
          : "/api/auth/register-craftsman";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          role,
          idCardImage: idCardURL,
          profileImage: profileURL,
          workImages: workImagesURLs,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "حصل خطأ");
        setLoading(false);
        return;
      }

      router.push("/");
    } catch (err) {
      console.log(err);
      alert("خطأ ما حصل أثناء التسجيل");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100 flex justify-center items-start">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg"
      >
        <h2 className="text-center font-bold text-2xl mb-6 text-blue-700">
          إنشاء حساب جديد
        </h2>

        {/* Choose Role */}
        <div className="flex gap-4 mb-5 justify-center">
          <button
            className={`px-4 py-2 rounded-xl font-bold ${
              role === "client"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setRole("client")}
          >
            عميل
          </button>
          <button
            className={`px-4 py-2 rounded-xl font-bold ${
              role === "craftsman"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setRole("craftsman")}
          >
            صنايعي
          </button>
        </div>

        {/* Shared inputs */}
        <div className="grid grid-cols-1 gap-4">
          <input name="name" onChange={handleChange} placeholder="الاسم" className="border p-3 rounded-xl" />
          <input name="email" onChange={handleChange} placeholder="الإيميل" className="border p-3 rounded-xl" />
          <input name="phone" onChange={handleChange} placeholder="رقم التليفون" className="border p-3 rounded-xl" />
          <input type="password" name="password" onChange={handleChange} placeholder="كلمة المرور" className="border p-3 rounded-xl" />
        </div>

        {/* Craftsman Extra Fields */}
        {role === "craftsman" && (
          <>
            <div className="grid grid-cols-1 gap-4 mt-4">
              <input name="jobTitle" onChange={handleChange} placeholder="مجال العمل" className="border p-3 rounded-xl" />
              <input name="description" onChange={handleChange} placeholder="الوصف" className="border p-3 rounded-xl" />
              <input name="experienceYears" onChange={handleChange} placeholder="سنين الخبرة" className="border p-3 rounded-xl" />
              <input name="address" onChange={handleChange} placeholder="العنوان" className="border p-3 rounded-xl" />

              <label className="font-bold">صورة البطاقة</label>
              <input type="file" onChange={(e) => setIdCardImage(e.target.files?.[0] || null)} />

              <label className="font-bold">صورتك الشخصية</label>
              <input type="file" onChange={(e) => setProfileImage(e.target.files?.[0] || null)} />

              <label className="font-bold">صور من شغلك</label>
              <input type="file" multiple onChange={(e) => setWorkImages(e.target.files)} />
            </div>
          </>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl font-bold"
        >
          {loading ? "جاري التسجيل..." : "تسجيل"}
        </button>
      </motion.div>
    </div>
  );
}
