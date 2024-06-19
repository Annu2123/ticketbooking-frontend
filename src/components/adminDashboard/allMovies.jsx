import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function AllMovieLIst() {
  const navigate=useNavigate()
  const [movies, setMovies] = useState([])

  useEffect(() => {
  (async()=>{
    try{
 const response=await axios.get("http://localhost:3001/api/movie/list")
//  console.log(response.data)
      setMovies(response.data)
    }catch(err){
        console.log(err)
    }
  })()
  },[])
 const handleAddShowtime=(id)=>{
    navigate("/addshowtime", {state:id})
 }
  const handleBook=(id)=>{
    // navigate(`/movieBooking/${id}`)
  }
  return (
    <div className="container">
      <h2>Movies List</h2>
      <div className="row">
        {movies?.map(movie => (
          <div key={movie._id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">
                  Categories: {movie.genre}
                </p>
              </div>
              <div className="card-footer text-center">
            <button className="btn btn-primary" onClick={()=>{handleBook(movie._id)}}>delete</button>
          </div>
          <div className="card-footer text-center">
            <button className="btn btn-primary" onClick={()=>{handleAddShowtime(movie)}}>Add Showime</button>
          </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


