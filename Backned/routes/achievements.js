import express from "express";
import { authMiddleware } from "../Middleware/authMiddleware.js";
import Habit from "../models/Habit.js";

const router = express.Router();

// GET computed achievements
router.get("/", authMiddleware, async (req, res) => {
  const habits = await Habit.find({ userId: req.userId });

  const total = habits.length;
  const completed = habits.filter(h => h.status === "done").length;

  // compute streak
  const doneDatesSet = new Set(habits.filter(h => h.status === "done" && h.lastDone).map(h => new Date(h.lastDone).toDateString()));
  const doneDates = Array.from(doneDatesSet).map(d => new Date(d)).sort((a,b)=>b-a);
  let streak = 0;
  let today = new Date(); today.setHours(0,0,0,0);
  for (let i = 0; i < doneDates.length; i++) {
    const diff = (today - doneDates[i])/(1000*60*60*24);
    if (diff === streak) streak++;
    else break;
  }

  const badges = [];
  if (streak >= 7) badges.push({ key: "7day", label: "🔥 7 Day Streak" });
  if (completed >= 10) badges.push({ key: "10comp", label: "✅ 10 Habits Completed" });
  if (habits.some(h => h.category === "Custom")) badges.push({ key: "custom", label: "✨ First Custom Habit" });

  res.json({ total, completed, streak, badges });
});

export default router;
