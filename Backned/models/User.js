
import mongoose from "mongoose";

const PreferencesSchema = new mongoose.Schema({
  darkMode: { type: Boolean, default: false },
  reminders: { type: Boolean, default: true }
}, { _id: false });


const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  avatar: { type: String, default: "" },
  joined: { type: Date, default: Date.now },
  preferences: { type: PreferencesSchema, default: () => ({}) }
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
