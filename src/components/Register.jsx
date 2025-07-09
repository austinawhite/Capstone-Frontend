import {useState} from "react";

function Register (){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    async function handleSubmit (event){
        event.preventDefault();

        try{
            const response = await fetch ("http://localhost:3000/users/register", {
                method: "POST", 
                headers: {'Content-type':'application/json'},
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })

            const result = await response.json();
        }catch(error){
            console.log(error)
        };
    };

    return (
        <>
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
                <button className = "button">Submit</button>

            </form>
        }
        </div>
        </>
        
    )
}

export default Register