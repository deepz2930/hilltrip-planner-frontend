import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';

export default function TripDetails() {
  const { id } = useParams();
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [routeRes, reviewsRes] = await Promise.all([
          axios.get(`/routes/${id}`),
          axios.get(`/reviews/route/${id}`)
        ]);
        setRoute(routeRes.data);
        setReviews(reviewsRes.data);
      } catch (err) {
        console.error(err);
        setErrorMsg('Failed to load trip');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const bookTrip = async () => {
    try {
      await axios.post('/bookings', { routeId: id, date: date || new Date(), passengers });
      setSuccessMsg('Trip booked successfully!');
      setErrorMsg('');
    } catch (err) {
      setErrorMsg('Booking failed: ' + (err.response?.data?.message || err.message));
      setSuccessMsg('');
    }
  };

  const postReview = async () => {
    try {
      await axios.post('/reviews', { routeId: id, rating, comment });
      const res = await axios.get(`/reviews/route/${id}`);
      setReviews(res.data);
      setComment('');
      setRating(5);
      setSuccessMsg('Review posted!');
      setErrorMsg('');
    } catch (err) {
      setErrorMsg('Review failed: ' + (err.response?.data?.message || err.message));
      setSuccessMsg('');
    }
  };

  if (loading) return <p className="text-center mt-20 text-gray-500 text-lg">Loading trip details...</p>;
  if (!route) return <p className="text-center mt-20 text-red-500 text-lg">Route not found</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Images Carousel/Grid */}
      {route.images && route.images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {route.images.map((img, idx) => (
            <img 
              key={idx} 
              src={img} 
              alt={route.title} 
              className="w-full h-60 md:h-72 object-cover rounded-lg shadow-lg border-2 border-blue-200 hover:scale-105 transition-transform duration-300"
            />
          ))}
        </div>
      )}

      {/* Trip Info */}
      <div className="space-y-2 bg-gradient-to-r from-blue-100 to-blue-200 p-4 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-blue-900">{route.from} → {route.to}</h1>
        <p className="text-blue-800 font-medium">
          Mode: {route.mode} • Distance: {route.distance} km • Duration: {route.duration}
        </p>
        <p className="text-blue-700">{route.description}</p>
      </div>

      {/* Booking Section */}
      <div className="p-4 rounded-xl shadow-md bg-gradient-to-r from-green-100 to-green-200 space-y-3 border-2 border-green-300">
        <h2 className="text-xl font-semibold text-green-900">Book this trip</h2>
        {successMsg && <div className="p-2 bg-green-200 text-green-900 rounded">{successMsg}</div>}
        {errorMsg && <div className="p-2 bg-red-200 text-red-900 rounded">{errorMsg}</div>}
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          type="number"
          min={1}
          value={passengers}
          onChange={e => setPassengers(e.target.value)}
          className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Number of passengers"
        />
        <button
          onClick={bookTrip}
          className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
        >
          Book Now
        </button>
      </div>

      {/* Reviews Section */}
      <div className="p-4 rounded-xl shadow-md bg-gradient-to-r from-blue-50 to-blue-100 space-y-4 border-2 border-blue-200">
        <h2 className="text-xl font-semibold text-blue-900">Reviews</h2>

        {/* Reviews List */}
        <div className="space-y-2">
          {reviews.length === 0 && <p className="text-blue-800">No reviews yet</p>}
          {reviews.map(r => (
            <div key={r._id} className="p-3 bg-white rounded-lg shadow-sm border-l-4 border-blue-400">
              <div className="font-semibold text-blue-800">{r.user?.name || 'Anonymous'}</div>
              <div className="text-yellow-600 font-medium">Rating: {r.rating} ⭐</div>
              <p className="text-blue-700">{r.comment}</p>
            </div>
          ))}
        </div>

        {/* Add Review */}
        <div className="mt-4 space-y-2">
          <h3 className="font-medium text-blue-900">Add your review</h3>
          <select
            value={rating}
            onChange={e => setRating(Number(e.target.value))}
            className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} stars</option>)}
          </select>
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Share your experience"
          ></textarea>
          <button
            onClick={postReview}
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Post Review
          </button>
        </div>
      </div>
    </div>
  );
}
