import { useEffect, useState } from "react";

// Bootstrap
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

// Datepicker
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { isWeekend } from "date-fns";
import da from "date-fns/locale/da";

// Components
import errorMessage from "../ErrorMessage";
import SuccessMessage from "../SuccessMessage";
import tryCatch from "../TryCatch";

registerLocale("da", da);
setDefaultLocale("da");

// https://date-fns.org/v2.16.1/docs/eachDayOfInterval ---> til exclude af dage i databasen

export default function Booking({ fetchBookings, fetchData }) {
  const [datesArray, setDatesArray] = useState([]);

  const [startDate, setStartDate] = useState(null);

  useEffect(() => {
    fetchData(setDatesArray);
  }, [fetchData]);

  useEffect(() => {
    // finding the first available date for default startDate
    function nextAvailableDate(date) {
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

      // chech if date is already booked
      const isBooked = datesArray.some((date) => {
        const BookedDate = new Date(date);
        return availableDay.toDateString() === BookedDate.toDateString();
      });

      if (isBooked) {
        return nextAvailableDate(availableDay);
      }

      console.log("next available Day ", availableDay);

      return availableDay;
    }

    setStartDate(nextAvailableDate(new Date()));
  }, [datesArray]);
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


  const excludeWeekends = (date) => {
    // Returns false if the day is Saturday or Sunday - from date-fns library
    return !isWeekend(date);
  };

  const excludePastDatesAndToday = (date) => {
    const today = new Date();

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
      const response = await tryCatch("booking", "POST", updatedFormData);

      const responseData = await response.json();
      console.log("Server response:", responseData);

      if (responseData?.message?.includes("already exists")) {
        errorMessage("Dato'en var desværre optaget, venligst vælg en ny!");
        fetchData(setDatesArray); // Fetch updated booking dates after unsuccessful booking
        return;
      } else if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        SuccessMessage("Din booking er gennemført!");
        event.target.reset(); // Reset the form on successful booking
        fetchBookings(); // Fetch updated booking dates after successful booking
        fetchData(setDatesArray);
      }
    } catch (error) {
      console.error("Error:", error);
      errorMessage("Din booking blev ikke gennemført, prøv igen!");
    }

    console.log("Form Data", updatedFormData);

    
  };

  return (
    <div>
      <div className="text-center mb-5 p-4">
        <h3>Booking af konsulentydelse</h3>
        <p>
          Ved ændring af booking, kontakt Peter gennem{" "}
          <a href="/contact" style={{ color: "black" }}>
            kontaktformularen
          </a>
        </p>
      </div>
      <Form onSubmit={handleSubmit} className="mb-5 mt-5">
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
              
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
              }}
              
              locale="da"
              dateFormat="dd-MM-yyyy"
              name="date"
              inline

              filterDate={filterDate}
              excludeDates={datesArray}
            />
          </Col>
        </Form.Group>

        <Form.Group className="text-center mb-5 p-4" controlId="formBasicButton">
          <Button className="btn-lg" variant="primary" type="submit" value="book">
            Book
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}
