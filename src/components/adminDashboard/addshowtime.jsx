import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'
export default function ShowtimeForm() {
  const location =useLocation()
  const navigate=useNavigate()
  console.log("locationData",location.state)
    const {id}=useParams()
    const [servererror,setServererror]=useState([])
  const [formData, setFormData] = useState({
    movie_id:location.state.title ||  '',
    showtime_date_time: '',
    available_seats: '',
    total_seats: ''
  });
  const [errors, setErrors] = useState({})
  const [movies, setMovies] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.movie_id) newErrors.movie_id = 'Movie is required'
    if (!formData.showtime_date_time) newErrors.showtime_date_time = 'Showtime date and time are required'
    if (!formData.available_seats || isNaN(formData.available_seats)) newErrors.available_seats = 'Available seats must be a number'
    if (!formData.total_seats || isNaN(formData.total_seats)) newErrors.total_seats = 'Total seats must be a number'
    return newErrors
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    const formData1={
      movie_id:location.state._id ,
    showtime_date_time:formData.showtime_date_time,
    available_seats:formData. available_seats,
    total_seats:formData. total_seats
    }
    console.log("formdat",formData1)
    try {
      const response = await axios.post('http://localhost:3001/api/showtime', formData1)
      console.log('Showtime added:', response.data)
      setFormData({
        movie_id: '',
        showtime_date_time: '',
        available_seats: '',
        total_seats: ''
      })
      setErrors({})
      console.log("showtimeaddes",response.data)
      toast.success("showtime added succesFully")
      navigate("/allmovielist")
    } catch (error) {
      console.error('Error adding showtime:', error);
      toast.error("error in adding showtime")
      setServererror(error.response.data.errors)
    }
  }

  return (
    <div className="container">
      <h2>Add Showtime</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="movieSelect" className="form-label">Select Movie</label>
          <input
            id="movieSelect"
            name="movie_id"
            className={`form-select ${errors.movie_id ? 'is-invalid' : ''}`}
            value={formData.movie_id}
            onChange={handleChange}
          />
          {errors.movie_id && <div className="invalid-feedback">{errors.movie_id}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="showtime_date_time" className="form-label">Showtime Date and Time</label>
          <input
            type="datetime-local"
            className={`form-control ${errors.showtime_date_time ? 'is-invalid' : ''}`}
            id="showtime_date_time"
            name="showtime_date_time"
            value={formData.showtime_date_time}
            onChange={handleChange}
          />
          {errors.showtime_date_time && <div className="invalid-feedback">{errors.showtime_date_time}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="available_seats" className="form-label">Available Seats</label>
          <input
            type="number"
            className={`form-control ${errors.available_seats ? 'is-invalid' : ''}`}
            id="available_seats"
            name="available_seats"
            value={formData.available_seats}
            onChange={handleChange}
          />
          {errors.available_seats && <div className="invalid-feedback">{errors.available_seats}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="total_seats" className="form-label">Total Seats</label>
          <input
            type="number"
            className={`form-control ${errors.total_seats ? 'is-invalid' : ''}`}
            id="total_seats"
            name="total_seats"
            value={formData.total_seats}
            onChange={handleChange}
          />
          {errors.total_seats && <div className="invalid-feedback">{errors.total_seats}</div>}
        </div>
        <div>
          {servererror.length > 0 && servererror.map((ele)=>{
            return <li>{ele.msg}</li>
          })}
        </div>
        <button type="submit" className="btn btn-primary">Add Showtime</button>
      </form>
    </div>
  )
}
