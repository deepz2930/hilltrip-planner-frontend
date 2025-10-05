import React, { useEffect, useState } from 'react'
import axios from '../api/axios'
import { Link } from 'react-router-dom'

export default function RoutesPage() {
  const [routes, setRoutes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/routes')
      .then(res => setRoutes(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="text-center mt-20 text-gray-500 text-lg">Loading trips...</div>

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-4xl font-bold mb-10 text-center text-blue-800">Explore Trips</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {routes.map(r => (
          <div 
            key={r._id} 
            className="bg-white rounded-xl shadow-xl overflow-hidden hover:scale-105 transform transition duration-300 hover:shadow-2xl"
          >
            {/* Image */}
            {r.images && r.images.length > 0 && (
              <img 
                src={r.images[0]} 
                alt={`${r.from} to ${r.to}`} 
                className="w-full h-52 object-cover"
              />
            )}

            {/* Content */}
            <div className="p-5">
              <h3 className="text-2xl font-semibold text-blue-900">{r.from} → {r.to}</h3>
              <p className="text-gray-600 mt-2 text-sm">{r.description?.slice(0, 120)}...</p>
              
              <div className="flex justify-between items-center mt-4 text-gray-700 text-sm font-medium">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{r.mode}</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{r.distance} km</span>
              </div>

              <Link 
                to={`/routes/${r._id}`} 
                className="block mt-5 text-center bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                View Trip
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
