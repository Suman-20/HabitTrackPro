import express from "express";
import { authMiddleware } from "../Middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// Get current user
router.get("/me", authMiddleware, async (req, res) => {
  res.json(req.user);
});

// Update profile
router.patch("/me", authMiddleware, async (req, res) => {
  try {
    const updates = req.body;
    // prevent updating restricted fields:
    delete updates.passwordHash;
    delete updates._id;
    const user = await User.findByIdAndUpdate(req.userId, updates, { new: true }).select("-passwordHash");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

export default router;
