import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not defined in environment");
  }
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "30d" });   //payload,secret,option 
};
