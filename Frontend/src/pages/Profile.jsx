import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
 
  
  const [goals, setGoals] = useState([]); // sample goals
  const [newGoal, setNewGoal] = useState("");
 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    streak: 0,
    badges: [],
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:2005/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data); // {name, email, joined}
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token"); // invalid token
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // fetch goals from backend
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await axios.get("http://localhost:2005/api/goals", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGoals(res.data);
      } catch (err) {
        console.error("Error fetching goals:", err);
      }
    };
    fetchGoals();
  }, []);

  //  Add Goal (Backend POST)
  const addGoal = async () => {
    if (!newGoal.trim()) return;
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:2005/api/goals",
        { title: newGoal },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setGoals((prev) => [res.data, ...prev]);
      setNewGoal("");
    } catch (err) {
      console.error("Error adding goal:", err);
    }
  };

  // Delete Goal (Backend DELETE)
  const deleteGoal = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:2005/api/goals/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGoals((prev) => prev.filter((g) => g._id !== id));
    } catch (err) {
      console.error("Error deleting goal:", err);
    }
  };

  // habit stact and achivements
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await axios.get("http://localhost:2005/api/achievements", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data); // { total, completed, streak, badges }
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!user) return <p className="text-center mt-10">Not logged in</p>;

  // Create avatar URL using ui-avatars.com
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user.name
  )}&background=3b82f6&color=fff&size=128`;

  // Dark mode toggle
  const toggleDarkMode = () =>
    setUser((prev) => ({ ...prev, darkMode: !prev.darkMode }));



  return (
    <div
      className={`${
        user.darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      } min-h-screen p-6 transition-colors duration-300 font`}
    >
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        👤 Profile & Habit Hub
      </h1>
      {/* User Info */}
      <div
        className={`${
          user.darkMode ? "bg-gray-800" : "bg-white"
        } max-w-2xl mx-auto p-6 rounded-xl shadow mb-8 text-center`}
      >
        <img
          src={avatarUrl}
          alt="avatar"
          className="w-24 h-24 rounded-full mx-auto border-4 border-blue-500"
        />
        <h2 className="text-xl font-semibold mt-4">{user.name}</h2>
        <p className="text-gray-500">{user.email}</p>
        <p className="text-sm text-gray-400">
          Joined: {new Date(user.joined || Date.now()).toLocaleDateString()}
        </p>
      </div>
      {/* Habit Statistics */}{" "}
      <div
        className={`${
          user.darkMode ? "bg-gray-800" : "bg-white"
        } max-w-2xl mx-auto p-6 rounded-xl shadow mb-8 text-black`}
      >
        <h2 className="text-lg font-semibold mb-4">📊 Habit Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold ">{stats.total}</p>
            <p className="text-sm text-gray-600">Total Habits</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold ">{stats.completed}</p>
            <p className="text-sm text-gray-600">Completed</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <p className="text-2xl font-bold">
              {stats.total - stats.completed}
            </p>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold">
              {" "}
              {stats.total > 0
                ? Math.round((stats.completed / stats.total) * 100)
                : 0}
              %
            </p>
            <p className="text-sm text-gray-600">Completion Rate</p>
          </div>
        </div>
      </div>
      {/* Achievements / Badges */}
      <div
        className={`${
          user.darkMode ? "bg-gray-800" : "bg-white"
        } max-w-2xl mx-auto p-6 rounded-xl shadow mb-8`}
      >
        <h2 className="text-lg font-semibold mb-4">🏆 Achievements</h2>
        {stats.badges.length === 0 ? (
          <p className="text-gray-500">No achievements yet. Keep going! 🚀</p>
        ) : (
           <ul className="list-disc list-inside space-y-2">
            {stats.badges.map((badge) => (
              <li key={badge.key} className="text-blue-600 font-medium">
                {badge.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    
  
      {/* Long-term Goals */}
      <div
        className={` max-w-2xl mx-auto bg-white p-6 rounded-xl shadow mb-8 text-black`}
      >
        <h2 className="text-lg font-semibold mb-4">🎯 Long-term Goals</h2>

        {/* Add Goal Form */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Add a new goal"
            className="flex-1 px-3 py-2 border rounded"
          />
          <button
            onClick={addGoal}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            Add
          </button>
        </div>

        {/* Goals List */}
        {goals.length === 0 ? (
          <p className="text-gray-500">No goals added yet.</p>
        ) : (
          <ul className="list-disc list-inside space-y-1">
            {goals.map((goal) => (
              <li key={goal._id} className="flex justify-between items-center">
                <span>{goal.title}</span>
                <button
                  onClick={() => deleteGoal(goal._id)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Settings */}
      <div
        className={`${
          user.darkMode ? "bg-gray-800" : "bg-white"
        } max-w-2xl mx-auto p-6 rounded-xl shadow mb-8`}
      >
        <h2 className="text-lg font-semibold mb-4">⚙️ Settings</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded"
          >
            Toggle Dark Mode
          </button>
         
        </div>
      </div>
      {/* footer */}
      <footer className="max-w-2xl mx-auto text-center">
        <p className="text-center text-sm text-gray-400 mt-8">
          HabitTrackPro &copy; 2025. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
