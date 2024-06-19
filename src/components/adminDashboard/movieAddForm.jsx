import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
export default function MovieForm () {
  const [formData, setFormData] = useState({ title: '', genre: '' })
  const [errors, setErrors] = useState({})
  const [movies,setMovies]=useState([])
const navigate=useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.title) newErrors.title = 'Title is required'
    if (!formData.genre) newErrors.genre = 'Genre is required'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
 const formData1={
  title:formData.title,
    genre:formData.genre
 }
    try {
      const response = await axios.post('http://localhost:3001/api/movie', formData1,{
        headers:{
          Authorization:localStorage.getItem("token")
        }
      })
      console.log('Movie added:', response.data)
      setMovies(response.data)
      setFormData({ title: '', genre: '' })
      setErrors({})
      toast.success("movie added succesfully")
      navigate("/allmovielist")
    } catch (error) {
      console.error('Error adding movie:', error)
    }
  }
  return (
    <div className="container">
      <h2>Add Movie</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <div className="invalid-feedback">{errors.title}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="genre" className="form-label">Genre</label>
          <input
            type="text"
            className={`form-control ${errors.genre ? 'is-invalid' : ''}`}
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
          />
          {errors.genre && <div className="invalid-feedback">{errors.genre}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
    </div>
  )
}
