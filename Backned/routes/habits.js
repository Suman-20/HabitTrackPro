import express from "express";
import { authMiddleware } from "../Middleware/authMiddleware.js";
import Habit from "../models/Habit.js";

const router = express.Router();

// GET all habits for user
router.get("/", authMiddleware, async (req, res) => {
  const habits = await Habit.find({ userId: req.userId }).sort({ createdAt: -1 });
  res.json(habits);
});

// POST create habit
router.post("/", authMiddleware, async (req, res) => {
  try {
    const payload = { ...req.body, userId: req.userId };
    const habit = await Habit.create(payload);
    res.json(habit);
  } catch (err) {
    console.error("Create habit error:", err);
    res.status(400).json({ error: "Could not create habit" });
  }
});

// PATCH update habit
router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const habit = await Habit.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!habit) return res.status(404).json({ error: "Habit not found" });
    res.json(habit);
  } catch (err) {
    res.status(400).json({ error: "Could not update habit" });
  }
});

// DELETE habit
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const habit = await Habit.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!habit) return res.status(404).json({ error: "Habit not found" });
    res.json({ message: "Habit deleted" });
  } catch (err) {
    res.status(400).json({ error: "Could not delete habit" });
  }
});

export default router;
