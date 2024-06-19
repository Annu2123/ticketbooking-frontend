import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
export default function BookingForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  // const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState('')
  const [showtimes, setShowtimes] = useState([])
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTimeId, setSelectedTimeId] = useState('')
  const [showtimeDetails, setShowtimeDetails] = useState(null)
  const [oldBooking, setOldBooking] = useState([])
  const [selectedSeats, setSelectedSeats] = useState([])
  // console.log("selectedDate",selectedDate)

  // console.log("showtime",showtimes)
  const handleMovieChange = async (e) => {
    const movieId = e.target.value
    setSelectedMovie(movieId)
  }
  useEffect(() => {
    if (selectedDate) {
      (async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/showtime/${id}?date=${selectedDate}`)
          console.log("showtime", response.data)
          setShowtimes(response.data)
        } catch (err) {
          setShowtimes([])
          console.log(err)
          toast.error(err.response.data.error)
        }
      })()
    }
  }, [selectedDate])

  useEffect(() => {
    if (showtimes.length > 0, selectedTimeId) {
      const result = showtimes.find(show => show._id === selectedTimeId)
      setShowtimeDetails(result)
    }
  }, [showtimes, selectedDate, selectedTimeId])
  const handleTimeChange = (id) => {
    //  console.log("showtimeId",id)
    setSelectedTimeId(id)
    // console.log("selectedtime",selectedTimeId)
    renderSeats()
  }
  useEffect(() => {
    (async () => {
      try {
        console.log("olbooking")
        const bookingresponse = await axios.get(`http://localhost:3001/api/booking/find/${selectedTimeId}`, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        console.log("bookingresponse", bookingresponse.data)
        setOldBooking(bookingresponse.data)
      } catch (err) {
        console.log(err)
      }
    })()

  }, [selectedTimeId])
  // Function to book seats
  const handleBookSeats = async () => {
    // console.log('Booking seats:') 
    const formData = {
      showtime_id: selectedTimeId,
      seats_booked: selectedSeats
    }
    //  console.log("formdata",formData)
    try {
      const response = await axios.post("http://localhost:3001/api/booking/create", formData, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      // console.log("booking response",response.data)
      toast.success("booking succesfull")
      navigate("/mybookings")
    } catch (err) {
      console.log(err)
    }
  }
  // Render seats based on showtime capacity
  useEffect(()=>{
    renderSeats()
  },[selectedTimeId])
  const renderSeats = () => {
    if (!showtimeDetails) return null

    const { total_seats } = showtimeDetails
    const bookedSeatNumbers = oldBooking.flatMap(booking => booking.seats_booked);

    const seats = []

    for (let i = 1; i <= total_seats; i++) {
      const isBooked = bookedSeatNumbers.includes(i)
      const isSelected = selectedSeats.includes(i)

      let seatClass = 'btn btn-outline-dark seat'
      if (isSelected) seatClass += ' btn-success'
      if (isBooked) seatClass += ' disabled'

      seats.push(
        <div key={i} className=" col-md-1 mb-3">
          <button
            className={seatClass}
            onClick={() => {
              if (!isBooked) {
                setSelectedSeats(prevSeats => {
                  if (prevSeats.includes(i)) {
                    return prevSeats.filter(seat => seat !== i);
                  } else {
                    return [...prevSeats, i];
                  }
                })
              }
            }}
            disabled={isBooked}
          >
            {i}
          </button>
        </div>
      )
    }
    return seats
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

  // console.log("shottimedetails", showtimeDetails)
  // console.log("oldBoking", oldBooking)
  return (
    <div className='container'>
      <h2>Booking Form</h2>

      {/* <div className="mb-3">
          <label htmlFor="movieSelect" className="form-label">Select Movie</label>
          <select id="movieSelect" className="form-select" onChange={handleMovieChange} value={selectedMovie}>
            <option value="">Select a movie</option>
            {movies.map(movie => (
              <option key={movie.id} value={movie.id}>{movie.title}</option>
            ))}
          </select>
        </div> */}
      <div className="mb-3">
        <label htmlFor="dateSelect" className="form-label">Select Date</label>
        <input type="date" id="dateSelect" className="form-control" value={selectedDate} onChange={(e) => { setSelectedDate(e.target.value) }} />
      </div>
      <div className="mb-3">
        <label htmlFor="timeSelect" className="form-label" style={{ marginBottom: '6px' }}>Select showtime</label>
        <div className="container">
          <div className="row">
            {showtimes.map(showtime => (
              <div className="col-12 col-md-4 mb-3" key={showtime._id}>
                <button className="btn btn-primary w-100" style={{ width: '8rem' }} value={showtime._id} onClick={() => { handleTimeChange(showtime._id) }}>
                  {timesSelect(showtime.showtime_date_time)}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="">
        <label className="form-label">Select Seats</label>
        <div className="container">
          <div className="row  no-gutters">
            {renderSeats()}
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-primary" onClick={handleBookSeats}>Book</button>
    </div>
  )
}
