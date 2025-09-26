

import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navber'
import Deshbord from './pages/Deshbord';
import AddHabit from './pages/AddHabit';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from "./pages/Signup";
import { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [user, setUser] = useState(null);

 
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;  // token nahi hai to user null hi rahe

      try {
        const res = await axios.get("http://localhost:2005/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data); // user state set ho jaayega
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token"); // invalid token ko hata do
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token"); // token bhi clear karo
    setUser(null);
  };

  return (
    <div className={user?.darkMode ? "bg-gray-900 text-white min-h-screen" : "bg-gray-50 text-gray-900 min-h-screen"}>
      <Navbar user={user} logout={logout} />
      <div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/deshbord" element={<Deshbord user={user} />} />
          <Route path="/add-habit" element={<AddHabit user={user} />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

