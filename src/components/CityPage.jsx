import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CityPage (){
    const [cities, setCities] = useState([]);

    useEffect(()=>{
        const fetchCities = async () => {
        try{
            const res = await fetch("http://localhost:3000/cities");
            const data = await res.json();
            setCities(data);
        }catch(err){
            console.error(err);
        }
    };
        fetchCities();
    }, []);

    console.log(cities)



    return(
        <div className="cityContainer">
            {cities.map((city)=> (
                <Link to={`/cities/${city.id}`}>
                <div key={city.id} className="citySection">

                    <div>
                    <h2 className="CityName">{city.city_name}</h2>
                    </div>

                    <div>
                    <img src={city.city_image}
                    alt={city.city_name}
                    className="FeaturedCity"
                    />
                    </div>
                    
                    </div>
                    </Link>
            ))}
        </div>
    )
}

export default CityPage
