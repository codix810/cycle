import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Booking from "@/models/Booking";
import cloudinary from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { success: false, message: "Expected form-data" },
        { status: 400 }
      );
    }

    const formData = await req.formData();

    const name = (formData.get("name") || "").toString().trim();
    const phone = (formData.get("phone") || "").toString().trim();
    const consultType = (formData.get("consultType") || "").toString();
    const place = (formData.get("place") || "").toString();
    const branch = (formData.get("branch") || "").toString();
    const date = (formData.get("date") || "").toString();
    const time = (formData.get("time") || "").toString();
    const notes = (formData.get("notes") || "").toString();
    const feeRaw = formData.get("fee");
    const file = formData.get("file") as File | null;

    if (!name || !phone || !consultType || !place || !date || !time) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    let transferImageUrl: string | undefined;

    // ✅ رفع الصورة لو موجودة
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const uploaded = await new Promise<{ secure_url: string }>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "clinic-bookings" },
          (err, result) => {
            if (err || !result) return reject(err);
            resolve(result as any);
          }
        ).end(buffer);
      });

      transferImageUrl = uploaded.secure_url;
    }

    const fee = typeof feeRaw === "string" ? Number(feeRaw) : undefined;

    const doctorId = "66f123abc9ff3c28b652de01";

    const booking = await Booking.create({
      doctor: doctorId,
      name,
      phone,
      type: consultType,
      place,
      branch,
      date,
      time,
      notes,
      fee,
      transferImageUrl, // ← أهم حاجة
      status: "pending",
    });

    return NextResponse.json({ success: true, data: booking }, { status: 201 });

  } catch (err: any) {
    console.error("BOOKING ERROR:", err.message);
    return NextResponse.json(
      { success: false, message: "Server error", error: err.message },
      { status: 500 }
    );
  }
}
