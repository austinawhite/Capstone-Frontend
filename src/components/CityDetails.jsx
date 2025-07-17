//! User is getting logged out when they visit the city details page - will need to be logged in to add the experience to a trip 

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Experiences_Eat from "./ExperienceEat";
import Experiences_Drink from "./ExperienceDrink";
import Experiences_Play from "./ExperiencePlay";
import Experiences_Explore from "./ExperienceExplore";
import CreateTrip from "./CreateTrip";

function CityDetails({ token }) {  
    const [city, setCity] = useState({});
    const [existingTrip, setExistingTrip] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchCityAndTrip = async () => {
            try {
                
                const cityRes = await fetch(`http://localhost:3000/cities/${id}`);
                const cityData = await cityRes.json();
                setCity(cityData);

               
                if (token) {
                    const tripRes = await fetch(`http://localhost:3000/trips/city/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    
                    if (tripRes.ok) {
                        const tripData = await tripRes.json();
                        setExistingTrip(tripData);
                    }
                }
                
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        
        fetchCityAndTrip();
    }, [id, token]);

    const renderTripSection = () => {
        if (loading) {
            return <div>Loading trip information...</div>;
        }

        if (!token) {
            return <div>Please log in to plan your trip.</div>;
        }

        if (existingTrip) {
            return (
                <div style={{
                    backgroundColor: "#f0f8ff", 
                    border: "2px solid #007bff", 
                    padding: "20px", 
                    margin: "20px 0",
                    borderRadius: "8px"
                }}>
                    <h3>Your Upcoming Trip</h3>
                    <p><strong>Start Date:</strong> {new Date(existingTrip.start_date).toLocaleDateString()}</p>
                    <p><strong>End Date:</strong> {new Date(existingTrip.end_date).toLocaleDateString()}</p>
                    <button>Edit Trip</button>
                </div>
            );
        }

      return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
        <CreateTrip id={id} token={token} />
        </div>
        );

        };

    return (
        <div className="cityContainer2">


            
            <div className="citySection">

                <div className="cityImage">
                    <img src={city.city_image}
                        alt={city.city_name}
                        className="CityImage"
                    />
                </div>

                <div className="cityDetails">
                    <h1> {city.city_name} </h1>
                    <p>{city.city_description}</p>
                </div>

            </div>

            <div>
                 <div className="tripSection">
                    {renderTripSection()}
                </div>
            </div>

            <div className="experiencesMain">
                
            <div className="cityExperiences">
                <div className="experiencesSection">
                    <h2> Places to Eat </h2>
                    <Experiences_Eat/>
                </div>
            </div>

            <div className="cityExperiences">
                <div className="experiencesSection">
                    <h2> Grab A Drink </h2>
                    <Experiences_Drink/>
                </div>
            </div>

            <div className="cityExperiences">
                <div className="experiencesSection">
                    <h2> Have Some Fun </h2>
                    <Experiences_Play/>
                </div>
            </div>

            <div className="cityExperiences">
                <div className="experiencesSection">
                    <h2> Go Explore </h2>
                    <Experiences_Explore/>
                </div>
            </div>
        </div>
        </div>
    )
}

export default CityDetails