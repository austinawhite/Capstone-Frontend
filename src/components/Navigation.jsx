import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom";

function Navigation ({token, setToken}){
    const navigate = useNavigate();

    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
        navigate("/")
        window.location.reload();
    };

    return(
        <nav className="navbar">
        <div className="navItems">

            <Link to="/" className="navLink">
                Home
            </Link>

             <Link to="/destinations" className="navLink">
                 Destinations
            </Link>

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
            
        </nav>
        
    );

}
    

export default Navigation