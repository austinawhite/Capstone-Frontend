import {Link} from "react-router-dom"

function Navigation ({token, setToken, setUserId, userId}){

    const logout = () => {
        setToken(null);
        setUserId(null)
    };

    return(
        <>
        {token ? 
                    
                    <div className="navItems">

                    <Link to="/" className="navLink">
                    Home
                    </Link>

                    {/* <Link to={`/users/${(userId)}`} className="navLink">
                    My Account
                    </Link> */}
                    <Link to="/destinations" className="navLink">
                        Destinations
                    </Link>

                    <Link to="/reviews" className="navLink">
                    Reviews
                    </Link>

                    <button onClick={logout} className="button">Logout</button>
                    </div>
                 : 
                    <div className="navItems">
                    <Link to="/" className="navLink">Home</Link>

                    <Link to="/destinations" className="navLink">
                    Destinations
                    </Link>

                    {/* <Link to="/reviews" className="navLink">Reviews</Link> */}

                    <Link to="/login" className="navLink"> Login </Link>
                    
                    <Link to="/register" className="navLink"> Register </Link> 

                    
                    </div>
                }
            </>
        
    );

};
    

export default Navigation