import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import da from "date-fns/locale/da";
import { isWeekend } from "date-fns";
import { useSelector } from "react-redux";
import FetchBookings from "../components/FetchBookings";
import errorMessage from "../components/ErrorMessage";
import SuccessMessage from "../components/SuccessMessage";

registerLocale("da", da);
setDefaultLocale("da");

// https://date-fns.org/v2.16.1/docs/eachDayOfInterval ---> til exclude af dage i databasen

export default function Booking() {
  const loggedIn = useSelector((state) => state.loginState.loggedIn);
  console.log("login boolean:", loggedIn);

  const [datesArray, setDatesArray] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3333/booking");
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
  console.log(datesArray);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const handlePhoneNumberChange = (event) => {
    const value = event.target.value;
    setPhoneNumber(value);

    // Validate phone number length (example: minLength = 8)
    const minLength = 8;
    if (value.length < minLength) {
      setPhoneNumberError("Phone number should be at least 8 digits.");
    } else {
      setPhoneNumberError(""); // Clear the error message if the input is valid
      console.log(phoneNumber);
    }
  };

  const parseDateString = (dateString) => {
    const parsedDate = new Date(dateString);

    if (isNaN(parsedDate.getTime())) {
      console.error("Invalid date:", dateString);
      return null; // Return null or handle the invalid date case accordingly
    }
    // Convert Date object to ISO date string
    const isoDateString = parsedDate.toISOString();
    // console.log("ISO Date: " + isoDateString);

    return isoDateString;
  };

  const nextAvailableDate = (date) => {
    let today = new Date(date);

    let availableDay = new Date(today);
    availableDay.setDate(today.getDate() + 1);

    // Check if it's a weekend (Saturday or Sunday)
    if (isWeekend(availableDay)) {
      if (availableDay.getDay() === 0) {
        // Sunday
        // Move to the next day (Monday)
        availableDay.setDate(availableDay.getDate() + 1);
      } else if (availableDay.getDay() === 6) {
        // Saturday
        // Move to the following Monday
        availableDay.setDate(availableDay.getDate() + 2);
      }
    }

    return availableDay;
  };

  // to test it takes the next right date use
  // this date format in new Date("12-09-2023") --> mm-dd-yyyy;
  const [startDate, setStartDate] = useState(() => nextAvailableDate(new Date()));

  // // updating the shown date to the next day
  // // when 'inline' in datePickerform is off
  //   const getNextDay = () => {
  //     const today = new Date();
  //     const nextDay = new Date(today);
  //     nextDay.setDate(today.getDate() + 1);
  //     return nextDay;
  //   };

  const excludeWeekends = (date) => {
    // Returns false if the day is Saturday or Sunday - from date-fns library
    return !isWeekend(date);
  };

  const excludePastDatesAndToday = (date) => {
    const today = new Date();
    // console.log(date);
    // console.log(today);
    return date >= today;
  };

  const filterDate = (date) => {
    return excludeWeekends(date) && excludePastDatesAndToday(date);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if phone number is valid before proceeding
    if (phoneNumberError) {
      console.error("Please correct the phone number."); // Log the error message
      return; // Prevent form submission if there's an error
    }

    console.log("startdate", startDate);

    const isoDate = parseDateString(startDate);

    // Get other form data
    const formData = new FormData(event.target);
    const formEntries = Object.fromEntries(formData.entries());

    // Convert phoneNumber to a number
    const phoneNumber = Number(formData.get("phoneNumber"));

    // Add ISO date strings to form data with the same key names
    const updatedFormData = {
      ...formEntries,
      phoneNumber,
      date: isoDate
      // lastDay: isoLastDay,
    };

    try {
      // Send the form data to your backend endpoint using fetch
      const response = await fetch("http://localhost:3333/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedFormData)
      });

      const responseData = await response.json();
      console.log("Server response:", responseData);

      if (responseData?.message?.includes("already exists")) {
        errorMessage("Dato'en var desværre optaget, venligst vælg en ny!");
        fetchData(); // Fetch updated booking dates after unsuccessful booking
        return;
      } else if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        SuccessMessage("Din booking er gennemført!");
        event.target.reset(); // Reset the form on successful booking
        fetchData(); // Fetch updated booking dates after successful booking
        // if (loggedIn) {
        //   FetchBookings();
        // }
      }
    } catch (error) {
      console.error("Error:", error);
      errorMessage("Din booking blev ikke gennemført, prøv igen!");
    }

    console.log("Form Data", updatedFormData);

    // console.log("Form Data", updatedFormData);
  };

  const BookingForm = (
    <div>
      <div className="text-center mb-5">
        <h3>Booking af konsulentydelse</h3>
        <p>
          Ved ændring af booking, kontakt Peter gennem{" "}
          <a href="/contact" style={{ color: "black" }}>
            kontaktformularen
          </a>
        </p>
      </div>
      <Form.Group as={Row} className="mb-3 justify-content-center">
        <Form.Label column sm={2}>
          Fornavn:
        </Form.Label>
        <Col sm={4}>
          <Form.Control type="text" name="firstName" placeholder="Fornavn" required />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3 justify-content-center">
        <Form.Label column sm={2}>
          Efternavn:
        </Form.Label>
        <Col sm={4}>
          <Form.Control type="text" name="lastName" placeholder="Efternavn" required />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3 justify-content-center">
        <Form.Label column sm={2}>
          Email
        </Form.Label>
        <Col sm={4}>
          <Form.Control type="email" name="email" placeholder="Din E-mail" required />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3 justify-content-center">
        <Form.Label column sm={2}>
          Tlf. Nummer
        </Form.Label>
        <Col sm={4}>
          <Form.Control type="number" name="phoneNumber" placeholder="Dit tlf. nummer" onChange={handlePhoneNumberChange} aria-describedby="phoneNumberError" required />
          {phoneNumberError && (
            <div id="phoneNumberError" className="form-text text-danger">
              {phoneNumberError}
            </div>
          )}
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3 justify-content-center">
        <Form.Label column sm={2}>
          Vælg ydelse:
        </Form.Label>
        <Col sm={4}>
          <Form.Select aria-label="Default select example" name="service" defaultValue="Vælg konsulent ydelse" required>
            <option disabled>Vælg konsulent ydelse</option>
            <option value="Proceskonsultation">Proceskonsultation</option>
            <option value="Coaching af enkeltpersoner eller grupper">Coaching af enkeltpersoner eller grupper</option>
            <option value="Kreativ facilitering">Kreativ facilitering</option>
            <option value="Teamudvikling">Teamudvikling</option>
            <option value="Facilitering af ledernetværk og træning">Facilitering af ledernetværk og træning</option>
            <option value="4R Ledelsesudvikling">4R Ledelsesudvikling</option>
            <option value="Interne skræddersyede uddannelses- og træningsforløb">Interne skræddersyede uddannelses- og træningsforløb</option>
          </Form.Select>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3 justify-content-center" controlId="exampleFormControlTextarea1">
        <Form.Label column sm={2}>
          Besked (valgfrit)
        </Form.Label>
        <Col sm={4}>
          <Form.Control as="textarea" className="bg-light" name="message" placeholder="Kort uddybning af grunden til du booker.." rows={4} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3 justify-content-center">
        <Form.Label column sm={2}>
          Vælg Dato:
        </Form.Label>
        <Col sm={4}>
          <DatePicker
            todayButton="I dag"
            // showIcon
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
            }}
            // withPortal
            locale="da"
            dateFormat="dd-MM-yyyy"
            name="date"
            inline
            // // when inline is off use placeHolderText
            // placeholderText={` ${getNextDay().toLocaleDateString("da")}`}
            filterDate={filterDate}
            excludeDates={datesArray}
          />
        </Col>
      </Form.Group>

      <Form.Group className="text-center mb-5" controlId="formBasicButton">
        <Button variant="primary" type="submit" value="book">
          Book
        </Button>
      </Form.Group>
    </div>
  );

  return (
    <>
      {loggedIn ? (
        <div className="row">
          <div className="col-md-6">
            <Form onSubmit={handleSubmit} className="mb-5 mt-5">
              {BookingForm}
            </Form>
          </div>

          <div className="col-md-6">
            <FetchBookings />
          </div>
        </div>
      ) : (
        <div>
          <div>
            <Form onSubmit={handleSubmit} className="mb-5 mt-5">
              {BookingForm}
            </Form>
          </div>
        </div>
      )}
    </>
  );
}
