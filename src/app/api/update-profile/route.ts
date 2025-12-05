import { NextResponse } from "next/server";
import { cookies } from "next/headers";
const jwt = require("jsonwebtoken");
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/db";
import User from "@/models/User";
import Craftsman from "@/models/Craftsman";

export async function PUT(req: Request) {
  await dbConnect();

  try {
    const token = cookies().get("token")?.value;
    if (!token) return NextResponse.json({ error: "غير مسجل" }, { status: 401 });

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const body = await req.json();

    const { name, phone, password, jobTitle, description, experienceYears, address, idCardImage, profileImage, workImages } = body;

    // تحديث بيانات المستخدم العامة
    const updateUser: any = { name, phone };
    if (password) updateUser.password = await bcrypt.hash(password, 10);

    const user = await User.findByIdAndUpdate(decoded.id, updateUser, { new: true });

    // لو صنايعي
    if (user.role === "craftsman") {
      await Craftsman.findOneAndUpdate(
        { userId: decoded.id },
        {
          jobTitle,
          description,
          experienceYears,
          address,
          idCardImage,
          profileImage,
          workImages,
        },
        { new: true }
      );
    }

    return NextResponse.json({ message: "تم تحديث البيانات" });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "خطأ من السيرفر" }, { status: 500 });
  }
}
