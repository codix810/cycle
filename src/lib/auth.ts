//lib/auth
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

interface JwtPayload {
  id: string;
  role: "doctor" | "admin";
}

export function verifyToken(req: NextRequest): JwtPayload | null {
  const auth = req.headers.get("authorization");
  if (!auth || !auth.startsWith("Bearer ")) return null;

  const token = auth.split(" ")[1];

  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
  } catch {
    return null;
  }
}

// يسمح لأي يوزر (دكتور أو أدمين)
export function getUserIdFromRequest(req: NextRequest): string | null {
  const payload = verifyToken(req);
  if (!payload) return null;
  return payload.id;
}
