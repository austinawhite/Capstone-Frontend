import { useEffect, useState } from "react";

function MyTrips({ token }) {
   const [trips, setTrips] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");

   useEffect(() => {
       const fetchTrips = async () => {
           try {
               const response = await fetch('http://localhost:3000/trips/with-experiences', {
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

   //to delete a trip
   const deleteTrip = async (tripId) => {
    try {
        const response = await fetch (`http://localhost:3000/trips/${tripId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            setTrips((prevTrips) => prevTrips.filter(trip => trip.trip_id !== tripId));
        } else {
            setError('Failed to delete trip');
        }
    } catch(error) {
        setError('Error deleting trip');
    }
   };

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

                           <button onClick={() => deleteTrip(trip.trip_id)}
                            style={{
                                backgroundColor: 'red', 
                                color: 'white', 
                                border: 'none', 
                                padding: '8px 12px', 
                                cursor: 'pointer',
                                borderRadius: '5px',
                                marginTop: '10px'
                            }}
                            >
                                Delete Trip
                            </button>

                           <h4>Experiences:</h4>
                           {trip.experiences.length > 0 ? (
                                <div>
                                    {trip.experiences.map((experience) => (
                                        <div key={experience.experience_id} style={{ marginLeft: "20px" }}>
                                        <h5>{experience.experience_name}</h5>
                                        <img 
                                            src={experience.experience_picture} 
                                            alt={experience.experience_name} 
                                            style={{ width: "150px", borderRadius: "5px" }} 
                                        />
                                        <p>{experience.experience_description}</p>
                                    </div>
                                    ))}
                                </div>
                           ) : (
                                <p>No experiences yet.</p>
                           )}
                       </div>
                   ))}
               </div>
           )}
       </div>
   );
}

export default MyTrips;