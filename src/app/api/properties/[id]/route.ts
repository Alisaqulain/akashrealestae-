import { NextResponse } from "next/server";

import { requireAuth } from "@/lib/auth";
import { connectToDatabase, isDatabaseEnabled, MONGODB_DISABLED_MESSAGE } from "@/lib/db";
import { propertySchema } from "@/lib/validations";
import Property from "@/models/Property";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteContext) {
  if (!isDatabaseEnabled()) {
    return NextResponse.json({ message: MONGODB_DISABLED_MESSAGE }, { status: 503 });
  }

  await connectToDatabase();

  const { id } = await params;
  const property = await Property.findOne({
    $or: [{ _id: id }, { slug: id }],
  })
    .populate("createdBy", "name email role")
    .lean();

  if (!property) {
    return NextResponse.json({ message: "Property not found." }, { status: 404 });
  }

  return NextResponse.json({ property });
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const user = await requireAuth();

    if (!isDatabaseEnabled()) {
      return NextResponse.json({ message: MONGODB_DISABLED_MESSAGE }, { status: 503 });
    }

    await connectToDatabase();

    const { id } = await params;
    const existingProperty = await Property.findById(id);

    if (!existingProperty) {
      return NextResponse.json({ message: "Property not found." }, { status: 404 });
    }

    if (user.role !== "admin") {
      return NextResponse.json({ message: "Only administrators can update properties." }, { status: 403 });
    }

    const raw = (await request.json()) as Record<string, unknown>;
    const data = propertySchema.parse(raw);
    const approvalRaw = raw.approvalStatus;
    const approvalStatus =
      approvalRaw === "pending" || approvalRaw === "approved" ? approvalRaw : "approved";

    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      {
        ...data,
        approvalStatus,
      },
      { new: true },
    );

    return NextResponse.json({
      message: "Property updated successfully.",
      property: updatedProperty,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unable to update property." },
      { status: 400 },
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const user = await requireAuth();

    if (!isDatabaseEnabled()) {
      return NextResponse.json({ message: MONGODB_DISABLED_MESSAGE }, { status: 503 });
    }

    await connectToDatabase();

    const { id } = await params;
    const property = await Property.findById(id);

    if (!property) {
      return NextResponse.json({ message: "Property not found." }, { status: 404 });
    }

    if (user.role !== "admin") {
      return NextResponse.json({ message: "Only administrators can delete properties." }, { status: 403 });
    }

    await Property.findByIdAndDelete(id);

    return NextResponse.json({ message: "Property deleted successfully." });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unable to delete property." },
      { status: 400 },
    );
  }
}
