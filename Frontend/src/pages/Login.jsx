import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required!");
      return;
    }


    try {
      const res = await axios.post("http://localhost:2005/api/auth/login", {
        email,
        password,
      });

      const { token, user } = res.data; // backend se mil raha token + user

      // Token save in localStorage
      localStorage.setItem("token", token);

      // User state update
      setUser(user);

      // Redirect to dashboard/profile
      navigate("/add-habit");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Login failed!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      {error && (
        <p className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full  rounded px-3 py-2 mt-1"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2 mt-1"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>

      <p className="text-sm text-gray-600 mt-4">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline">
          Sign Up
        </Link>
      </p>
     
      <div className="text-center mt-6">
        <Link to="/" className="text-gray-600 hover:underline">
          Back to Home
        </Link>
      </div>  

    </div>
  );
}
