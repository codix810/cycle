// models/Booking.ts
import { Schema, models, model, Document } from "mongoose";

export interface IBooking extends Document {
  doctor: any;
  patient?: any;
  name: string;
  phone: string;
  place: "online" | "offline";
  branch?: "cairo" | "alex" | "online";
  date: string;
  time: string;
  type: string;
  notes?: string;
  fee?: number;
  transferImageUrl?: string;
  status: "pending" | "confirmed" | "rejected";
  createdAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    doctor: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    patient: { type: Schema.Types.ObjectId, ref: "Patient" },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    place: { type: String, enum: ["online", "offline"], required: true },
    branch: { type: String },
    date: { type: String, required: true },
    time: { type: String, required: true },
    type: { type: String, required: true },
    notes: { type: String },
    fee: { type: Number },

    // 🔥 أهم حاجة: رابط الصورة
    transferImageUrl: { type: String },

    status: {
      type: String,
      enum: ["pending", "confirmed", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default models.Booking || model<IBooking>("Booking", bookingSchema);
