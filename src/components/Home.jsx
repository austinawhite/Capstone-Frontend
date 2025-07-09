import { React, useEffect } from 'react';
import CityPage from './CityPage';

const Home = () => {

    return (
        <>
        <div className="home">

            <div className="homeHeader"> 
                <p> Welcome To </p>
                <h1> Planr </h1> 
                <p> Plan your next dream vacation with Planr! Your all-in-one tool for finding and planning the best local experiences in each city. </p>
            </div>

            <h2> Featured Destinations </h2>

             <div className="homeFeatured">
                {<CityPage></CityPage>}
            </div>

        </div>

        </>
    );
};

export default Home;