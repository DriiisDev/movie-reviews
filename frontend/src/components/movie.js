import React, { useState, useEffect } from 'react'
import MovieDataService from '../services/movie'
import { Link, useParams} from 'react-router-dom'

const Movie = (props) => {

  const [movie, setMovie] = useState({
    id:null,
    title: "",
    rated: "",
    reviews: []
  })

  const getMovie = (id) =>{
    MovieDataService.get(id)
    .then(response=>{
      setMovie(response.data)
      console.log(response.data)
    })
    .catch((e)=>{
      console.log(e);
    })
  }
  
  let {id} = useParams();
  
  useEffect(()=>{
    getMovie(id)
  },[id]) //won't call getMovie Multiple times unless id is updated.

  return (
    <div>
      <div className="card-container">
        <div className='card-img'>
          <img src={movie.poster+"/100px250"} alt=""/>
        </div>
        <div className="card-body">
          <h1>{movie.title}</h1>
          <p>{movie.plot}</p>
          {props.user && <Link to={"/movies/"+props.match.params.id+"/review"}>Add Review</Link>
          }
        </div>
      </div>
      <div>
        <h2>Reviews</h2>
        {movie.reviews.map((review, index)=>{
          return(
            <div className="comment">
              <div className="comment-container">
                <h3>{review.name + "reviewed on" + review.date}</h3>
                <p>{review.review}</p>
                {props.users && props.user.id === review.user_id && <div>
                  <Link 
                    to={{pathname: "/movies/" + props.match.params.id+"/review", state:{currentReview:review}}}
                    >Edit</Link>
                    <button>Delete</button>
                  </div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}


export default Movie;