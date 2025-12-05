import { NextResponse } from "next/server";
import { cookies } from "next/headers";
const jwt = require("jsonwebtoken");
import { dbConnect } from "@/lib/db";
import User from "@/models/User";
import Craftsman from "@/models/Craftsman";

export async function DELETE() {
  await dbConnect();

  try {
    const token = cookies().get("token")?.value;
    if (!token) return NextResponse.json({ error: "غير مسجل" }, { status: 401 });

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    // حذف المستخدم
    await User.findByIdAndDelete(decoded.id);

    // حذف ملف الصنايعي إن وجد
    await Craftsman.findOneAndDelete({ userId: decoded.id });

    const res = NextResponse.json({ message: "تم حذف الحساب" });

    // امسح الكوكي
    res.cookies.set("token", "", { path: "/", expires: new Date(0) });

    return res;
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "خطأ من السيرفر" }, { status: 500 });
  }
}
