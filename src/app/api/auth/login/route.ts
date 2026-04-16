import { NextResponse } from "next/server";

import { connectToDatabase, isDatabaseEnabled, MONGODB_DISABLED_MESSAGE } from "@/lib/db";
import { setAuthCookie } from "@/lib/auth";
import { loginSchema } from "@/lib/validations";
import User from "@/models/User";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = loginSchema.parse(body);

    if (!isDatabaseEnabled()) {
      return NextResponse.json({ message: MONGODB_DISABLED_MESSAGE }, { status: 503 });
    }

    await connectToDatabase();

    const user = await User.findOne({ email: data.email });
    if (!user) {
      return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
    }

    const isMatch = await user.comparePassword(data.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
    }

    const response = NextResponse.json({
      message: "Logged in successfully.",
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
      { message: error instanceof Error ? error.message : "Unable to log in." },
      { status: 400 },
    );
  }
}
