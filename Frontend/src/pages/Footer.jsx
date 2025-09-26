import React from 'react'

const Footer = () => {
  return (
    <div>
<footer className="bg-gray-900 text-gray-300 py-8 mt-12 font">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {/* Logo + Tagline */}
        <div>
          <h2 className="text-2xl font-bold text-white">HabitTrackPro</h2>
          <p className="mt-2 text-sm text-gray-400">
            Build better habits, stay consistent, and achieve your goals 🚀
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li><a href="/" className="hover:text-blue-400">Home</a></li>
            <li><a href="/dashboard" className="hover:text-blue-400">Dashboard</a></li>
            <li><a href="/add-habit" className="hover:text-blue-400">Add Habit</a></li>
            <li><a href="/profile" className="hover:text-blue-400">Profile</a></li>
          </ul>
        </div>

        {/* Contact + Social */}
        <div>
          <h3 className="text-lg font-semibold text-white">Stay Connected</h3>
          <p className="mt-2 text-sm text-gray-400">Email: support@habittrackpro.com</p>
          <div className="flex space-x-4 mt-3">
            <a href="#" className="hover:text-blue-400">🐦</a>
            <a href="#" className="hover:text-pink-400">📸</a>
            <a href="#" className="hover:text-blue-600">💼</a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} HabitTrackPro. All rights reserved.
      </div>
    </footer>


    </div>
  )
}

export default Footer