"use client";

import { useEffect } from "react";

export default function Home() {
  return (
    <div className="max-w-[1200px] mx-auto p-4">
     
      {/* Main */}
      <main className="flex mt-16 items-center justify-between gap-20 max-md:flex-col">
        <img
          src="/n.jpg"
          className="rounded-2xl w-[450px] max-md:w-full"
        />

        {/* Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            مركز الاخصائي احمد نائل
          </h1>

          <p className="text-teal-600 text-lg mb-4">
            اخصائي علاج نفسي وتاهيل الادمان والاستشارات
          </p>

          <p className="text-gray-500 leading-7 mb-4">
            مرحبا بك في عيادتنا! نحن نقدم خدمات نفسية عالية الجودة
          </p>

          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center gap-2 text-green-600">
              <i className="fa-regular fa-circle-check" /> خبرة كبيرة في العلاج النفسي
            </li>
            <li className="flex items-center gap-2 text-green-600">
              <i className="fa-regular fa-circle-check" /> استشارات نفسية أونلاين وحضورية
            </li>
            <li className="flex items-center gap-2 text-green-600">
              <i className="fa-regular fa-circle-check" /> بيئة نفسية شاملة وآمنة وسرية
            </li>
          </ul>

          <a
            href="/booking"
            className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-blue-700 transition"
          >
            احجز الآن
          </a>
        </div>
      </main>

      {/* Branches Title */}
      <div className="text-center mt-20">
        <h1 className="text-3xl font-bold text-gray-800">فروعنا</h1>
        <p className="text-gray-500 mt-2">
          زرنا في أحد فروعنا المتخصصة للحصول على أفضل رعاية نفسية
        </p>
      </div>

      {/* Branches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {/* Branch 1 */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-bold mb-4 text-gray-800">فرع الإسكندرية</h3>

          <div className="space-y-3 text-gray-600">
            <p className="flex gap-2">
              <i className="fa-solid fa-calendar text-teal-600" />
              أيام العمل : الاثنين والثلاثاء
            </p>
            <p className="flex gap-2">
              <i className="fa-regular fa-clock text-teal-600" />
              ساعات العمل : من 12 م إلى 9 م
            </p>
            <p className="flex gap-2">
              <i className="fa-solid fa-location-dot text-teal-600" />
              62 ش خليل حمادة / أمام صيدلية فرحات / عيادات الماسة التخصصية
            </p>
            <p className="flex gap-2 font-bold text-teal-600">
              <i className="fa-solid fa-mobile-screen" />
              01274394945
            </p>
          </div>
        </div>

        {/* Branch 2 */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-bold mb-4 text-gray-800">فرع القاهرة</h3>

          <div className="space-y-3 text-gray-600">
            <p className="flex gap-2">
              <i className="fa-solid fa-calendar text-teal-600" />
              أيام العمل : السبت والاربعاء والخميس
            </p>
            <p className="flex gap-2">
              <i className="fa-regular fa-clock text-teal-600" />
              ساعات العمل : من 12 م إلى 8 م
            </p>
            <p className="flex gap-2">
              <i className="fa-solid fa-location-dot text-teal-600" />
              4 شارع عصمت منصور / الحي الثامن / مدينة نصر
            </p>
            <p className="flex gap-2 font-bold text-teal-600">
              <i className="fa-solid fa-mobile-screen" />
              01274394945
            </p>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="mt-20 text-center">
        <h1 className="text-3xl font-bold text-gray-800">خدماتنا</h1>
        <p className="text-gray-500 mt-2">
          نقدم خدمات متخصصة في العلاج النفسي والاستشارات والتعافي من الادمان
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {/* 1 */}
        <div className="bg-white p-6 rounded-xl shadow text-center hover:-translate-y-1 transition">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4 text-3xl text-teal-600">
            <i className="fa-solid fa-brain" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">المتابعة والاستشارات</h3>
          <p className="text-gray-500 text-sm mt-2">
            متابعة دورية واستشارات متخصصة لضمان تحسن الحالة الصحية النفسية
          </p>
        </div>

        {/* 2 */}
        <div className="bg-white p-6 rounded-xl shadow text-center hover:-translate-y-1 transition">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4 text-3xl text-teal-600">
            <i className="fa-solid fa-person" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">
            الاختبارات والمقاييس النفسية
          </h3>
          <p className="text-gray-500 text-sm mt-2">
            اختبارات دقيقة لتقييم الحالة النفسية بشكل علمي
          </p>
        </div>

        {/* 3 */}
        <div className="bg-white p-6 rounded-xl shadow text-center hover:-translate-y-1 transition">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4 text-3xl text-teal-600">
            <i className="fa-solid fa-heart-pulse" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">الفحص النفسي الشامل</h3>
          <p className="text-gray-500 text-sm mt-2">
            فحص شامل وتقييم دقيق باستخدام أحدث الأساليب
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center p-12 rounded-b-2xl">
        <h2 className="text-3xl font-bold mb-4">لا تتردد في التواصل معنا</h2>
        <p className="max-w-xl mx-auto opacity-90 leading-7 mb-6">
          احجز موعدك الآن واحصل على أفضل رعاية نفسية متخصصة
        </p>

        <a
          href="/booking"
          className="bg-white text-blue-700 px-8 py-3 rounded-full font-semibold shadow hover:bg-gray-100 transition"
        >
          احجز الآن
        </a>
      </div>
    </div>
  );
}
