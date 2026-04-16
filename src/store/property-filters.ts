"use client";

import { create } from "zustand";

interface FiltersState {
  location: string;
  type: string;
  purpose: string;
  minPrice: string;
  maxPrice: string;
  sort: string;
  setField: (field: string, value: string) => void;
  hydrate: (values: Partial<Omit<FiltersState, "setField" | "hydrate">>) => void;
}

export const usePropertyFilters = create<FiltersState>((set) => ({
  location: "",
  type: "",
  purpose: "",
  minPrice: "",
  maxPrice: "",
  sort: "latest",
  setField: (field, value) => set(() => ({ [field]: value }) as Partial<FiltersState>),
  hydrate: (values) => set(() => ({ ...values })),
}));
