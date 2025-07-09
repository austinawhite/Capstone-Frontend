import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

// Experience details page - shows full information for an experience 
// ! Will require button to add an experience to a trip 
// ! Will require adding the reviews to the details page 

function CityExperiences () {
    const [experiences, setExperiences] = useState ([]);
    const {id} = useParams();

    useEffect(()=>{
        const fetchExperiences = async () => {
        try {
            const res = await fetch (`http://localhost:3000/experiences/${id}`);

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
        }, [id]);


        return(
            <div className="cityExperiences"> 
            <h2> City Experiences </h2> 
            {experiences.length === 0 ? (
                <p> There are no experiences for this city. </p>) : (
                    <ul style={{ listStyle: "none", padding: 0}}> 
                    {experiences.map ((experience) => (
                        <li key={experience.id} className="experience-card"> 

                        <img src={experience.experience_picture} alt="experience picture"/>
                        
                        <h3> {experience.experience_name} </h3>
            
                        <p>  {experience.experience_description} </p>
                        
                        
                        </li>
                    ))}
                    </ul>
                )}
            </div>
);

}

export default CityExperiences;