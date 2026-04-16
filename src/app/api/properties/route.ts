import { NextResponse } from "next/server";

import { requireAuth } from "@/lib/auth";
import { connectToDatabase, isDatabaseEnabled, MONGODB_DISABLED_MESSAGE } from "@/lib/db";
import { propertySchema } from "@/lib/validations";
import { slugify } from "@/lib/utils";
import Property from "@/models/Property";

export async function GET(request: Request) {
  if (!isDatabaseEnabled()) {
    return NextResponse.json({ properties: [] });
  }

  await connectToDatabase();

  const { searchParams } = new URL(request.url);
  const location = searchParams.get("location");
  const type = searchParams.get("type");
  const purpose = searchParams.get("purpose");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const sort = searchParams.get("sort") || "latest";
  const admin = searchParams.get("admin") === "true";

  const query: Record<string, unknown> = {};

  if (!admin) {
    query.approvalStatus = "approved";
  }

  if (location) {
    query.location = { $regex: location, $options: "i" };
  }

  if (type) {
    query.type = type;
  }

  if (purpose) {
    query.purpose = purpose;
  }

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) {
      (query.price as Record<string, number>).$gte = Number(minPrice);
    }
    if (maxPrice) {
      (query.price as Record<string, number>).$lte = Number(maxPrice);
    }
  }

  const sortOptions: Record<string, 1 | -1> =
    sort === "price-asc"
      ? { price: 1 }
      : sort === "price-desc"
        ? { price: -1 }
        : { createdAt: -1 };

  const properties = await Property.find(query)
    .populate("createdBy", "name email role")
    .sort(sortOptions)
    .lean();

  return NextResponse.json({ properties });
}

export async function POST(request: Request) {
  try {
    const user = await requireAuth();

    if (user.role !== "admin") {
      return NextResponse.json(
        { message: "Only administrators can add properties. Use the admin dashboard." },
        { status: 403 },
      );
    }

    if (!isDatabaseEnabled()) {
      return NextResponse.json({ message: MONGODB_DISABLED_MESSAGE }, { status: 503 });
    }

    await connectToDatabase();

    const body = await request.json();
    const data = propertySchema.parse(body);

    const baseSlug = slugify(data.title);
    const duplicateCount = await Property.countDocuments({
      slug: { $regex: `^${baseSlug}` },
    });

    const property = await Property.create({
      ...data,
      slug: duplicateCount ? `${baseSlug}-${duplicateCount + 1}` : baseSlug,
      approvalStatus: "approved",
      createdBy: user.id,
    });

    return NextResponse.json(
      { message: "Property saved successfully.", property },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unable to save property." },
      { status: 400 },
    );
  }
}
