import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth";
import { connectToDatabase, isDatabaseEnabled, MONGODB_DISABLED_MESSAGE } from "@/lib/db";
import Property from "@/models/Property";

export async function GET() {
  try {
    await requireAdmin();

    if (!isDatabaseEnabled()) {
      return NextResponse.json({ message: MONGODB_DISABLED_MESSAGE }, { status: 503 });
    }

    await connectToDatabase();

    const properties = await Property.find({})
      .populate("createdBy", "name email role")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ properties });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unable to load properties." },
      { status: 403 },
    );
  }
}
