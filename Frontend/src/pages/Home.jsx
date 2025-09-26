import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* header section */}
      <header className="flex flex-col items-center justify-center min-h-[50vh] text-center px-6">
        <h1 className="text-5xl font text-blue-600 drop-shadow-sm">
          Welcome to <span className="text-gray-800">HabitTrackPro</span>
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl">
          Build better habits, track your progress, and stay motivated every day
          🚀
        </p>
        <div>
          <Link
            to="/signup"
            className="mt-6 inline-block bg-gray-500 border border-gray-700 text-white px-5 py-3 rounded-full text-lg font-medium hover:bg-gray-700 transition "
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="mt-6 ml-4 inline-block bg-gray-300 text-gray-800 px-5 py-3 border border-gray-500 rounded-full text-lg font-medium hover:bg-gray-500 transition"
          >
            Login
          </Link>
        </div>
      </header>

   {/* Feature section */}

        <section className="bg-white py-12 font">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 font ">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
                        <h3 className="text-xl font-semibold font text-blue-700 mb-4"> 📅 Habit Tracking</h3>
                        <p className="text-gray-600">Easily add, edit, and delete habits to keep track of your daily routines.</p>
                    </div>
                    <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">  
                        <h3 className="text-xl font-semibold font text-green-600 mb-4"> 📈 Progress Visualization</h3>
                        <p className="text-gray-600">Visualize your habit completion with charts and graphs to stay motivated.</p>
                    </div>
                    <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
                        <h3 className="text-xl font-semibold font text-red-400 mb-4"> 🚨 Reminders & Notifications</h3>
                        <p className="text-gray-600">Set reminders to ensure you never miss a day of your habits.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* footer section */}
      
      <Footer/>

    </div>
  );
};

export default Home;
