import express from "express";
import { authMiddleware } from "../Middleware/authMiddleware.js";
import Goal from "../models/Goal.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const goals = await Goal.find({ userId: req.userId }).sort({ createdAt: -1 });
  res.json(goals);
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const goal = await Goal.create({ ...req.body, userId: req.userId });
    res.json(goal);
  } catch (err) {
    res.status(400).json({ error: "Could not create goal" });
  }
});

router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const goal = await Goal.findOneAndUpdate({ _id: req.params.id, userId: req.userId }, req.body, { new: true });
    res.json(goal);
  } catch (err) {
    res.status(400).json({ error: "Could not update goal" });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Goal.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ message: "Goal deleted" });
  } catch (err) {
    res.status(400).json({ error: "Could not delete goal" });
  }
});

export default router;
