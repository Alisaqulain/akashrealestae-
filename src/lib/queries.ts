import { connectToDatabase, isDatabaseEnabled } from "@/lib/db";
import type { PropertyFilters } from "@/lib/types";
import Inquiry from "@/models/Inquiry";
import Property from "@/models/Property";
import User from "@/models/User";

function serialize<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export async function getProperties(filters: PropertyFilters = {}) {
  if (!isDatabaseEnabled()) {
    return [];
  }

  await connectToDatabase();

  const query: Record<string, unknown> = {
    approvalStatus: "approved",
  };

  if (filters.location) {
    query.location = { $regex: filters.location, $options: "i" };
  }

  if (filters.type) {
    query.type = filters.type;
  }

  if (filters.purpose) {
    query.purpose = filters.purpose;
  }

  if (filters.minPrice || filters.maxPrice) {
    query.price = {};
    if (filters.minPrice) {
      (query.price as Record<string, number>).$gte = Number(filters.minPrice);
    }
    if (filters.maxPrice) {
      (query.price as Record<string, number>).$lte = Number(filters.maxPrice);
    }
  }

  const sort: Record<string, 1 | -1> =
    filters.sort === "price-asc"
      ? { price: 1 }
      : filters.sort === "price-desc"
        ? { price: -1 }
        : { createdAt: -1 };

  return serialize(await Property.find(query).sort(sort).lean());
}

export async function getFeaturedProperties() {
  if (!isDatabaseEnabled()) {
    return [];
  }

  await connectToDatabase();
  return serialize(
    await Property.find({ approvalStatus: "approved" })
      .sort({ featured: -1, createdAt: -1 })
      .limit(6)
      .lean(),
  );
}

export async function getPropertyBySlug(slug: string) {
  if (!isDatabaseEnabled()) {
    return null;
  }

  await connectToDatabase();
  return serialize(
    await Property.findOne({ slug, approvalStatus: "approved" })
      .populate("createdBy", "name email role")
      .lean(),
  );
}

export async function getDashboardData() {
  if (!isDatabaseEnabled()) {
    return serialize({ properties: [], users: [], inquiries: [] });
  }

  await connectToDatabase();

  const [properties, users, inquiries] = await Promise.all([
    Property.find({}).populate("createdBy", "name email role").sort({ createdAt: -1 }).lean(),
    User.find({}).select("-password").sort({ createdAt: -1 }).lean(),
    Inquiry.find({}).populate("propertyId", "title slug").sort({ createdAt: -1 }).lean(),
  ]);

  return serialize({ properties, users, inquiries });
}
