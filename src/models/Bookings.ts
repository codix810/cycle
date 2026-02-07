// models/Bookings.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBooking extends Document {
  name: string;
  phone: string;
  consultType: "كشف" | "متابعة" | "استشارة" | string;
  place: "online" | "offline" | string;
  branch: string;
  date: string;   // ISO date string
  time: string;
  fee?: number;
  notes?: string;
  transferImageUrl?: string;
  createdAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    consultType: { type: String, required: true },
    place: { type: String, required: true },
    branch: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    fee: { type: Number },
    notes: { type: String },
    transferImageUrl: { type: String },
  },
  { timestamps: true }
);

const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;
