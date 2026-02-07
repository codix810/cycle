//api/patients/new

import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Patient from "@/models/Patient";
import { getUserIdFromRequest } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const doctorId = getUserIdFromRequest(req);
    if (!doctorId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const { fullName, phone, gender, dob, address, notes } = body;

    if (!fullName || !phone) {
      return NextResponse.json(
        { success: false, message: "Required fields missing" },
        { status: 400 }
      );
    }

    const patient = await Patient.create({
      doctor: doctorId,
      fullName,
      phone,
      gender,
      dob,
      address,
      notes,
    });

    return NextResponse.json({ success: true, patient });
  } catch (err) {
    console.error("Create patient error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
