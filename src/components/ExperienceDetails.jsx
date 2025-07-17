import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';

// Experience details page - shows full information for an experience 
// ! Will require button to add an experience to a trip 
// ✅ Reviews added to the details page

function ExperienceDetails() {
    const [experiences, setExperiences] = useState({});
    const [refreshKey, setRefreshKey] = useState(0);
    const { id } = useParams();

    useEffect(() => {
        const fetchExperience = async () => {
            try {
                const res = await fetch(`http://localhost:3000/experiences/details/${id}`);
                const data = await res.json();
                setExperiences(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchExperience();
    }, [id]);

    const handleReviewSubmit = () => {
        setRefreshKey(old => old + 1); // refreshes ReviewList when a new review is added
    };

    return (
        <div className="experienceDetail">
            <div className="experienceHeader">
                <div className="headerImage">
                    <img src={experiences.experience_picture} alt="experience picture" />
                </div>

                <div className="headerInfo">
                    <h1>{experiences.experience_name}</h1>
                    <p>{experiences.experience_description}</p>
                    <button> Add to Trip </button>
                </div>
            </div>

            <div className="reviewSection">
                <h2>Reviews</h2>
                <ReviewForm
                    experienceId={id}
                    onReviewSubmit={handleReviewSubmit}
                />
                <ReviewList
                    experienceId={id}
                    key={refreshKey}
                />
            </div>
        </div>
    );
}

export default ExperienceDetails;
