import React, {useState, useEffect} from 'react'
import MovieDataService from "../services/movie"

const MovieList = (props) => {
  const [movies, setMovies] = useState([])
  const [searchTitle, setSearchTitle] = useState("")
  const [searchRating, setSearchRating] = useState("")
  const [ratings, setRatings] = useState(["All Ratings"])

  useEffect(()=>{
    retrieveMovies()
    retrieveRatings()
    // onChangeSearchTitle()
    onChangeSearchRating()
  },[])

  const retrieveMovies = () =>{
    MovieDataService.getAll()
    .then((response)=>{
      console.log(response.data);
      setMovies(response.data.movies)
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

  // const onChangeSearchTitle = (e) =>{
  //   const searchTitle = e.target.value;
  //   setSearchTitle(searchTitle);
  // }

  const onChangeSearchRating = (e) =>{
    setSearchRating(searchRating);
  }

  const find = (query, by)=>{
    MovieDataService.find(query, by)
    .then((response)=>{
      console.log(response.data);
      setMovies(response.data.movies)
    })
    .catch((e)=>{
      console.log(e);
    })
  }

  const findByTitle= ()=>{
    find(searchTitle, "title")
  }

  const findByRating =()=>{
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
            <input type='text' placeholder='search by title' value={searchRating} onChange={onChangeSearchRating}/>
            <button type='button' onClick={findByRating}>search</button>
          </div>
        </form>
    </div>
  )
}

export default MovieList;
