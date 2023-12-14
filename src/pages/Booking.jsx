// Redux
import { useSelector } from "react-redux";

// React
import { useState, useEffect } from "react";

// Components
import Bookings from "../components/Bookings/DisplayBookings";
import SubmitBookingComponent from "../components/Bookings/SubmitBookings";
import tryCatch from "../components/TryCatch";

export default function Booking() {
  const loggedIn = useSelector((state) => state.loginState.loggedIn);

  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const response = await tryCatch("booking");

    const data = await response.json();
    const sortedData = data.sort((b, a) => new Date(b.appointmentInfo.date) - new Date(a.appointmentInfo.date));
    setBookings(sortedData);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchData = async (setDatesArray) => {
    try {
      const response = await tryCatch("booking");
      if (!response.ok) {
        throw new Error("An error occurred during fetch");
      }
      const result = await response.json();

      // Assuming result is an array of booking objects with 'date' property
      const dates = result.map((booking) => booking.appointmentInfo.date);
      const dateObjectsArray = dates.map((dateString) => new Date(dateString));

      setDatesArray(dateObjectsArray);
    } catch (error) {
      console.error("Error fetching dates:", error);
    }
  };

  return (
    <>
      {loggedIn ? (
        <div className="row">
          <div className="col-md-12">
            <SubmitBookingComponent fetchBookings={fetchBookings} fetchData={fetchData} />
          </div>

          <div className="col-md-12">
            <Bookings bookings={bookings} fetchBookings={fetchBookings} />
          </div>
        </div>
      ) : (
        <div>
          <div>
            <SubmitBookingComponent fetchBookings={bookings} fetchData={fetchData} />
          </div>
        </div>
      )}
    </>
  );
}
