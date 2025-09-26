import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) 
      return res.status(400).json({ error: "All fields are required" });


    // Check if user exists email
    const exists = await User.findOne({ email: email.toLowerCase().trim() });
    if (exists) 
      return res.status(400).json({ error: "Email already registered" });

 // Hash password and create user in DB 
    const passwordHash = await bcrypt.hash(password, 10);
    //
    const user = await User.create({ name, email: email.toLowerCase().trim(), passwordHash });

    const token = generateToken(user._id);
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar }
    });
    console.log("signup successful");
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Server error" });
  }
});




// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
       return res.status(400).json({ error: "Missing fields" });

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    // if (!user) return res.status(400).json({ error: "Invalid credentials" });
    if (!user) return res.status(400).json({ error: "Email does not exits" });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(400).json({ error: "Password Not match" });

    const token = generateToken(user._id);
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar },
    });
    console.log("Login successful");
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
