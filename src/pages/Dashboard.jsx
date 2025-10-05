import React, { useEffect, useState } from 'react'
import axios from '../api/axios'

export default function Dashboard() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get('/bookings/my')
        setBookings(res.data)
      } catch (err) {
        console.error(err)
      }
      setLoading(false)
    }
    fetch()
  }, [])

  if (loading) 
    return <div className="text-center mt-20 text-blue-500 font-semibold">Loading your trips...</div>

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">My Trips</h2>

      {bookings.length === 0 && (
        <div className="text-center text-blue-700 text-lg mt-10">
          You haven’t booked any trips yet.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map(b => (
          <div 
            key={b._id} 
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-300"
          >
            {/* Optional Image */}
            {b.route.images && b.route.images.length > 0 && (
              <img 
                src={b.route.images[0]} 
                alt={`${b.route.from} to ${b.route.to}`} 
                className="w-full h-48 object-cover"
              />
            )}

            <div className="p-5 space-y-2">
              <h3 className="text-xl font-semibold text-blue-800">{b.route.from} → {b.route.to}</h3>
              <p className="text-blue-700 text-sm">Date: {new Date(b.date).toLocaleDateString()}</p>
              <p className="text-blue-700 text-sm">Passengers: {b.passengers}</p>
              <p className={`text-sm font-medium ${b.status === 'booked' ? 'text-green-600' : 'text-red-600'}`}>
                Status: {b.status}
              </p>

              <p className="text-gray-600 text-sm mt-2">{b.route.description?.slice(0, 100)}...</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
