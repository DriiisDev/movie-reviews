import React, {useState, useEffect} from 'react'
import MovieDataService from "../services/movie"
import { Link } from 'react-router-dom'

const MovieList = () => {
  const [movies, setMovies] = useState([])
  const [searchTitle, setSearchTitle] = useState("")
  const [searchRating, setSearchRating] = useState("")
  const [ratings, setRatings] = useState(["All Ratings"])

  const [currentPage, setCurrentPage] = useState(0)
  const [entriesPerPage, setEntriesPerPage] = useState(0)
  const [currentSearchMode, setCurrentSearchMode] = useState("")

  useEffect(()=>{
    setCurrentPage(0)
  },[currentSearchMode])

  const retrieveMovies = () =>{
    setCurrentSearchMode("")
    MovieDataService.getAll(currentPage)
    .then((response)=>{
      console.log(response.data);
      setMovies(response.data.movies)
      setCurrentPage(response.data.page)
      setEntriesPerPage(response.data.entries_per_page)
    })
    .catch((e)=>{
      console.log(e);
    })
  }
  
  const retrieveRatings = () =>{
    MovieDataService.getRatings()
    .then((response)=>{
      console.log(response.data);
      //start with 'All ratings' if user doesn't specify any ratings
      setRatings(["All Ratings"].concat(response.data))
    })
    .catch((e)=>{
      console.log(e);
    })
  }
  
  useEffect(()=>{
    retrieveNextPage()
  },[currentPage])

  const retrieveNextPage = () =>{
    if (currentSearchMode === "findByTitle") {
      findByTitle()
    } else if (currentSearchMode === "findByRating"){
      findByRating()
    }else{
      retrieveMovies()
    }
  }

  const find = (query, by)=>{
    MovieDataService.filter(query,by,currentPage)
    .then((response)=>{
      console.log(response.data);
      setMovies(response.data.movies)
    })
    .catch((e)=>{
      console.log(e);
    })
  }

  const findByTitle= ()=>{
      setCurrentSearchMode("findByTitle")
      find(searchTitle, "title")
  }

  const findByRating =()=>{
    setCurrentSearchMode("findByRating")
    if (searchRating === "All Ratings") {
      retrieveMovies()
    }else{
      find(searchRating, "rated")
    }
  }

  return (
    <div>
        <form>
          <div>
            <input type='text' placeholder='search by title' value={searchTitle} onChange={(e)=>{
              const searchTitle = e.target.value;
              setSearchTitle(searchTitle);
            }}/>
            <button type='button' onClick={findByTitle}>search</button>
          </div>

          <div>
            <select onChange={(e)=>{
                const searchRating = e.target.value;
                setSearchRating(searchRating);
              }}>{ratings.map((rating)=>{
                return(
                  <option key={rating.toString()} value={rating}>{rating}</option>
                );
              })}
            </select>
            <button type='button' onClick={findByRating}>search</button>
          </div>
        </form>
        <div>
          {movies.map((movie)=>{
            return(
              <div>
              <div className="card" key={movie._id}>
                <div className="card-container">
                  <div className='card-img'>
                    <img src={movie.poster+"/100px180"} alt=""/>
                  </div>
                  <div className="card-body">
                    <h1>{movie.title}</h1>
                    <h2>Rating:{movie.rated}</h2>
                    <p>{movie.plot}</p>
                    <Link to={"/movies/"+movie._id}>View Review</Link>
                  </div>
                </div>
              </div>
              <span>page:{currentPage}</span>
              <button onClick={()=>{setCurrentPage(currentPage + 1)}}>next{entriesPerPage}</button>
              </div>
            );
          })}
        </div>
    </div>
  )
}

export default MovieList;
