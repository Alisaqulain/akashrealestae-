"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";

export function ContactForm({ propertyId }: { propertyId?: string }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const payload = Object.fromEntries(formData.entries());

    const response = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      toast.error(data.message || "Unable to send your message.");
      return;
    }

    toast.success(data.message);
  }

  return (
    <form action={handleSubmit} className="space-y-4 rounded-[28px] border border-[var(--line)] bg-white p-8 shadow-sm">
      <input type="hidden" name="propertyId" value={propertyId || ""} />
      <Input name="name" placeholder="Your name" required />
      <Input name="phone" placeholder="Phone number" required />
      <Textarea name="message" placeholder="Tell us what you're looking for" required />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Sending..." : "Send inquiry"}
      </Button>
    </form>
  );
}
