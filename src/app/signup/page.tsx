import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { AuthForm } from "@/components/auth-form";
import { SectionHeading } from "@/components/section-heading";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Signup",
};

export default async function SignupPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect(user.role === "admin" ? "/dashboard" : "/");
  }

  return (
    <div className="container-shell py-16">
      <div className="mx-auto max-w-xl">
        <SectionHeading
          eyebrow="Create Account"
          title="Join AKASAK and start listing properties"
          description="Sign up as a user to submit new listings, contact the team, and track your real estate opportunities."
          align="center"
        />
        <div className="mt-10">
          <AuthForm mode="signup" />
        </div>
        <p className="mt-5 text-center text-sm text-slate-600">
          Already registered?{" "}
          <Link href="/login" className="font-semibold text-[var(--green-950)]">
            Login here
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
