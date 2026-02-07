import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Visit from "@/models/Visit";
import { getUserIdFromRequest } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, { params }: any) {
  try {
    await dbConnect();
    const userId = getUserIdFromRequest(req);
    if (!userId) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const visits = await Visit.find({ patientId: params.id }).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, visits });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

// POST => multipart/form-data (file optional)
export async function POST(req: NextRequest, { params }: any) {
  try {
    await dbConnect();
    const userId = getUserIdFromRequest(req);
    if (!userId) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const contentType = req.headers.get("content-type") || "";
    let title = "";
    let notes = "";
    let fileUrl: string | undefined;

    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      title = String(form.get("title") || "");
      notes = String(form.get("notes") || "");
      const file = form.get("file") as File | null;
      if (file && file.size) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const uploadResult = await new Promise<any>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream({ folder: "visits" }, (error, result) => {
            if (error) return reject(error);
            resolve(result);
          });
          stream.end(buffer);
        });
        fileUrl = uploadResult.secure_url;
      }
    } else {
      const body = await req.json();
      title = body.title || "";
      notes = body.notes || "";
      fileUrl = body.fileUrl;
    }

    const visit = await Visit.create({
      patientId: params.id,
      doctorId: userId,
      title,
      notes,
      fileUrl,
    });

    return NextResponse.json({ success: true, visit }, { status: 201 });
  } catch (err) {
    console.error("VISIT POST ERROR:", err);
    return NextResponse.json({ success: false, message: "Server error", error: String(err) }, { status: 500 });
  }
}
