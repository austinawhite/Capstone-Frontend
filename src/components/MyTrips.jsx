import { useEffect, useState } from "react";

function MyTrips({ token }) {
   const [trips, setTrips] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");
   const [tripExperiences, setTripExperiences] = useState({});
   const [experienceDate, setExperienceDate] = useState({});
   

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

                   //fetchin experiences for each trip
                   data.trips.forEach(async (trip) => {
                    const res = await fetch(`http://localhost:3000/api/tripexperiences/${trip.id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    if (res.ok) {
                        const data = await res.json();
                        setTripExperiences(prev => ({
                            ...prev,
                            [trip.id]: data,
                        }));
                    }
                   });
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

   const handleDateChange = (tripId, expId, date) => {
    setExperienceDate(prev => ({
        ...prev,
        [tripId]: {
            ...(prev[tripId] || {}),
            [expId]: date,
        },
    }));
   };

   const handleAddExperience = (tripId, expId) => {
    const selectedDate = experienceDate[tripId]
    if (!selectedDate) {
        alert("Please select a date for the experience")
        return;
    }
    //debugging
    console.log(`Adding experience with ID ${expId} to trip ${tripId} on date ${selectedDate}`);
   };

   if (loading) return <div>Loading your trips...</div>;
   if (error) return <div>Error: {error}</div>;

   return (
       <div className="tripsContainer">
           {/*<h2 className="tripsHeader">My Trips</h2>*/}
           
           {trips.length === 0 ? (
               <p>You haven't created any trips yet.</p>
           ) : (
               <div className="tripsList">
                   {trips.map((trip) => (
                       <div key={trip.id} className="tripCard">
                           <h3 className="tripName">{trip.trip_name}</h3>
                           <div className="tripCityImageContainer">
                           <img src={trip.city_image} alt={trip.city_name} className="tripCityImage" />
                           </div>
                           <div className="tripDetailsContainer">
                           <p className="tripDetail"><strong>Destination:</strong> {trip.city_name}</p>
                           <p className="tripDetail"><strong>Start Date:</strong> {new Date(trip.trip_date).toLocaleDateString()}</p>
                           <p className="tripDetail"><strong>End Date:</strong> {new Date(trip.end_date).toLocaleDateString()}</p>
                           </div>
                           <h4 className="experiencesHeader">Experiences:</h4>
                           {tripExperiences[trip.id] && tripExperiences[trip.id].length > 0 ? (
                               <ul className="experiencesList">
                                   {tripExperiences[trip.id].map((exp, index) => (
                                       <li key={`${trip.id}-${exp.experience_id}-${index}`} className="experienceContainer">
                                        <div className="experienceItem">
                                           <span className="experienceName">{exp.experience_name}— </span> 

                                           <div className="experienceDateContainer">
                                            <label className="experienceDateLabel">
                                                Experience Date:
                                                <input
                                                    className="experienceDateInput"
                                                    type="date"
                                                    value={experienceDate[trip.id]?.[exp.experience_id] || ""}
                                                    onChange={(e) => handleDateChange(trip.id, exp.experience_id, e.target.value)}
                                                />
                                            </label>
                                           </div>
                                         </div>
                                       </li>
                                   ))}
                               </ul>
                           ) : (
                               <p>No experiences added yet.</p>
                           )}
                       </div>
                   ))}
               </div>
           )}
       </div>
   );
}

export default MyTrips;