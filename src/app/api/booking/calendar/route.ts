import { dbConnect } from "@/lib/db";
import Booking from "@/models/Booking";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { year, month, branch } = await req.json();

    // بداية ونهاية الشهر بصيغة string YYYY-MM-DD
    const monthStart = new Date(year, month, 1)
      .toISOString()
      .slice(0, 10);

    const monthEnd = new Date(year, month + 1, 0)
      .toISOString()
      .slice(0, 10);

    // جلب الحجوزات المؤكدة فقط  
    const bookings = await Booking.find({
      date: {
        $gte: monthStart,
        $lte: monthEnd,
      },
      ...(branch && { branch }),
      status: "confirmed", // التقويم يعرض المؤكد فقط
    })
      .sort({ date: 1, time: 1 })
      .lean();

    // تجهيز شكل البيانات للفرنت
    const mapped = bookings.map((b: any) => ({
      _id: b._id.toString(),
      date: b.date,
      time: b.time,
      name: b.name,
      type: b.type, // نفس اسم الفرنت
    }));

    return NextResponse.json({
      success: true,
      bookings: mapped,
    });
  } catch (err) {
    console.error("CALENDAR ERROR:", err);
    return NextResponse.json({
      success: false,
      error: "Error fetching calendar data",
    });
  }
}
