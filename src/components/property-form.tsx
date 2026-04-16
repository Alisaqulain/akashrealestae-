"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { amenitiesList } from "@/lib/data";
import type { PropertyRecord } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input, Select, Textarea } from "@/components/ui/input";

interface PropertyFormProps {
  property?: PropertyRecord;
}

async function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function PropertyForm({ property }: PropertyFormProps) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>(property?.images || []);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    property?.amenities || [],
  );

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    setUploading(true);

    try {
      const encodedFiles = await Promise.all(files.map(fileToBase64));
      const response = await fetch("/api/uploads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ files: encodedFiles }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Upload failed.");
      }

      setImageUrls((current) => [...current, ...data.urls]);
      toast.success("Images uploaded successfully.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(formData: FormData) {
    setSaving(true);

    const payload = {
      title: formData.get("title"),
      price: Number(formData.get("price")),
      location: formData.get("location"),
      address: formData.get("address"),
      city: formData.get("city"),
      type: formData.get("type"),
      purpose: formData.get("purpose"),
      status: formData.get("status"),
      description: formData.get("description"),
      bedrooms: Number(formData.get("bedrooms") || 0),
      bathrooms: Number(formData.get("bathrooms") || 0),
      area: Number(formData.get("area") || 0),
      featured: formData.get("featured") === "on",
      coordinates: {
        lat: Number(formData.get("lat") || 12.9716),
        lng: Number(formData.get("lng") || 77.5946),
      },
      amenities: selectedAmenities,
      images: imageUrls,
    };

    const response = await fetch(property ? `/api/properties/${property._id}` : "/api/properties", {
      method: property ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    setSaving(false);

    if (!response.ok) {
      toast.error(data.message || "Unable to save property.");
      return;
    }

    toast.success(data.message);
    router.push(property ? "/dashboard" : "/listings");
    router.refresh();
  }

  function toggleAmenity(value: string) {
    setSelectedAmenities((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  }

  return (
    <form action={handleSubmit} className="space-y-8 rounded-[32px] border border-[var(--line)] bg-white p-8 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <Input name="title" placeholder="Property title" defaultValue={property?.title} required />
        <Input
          name="price"
          type="number"
          placeholder="Price in INR"
          defaultValue={property?.price}
          required
        />
        <Input
          name="location"
          placeholder="Locality in Bangalore"
          defaultValue={property?.location}
          required
        />
        <Input name="address" placeholder="Full address" defaultValue={property?.address} required />
        <Input name="city" defaultValue={property?.city || "Bangalore"} required />
        <Select name="type" defaultValue={property?.type || "Flat"}>
          <option value="Flat">Flat</option>
          <option value="Villa">Villa</option>
          <option value="Plot">Plot</option>
        </Select>
        <Select name="purpose" defaultValue={property?.purpose || "buy"}>
          <option value="buy">Buy</option>
          <option value="rent">Rent</option>
        </Select>
        <Select name="status" defaultValue={property?.status || "Available"}>
          <option value="Available">Available</option>
          <option value="Sold">Sold</option>
          <option value="Rented">Rented</option>
        </Select>
        <Input name="bedrooms" type="number" defaultValue={property?.bedrooms || 0} />
        <Input name="bathrooms" type="number" defaultValue={property?.bathrooms || 0} />
        <Input name="area" type="number" defaultValue={property?.area || 0} placeholder="Area in sq.ft" />
        <label className="flex items-center gap-3 rounded-2xl border border-[var(--line)] px-4 py-3 text-sm text-slate-700">
          <input name="featured" type="checkbox" defaultChecked={property?.featured} />
          Mark as featured property
        </label>
        <Input name="lat" type="number" step="any" defaultValue={property?.coordinates?.lat || 12.9716} />
        <Input name="lng" type="number" step="any" defaultValue={property?.coordinates?.lng || 77.5946} />
      </div>

      <Textarea
        name="description"
        placeholder="Describe the property, nearby landmarks, and why buyers should shortlist it."
        defaultValue={property?.description}
        required
      />

      <div className="space-y-3">
        <p className="text-sm font-semibold text-[var(--green-950)]">Amenities</p>
        <div className="flex flex-wrap gap-3">
          {amenitiesList.map((amenity) => (
            <label
              key={amenity}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                selectedAmenities.includes(amenity)
                  ? "border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--green-950)]"
                  : "border-[var(--line)] text-slate-600"
              }`}
            >
              <input
                type="checkbox"
                className="hidden"
                checked={selectedAmenities.includes(amenity)}
                onChange={() => toggleAmenity(amenity)}
              />
              {amenity}
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-4 rounded-[24px] border border-dashed border-[var(--gold)]/40 bg-[var(--green-50)] p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-[var(--green-950)]">Property gallery</p>
            <p className="text-sm text-slate-600">
              Upload multiple images through Cloudinary.
            </p>
          </div>
          <Input type="file" multiple accept="image/*" onChange={handleImageUpload} />
        </div>
        {uploading && <p className="text-sm text-slate-500">Uploading images...</p>}
        {!!imageUrls.length && (
          <div className="grid gap-3 md:grid-cols-3">
            {imageUrls.map((url) => (
              <div
                key={url}
                className="truncate rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-xs text-slate-500"
              >
                {url}
              </div>
            ))}
          </div>
        )}
      </div>

      <Button type="submit" disabled={saving || uploading}>
        {saving ? "Saving..." : property ? "Update property" : "Create property"}
      </Button>
    </form>
  );
}
