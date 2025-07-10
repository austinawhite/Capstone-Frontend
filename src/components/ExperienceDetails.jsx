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
                const res = await fetch(`http://localhost:3000/experiences/details/${id}`);
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
                <h1> Experience Test </h1>
                 <img src={experiences.experience_picture} alt="experience picture"/>
            </div>
            <div className="headerInfo">
                <h1> {experiences.experience_name}</h1>
                <p> {experiences.experience_description}</p>
            </div>

            <div>
                <button> Add to Trip </button>
            </div>

            <div>
                <h2> Reviews </h2>
            </div>

        </div>

    )}

    export default ExperienceDetails
           