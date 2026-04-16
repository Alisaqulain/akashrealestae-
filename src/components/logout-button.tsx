"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const response = await fetch("/api/auth/logout", { method: "POST" });
    const data = await response.json();
    if (!response.ok) {
      toast.error("Unable to log out.");
      return;
    }

    toast.success(data.message);
    router.push("/");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="text-sm font-semibold text-white/80 transition hover:text-[var(--gold)]"
    >
      Logout
    </button>
  );
}
