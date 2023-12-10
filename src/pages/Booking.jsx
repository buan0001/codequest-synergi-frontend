import { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
// import FormSelect from "react-bootstrap/FormSelect";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import da from "date-fns/locale/da";
import { isWeekend } from "date-fns";
import { useSelector } from "react-redux";
import FetchBookings from "../components/FetchBookings";

registerLocale("da", da);
setDefaultLocale("da");

// https://date-fns.org/v2.16.1/docs/eachDayOfInterval ---> til exclude af dage i databasen

export default function Booking() {
  const loggedIn = useSelector((state) => state.loginState.loggedIn);
  console.log("login boolean:", loggedIn);

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
    const [datePart, timePart] = dateString.split(" "); // Split date and time
    const [day, month, year] = datePart.split("-"); // Split day, month, and year
    const [hours, minutes] = timePart.split(":"); // Split hours and minutes

    // Create a new Date object using parsed values (month - 1 because months are 0-indexed in JavaScript)
    const parsedDate = new Date(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes));

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

  // to test it takes the next right date use this date format in new Date("12-09-2023") --> mm-dd-yyyy;
  const [startDate, setStartDate] = useState(() => nextAvailableDate(new Date()));

  // const [endDate, setEndDate] = useState(() => nextAvailableDate(new Date()));
  // useEffect(() => {
  //   // Update endDate whenever startDate changes
  //   setEndDate(startDate);
  // }, [startDate]);

  const getNextDay = () => {
    const today = new Date();
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + 1);
    return nextDay;
  };

  const excludeWeekends = (date) => {
    // Returns false if the day is Saturday or Sunday
    return !isWeekend(date);
  };

  const excludePastDatesAndToday = (date) => {
    const today = new Date();
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

    const firstDayValue = event.target.elements.firstDay.value;
    const lastDayValue = event.target.elements.lastDay.value;

    // Parse date strings to ISO date strings using parseDateString function
    const isoFirstDay = parseDateString(firstDayValue);
    const isoLastDay = parseDateString(lastDayValue);

    // Get other form data
    const formData = new FormData(event.target);
    const formEntries = Object.fromEntries(formData.entries());

    // Convert phoneNumber to a number
    const phoneNumber = Number(formData.get("phoneNumber"));

    // Add ISO date strings to form data with the same key names
    const updatedFormData = {
      ...formEntries,
      phoneNumber,
      firstDay: isoFirstDay,
      lastDay: isoLastDay,
    };

    try {
      // Send the form data to your backend endpoint using fetch
      const response = await fetch("http://localhost:3333/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the appropriate content type
        },
        body: JSON.stringify(updatedFormData), // Convert data to JSON format
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Handle the success response from the server if needed
      const responseData = await response.json();
      console.log("Server response:", responseData);
    } catch (error) {
      console.error("Error:", error);
      // Handle errors or show error messages to the user
    }

    console.log("Form Data", updatedFormData);
  };

  const BookingForm = (
    <div>
      <Form.Group as={Row} className="mb-3 justify-content-center">
        <Form.Label column sm={2}>
          Fulde navn:
        </Form.Label>
        <Col sm={4}>
          <Form.Control type="text" name="firstName" placeholder="Fornavn" required className="mb-3" />
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
          <Form.Select aria-label="Default select example" name="chooseService" defaultValue="Vælg konsulent ydelse" required>
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
          Besked
        </Form.Label>
        <Col sm={4}>
          <Form.Control as="textarea" className="bg-light" name="message" placeholder="Kort uddybning af grunden til du booker.." rows={4} required />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3 justify-content-center">
        <Form.Label column sm={2}>
          Vælg Dato
        </Form.Label>
        <Col sm={4}>
          <DatePicker
            todayButton="I dag"
            // showIcon
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
            }}
            withPortal
            locale="da"
            dateFormat="dd-MM-yyyy"
            name="firstDay"
            placeholderText={` ${getNextDay().toLocaleDateString("da")}`}
            inline
            filterDate={filterDate}
          />
        </Col>
      </Form.Group>
      {/* <Form.Group as={Row} className="mb-3 justify-content-center">
        <Form.Label column sm={2}>
          Vælg Slut Dato
        </Form.Label>
        <Col sm={4}>
          <DatePicker
            todayButton="I dag"
            // showIcon
            selected={endDate}
            onChange={(date) => {
              setEndDate(date);
            }}
            withPortal
            locale="da"
            dateFormat="dd-MM-yyyy"
            name="lastDay"
            placeholderText={` ${getNextDay().toLocaleDateString("da")}`}
            // inline

            filterDate={(date) => excludeWeekends(date) && excludePastDatesAndToday(date)}
            minDate={startDate}
          />
        </Col>
      </Form.Group> */}

      <Form.Group className="text-center" controlId="formBasicButton">
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
        <Form onSubmit={handleSubmit} className="mb-5 mt-5">
          {BookingForm}
        </Form>
      )}
    </>
  );
}

