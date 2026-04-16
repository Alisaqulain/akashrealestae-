"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { usePropertyFilters } from "@/store/property-filters";

export function ListingsFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {
    location,
    type,
    purpose,
    minPrice,
    maxPrice,
    sort,
    hydrate,
    setField,
  } = usePropertyFilters();

  useEffect(() => {
    hydrate({
      location: searchParams.get("location") || "",
      type: searchParams.get("type") || "",
      purpose: searchParams.get("purpose") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      sort: searchParams.get("sort") || "latest",
    });
  }, [hydrate, searchParams]);

  function applyFilters() {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (type) params.set("type", type);
    if (purpose) params.set("purpose", purpose);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (sort) params.set("sort", sort);
    router.push(`${pathname}?${params.toString()}`);
  }

  function resetFilters() {
    hydrate({
      location: "",
      type: "",
      purpose: "",
      minPrice: "",
      maxPrice: "",
      sort: "latest",
    });
    router.push(pathname);
  }

  return (
    <div className="grid grid-cols-1 gap-3 rounded-[28px] border border-white/10 bg-[var(--green-950)] p-4 sm:p-6 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
      <Input
        placeholder="Search Bangalore location"
        value={location}
        onChange={(event) => setField("location", event.target.value)}
      />
      <Select value={type} onChange={(event) => setField("type", event.target.value)}>
        <option value="">All types</option>
        <option value="Flat">Flat</option>
        <option value="Villa">Villa</option>
        <option value="Plot">Plot</option>
      </Select>
      <Select value={purpose} onChange={(event) => setField("purpose", event.target.value)}>
        <option value="">Buy or rent</option>
        <option value="buy">Buy</option>
        <option value="rent">Rent</option>
      </Select>
      <Input
        type="number"
        placeholder="Min price"
        value={minPrice}
        onChange={(event) => setField("minPrice", event.target.value)}
      />
      <Input
        type="number"
        placeholder="Max price"
        value={maxPrice}
        onChange={(event) => setField("maxPrice", event.target.value)}
      />
      <Select value={sort} onChange={(event) => setField("sort", event.target.value)}>
        <option value="latest">Latest</option>
        <option value="price-asc">Price: Low to high</option>
        <option value="price-desc">Price: High to low</option>
      </Select>
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:flex-wrap lg:col-span-6">
        <Button className="w-full sm:w-auto" onClick={applyFilters}>
          Apply filters
        </Button>
        <Button className="w-full sm:w-auto" variant="secondary" onClick={resetFilters}>
          Reset
        </Button>
      </div>
    </div>
  );
}
