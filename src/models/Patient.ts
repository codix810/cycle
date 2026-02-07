import { Schema, model, models, Document } from "mongoose";

export interface IPatient extends Document {
  fullName: string;
  phone: string;
  gender?: string;
  dob?: Date;
  address?: string;
  notes?: string;
  createdAt: Date;
}

const patientSchema = new Schema<IPatient>(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: String },
    dob: { type: Date },
    address: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

export default models.Patient || model<IPatient>("Patient", patientSchema);
