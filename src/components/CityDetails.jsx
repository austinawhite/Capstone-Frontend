import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Experiences_Eat from "./ExperienceEat";

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

    console.log(city)



    return(
        <div className="cityContainer">
            
                <div key={city.id} className="citySection">
                    <h2 className="CityName">{city.city_name}</h2>

                    <img src={city.city_image}
                    alt={city.city_name}
                    className="CityImage"
                    />
                    <h2>{city.city_description}</h2>
                    </div>
                    
                <div>
                    <h2> Places to Eat </h2>
                    <Experiences_Eat/>
                </div>
        </div>
    )
}

export default CityDetails