// return (
//   <>
//     <Form onSubmit={handleSubmit} className="mb-5 mt-5">
//       <Form.Group as={Row} className="mb-3 justify-content-center">
//         <Form.Label column sm={2}>
//           Fulde navn:
//         </Form.Label>
//         <Col sm={4}>
//           <Form.Control type="text" name="firstName" placeholder="Fornavn" required className="mb-3" />
//           <Form.Control type="text" name="lastName" placeholder="Efternavn" required />
//         </Col>
//       </Form.Group>

//       <Form.Group as={Row} className="mb-3 justify-content-center">
//         <Form.Label column sm={2}>
//           Email
//         </Form.Label>
//         <Col sm={4}>
//           <Form.Control type="email" name="email" placeholder="Din E-mail" required />
//         </Col>
//       </Form.Group>

//       <Form.Group as={Row} className="mb-3 justify-content-center">
//         <Form.Label column sm={2}>
//           Tlf. Nummer
//         </Form.Label>
//         <Col sm={4}>
//           <Form.Control type="number" name="phoneNumber" placeholder="Dit tlf. nummer" onChange={handlePhoneNumberChange} aria-describedby="phoneNumberError" required />
//           {phoneNumberError && (
//             <div id="phoneNumberError" className="form-text text-danger">
//               {phoneNumberError}
//             </div>
//           )}
//         </Col>
//       </Form.Group>

//       <Form.Group as={Row} className="mb-3 justify-content-center">
//         <Form.Label column sm={2}>
//           Vælg ydelse:
//         </Form.Label>
//         <Col sm={4}>
//           <Form.Select aria-label="Default select example" name="chooseService" defaultValue="Vælg konsulent ydelse" required>
//             <option disabled>Vælg konsulent ydelse</option>
//             <option value="Proceskonsultation">Proceskonsultation</option>
//             <option value="Coaching af enkeltpersoner eller grupper">Coaching af enkeltpersoner eller grupper</option>
//             <option value="Kreativ facilitering">Kreativ facilitering</option>
//             <option value="Teamudvikling">Teamudvikling</option>
//             <option value="Facilitering af ledernetværk og træning">Facilitering af ledernetværk og træning</option>
//             <option value="4R Ledelsesudvikling">4R Ledelsesudvikling</option>
//             <option value="Interne skræddersyede uddannelses- og træningsforløb">Interne skræddersyede uddannelses- og træningsforløb</option>
//           </Form.Select>
//         </Col>
//       </Form.Group>

//       <Form.Group as={Row} className="mb-3 justify-content-center" controlId="exampleFormControlTextarea1">
//         <Form.Label column sm={2}>
//           Besked
//         </Form.Label>
//         <Col sm={4}>
//           <Form.Control as="textarea" className="bg-light" name="message" placeholder="Kort uddybning af grunden til du booker.." rows={4} required />
//         </Col>
//       </Form.Group>

//       <Form.Group as={Row} className="mb-3 justify-content-center">
//         <Form.Label column sm={2}>
//           Vælg Start Dato
//         </Form.Label>
//         <Col sm={4}>
//           <DatePicker
//             todayButton="I dag"
//             showIcon
//             selected={startDate}
//             onChange={(date) => {
//               setStartDate(date);
//             }}
//             withPortal
//             locale="da"
//             dateFormat="dd-MM-yyyy HH:mm"
//             name="firstDay"
//             placeholderText={` ${getNextDay().toLocaleDateString("da")}`}
//             showTimeSelect
//             // inline
//             timeIntervals={15}
//             filterDate={(date) => excludeWeekends(date) && excludePastDatesAndToday(date)}
//             minTime={new Date().setHours(8, 0)}
//             maxTime={new Date().setHours(15, 0)}
//             // excludeDates={excludedDates.map((dateString) => new Date(dateString))}
//             // excludeDates={datesInRange}
//             // excludeDateIntervals={[{ start: new Date("11-12-2023"), end: new Date("15-12-2023") }]}
//             required
//           />
//         </Col>
//       </Form.Group>
//       <Form.Group as={Row} className="mb-3 justify-content-center">
//         <Form.Label column sm={2}>
//           Vælg Slut Dato
//         </Form.Label>
//         <Col sm={4}>
//           <DatePicker
//             todayButton="I dag"
//             showIcon
//             selected={endDate}
//             onChange={(date) => {
//               setEndDate(date);
//             }}
//             withPortal
//             locale="da"
//             dateFormat="dd-MM-yyyy HH:mm"
//             name="lastDay"
//             placeholderText={` ${getNextDay().toLocaleDateString("da")}`}
//             showTimeSelect
//             // inline
//             timeIntervals={15}
//             filterDate={(date) => excludeWeekends(date) && excludePastDatesAndToday(date)}
//             minDate={startDate}
//             minTime={startDate.toDateString() !== endDate.toDateString() ? new Date().setHours(8, 0) : new Date(startDate.getTime() + 15 * 60 * 1000)}
//             maxTime={new Date().setHours(16, 0)}
//             required
//           />
//         </Col>
//       </Form.Group>

//       <Form.Group className="text-center" controlId="formBasicButton">
//         <Button variant="primary" type="submit" value="book">
//           Book
//         </Button>
//       </Form.Group>
//     </Form>

//     <FetchBookings />
//   </>
// );
