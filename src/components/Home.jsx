import { React, useEffect } from 'react';
import CityPage from './CityPage';
import hero from '../assets/hero.png';

const Home = () => {

    return (
        <>
        <div className="home">

            <div className="homeHeader"> 
               <img src={hero} alt="Planr Logo" />
            </div>

            <h2 style={{fontSize: '32px'}}> Featured Destinations </h2>
            <p> Select a city to create a trip and view recommended experiences </p>

             <div className="homeFeatured">
                {<CityPage></CityPage>}
            </div>

        </div>

        </>
    );
};

export default Home;