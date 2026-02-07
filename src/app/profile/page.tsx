"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 

export default function Profile() {
  return (
    <div className="max-w-[1200px] mx-auto p-4">


      {/* Breadcrumb */}
      <div className="text-gray-500 text-sm mt-6">
        <a href="/" className="text-teal-600">الرئيسية</a> / ملف الطبيب
      </div>

      {/* Main */}
      <main className="mt-8 grid gap-8">
        {/* Doctor Card */}
        <div className="bg-white p-6 rounded-xl shadow flex max-md:flex-col items-center justify-between gap-6">
          <div className="flex items-center gap-6 max-md:flex-col">
            <div className="w-[110px] h-[110px] rounded-full overflow-hidden border-4 border-gray-200">
              <img src="/n.jpg" className="w-full h-full object-cover" />
            </div>

            <div>
              <h3 className="text-xl font-bold">د. احمد نائل</h3>
              <p className="text-gray-500 mt-1">
                أخصائي علاج نفسي وتاهيل الإدمان والاستشارات
              </p>
            </div>
          </div>

          <a
            href="/booking"
            className="bg-teal-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-teal-700 transition"
          >
            احجز الآن
          </a>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Contact Info */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h4 className="text-lg font-bold text-center mb-4">معلومات الاتصال</h4>

            <div className="space-y-4 text-gray-700">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-teal-600 text-lg">
                  <i className="fa-solid fa-mobile-screen" />
                </span>
                <div>
                  <div className="font-bold">01274394945</div>
                  <div className="text-sm text-gray-500">رقم الهاتف</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-teal-600 text-lg">
                  <i className="fa-regular fa-envelope" />
                </span>
                <div>
                  <div className="font-bold">ahmednaiel23@gmail.com</div>
                  <div className="text-sm text-gray-500">البريد الإلكتروني</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-teal-600 text-lg">
                  <i className="fa-solid fa-location-dot" />
                </span>
                <div>
                  <div className="font-bold">القاهرة – الإسكندرية</div>
                  <div className="text-sm text-gray-500">الفروع المتاحة</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h4 className="text-lg font-bold text-center mb-4">السيرة الذاتية</h4>
            <p className="text-gray-600 leading-7 text-center">
              أخصائي علاج نفسي وتاهيل الإدمان والاستشارات مع خبرة طويلة في دعم وتحسين الصحة النفسية.
            </p>
          </div>
        </div>
      </main>

      {/* Why Choose */}
      <div className="bg-white p-6 rounded-xl shadow mt-8">
        <h4 className="text-center text-xl font-bold mb-6">
          لماذا تختار د. احمد نائل؟
        </h4>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-gray-100 rounded-xl">
            <div className="text-3xl text-teal-600 mb-2">
              <i className="fa-solid fa-medal" />
            </div>
            <h5 className="font-bold mb-1">خبرة كبيرة</h5>
            <p className="text-sm text-gray-500">سنوات طويلة في العلاج النفسي</p>
          </div>

          <div className="p-4 bg-gray-100 rounded-xl">
            <div className="text-3xl text-teal-600 mb-2">
              <i className="fa-solid fa-users" />
            </div>
            <h5 className="font-bold mb-1">أكثر من 5000 مريض</h5>
            <p className="text-sm text-gray-500">تم علاجهم بنجاح</p>
          </div>

          <div className="p-4 bg-gray-100 rounded-xl">
            <div className="text-3xl text-teal-600 mb-2">
              <i className="fa-solid fa-award" />
            </div>
            <h5 className="font-bold mb-1">شهادات تدريبية</h5>
            <p className="text-sm text-gray-500">
              برامج متقدمة في العلاج النفسي والإدمان
            </p>
          </div>
        </div>
      </div>

      {/* Clinic Locations */}
      <div className="bg-white p-6 rounded-xl shadow mt-8">
        <h4 className="text-center text-xl font-bold mb-6">أماكن العمل</h4>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Cairo */}
          <div className="bg-gray-100 p-4 rounded-xl">
            <div className="h-28 bg-gray-300 rounded mb-4 flex items-center justify-center text-gray-600">
              خريطة مصغرة
            </div>
            <div className="font-bold text-lg mb-1">فرع القاهرة</div>
            <p className="text-gray-600 text-sm">
              4 شارع عصمت منصور / الحي الثامن / مدينة نصر
            </p>
            <h4 className="mt-4 font-bold">ساعات العمل</h4>
            <ul className="mt-2 text-gray-600 text-sm space-y-1">
              <li>السبت: 12 م – 8 م</li>
              <li>الأربعاء: 12 م – 8 م</li>
              <li>الخميس: 12 م – 8 م</li>
            </ul>
          </div>

          {/* Alex */}
          <div className="bg-gray-100 p-4 rounded-xl">
            <div className="h-28 bg-gray-300 rounded mb-4 flex items-center justify-center text-gray-600">
              خريطة مصغرة
            </div>
            <div className="font-bold text-lg mb-1">فرع الإسكندرية</div>
            <p className="text-gray-600 text-sm">
              62 ش خليل حمادة / أمام صيدلية فرحات
            </p>
            <h4 className="mt-4 font-bold">ساعات العمل</h4>
            <ul className="mt-2 text-gray-600 text-sm space-y-1">
              <li>الاثنين: 12 م – 9 م</li>
              <li>الثلاثاء: 12 م – 9 م</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
