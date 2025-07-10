import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

// Experience details page - shows full information for an experience 
// ! Will require button to add an experience to a trip 
// ! Will require adding the reviews to the details page 

function Experiences_Eat () {
    const [experiences, setExperiences] = useState ([]);
    const {id} = useParams();
    const experience_category = 1;

    useEffect(()=>{
        const fetchExperiences = async () => {
        try {
            const res = await fetch (`http://localhost:3000/experiences/${id}?category=${experience_category}`);

            if(!res.ok) {
                throw new Error ('Failed to fetch experiences');
            }

            const data = await res.json();
            setExperiences(data);
        }catch(err){
            console.error(err);
        }
        };
            fetchExperiences();
        }, [id, experience_category]);


        return(
            <div className="cityExperiences"> 

            {experiences.length === 0 ? (
                <p> There are no experiences for this city. </p>) : (
                    <ul style={{ listStyle: "none", padding: 0}}> 
                    {experiences.map ((experience) => (
                        
                        <li key={experience.id} className="experience-card"> 
                        
                        <a href={`/experiences/${experience.id}`}>
                        <img src={experience.experience_picture} alt="experience picture"/>
                        </a>
                        
                        <h3> {experience.experience_name} </h3>
                        
                        
                        </li>
                    ))}
                    </ul>
                )}
            </div>
);

}

export default Experiences_Eat;