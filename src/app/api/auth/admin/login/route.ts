///api/auth/admin/login
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (username !== "admin" || password !== "admin123")
    return NextResponse.json({ success: false, error: "Invalid Credentials" });

  const token = jwt.sign(
    {
      id: "admin",
      role: "admin",
    },
    process.env.JWT_SECRET!,
    { expiresIn: "30d" }
  );

  return NextResponse.json({ success: true, token });
}
