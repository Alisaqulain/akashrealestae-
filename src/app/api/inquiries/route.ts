import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth";
import { connectToDatabase, isDatabaseEnabled, MONGODB_DISABLED_MESSAGE } from "@/lib/db";
import { inquirySchema } from "@/lib/validations";
import Inquiry from "@/models/Inquiry";

export async function GET() {
  try {
    await requireAdmin();

    if (!isDatabaseEnabled()) {
      return NextResponse.json({ message: MONGODB_DISABLED_MESSAGE }, { status: 503 });
    }

    await connectToDatabase();

    const inquiries = await Inquiry.find({})
      .populate("propertyId", "title slug")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ inquiries });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unable to load inquiries." },
      { status: 403 },
    );
  }
}

export async function POST(request: Request) {
  try {
    if (!isDatabaseEnabled()) {
      return NextResponse.json({ message: MONGODB_DISABLED_MESSAGE }, { status: 503 });
    }

    await connectToDatabase();
    const body = await request.json();
    const data = inquirySchema.parse(body);

    const inquiry = await Inquiry.create(data);

    return NextResponse.json(
      {
        message: "Your inquiry has been shared with our team.",
        inquiry,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unable to submit inquiry." },
      { status: 400 },
    );
  }
}
