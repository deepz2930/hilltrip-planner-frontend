import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center  px-4">
      
      {/* Hero Text */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 text-center mb-4">
        Plan Your Dream Hill Trips
      </h1>
      
      <p className="text-blue-700 text-lg md:text-xl text-center mb-8 max-w-2xl">
        Explore scenic routes, read real traveler experiences, and book your perfect getaway in the hills.
      </p>

      {/* Call-to-Action Button */}
      <Link 
        to="/routes" 
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105 transform transition duration-300"
      >
        Explore Routes
      </Link>
      
      {/* Optional Hero Image */}
      <div className="mt-10 w-full max-w-4xl">
        <img 
          src="https://images.pexels.com/photos/26594629/pexels-photo-26594629.jpeg" 
          alt="Hill Trips" 
          className="w-full rounded-xl shadow-lg object-cover"
        />
      </div>
    </div>
  )
}
