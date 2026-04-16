import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { DashboardPanel } from "@/components/dashboard-panel";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";
import { isDatabaseEnabled } from "@/lib/db";
import { getDashboardData } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Admin dashboard for AKASAK listings, users, and inquiries.",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "admin") {
    redirect("/add-property");
  }

  const data = await getDashboardData();

  return (
    <div className="container-shell py-16">
      {!isDatabaseEnabled() && (
        <p className="mb-8 rounded-[28px] border border-amber-200 bg-amber-50 px-6 py-4 text-sm text-amber-950">
          Connect MongoDB to load live properties, users, and inquiries. Until then, the dashboard shows empty
          sections.
        </p>
      )}
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-slate-600">
          Listings are managed here. Use <strong>Add property</strong> to publish new inventory.
        </p>
        <Link href="/add-property">
          <Button>Add new property</Button>
        </Link>
      </div>
      <SectionHeading
        eyebrow="Admin Dashboard"
        title="Manage listings, users, and client inquiries"
        description="Everything an admin needs to review submissions, approve inventory, and keep the platform organized."
      />
      <div className="mt-10">
        <DashboardPanel {...data} />
      </div>
    </div>
  );
}
