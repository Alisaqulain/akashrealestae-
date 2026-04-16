import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import { connectToDatabase, isDatabaseEnabled } from "@/lib/db";
import User from "@/models/User";
import type { AuthUser } from "@/lib/types";

const COOKIE_NAME = "akasak_token";

interface TokenPayload {
  id: string;
  email: string;
  role: "admin" | "user";
  name?: string;
}

function getJwtSecret() {
  const secret = process.env.JWT_SECRET?.trim();
  if (!secret) {
    throw new Error("Please define JWT_SECRET in your environment variables.");
  }

  return secret;
}

export function signToken(payload: TokenPayload) {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, getJwtSecret()) as TokenPayload;
}

export async function setAuthCookie(response: NextResponse, payload: TokenPayload) {
  const token = signToken(payload);
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearAuthCookie(response: NextResponse) {
  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = verifyToken(token);

    if (!isDatabaseEnabled()) {
      return {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
        name: decoded.name ?? decoded.email.split("@")[0] ?? "User",
      };
    }

    await connectToDatabase();
    const user = await User.findById(decoded.id).select("name email role");

    if (!user) {
      return null;
    }

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };
  } catch {
    return null;
  }
}

export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}

export async function requireAdmin() {
  const user = await requireAuth();

  if (user.role !== "admin") {
    throw new Error("Forbidden");
  }

  return user;
}
