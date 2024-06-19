import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
export default function AppBar(){
  const navigate=useNavigate()
  const handleLogout=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('user')
        navigate('/')
  }
  return  (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <a className="navbar-brand" >MovieBooking</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ml-auto">
        {localStorage.getItem("token") && localStorage.getItem("user") === "customer" ? (
          <>
            {/* <li className="nav-item active">
              <Link className="nav-link" to="/">Home <span className="sr-only"></span></Link>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link" to="/movieList">Movies</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/mybookings">My Bookings</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={handleLogout}>Logout</Link>
            </li>
          </>
        ) : localStorage.getItem("token") && localStorage.getItem("user") === "admin" ? (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/movieList">Movies</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/allBookings">All Bookings</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={handleLogout}>Logout</Link>
            </li>
          </>
        ) : (
          <li className="nav-item">
            <Link className="nav-link" to="/login">Already have an account? Login</Link>
          </li>
        )}
      </ul>
    </div>
  </nav>
  
  
  )
}