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
import HTTPErrorHandling from "../HTTPErrorHandling";

registerLocale("da", da);
setDefaultLocale("da");

export default function SubmitBookings({ fetchBookings, fetchData }) {
  const [datesArray, setDatesArray] = useState([]);

  const [startDate, setStartDate] = useState(null);

  useEffect(() => {
    fetchData(setDatesArray);
  }, [fetchData]);

  useEffect(() => {
    // Finding the first available date for default startDate
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

      // Check if date is already booked
      const isBooked = datesArray.some((date) => {
        const BookedDate = new Date(date);
        return availableDay.toDateString() === BookedDate.toDateString();
      });

      if (isBooked) {
        return nextAvailableDate(availableDay);
      }

      return availableDay;
    }

    setStartDate(nextAvailableDate(new Date()));
  }, [datesArray]);

  const [phoneNumberError, setPhoneNumberError] = useState("");

  const handlePhoneNumberChange = (event) => {
    const value = event.target.value;

    // Validate phone number length (example: minLength = 8)
    const length = 8;
    if (value.length != length) {
      setPhoneNumberError("Telefonnummeret skal være 8 cifre.");
    } else {
      setPhoneNumberError(""); // Clear the error message if the input is valid
    }
  };

  const parseDateString = (dateString) => {
    const parsedDate = new Date(dateString);

    if (isNaN(parsedDate.getTime())) {
      console.error("Invalid date:", dateString);
      // Return null or handle the invalid date case accordingly
      return null;
    }
    // Convert Date object to ISO date string
    const isoDateString = parsedDate.toISOString();

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
      // Log the error message
      console.error("Please correct the phone number.");
      // Prevent form submission if there's an error
      return;
    }

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
      date: isoDate,
    };

    try {
      // Send the form data to your backend endpoint using fetch
      const response = await HTTPErrorHandling("booking", "POST", updatedFormData);

      const responseData = await response.json();

      if (responseData?.message?.includes("already exists")) {
        errorMessage("Dato'en var desværre optaget, venligst vælg en ny!");
        // Fetch updated booking dates after unsuccessful booking
        fetchData(setDatesArray);
        return;
      } else if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        SuccessMessage("Din booking er gennemført!");
        // Reset the form on successful booking
        event.target.reset();
        // Fetch updated booking dates after successful booking
        fetchBookings();
        fetchData(setDatesArray);
      }
    } catch (error) {
      console.error("Error:", error);
      errorMessage("Din booking blev ikke gennemført, prøv igen!");
    }
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
