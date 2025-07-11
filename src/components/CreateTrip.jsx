// Create Trip - Form that allows users to create an upcoming trip for a city. User enters a trip name, start date, and end date. 

import { useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import React from "react";

// TODO: city id needs to come in from the city page 
// TODO: user id is also needed
// TODO: form should only appear for a user that is logged in 

function CreateTrip(){
    const {id}  = useParam();
    const navigate = useNavigate();
    const [token] = useState(localStorage.getItem('token'));


    const[city, setCity] = useState("");
    const [user, setUser] = useState("");
    const [tripName, setTripName] = useState("")
    const [tripDate, setTripDate] = useState ("");
    const [endDate, setEndDate] = useState ("");

    useEffect(()=>{
        const getCity = async() => {
           if (!id) return; 

            try {
                const res = await fetch (`http://localhost:3000/cities/${id}`);
                const data = await res.json();
                setCity(data);
            } catch (error) {
                console.error('Error fetching city', error);
            }
            
        };

        getCity();
    }, [id]);

    useEffect(()=>{
        const getUser = async()=> {
            if (!token) return;

            try {

            const res = await fetch ('http://localhost:3000/users/user',{
              headers: {
                 'Authorization': `Bearer ${token}`,
                     },
      });
            const data = await res.json();
            setUser(data);
        } catch (error) {
            console.error('Error fetching user', error);
        }

    };

        getUser();

    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
    try {
            const tripData = {
                name: tripName,
                startDate: tripDate,
                endDate: endDate,
                cityId: cityId,
                userId: user.id 
            };
            
            const res = await fetch('http://localhost:3000/trips', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(tripData)
            });
            
            if (res.ok) {
                const newTrip = await res.json();
                console.log('Trip created successfully:', newTrip);
                
               navigate(`/cities/${id}`);

            } else {
                console.error('Failed to create trip');
            }
        } catch (error) {
            console.error('Error creating trip:', error);
        }
    };

    const handleCancel = () => {
        navigate(`/cities/${id}`);
    };

    return (
        <div className="tripForm">

            <div className="tripFormHeader">
                <p> Create Your Trip to </p>
                <h1> {city.name} </h1>

            </div>

            <div className="tripInfo">

            <form onSubmit={handleSubmit}>
                <label>  Name: <input type="text" value={tripName} onChange={(e) => setTripName(e.target.value)} required/> </label>
                <label>  Start Date: <input type="date" value={tripDate} onChange={(e) => setTripDate(e.target.value)} required /> </label>
                <label>  End Date: <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required/> </label>

                <button type="submit"> Create Trip </button>
            </form>

            </div>


        </div>
    );

}

export default CreateTrip;