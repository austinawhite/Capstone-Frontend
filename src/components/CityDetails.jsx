import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Experiences_Eat from "./ExperienceEat";
import Experiences_Drink from "./ExperienceDrink";
import Experiences_Play from "./ExperiencePlay";
import Experiences_Explore from "./ExperienceExplore";
import CreateTrip from "./CreateTrip";


function CityDetails (){
    const [city, setCity] = useState({});
    const {id} = useParams();

    useEffect(()=>{
        const fetchCity = async () => {
        try{
            const res = await fetch(`http://localhost:3000/cities/${id}`);
            const data = await res.json();
            setCity(data);
        }catch(err){
            console.error(err);
        }
    };
        fetchCity();
    }, [id]);

    console.log(city);

    return(
        <div className="cityContainer">
            
                <div key={city.id} className="citySection">

                    <div className="cityImage">
                    <img src={city.city_image}
                    alt={city.city_name}
                    className="CityImage"
                    />
                    </div>

                    <div className="cityDetails">
                    <h1> {city.city_name} </h1>
                    <p>{city.city_description}</p>
                    <button>
                Create New Trip
            </button>
                    </div>

                

                </div>
                    
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

    )
}

export default CityDetails
