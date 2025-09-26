import React, { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";


export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [habits, setHabits] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editReminder, setEditReminder] = useState("");

  const navigate=useNavigate();
  
  // Fetch habits on component mount
  useEffect(() => {

    const fetchedHabits = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token){
          navigate("/login");
          return;
          
        };

        const res = await axios.get("http://localhost:2005/api/habits", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHabits(res.data); // ✅ backend se data aa gaya
        console.log("Fetched habits:", res.data);
      
      } catch (err) {
        console.error("Error fetching habits:", err);
        navigate("/login");
      }
    };

    fetchedHabits();
   
  }, [navigate]); 



  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await axios.get("http://localhost:2005/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);


// Toggle habit status with backend
const toggleStatus = async (id, currentStatus) => {
  if (!id) return console.error("Habit ID is undefined!");

  try {
    const token = localStorage.getItem("token");
    const updatedStatus = currentStatus === "pending" ? "done" : "pending";

    const res = await axios.patch(
      `http://localhost:2005/api/habits/${id}`,
      { status: updatedStatus, lastDone: new Date() },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setHabits((prev) =>
      prev.map((habit) => (habit._id === id ? res.data : habit))
    );
  } catch (err) {
    console.error("Error toggling habit status:", err);
  }
};



   // Delete habit
  const deleteHabit = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:2005/api/habits/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setHabits((prev) => prev.filter((habit) => habit._id !== id));
    } catch (err) {
      console.error("Error deleting habit:", err);
    }
  };



  // Start editing a habit
  const startEdit = (habit) => {
    setEditingId(habit._id);
    setEditName(habit.name);
    setEditCategory(habit.category);
    setEditReminder(habit.reminder || "");
  };


  // Save edited habit
  const saveEdit = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `http://localhost:2005/api/habits/${id}`,
        { name: editName, category: editCategory, reminder: editReminder },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setHabits((prev) =>
        prev.map((habit) => (habit._id === id ? res.data : habit))
      );
      setEditingId(null);
    } catch (err) {
      console.error("Error saving edit:", err);
    }
  };


  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
  };


  // Stats calculations
  const totalHabits = habits.length;
  const completedHabits = habits.filter((habit) => habit.status === "done").length;

  // Simple streak calculation: consecutive days with at least one habit done
  const calculateStreak = () => {
    if (habits.length === 0) return 0;

    // Get all unique dates when habits were done
    const doneDatesSet = new Set(
      habits
        .filter((h) => h.status === "done" && h.lastDone)
        .map((h) => new Date(h.lastDone).toDateString())
    );

    if (doneDatesSet.size === 0) return 0;

    const doneDates = Array.from(doneDatesSet)
      .map((d) => new Date(d))
      .sort((a, b) => b - a); // Descending

    let streak = 0;
    let today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today

    for (let i = 0; i < doneDates.length; i++) {
      const diff = (today - doneDates[i]) / (1000 * 60 * 60 * 24);
      if (diff === streak) streak++;
      else break;
    }

    return streak;
  };

  const currentStreak = calculateStreak();

  return (
    <div className="min-h-screen p-6 bg-gray-50 font">
      {/* Header Stats */}
      <div className="max-w-3xl mx-auto mb-8 p-6 bg-blue-50 rounded-2xl shadow text-center">
        <h2 className="text-2xl font-semibold text-blue-700 mb-2"> Welcome, {user?.name || "User"}! 👋</h2>
        <p className="text-gray-700">
          Total Habits: <span className="font-bold">{totalHabits}</span>
        </p>
        <p className="text-gray-700">
          Completed: <span className="font-bold">{completedHabits}</span>
        </p>
        <p className="text-gray-700">
          Current Streak: <span className="font-bold">{currentStreak} {currentStreak === 1 ? "day" : "days"}</span>
        </p>
      </div>

      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">📋 Your Habits</h1>

      {habits.length === 0 ? (
        <p className="text-center text-gray-500">No habits added yet!</p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-4">
          {habits.map((habit) => (
            <div
              key={habit._id}
              className="flex flex-col md:flex-row justify-between items-center p-4 bg-white rounded-2xl shadow-md border"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full">
                {editingId === habit._id ? (
                  <>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="px-2 py-1 border rounded"
                    />
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      className="px-2 py-1 border rounded"
                    >
                      <option value="Health">🏃 Health</option>
                      <option value="Productivity">📚 Productivity</option>
                      <option value="Mindfulness">🧘 Mindfulness</option>
                      <option value="Custom">✨ Custom</option>
                    </select>
                    <input
                      type="time"
                      value={editReminder}
                      onChange={(e) => setEditReminder(e.target.value)}
                      className="px-2 py-1 border rounded"
                    />
                  </>
                ) : (
                  <>
                    <span className="font-semibold text-lg">{habit.name}</span>
                    <span className="text-sm text-gray-500">[{habit.category}]</span>
                    {habit.reminder && (
                      <span className="text-sm text-green-600">⏰ {habit.reminder}</span>
                    )}
                    <span
                      className={`px-2 py-1 rounded text-sm font-medium ${
                        habit.status === "done"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {habit.status}
                    </span>
                  </>
                )}
              </div>

              <div className="flex gap-2 mt-3 md:mt-0">
                {editingId === habit._id ? (
                  <>
                    <button
                      onClick={() => saveEdit(habit._id)}
                      className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white font-medium transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-3 py-1 rounded bg-gray-400 hover:bg-gray-500 text-white font-medium transition"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => toggleStatus(habit._id,habit.status)}
                      className={`px-3 py-1 rounded font-medium text-white ${
                        habit.status === "pending"
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-yellow-500 hover:bg-yellow-600"
                      } transition`}
                    >
                      {habit.status === "pending"
                        ? "Mark as Done"
                        : "Mark as Pending"}
                    </button>

                    <button
                      onClick={() => startEdit(habit)}
                      className="px-3 py-1 rounded bg-indigo-500 hover:bg-indigo-600 text-white font-medium transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteHabit(habit._id)}
                      className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white font-medium transition"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    
    </div>
  );
}










