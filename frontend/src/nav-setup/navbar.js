import React, {useState} from 'react'
import { Link } from "react-router-dom"

const Navbar = () => {
    const [user, setUser] = useState(null)
    const login = (user = null)=>{
        setUser(user)
    }
    const logout = ()=>{
        setUser(null)
    }
    return (
        <div>
            <div className="nav-container">
                <div className="nav-direction">
                    <div className="nav-logo">
                        Movie Review
                    </div>
                    <div className="nav-links">
                        <ul>
                            <li>
                                <Link to={"/"}>Movies</Link>
                            </li>
                            <li>
                                {user? ( <button onClick={logout}>LogOut</button> ) : (<Link to={"/login"}>Login</Link>)}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar