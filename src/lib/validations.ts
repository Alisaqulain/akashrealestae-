import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.email("Valid email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z.email("Valid email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const propertySchema = z.object({
  title: z.string().min(3),
  price: z.coerce.number().min(1),
  location: z.string().min(2),
  address: z.string().min(5),
  city: z.string().default("Bangalore"),
  type: z.enum(["Flat", "Villa", "Plot"]),
  purpose: z.enum(["buy", "rent"]),
  status: z.enum(["Available", "Sold", "Rented"]).default("Available"),
  description: z.string().min(30),
  images: z.array(z.string().url()).min(1, "At least one image is required"),
  amenities: z.array(z.string()).default([]),
  bedrooms: z.coerce.number().min(0).default(0),
  bathrooms: z.coerce.number().min(0).default(0),
  area: z.coerce.number().min(0).default(0),
  featured: z.coerce.boolean().default(false),
  coordinates: z.object({
    lat: z.coerce.number().default(12.9716),
    lng: z.coerce.number().default(77.5946),
  }),
});

export const inquirySchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  message: z.string().min(10),
  propertyId: z.string().optional(),
});
