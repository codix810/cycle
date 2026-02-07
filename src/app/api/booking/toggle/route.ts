// app/api/booking/toggle/route.ts

import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Booking from "@/models/Booking";
import { getUserIdFromRequest } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const doctorId = getUserIdFromRequest(req);


    const { id, newStatus } = await req.json();

    if (!id || !newStatus)
      return NextResponse.json(
        { success: false, msg: "MISSING_DATA" },
        { status: 400 }
      );

    const allowed = ["pending", "confirmed", "rejected"];
    if (!allowed.includes(newStatus))
      return NextResponse.json({ success: false, msg: "INVALID_STATUS" });

    const booking = await Booking.findOneAndUpdate(
{ _id: id },
      { status: newStatus },
      { new: true }
    );

    if (!booking)
      return NextResponse.json({ success: false, msg: "NOT_FOUND" });

    return NextResponse.json({ success: true, booking });
  } catch (err) {
    console.error("TOGGLE ERROR:", err);
    return NextResponse.json(
      { success: false, msg: "SERVER_ERR", err: String(err) },
      { status: 500 }
    );
  }
}
