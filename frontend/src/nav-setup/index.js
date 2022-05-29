import React from 'react';
// react router
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Navbar from './navbar';

import AddReview from "../components/add-review"
import MovieList from "../components/movie-list"
import Movie from "../components/movie"
import Login from "../components/login"

const Nav = () => {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route exact path={["/", "/movies"]}>
                    <MovieList></MovieList>
                </Route>
                <Route path='/movies/:id/review' render={
                    function (props) {
                        return(
                            <AddReview {...props} login={user}/>
                        );
                    }
                }/>
                <Route path='/movies/:id/' render={
                    function (props) {
                        return(
                            <Movie {...props} login={user}/>
                        );
                    }
                }/>
                <Route path='/login' render={
                    function (props) {
                        return(
                            <Login {...props} login={login}/>
                        );
                    }
                }/>
            </Routes>
        </Router>
    )
}

export default Nav