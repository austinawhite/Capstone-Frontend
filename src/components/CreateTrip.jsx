import { useEffect, useState } from "react";

function CreateTrip({id, token}) {
   const [city, setCity] = useState("");
   const [user, setUser] = useState(null);
   const [tripDate, setTripDate] = useState("");
   const [endDate, setEndDate] = useState("");
    const [tripName, setTripName] = useState("");

   useEffect(() => {
       const getCity = async () => {
           try {
               const res = await fetch(`http://localhost:3000/cities/${id}`);
               const data = await res.json();
               setCity(data);
           } catch (error) {
               console.error("Error fetching city:", error);
           }
       }

       getCity();
   }, [id]);

   useEffect(() => {
       const getUser = async () => {
           try {
               const res = await fetch('http://localhost:3000/users/user', {
                   headers: {
                       'Authorization': `Bearer ${token}`,
                   },
               });
               
               if (!res.ok) {
                   console.error("User fetch failed:", res.status, res.statusText);
                   return;
               }
               
               const data = await res.json();
               console.log("User data received:", data);
               setUser(data[0]); 
           } catch (error) {
               console.error("Error fetching user:", error);
           }
       } 

       if (token) {
           getUser();
       }
   }, [token]);

   const handleSubmit = async (e) => {
       e.preventDefault();
       
       
       if (!tripDate || !endDate) {
           alert('Please select both start and end dates');
           return;
       }
       
       if (!user || !user.id) {
           alert('User information not loaded');
           return;
       }

       const requestBody = {
           user_id: user.id,
           city_id: id,
           start_date: tripDate,
           end_date: endDate
       };

       try {
           
           const response = await fetch('http://localhost:3000/trips', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
                   'Authorization': `Bearer ${token}`,
               },
               body: JSON.stringify(requestBody)
           });

           console.log("Response status:", response.status);
           
           const result = await response.json();
           console.log("Response body:", result);
           
           if (response.ok) {
               console.log(' Trip created successfully:', result);
               alert('Trip created successfully!');
           } else {
               console.error('❌ Failed to create trip:', result);
               alert('Failed to create trip: ' + (result.error || result.message || 'Unknown error'));
           }
       } catch (error) {
           console.error('❌ Network error:', error);
           alert('Network error: ' + error.message);
       }
   };

   return (
       <div className="tripForm">
           <div>
               <p >Create Your Trip to</p>
               <h1 >{city.city_name}</h1>
           </div>

           <div>
               <form onSubmit={handleSubmit}>
                   <div>

                <label class="form-label"> Trip Name: </label>
                <input 
                        type="text" 
                            value={tripName} 
                            onChange={(e) => setTripName(e.target.value)}
                            placeholder="Ex.Stacy's Birthday"
                            style={{
                               
                            }}
                        /> 
                
                <br></br>

                <label class="form-label"> Start Date: </label>
                       <input 
                           type="date" 
                           value={tripDate} 
                           onChange={(e) => setTripDate(e.target.value)}
                       /> 
                   </div>
                   
                   <div>
                       <label>
                           End Date: 
                       </label>
                       <input 
                           type="date" 
                           value={endDate} 
                           onChange={(e) => setEndDate(e.target.value)}
                       /> 
                   </div>

                   <br></br>

                   <button type="submit">
                       Create Trip
                   </button>
               </form>
           </div>
       </div>
   );
}

export default CreateTrip;