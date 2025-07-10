import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

// Experience details page - shows full information for an experience 
// ! Will require button to add an experience to a trip 
// ! Will require adding the reviews to the details page 

function ExperienceDetails () {
    const [experiences, setExperiences] = useState({});
    const {id} = useParams();

    useEffect(()=>{
        const fetchExperience = async () => {
            try{
                const res = await fetch (`http://localhost:3000/experiences/${id}`);
                const data = await res.json();
                setExperiences(data);
              }catch(err){
            console.error(err);
        }
    };
        fetchExperience();
    }, [id]);

    console.log(experiences)

    return(

        <div className = "experienceHeader">
            <div className="headerImage">
                <img src={experiences.experience_image} />
            </div>
            <div className="headerInfo">
                <h1> {experiences.experience_name}</h1>
                <p> {experiences.experience_description}</p>
            </div>

        </div>

    )}

    export default ExperienceDetails
           