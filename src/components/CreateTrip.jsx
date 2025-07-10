import { useEffect, useState } from "react";

// city id needs to come in from the city page 
// user id is also needed
// form should only appear for a user that is logged in 

function createTrip(){
    const[city, setCity] = useState("");
    const [user, setUser] = useState("");
    const [tripDate, setTripDate] = useState ("");
    const [endDate, setEndDate] = useState ("");

    useEffect(()=>{
        const getCity = async() => {
            const res = await fetch ('http://localhost:3000/cities/${id}');
            const data = await res.json();
            setCity(data);
        }

        getCity();
    }, []);

    useEffect(()=>{
        const getUser = async()=> {
            const res = await fetch ('http://localhost:3000/users/user');
              headers: {
                 'Authorization': `Bearer ${token}`,
                     },
      });
            const data = await res.json();
            setUser(data);
        } 

        getUser();

    }), []);

    return (
        <div className="tripForm">

            <div className="tripFormHeader">
                <p> Create Your Trip to </p>
                <h1> {$city} </h1>

            </div>

            <div className="tripDates">

            <form onSubmit={handleSubmit}>
                <label>Start Date: <input type="date" value={tripDate} /> </label>
                <label>End Date: <input type="date" value={endDate}/> </label>

                <button type="submit"> Create Trip </button>
            </form>

            </div>


        </div>
    );

}

export default createTrip;