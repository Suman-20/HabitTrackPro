import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization") || "";
    const token = authHeader.replace("Bearer ", "").trim();

    if (!token) return res.status(401).json({ error: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.id) return res.status(401).json({ error: "Invalid token" });

    req.userId = decoded.id;
    // attach user (without password) optionally
    req.user = await User.findById(req.userId).select("-passwordHash");
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};
