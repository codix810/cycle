//api/patients/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Patient from "@/models/Patient";

import Booking from "@/models/Booking"; // ← إضافة مهمة

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  try {
    await dbConnect();

    // 👇 كودك القديم كما هو
    const patient = await Patient.findById(id);
    if (!patient) {
      return NextResponse.json(
        { success: false, message: "Patient not found" },
        { status: 404 }
      );
    }

    // ⭐ إضافة ميزة جلب الحجز حسب رقم الموبايل
    const booking = await Booking.findOne({ phone: patient.phone })
      .sort({ createdAt: -1 })
      .lean();

    // 👇 رجّع كل البيانات القديمة + الجديدة
    return NextResponse.json({
      success: true,
      patient,
      booking: booking || null, // ← مهم
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    await dbConnect();

    const body = await req.json();

    const updated = await Patient.findByIdAndUpdate(id, body, { new: true });

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Patient not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, patient: updated });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    await dbConnect();

    await Patient.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
