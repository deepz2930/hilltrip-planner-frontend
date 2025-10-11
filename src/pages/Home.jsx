import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-gradient-to-b from-green-50 via-blue-50 to-purple-50">
      
      {/* Hero Text */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-blue-500 to-purple-600 animate-text-gradient">
        Plan Your Dream Hill Trips
      </h1>
      
      <p className="text-center text-lg md:text-xl mb-8 max-w-2xl text-gradient-to-r from-green-700 via-blue-600 to-purple-700">
        Explore scenic routes, read real traveler experiences, and book your perfect getaway in the hills.
      </p>

      {/* Call-to-Action Button */}
      <Link 
        to="/routes" 
        className="px-6 py-3 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 hover:brightness-110"
      >
        Explore Routes
      </Link>
      
      {/* Hero Image with overlay */}
      <div className="mt-10 w-full max-w-4xl relative rounded-xl overflow-hidden shadow-2xl">
        <img 
          src="https://images.pexels.com/photos/26594629/pexels-photo-26594629.jpeg" 
          alt="Hill Trips" 
          className="w-full h-96 md:h-[28rem] object-cover transform transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20"></div>
      </div>
    </div>
  );
}

