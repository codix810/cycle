import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Patient from "@/models/Patient";

export async function GET() {
  try {
    await dbConnect();

    const patients = await Patient.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      patients,
    });
  } catch (err) {
    console.error("GET /api/patients error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const { fullName, phone, dob, gender, address, notes } = body;

    if (!fullName || !phone) {
      return NextResponse.json(
        { success: false, message: "Required fields missing" },
        { status: 400 }
      );
    }

    const patient = await Patient.create({
      fullName,
      phone,
      dob,
      gender,
      address,
      notes,
    });

    return NextResponse.json({ success: true, patient });
  } catch (err) {
    console.error("POST /api/patients error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
