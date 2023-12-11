// Redux
import { useSelector } from "react-redux";

// React
import { useState, useEffect } from "react";

// Components
import Bookings from "../components/Bookings/DisplayBookings";
import SubmitBookingComponent from "../components/Bookings/SubmitBookings";
// import tryCatch from "../components/TryCatch";

export default function Booking() {
  const loggedIn = useSelector((state) => state.loginState.loggedIn);
  console.log("Logged in på booking?:", loggedIn);

  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const response = await fetch("http://localhost:3333/booking");
    const data = await response.json();
    setBookings(data);
  };
  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <>
      {loggedIn ? (
        <div className="row">
          <div className="col-md-6">
            <SubmitBookingComponent fetchBookings={fetchBookings}/>
          </div>

          <div className="col-md-6">
            <Bookings bookings={bookings}/>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <SubmitBookingComponent fetchBookings={bookings}/>
          </div>
        </div>
      )}
    </>
  );
}
