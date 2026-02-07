import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Booking from "@/models/Booking";
import { getUserIdFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: any) {
  try {
    await dbConnect();
    const userId = getUserIdFromRequest(req);
    if (!userId) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const bookings = await Booking.find({ patient: params.id }).sort({ date: 1, time: 1 }).lean();
    return NextResponse.json({ success: true, bookings });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
