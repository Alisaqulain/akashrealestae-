import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth";
import { connectToDatabase, isDatabaseEnabled, MONGODB_DISABLED_MESSAGE } from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  try {
    await requireAdmin();

    if (!isDatabaseEnabled()) {
      return NextResponse.json({ message: MONGODB_DISABLED_MESSAGE }, { status: 503 });
    }

    await connectToDatabase();

    const users = await User.find({}).select("-password").sort({ createdAt: -1 }).lean();
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unable to load users." },
      { status: 403 },
    );
  }
}
