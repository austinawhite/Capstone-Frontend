import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom";

function Navigation ({token, setToken}){
    const navigate = useNavigate();

    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
        navigate("/")
        
    };

    return(
        <nav className="navbar">
        <div className="navItems">

            <div className="navLeft">
            <Link to="/" className="navLink">
                Home
            </Link>

            {/* - commenting out this link, can add back if additional cities are added to the database 
             <Link to="/destinations" className="navLink">
                 Destinations
            </Link> */}
            </div>

        <div className="navRight">
        {token ? (

            <>
                   
            <Link className="navLink" to="/account">Account</Link>

            <button onClick={logout} className="button">Logout</button>
            
            </>

            ) : (
                
            <>

            <Link to="/login" className="navLink"> Login </Link>
                    
            <Link to="/register" className="navLink"> Register </Link> 
            
            </>
            )}        
            
            </div>
            </div>
        
        </nav>
        
    );

}
    

export default Navigation