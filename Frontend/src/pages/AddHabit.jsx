import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { useNavigate } from 'react-router-dom'

const AddHabit = () => {
  


  const [habitName, setHabitName] = useState("");
  const [category, setCategory] = useState("Health");
  const [reminder, setReminder] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!habitName || !category) {
      setError("Please fill in all required fields.");
      return;
    }
    const now = new Date();
    const date  = now.toLocaleDateString();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // New Habit adding object
    const newHabit = {
      id: Date.now(),
      name: habitName,
      category,
      reminder,
      status:"pending",
      date,
      time
    }
    try {
      const token = localStorage.getItem("token"); // 🔑 login ke baad token save hota hai
      if (!token) {
        setError("You must be logged in to add habits.");
        return;
      }

      // backend pe habit bhejna
      const res = await axios.post("http://localhost:2005/api/habits", newHabit, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Habit saved ->", res.data);

      alert("Habit added successfully!");

      // Clear form
      setHabitName("");
      setCategory("Health");
      setReminder("");
      setError("");
      navigate("/deshbord");
    } catch (err) {
      console.error("Error adding habit:", err);
      setError("Something went wrong. Please try again.");
    };

  };



  return (
    <div className="min-h-screen font bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center px-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          ✨ Add a New Habit
        </h2>

        {error && (
          <p className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* habbitname */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Habit Name
            </label>
            <input
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              type="text"
              placeholder="e.g., Drink Water, Exercise"
              className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* category */}

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Category
            </label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none">
              <option value="Health">🏃 Health</option>
              <option value="Productivity">📚 Productivity</option>
              <option value="Mindfulness">🧘 Mindfulness</option>
              <option value="Custom">✨ Custom</option>
            </select>
          </div>
            
            {/* reminder */}
              <div>
            <label className="block text-gray-700 font-medium mb-1">
              Reminder (Optional)
            </label>
            <input
            value={reminder}
            onChange={(e) => setReminder(e.target.value)}
              // placeholder="Set a time for daily reminder"
              type="time"
              className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>


             {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-300 shadow-lg cursor-pointer"
          >
            ➕ Add Habit
          </button>
          {/* Add more fields as necessary */}

          <div>
            <p className="text-sm text-gray-500 text-center">
              You can edit or delete habits later from your dashboard.
            </p>
          </div>

         

        </form>
      </div>
    </div>
  );
};

export default AddHabit;
