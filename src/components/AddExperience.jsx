import { useState, useEffect } from "react";

const AddExperience = () => {
    const [trip, setTrip] = useState (null);
    const [error, setError] = useState ('');

    useEffect(()=> {
        fetchTripCity();
    }, [experience.city_id]);
    
    const fetchTripCity = async () => {
        try {
            const repsonse = await fetch (`/api/trips/city/${experience.city_id}`);
            if(!Response.ok) {
                error ('No upcoming trip in this city');
            }

            const tripData = await Response.json();
            setTrip(tripData);
        } catch (err) {
        setError(err.message || `Failed to load trip`)
        }
    };

}