export default function AdminHome(){
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <a className="navbar-brand" href="#">MovieBooking</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  <div className="d-flex" id="navbarNav">
   <ul className="navbar-nav ml-auto">
            <>
              <li className="nav-item active">
                <a className="nav-link" href="#">AddMovie <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/movieList">Movies</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/mybookings">All Bookings</a>
              </li>
              
            </>
        
            {/* <li className="nav-item">
              <span className="nav-link">Already have an account? <a href="/login" className="text-light">Login</a></span>
            </li>
             */}
      </ul>
      
    </div>
  </nav>
        </>
    )
}