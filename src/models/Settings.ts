import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema({
  doctor: { type: String, required: true },
  branches: { type: Array, default: [] },
  workingHours: { type: Object, default: {} },
});

export default mongoose.models.Settings ||
  mongoose.model("Settings", SettingsSchema);
