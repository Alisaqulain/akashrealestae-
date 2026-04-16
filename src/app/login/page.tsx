import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { AuthForm } from "@/components/auth-form";
import { SectionHeading } from "@/components/section-heading";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Login",
};

export default async function LoginPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect(user.role === "admin" ? "/dashboard" : "/");
  }

  return (
    <div className="container-shell py-16">
      <div className="mx-auto max-w-xl">
        <SectionHeading
          eyebrow="Welcome Back"
          title="Login to manage your AKASAK account"
          description="Access your dashboard, submit new listings, and manage your real estate activity."
          align="center"
        />
        <div className="mt-10">
          <AuthForm mode="login" />
        </div>
        <p className="mt-5 text-center text-sm text-slate-600">
          Need an account?{" "}
          <Link href="/signup" className="font-semibold text-[var(--green-950)]">
            Create one here
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
