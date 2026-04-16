import { NextResponse } from "next/server";

import { connectToDatabase, isDatabaseEnabled, MONGODB_DISABLED_MESSAGE } from "@/lib/db";
import { setAuthCookie } from "@/lib/auth";
import { signupSchema } from "@/lib/validations";
import User from "@/models/User";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = signupSchema.parse(body);

    if (!isDatabaseEnabled()) {
      return NextResponse.json({ message: MONGODB_DISABLED_MESSAGE }, { status: 503 });
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return NextResponse.json(
        { message: "An account already exists with this email." },
        { status: 409 },
      );
    }

    const user = await User.create({
      ...data,
      role:
        process.env.ADMIN_EMAIL && data.email === process.env.ADMIN_EMAIL
          ? "admin"
          : "user",
    });

    const response = NextResponse.json({
      message: "Account created successfully.",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    await setAuthCookie(response, {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      name: user.name,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unable to create account." },
      { status: 400 },
    );
  }
}
