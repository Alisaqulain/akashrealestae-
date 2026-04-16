import { NextResponse } from "next/server";

import { requireAuth } from "@/lib/auth";
import { uploadImage } from "@/lib/cloudinary";

export async function POST(request: Request) {
  try {
    const user = await requireAuth();

    if (user.role !== "admin") {
      return NextResponse.json({ message: "Only administrators can upload images." }, { status: 403 });
    }

    const body = await request.json();
    const files = Array.isArray(body.files) ? body.files : [];

    if (!files.length) {
      return NextResponse.json({ message: "No images were provided." }, { status: 400 });
    }

    const uploads = await Promise.all(
      files.map((file: string) => uploadImage(file)),
    );

    return NextResponse.json({
      message: "Images uploaded successfully.",
      urls: uploads.map((item) => item.secure_url),
    });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Upload failed." },
      { status: 400 },
    );
  }
}
