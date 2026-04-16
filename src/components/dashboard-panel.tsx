"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import type { InquiryRecord, PropertyRecord, UserRecord } from "@/lib/types";

interface DashboardPanelProps {
  properties: PropertyRecord[];
  users: UserRecord[];
  inquiries: InquiryRecord[];
}

export function DashboardPanel({ properties, users, inquiries }: DashboardPanelProps) {
  const router = useRouter();

  async function updateProperty(id: string, payload: Record<string, unknown>) {
    const response = await fetch(`/api/properties/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message || "Unable to update property.");
      return;
    }

    toast.success(data.message);
    router.refresh();
  }

  async function deleteProperty(id: string) {
    const response = await fetch(`/api/properties/${id}`, { method: "DELETE" });
    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message || "Unable to delete property.");
      return;
    }

    toast.success(data.message);
    router.refresh();
  }

  return (
    <div className="space-y-10">
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[28px] border border-[var(--line)] bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Properties</p>
          <p className="mt-3 font-serif text-4xl text-[var(--green-950)]">{properties.length}</p>
        </div>
        <div className="rounded-[28px] border border-[var(--line)] bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Users</p>
          <p className="mt-3 font-serif text-4xl text-[var(--green-950)]">{users.length}</p>
        </div>
        <div className="rounded-[28px] border border-[var(--line)] bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Inquiries</p>
          <p className="mt-3 font-serif text-4xl text-[var(--green-950)]">{inquiries.length}</p>
        </div>
      </section>

      <section className="rounded-[28px] border border-[var(--line)] bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-serif text-3xl text-[var(--green-950)]">Property approvals</h2>
        </div>
        <div className="space-y-4">
          {properties.map((property) => {
            const creator =
              typeof property.createdBy === "object" &&
              property.createdBy !== null &&
              "name" in property.createdBy
                ? property.createdBy.name
                : undefined;

            return (
              <div key={property._id.toString()} className="rounded-3xl border border-[var(--line)] p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                      {property.location}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-[var(--green-950)]">
                      {property.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">
                      {creator || "Unknown"} | {property.approvalStatus}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link href={`/add-property/${property._id.toString()}`}>
                      <Button variant="secondary">Edit</Button>
                    </Link>
                    <Button
                      onClick={() =>
                        updateProperty(property._id.toString(), {
                          ...property,
                          approvalStatus:
                            property.approvalStatus === "approved" ? "pending" : "approved",
                        })
                      }
                    >
                      {property.approvalStatus === "approved" ? "Mark pending" : "Approve"}
                    </Button>
                    <Button variant="secondary" onClick={() => deleteProperty(property._id.toString())}>
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
          {!properties.length && <p className="text-sm text-slate-500">No properties found.</p>}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-[28px] border border-[var(--line)] bg-white p-6 shadow-sm">
          <h2 className="font-serif text-3xl text-[var(--green-950)]">Users</h2>
          <div className="mt-6 space-y-4">
            {users.map((user) => (
              <div key={user._id.toString()} className="rounded-3xl border border-[var(--line)] p-4">
                <p className="font-semibold text-[var(--green-950)]">{user.name}</p>
                <p className="text-sm text-slate-600">{user.email}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[var(--gold)]">
                  {user.role}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[28px] border border-[var(--line)] bg-white p-6 shadow-sm">
          <h2 className="font-serif text-3xl text-[var(--green-950)]">Recent inquiries</h2>
          <div className="mt-6 space-y-4">
            {inquiries.map((inquiry) => (
              <div key={inquiry._id.toString()} className="rounded-3xl border border-[var(--line)] p-4">
                <p className="font-semibold text-[var(--green-950)]">{inquiry.name}</p>
                <p className="text-sm text-slate-600">{inquiry.phone}</p>
                <p className="mt-2 text-sm text-slate-700">{inquiry.message}</p>
                {typeof inquiry.propertyId === "object" &&
                  inquiry.propertyId !== null &&
                  "title" in inquiry.propertyId &&
                  inquiry.propertyId.title && (
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[var(--gold)]">
                    {inquiry.propertyId.title}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
