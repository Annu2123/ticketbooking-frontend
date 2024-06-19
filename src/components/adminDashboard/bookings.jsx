import axios from 'axios'
import {useEffect,useState} from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
export default function AllBooking(){
  const navigate=useNavigate()
const[bookings,setBookings]=useState([])

useEffect(()=>{
    (async()=>{
      try{
        const response=await axios.get("http://localhost:3001/api/bookings/all",{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
        console.log("listofbooking",response.data)
        setBookings(response.data)
      }catch(err){
        console.log(err)
      }
    })()
},[])

const formateTime=(timedate)=>{
  const dateObj = new Date(timedate)
const hours = String(dateObj.getUTCHours()).padStart(2, '0')
const minutes = String(dateObj.getUTCMinutes()).padStart(2, '0')
const time = `${hours}:${minutes}}`
return time
}
const formateDate=(datetime)=>{
  const dateObj = new Date(datetime)
const year = dateObj.getUTCFullYear()
const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0')
const day = String(dateObj.getUTCDate()).padStart(2, '0')
const date = `${year}-${month}-${day}`
return date
}
const timesSelect = (datetime) => {
  // console.log("datetime",datetime)
  const date = new Date(datetime)
  const localHours = date.toLocaleString('en-US', { hour: 'numeric', hour12: false }).padStart(2, '0')
  const localMinutes = date.toLocaleString('en-US', { minute: 'numeric' }).padStart(2, '0')

  const timeString = `${localHours}:${localMinutes}`
  // const timesArray = [timeString]
  // console.log("Time Array:", timeString)
  return timeString
}
console.log("bookings",bookings)
    return (
        <>
        <div className="container">
  <h2>Booked Tickets</h2>
  <div className="row">
    {bookings?.map(ticket => (
      <div key={ticket._id} className="col-md-4 mb-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{ticket.showtime_id.movie_id.title}</h5>
            <p className="card-text">
              Showtime:{timesSelect(ticket.showtime_id.showtime_date_time)}
            </p>
            <p>seat No:{ticket.seats_booked.map(ele => 
              <li>{ele}</li>
            )}</p>
          </div>
          {/* <div className="card-footer text-center">
            <button className="btn btn-info mr-2" onClick={() => handleEdit(ticket)}>Edit</button>
            <button className="btn btn-danger ml-2" onClick={() => handleDelete(ticket._id)}>Delete</button>
          </div> */}
        </div>
      </div>
    ))}
  </div>
</div>
        </>
    )
}