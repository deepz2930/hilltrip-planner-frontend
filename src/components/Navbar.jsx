import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assests/logohill.jpg' 

export default function Navbar() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md">
      <div className="container mx-auto p-4 flex justify-between items-center">
        
        {/* Logo + Brand */}
        <Link to="/" className="flex items-center space-x-2 hover:text-yellow-300 transition">
          <img src={logo} alt="HillTrip Logo" className="w-8 h-8 object-contain" />
          <span className="font-bold text-2xl">HillTrip</span>
        </Link>

        {/* Menu Links */}
        <div className="flex items-center space-x-4">
          <Link 
            to="/routes" 
            className="px-3 py-1 rounded hover:bg-blue-400 transition"
          >
            Routes
          </Link>
          <Link 
            to="/dashboard" 
            className="px-3 py-1 rounded hover:bg-blue-400 transition"
          >
            My Trips
          </Link>

          {/* Auth Menu */}
          {user ? (
            <>
              <span className="px-3 py-1 rounded bg-blue-300 text-blue-900 font-medium">
                Hi, {user.name}
              </span>
              <button
                onClick={logout}
                className="px-3 py-1 rounded hover:bg-blue-400 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="px-3 py-1 rounded hover:bg-blue-400 transition"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="px-3 py-1 rounded hover:bg-blue-400 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
