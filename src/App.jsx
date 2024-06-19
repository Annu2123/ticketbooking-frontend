import { useState } from 'react'
import { BrowserRouter,Link,Routes,Route } from 'react-router-dom'
import AppBar from './components/pages/AppBar'
import Register from './components/authentication/register'
import Login from './components/authentication/login'
import JobPosting from './components/recruiter/jobPosting'
import RecruiterHome from './components/recruiter/home'
import { useParams } from 'react-router-dom'
import MoviesList from './components/movies/movie'
import BookingForm from './components/booking/movieBooking'
import MyBooking from './components/booking/mybooking'
import ShowtimeForm from './components/adminDashboard/addshowtime'
import AdminHome from './components/adminDashboard/adminHome'
import EditBooking from './components/booking/editBooking'
import AllBooking from './components/adminDashboard/bookings'

function App() {
  
  return (
    <BrowserRouter>
     <AppBar/>
     <Routes>
      <Route path='/' element={!localStorage.getItem("token")  && <Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/movieList' element={<MoviesList/>}/>
      <Route path='/movieBooking/:id' element={<BookingForm/>}/>
      <Route path='/mybookings' element={<MyBooking/>}/>
      <Route path='/showtime/:id' element={<ShowtimeForm/>}/>
      <Route path='/editBooking' element={<EditBooking/>}/>
      <Route path='/allbookings' element={<AllBooking/>}/>
      {/* <Route path='/adminHome' element={<AdminHome/>}/> */}
     </Routes>
    </BrowserRouter>
  )
}

export default App
