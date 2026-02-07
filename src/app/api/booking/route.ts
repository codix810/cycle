import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Booking from "@/models/Booking";

export async function GET() {
  try {
    await dbConnect();

    const bookings = await Booking.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      bookings: bookings.map((b: any) => ({
        _id: b._id,
        consultationType: b.type,
        date: b.date,
        time: b.time,
        name: b.name,
        phone: b.phone,
        status: b.status,
        number: 1,
        image: b.transferImageUrl || null, // ← هنا أهم حاجة
      })),
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
