import React, {useState} from 'react';
// react router
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";


import AddReview from "../components/add-review"
import MovieList from "../components/movie-list"
import Movie from "../components/movie"
import Login from "../components/login"

const Nav = () => {

    const [user, setUser] = useState(null)

    const login = (user = null)=>{
        setUser(user)
    }
    const logout = ()=>{
        setUser(null)
    }
    return (
        <Router>
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
            <Routes>
                <Route exact path={'/'} element={<MovieList />}/>
                <Route path='/movies' element={<MovieList/>}/>
                <Route path='/movies/:id/review' element={<AddReview user={user}/>}/>
                <Route path='/movies/:id/' element={<Movie user={user}/>} />
                <Route path='/login' element={<Login login={login}/>}/>
            </Routes>
        </Router>
    );
}

export default Nav