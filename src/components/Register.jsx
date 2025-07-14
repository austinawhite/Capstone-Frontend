import {useState} from "react";
import { useNavigate } from "react-router-dom";
import register from '../assets/register.png'

function Register (){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    async function handleSubmit (event){
        event.preventDefault();

        try{
            const response = await fetch ("http://localhost:3000/users/register", {
                method: "POST", 
                headers: {'Content-type':'application/json'},
                body: JSON.stringify({
                    //come back to this section to check
                    email: email,
                    password: password
                })
            })

           const result = await response.json();
      if (response.ok) {
        navigate("/login");
      } else {
        setError("Failed to register. " + (result.error || ""));
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }

    return (
        <div className="registration">

        <div className="registerLeft">
            <img src={register} />

        </div>

        <div className="registerRight">
        <h2 className="registerTitle">Please Sign Up Here!</h2>
        <br/>
        <div className="registerForm">
        {
            <form onSubmit={handleSubmit}>
                <label className="userTitle">
                    Email: 
                        <input
                            name ="email"
                            required
                            onChange = {(e)=>setEmail(e.target.value)}
                            value = {email}
                        />
                </label>
                <br/><br/>
                <label className="passwordTitle">
                    Password: 
                        <input
                            name = "password"
                            required
                            onChange = {(e)=>setPassword(e.target.value)}
                            value={password}
                        />
                </label>
                <br/><br/>
                <button className = "button" type="submit">Submit</button>

            </form>
          
        }
          </div>
        </div>
        </div>
        
    )
}

export default Register