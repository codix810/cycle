import { Schema, model, models, Document } from "mongoose";

export interface IVisit extends Document {
  patientId: string;
  doctorId?: string;
  title?: string;
  notes?: string;
  fileUrl?: string;
  createdAt: Date;
}

const VisitSchema = new Schema<IVisit>(
  {
    patientId: { type: String, required: true },
    doctorId: { type: String },
    title: { type: String },
    notes: { type: String },
    fileUrl: { type: String },
  },
  { timestamps: true }
);

const Visit = models.Visit || model<IVisit>("Visit", VisitSchema);
export default Visit;
