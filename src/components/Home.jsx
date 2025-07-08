import { React, useEffect } from 'react';
import CityPage from './CityPage';

const Home = () => {

    return (
        <>
        <div> 
        <h1> Homepage </h1> 
        {<CityPage></CityPage>}
        </div>
        </>
    );
};

export default Home;