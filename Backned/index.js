import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './models/mongoDb.js';

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import habitRoutes from "./routes/habits.js";
import goalRoutes from "./routes/goals.js";
import achievementRoutes from "./routes/achievements.js";



// Connect to MongoDB
connectDB();

const app = express();


// Middleware
app.use(cors({
    rigin: ["http://localhost:3000", "http://localhost:5173"], // Adjust according to your frontend URL
    methods: ["GET", "POST", "PUT","PATCH", "DELETE"],
    credentials: true
}));
app.use(bodyParser.json());
app.use(express.json());

app.use("/api/auth", authRoutes);      //login / signup
app.use("/api/users", userRoutes);     //user details  / profile
app.use("/api/habits", habitRoutes);   // Habits (add,update,delete,list)
app.use("/api/goals", goalRoutes);      // Goals
app.use("/api/achievements", achievementRoutes);   //Achivements




app.get('/ping', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost: ${PORT} 🚀`);
});