import React, { useState } from 'react';
import './Login.css'; // Optional: for custom styling
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'
export default function  Login () {
    const navigate=useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({})

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
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.password) newErrors.password = 'Password is required'
    return newErrors
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
    } else {
      console.log('Form submitted:', formData)
      try{
        const response=await axios.post("http://localhost:3001/api/user/login",formData)
        const token=response.data.token
        localStorage.setItem("token",token)
        const userRole=response.data.user.role
        localStorage.setItem("user",userRole)
        if(response.data.user.role === "admin"){
            navigate("/adminHome")
        }else{
            navigate("/movieList")
        }
        toast.success("login success")
      }catch(err){
        console.log(err)
        toast.error(err.response.data.error)
      }
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h2>Login</h2>
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>
        <div className="col-md-6 d-flex align-items-center">
          <img src="login-image.jpg" alt="Login" className="img-fluid" />
        </div>
      </div>
    </div>
  )
}

