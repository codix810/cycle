///api/auth/doctor/login
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { phone, password } = await req.json();

  if (phone !== "01000000000" || password !== "123456")
    return NextResponse.json({ success: false, error: "Invalid Credentials" });

  const token = jwt.sign(
    {
      id: "doctor-001", // دخله ID حقيقي لو عندك DB
      role: "doctor",
    },
    process.env.JWT_SECRET!,
    { expiresIn: "30d" }
  );

  return NextResponse.json({ success: true, token });
}

           
              
