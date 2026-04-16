import { Model, Schema, model, models } from "mongoose";

interface IProperty {
  title: string;
  slug: string;
  price: number;
  location: string;
  address: string;
  city: string;
  type: "Flat" | "Villa" | "Plot";
  purpose: "buy" | "rent";
  status: "Available" | "Sold" | "Rented";
  approvalStatus: "pending" | "approved";
  description: string;
  images: string[];
  amenities: string[];
  bedrooms: number;
  bathrooms: number;
  area: number;
  featured: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
  createdBy: string | Schema.Types.ObjectId;
}

const propertySchema = new Schema<IProperty>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    location: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    city: { type: String, default: "Bangalore", trim: true },
    type: {
      type: String,
      enum: ["Flat", "Villa", "Plot"],
      required: true,
    },
    purpose: {
      type: String,
      enum: ["buy", "rent"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Available", "Sold", "Rented"],
      default: "Available",
    },
    approvalStatus: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    },
    description: { type: String, required: true },
    images: [{ type: String, required: true }],
    amenities: [{ type: String }],
    bedrooms: { type: Number, default: 0 },
    bathrooms: { type: Number, default: 0 },
    area: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    coordinates: {
      lat: { type: Number, default: 12.9716 },
      lng: { type: Number, default: 77.5946 },
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

propertySchema.index({ title: "text", location: "text", address: "text" });
propertySchema.index({ location: 1, type: 1, purpose: 1, price: 1 });

const Property =
  (models.Property as Model<IProperty>) || model<IProperty>("Property", propertySchema);

export default Property;
