export type UserRole = "admin" | "user";
export type PropertyType = "Flat" | "Villa" | "Plot";
export type PropertyPurpose = "buy" | "rent";
export type PropertyStatus = "Available" | "Sold" | "Rented";
export type ApprovalStatus = "pending" | "approved";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface PropertyFilters {
  location?: string;
  type?: string;
  purpose?: string;
  sort?: string;
  minPrice?: string;
  maxPrice?: string;
}

export interface PropertyRecord {
  _id: string | { toString(): string };
  title: string;
  slug: string;
  price: number;
  location: string;
  address: string;
  city: string;
  type: PropertyType;
  purpose: PropertyPurpose;
  status: PropertyStatus;
  approvalStatus: ApprovalStatus;
  description: string;
  images: string[];
  amenities: string[];
  bedrooms: number;
  bathrooms: number;
  area: number;
  featured: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
  createdBy?: {
    _id?: string;
    name?: string;
    email?: string;
    role?: UserRole;
  } | string | { toString(): string };
}

export interface UserRecord {
  _id: string | { toString(): string };
  name: string;
  email: string;
  role: UserRole;
}

export interface InquiryRecord {
  _id: string | { toString(): string };
  name: string;
  phone: string;
  message: string;
  propertyId?: {
    _id?: string;
    title?: string;
    slug?: string;
  } | string | { toString(): string } | null;
}
