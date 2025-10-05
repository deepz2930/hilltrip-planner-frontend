import { useEffect, useState } from 'react';
import axios from 'axios';

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await axios.get(`${import.meta.env.REACT_APP_API_URL}/routes`);
        setTrips(res.data);
      } catch (err) {
        console.error('Error fetching trips:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  if (loading) return <p>Loading trips...</p>;
  if (!trips.length) return <p>No trips available</p>;

  return (
    <div>
      <h1>Available Routes</h1>
      {trips.map((trip) => (
        <div key={trip._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h2>{trip.title}</h2>
          <p>
            Mode: {trip.mode} • Distance: {trip.distance} km
          </p>
          <p>{trip.description}</p>
          <button
            onClick={() => alert(`View Trip: ${trip.title}`)}
            style={{ marginTop: '5px' }}
          >
            View Trip
          </button>
        </div>
      ))}
    </div>
  );
};

export default Trips;
