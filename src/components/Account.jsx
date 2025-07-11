// My account page for the user - This will display their upcoming and previous trips, as well as general information about their account such as their username. 

// TODO: Email address not appearing on the page

import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function Account ({token}) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    async function getUser() {
      try {
        const result = await fetch(`http://localhost:3000/users/user`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const data = await result.json();
        setUser(data);
      } catch (error) {
        console.error("Error loading user details: ", error);
      }
    }
    getUser();
  }, []);

   return(
    <>
    <div className="account-container">
     {user ? (
    <>
      <h1>My Account</h1>
      <h3>Email Address: {user.email} </h3>

      <h1> My Upcoming Trips </h1>

      <h1> My Previous Trips </h1>
      
    </>
  ) : (
    <p> Sorry, we are having issues loading your account. </p>
  )}
</div>
</>
)

}