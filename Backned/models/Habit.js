import mongoose from "mongoose";

const HabitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  category: { type: String, default: "Custom" },
  status: { type: String, enum: ["pending", "done"], default: "pending" },
  reminder: { type: String }, // "08:00" style
  lastDone: { type: Date },
  favorite: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model("Habit", HabitSchema);
