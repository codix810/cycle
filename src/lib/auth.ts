import { ReadonlyRequestCookies } from "next/headers";
const jwt = require("jsonwebtoken");

export function getUserRole(cookies: ReadonlyRequestCookies) {
  try {
    const token = cookies.get("token")?.value;

    if (!token) return "guest";

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    return decoded.role || "guest";
  } catch {
    return "guest";
  }
}
