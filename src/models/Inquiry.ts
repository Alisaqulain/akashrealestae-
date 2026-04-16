import { Model, Schema, model, models } from "mongoose";

interface IInquiry {
  name: string;
  phone: string;
  message: string;
  propertyId?: string | Schema.Types.ObjectId | null;
}

const inquirySchema = new Schema<IInquiry>(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const Inquiry =
  (models.Inquiry as Model<IInquiry>) || model<IInquiry>("Inquiry", inquirySchema);

export default Inquiry;
