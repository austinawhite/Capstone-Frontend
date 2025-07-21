import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';
function ExperienceDetails() {
    const [experiences, setExperiences] = useState({});
    const [trips, setTrips] = useState([]);
    const [selectedTrip, setSelectedTrip] = useState('');
    const [refreshKey, setRefreshKey] = useState(0);
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    useEffect(() => {
        const fetchExperience = async () => {
            try {
                const response = await fetch(`http://localhost:3000/experiences/details/${id}`);
                const data = await response.json();
                setExperiences(data);
                if (token) {
                    const tripResponse = await fetch(`http://localhost:3000/trips/city/${data.experience_city}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (tripResponse.ok) {
                        const tripData = await tripResponse.json();
                        setTrips(tripData || []);
                    } else {
                        console.error('Failed to fetch trips:', tripResponse.status);
                    }
                }
            } catch (err) {
                console.error('Error fetching experience or trips:', err);
            }
        };
        fetchExperience();
    }, [id, token]);
    const handleAddTripButton = async () => {
        if (!token) {
            alert("You must be logged in to add a trip");
            return;
        }
        if (!selectedTrip) {
            alert("Please select a trip to add this experience to.");
            return;
        }
        try {
            const response = await fetch(`http://localhost:3000/api/tripexperiences`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    experience_id: parseInt(id, 10),
                    trip_id: parseInt(selectedTrip, 10),
                    experience_date: new Date().toISOString().split('T')[0],
                }),
            });
            if (response.ok) {
                alert("Experience added to trip");
                navigate('/account');
            } else {
                const errData = await response.json();
                alert(errData.error || "Failed to add to trip");
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };
    const handleReviewSubmit = () => {
        setRefreshKey(old => old + 1); // refresh reviews after submit
    };
    return (
        <div className="experienceDetail">
            <div className="experienceHeader">
                <div className="headerImage">
                    <img src={experiences.experience_picture} alt="experience" />
                </div>
                <div className="headerInfo">
                    <h1>{experiences.experience_name}</h1>
                    <p>{experiences.experience_description}</p>
                    {token && (
                        <div>
                            {trips.length > 0 ? (
                                <div className="selectTripContainer">
                                    <select
                                        className="selectTripDropdown"
                                        value={selectedTrip}
                                        onChange={(e) => setSelectedTrip(e.target.value)}
                                    >
                                        <option value="">Select a Trip</option>
                                        {trips.map((trip) => (
                                            <option key={trip.id} value={trip.id}>
                                                {trip.trip_name} 
                                            </option>
                                        ))}
                                    </select>
                                    <button className="addToTripButton" onClick={handleAddTripButton}>Add to Trip</button>
                                </div>
                            ) : (
                                <p>You have no trips for this city yet.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className="reviewSection">
                <h2>Reviews</h2>
                <ReviewForm experienceId={id} onReviewSubmit={handleReviewSubmit} />
                <ReviewList experienceId={id} key={refreshKey} />
            </div>
        </div>
    );
}
export default ExperienceDetails;


































