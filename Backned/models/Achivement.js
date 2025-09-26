import mongoose from "mongoose";

const AchievementSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, required: true }, // e.g., "7_day_streak"
  meta: { type: Object },
  unlockedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Achievement", AchievementSchema);
