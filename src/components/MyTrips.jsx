import { useEffect, useState } from "react";

function MyTrips({ token }) {
   const [trips, setTrips] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");

   useEffect(() => {
       const fetchTrips = async () => {
           try {
               const response = await fetch('http://localhost:3000/trips', {
                   headers: {
                       'Authorization': `Bearer ${token}`,
                   },
               });

               if (response.ok) {
                   const data = await response.json();
                   setTrips(data.trips);
               } else {
                   setError('Failed to load trips');
               }
           } catch (err) {
               setError('Error loading trips');
           } finally {
               setLoading(false);
           }
       };

       if (token) {
           fetchTrips();
       }
   }, [token]);

   if (loading) return <div>Loading your trips...</div>;
   if (error) return <div>Error: {error}</div>;

   return (
       <div style={{ padding: "20px" }}>
           <h2>My Trips</h2>
           
           {trips.length === 0 ? (
               <p>You haven't created any trips yet.</p>
           ) : (
               <div>
                   {trips.map((trip) => (
                       <div 
                           key={trip.id} 
                           style={{
                               border: "1px solid #ccc",
                               padding: "15px",
                               margin: "10px 0",
                               borderRadius: "5px"
                           }}
                       >
                           <h3>{trip.trip_name}</h3>
                           <p><strong>Destination:</strong> {trip.city_name}</p>
                           <p><strong>Start Date:</strong> {new Date(trip.trip_date).toLocaleDateString()}</p>
                           <p><strong>End Date:</strong> {new Date(trip.end_date).toLocaleDateString()}</p>
                       </div>
                   ))}
               </div>
           )}
       </div>
   );
}

export default MyTrips;