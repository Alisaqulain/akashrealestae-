"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AuthFormProps {
  mode: "login" | "signup";
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);

    const payload = Object.fromEntries(formData.entries());

    const response = await fetch(`/api/auth/${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      toast.error(data.message || "Something went wrong.");
      return;
    }

    toast.success(data.message);
    router.push(mode === "login" && data.user.role === "admin" ? "/dashboard" : "/");
    router.refresh();
  }

  return (
    <form
      action={handleSubmit}
      className="space-y-4 rounded-[28px] border border-[var(--line)] bg-white p-5 shadow-sm sm:p-8"
    >
      {mode === "signup" && <Input name="name" placeholder="Full name" required />}
      <Input name="email" type="email" placeholder="Email address" required />
      <Input name="password" type="password" placeholder="Password" required />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}
      </Button>
    </form>
  );
}
