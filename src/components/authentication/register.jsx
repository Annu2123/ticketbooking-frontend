import React, { useState } from 'react';
import './Register.css'; // Optional: for custom styling
import images from "../images/images.png"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'
export default function Register() {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
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
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.password) newErrors.password = 'Password is required'
    return newErrors;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
     try{
      const registerFormData={
        userName:formData.name,
        email:formData.email,
        password:formData.password
      }
      const response=await axios.post("http://localhost:3001/api/user/register",registerFormData)
      console.log("registerresponse",response.data)
      const loginFormData={
        email:formData.email,
        password:formData.password
      }
      const responseLogin=await axios.post("http://localhost:3001/api/user/login",loginFormData)
      console.log("loginresponse",responseLogin.data)
      const token=responseLogin.data.token
      localStorage.setItem("token",token)
      const userRole=responseLogin.data.user.role
      localStorage.setItem("user",userRole)
      if(responseLogin.data.user.role === "admin"){
        navigate("/adminHome")
    }else{
        navigate("/movieList")
    }
      toast.success("register success")
     }catch(err){
      console.log(err)
     }
      console.log('Form submitted:', formData)
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h2>Register</h2>
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>
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
            <button type="submit" className="btn btn-primary">Register</button>
          </form>
        </div>
        <div className="col-md-6 d-flex align-items-center">
          <img src={images}alt="Register" className="img-fluid" />
        </div>
      </div>
    </div>
  )
}


