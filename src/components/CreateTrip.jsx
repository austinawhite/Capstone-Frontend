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
               setUser(data[0]); // Get the first user from the array
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
           trip_date: tripDate,
           end_date: endDate,
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
       <div style={{
          backgroundColor: "lightblue",
           padding: "30px", 
           margin: "20px",
           width: "100%",
           minHeight: "300px",
           display: "block",
       }}>
           <div style={{
               backgroundColor: "lightblue",
               padding: "10px",
               marginBottom: "20px"
           }}>
               <p style={{fontSize: "18px", color: "black", margin: "0"}}>Create Your Trip to</p>
               <h1 style={{fontSize: "24px", color: "black", margin: "10px 0"}}>{city.city_name || city.name || "Loading..."}</h1>
           </div>

           <div className="tripFrame"style={{
               padding: "20px"
           }}>
               <form onSubmit={handleSubmit} style={{display: "block"}}>
                   <div style={{marginBottom: "15px"}}>

                <label style={{display: "block", fontSize: "16px", marginBottom: "5px"}}>
                            Trip Name: 
                        </label>
                        <input 
                            type="text" 
                            value={tripName} 
                            onChange={(e) => setTripName(e.target.value)}
                            placeholder="Enter a name for your trip"
                            style={{
                                padding: "8px",
                                fontSize: "16px",
                                border: "1px solid black",
                                display: "block",
                                width: "100%",
                                maxWidth: "300px"
                            }}
                        /> 

                       <label style={{display: "block", fontSize: "16px", marginBottom: "5px"}}>
                           Start Date: 
                       </label>
                       <input 
                           type="date" 
                           value={tripDate} 
                           onChange={(e) => setTripDate(e.target.value)}
                           required
                           style={{
                               padding: "8px",
                               fontSize: "16px",
                               border: "1px solid black",
                               display: "block"
                           }}
                       /> 
                   </div>
                   
                   <div style={{marginBottom: "15px"}}>
                       <label style={{display: "block", fontSize: "16px", marginBottom: "5px"}}>
                           End Date: 
                       </label>
                       <input 
                           type="date" 
                           value={endDate} 
                           onChange={(e) => setEndDate(e.target.value)}
                           required
                           style={{
                               padding: "8px",
                               fontSize: "16px",
                               border: "1px solid black",
                               display: "block"
                           }}
                       /> 
                   </div>

                   <button 
                       type="submit" 
                       style={{
                           backgroundColor: "white",
                           color: "blue",
                           padding: "10px 20px",
                           fontSize: "16px",
                           border: "none",
                           cursor: "pointer"
                       }}
                   >
                       Create Trip
                   </button>
               </form>
           </div>
       </div>
   );
}

export default CreateTrip;