import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.pathname;

  // =========================
  // PUBLIC ROUTES
  // =========================
  const publicApis = [
    "/api/auth/admin/login",
    "/api/auth/doctor/login",
    "/api/bookings",
    "/api/bookings/",
    "/api/bookings/create",
    "/api/patients",      // ← أضفناها
    "/api/patients/",     // ← وأضفنا النسخة بالسلاش
    "/api/patients/public",
    "/api/booking",
    "/api/booking/",
  ];

  // Allow public APIs
  if (publicApis.some((p) => url.startsWith(p))) {
    return NextResponse.next();
  }

  // =========================
  // PROTECTED ROUTES
  // =========================
  if (url.startsWith("/api")) {
    const token =
      req.headers.get("authorization")?.replace("Bearer ", "") || null;

    if (!token) {
      return NextResponse.json(
        { success: false, error: "No token" },
        { status: 403 }
      );
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
