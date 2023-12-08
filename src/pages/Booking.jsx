import { useEffect, useState } from "react";
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
registerLocale("da", da);
setDefaultLocale("da");

// console.log(excludeBookedDates);

// https://date-fns.org/v2.16.1/docs/eachDayOfInterval ---> til exclude af dage i databasen

export default function Booking() {
  // const excludeDatess = new Date("2023-12-08T10:00:00.000Z");
  // console.log(excludeDatess);

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

  const roundToNearest15Minutes = (date) => {
    const minutes = date.getMinutes();
    const remainder = 15 - (minutes % 15); // Calculate the remainder to reach the next 15-minute interval
    const roundedDate = new Date(date.getTime() + remainder * 60000); // Add milliseconds to round up

    return roundedDate;
  };

  const parseDateString = (dateString) => {
    const [datePart, timePart] = dateString.split(" "); // Split date and time
    const [day, month, year] = datePart.split("-"); // Split day, month, and year
    const [hours, minutes] = timePart.split(":"); // Split hours and minutes

    // Create a new Date object using parsed values (month - 1 because months are 0-indexed in JavaScript)
    const parsedDate = new Date(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes));

    // Convert Date object to ISO date string
    const isoDateString = parsedDate.toISOString();
    console.log("ISO Date: " + isoDateString);

    return isoDateString;

    // Create a new Date object using parsed values (month - 1 because months are 0-indexed in JavaScript)
    // console.log("hehehehehehe" + new Date(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes)));
    // return new Date(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes));
  };

  // const firstDay = parseDateString("11-12-2023 14:00");
  // const lastDay = parseDateString("15-12-2023 13:00");

  // // Convert date strings to Date objects
  // const firstDay = new Date("11-12-2023 14:00");
  // const lastDay = new Date("15-12-2023 13:00");

  // const generateDatesBetween = (startDate, endDate) => {
  //   const dates = [];
  //   let currentDate = new Date(startDate);

  //   while (currentDate <= endDate) {
  //     dates.push(new Date(currentDate));
  //     currentDate.setDate(currentDate.getDate() + 1);
  //   }

  //   return dates;
  // };

  // const datesInRange = generateDatesBetween(firstDay, lastDay);

  // console.log(datesInRange);

  // // Function to generate dates between two dates
  // const getDatesBetweenDates = (startDate, endDate) => {
  //   const dates = [];
  //   let currentDate = new Date(startDate);

  //   while (currentDate <= endDate) {
  //     dates.push(new Date(currentDate));
  //     currentDate.setDate(currentDate.getDate() + 1);
  //   }
  //   return dates;
  // };

  // // Get the dates between firstDay and lastDay
  // const excludedDates = getDatesBetweenDates(firstDay, lastDay);

  const nextAvailableDate = (date) => {
    let today = new Date(date);
    let availableDay = new Date(today);
    availableDay.setDate(today.getDate() + 1);
    availableDay = roundToNearest15Minutes(availableDay);
    // let availableDay = new Date(date).setDate().getDate() + 1;

    availableDay.getMinutes();

    // Check if it's before 8 am
    if (availableDay.getHours() < 8) {
      availableDay.setHours(8, 0, 0, 0); // Set time to 8 am
    } else if (availableDay.getHours() > 16) {
      // If it's past 4 pm, move to the next day's 8 am
      if (!isWeekend(availableDay)) {
        availableDay.setDate(availableDay.getDate() + 1);
        console.log("hejsa");
      }
      availableDay.setHours(8, 0, 0, 0); // Set time to 8 am
    }

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

  const addFifteenMinutes = (endDate) => {
    const nextDay = new Date(endDate);
    // nextDay.setDate(nextDay.getDate() + 1); // Adding 1 day

    // Adding 15 minutes
    nextDay.setTime(nextDay.getTime() + 15 * 60 * 1000);

    return nextDay;
  };
  // // Convert date strings to Date objects
  const firstDay = new Date("12-11-2023 14:00");
  const lastDay = new Date("12-14-2023 09:00");

  // const firstDay = parseDateString("11-12-2023 14:00");
  // const lastDay = parseDateString("15-12-2023 13:00");

  const generateDatesBetween = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);
    console.log(currentDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    console.log(dates);
    return dates;
  };

  const datesInRange = generateDatesBetween(firstDay, lastDay);

  console.log("hej", datesInRange);

  const [startDate, setStartDate] = useState(() => nextAvailableDate(new Date()));
  const [endDate, setEndDate] = useState(() => addFifteenMinutes(startDate));

  useEffect(() => {
    // Update endDate whenever startDate changes
    setEndDate(addFifteenMinutes(startDate));
  }, [startDate]);

  const getNextDay = () => {
    const today = new Date();
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + 1);
    return nextDay;
  };

  const excludeWeekends = (date) => {
    // Returns false if the day is Saturday or Sunday
    // console.log(!isWeekend(date));
    return !isWeekend(date);
  };

  const excludePastDatesAndToday = (date) => {
    const today = new Date();
    // console.log(today);
    return date >= today;
  };

  const excludeBookings = (date, bookedDates) => {
    const formattedDate = date.toISOString().slice(0, 10); // Format date as 'YYYY-MM-DD'

    return bookedDates.includes(formattedDate);
  };

  // const excludeDatess = new Date("2023-12-21T10:00:00.000Z");
  // console.log(excludeDatess);

  const bookedDates1 = [new Date("2023-12-25"), new Date("2023-12-26"), new Date("2023-12-27")];
  // const bookedDates2 = [{start: subDays(new Date("2023-12-25"), 0), end: addDays(new Date("2023-12-27"), 0)}, ]

  const filterDate = (date) => {
    // Example excluded date
    const excludeDatess = new Date("2023-12-19T10:00:00.000Z");

    // Example array of booked dates
    const bookedDates = ["2023-10-25", "2023-10-26", "2023-10-27"];

    return (
      excludeWeekends(date) &&
      excludePastDatesAndToday(date) &&
      !excludeBookings(date, bookedDates) && // Exclude dates that are booked
      !date.toISOString().includes(excludeDatess.toISOString().slice(0, 10)) // Check if the date is the excluded date
    );
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
      lastDay: isoLastDay
    };

    try {
      // Send the form data to your backend endpoint using fetch
      const response = await fetch("http://localhost:3333/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json" // Set the appropriate content type
        },
        body: JSON.stringify(updatedFormData) // Convert data to JSON format
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

  return (
    <>
      <Form onSubmit={handleSubmit} className="mb-5 mt-5">
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
            Vælg Start Dato
          </Form.Label>
          <Col sm={4}>
            <DatePicker
              todayButton="I dag"
              showIcon
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
              }}
              withPortal
              locale="da"
              dateFormat="dd-MM-yyyy HH:mm"
              name="firstDay"
              filterDate={filterDate}
              placeholderText={` ${getNextDay().toLocaleDateString("da")}`}
              showTimeSelect
              // inline
              timeIntervals={30}
              // excludeTimes={excludeDatess}
              // filterDate={(date) => excludeWeekends(date) && excludePastDatesAndToday(date)}
              minTime={new Date().setHours(8, 0)}
              maxTime={new Date().setHours(15, 0)}
              // excludeDates={excludedDates.map((dateString) => new Date(dateString))}
              // excludeDates={datesInRange}
              // excludeDates={["2023-12-25", "2023-12-26", "2023-12-27"]}
              excludeDates={bookedDates1}
              // excludeDateIntervals={[{ start: subDays(new Date("2023-12-25"), 0), end: addDays(new Date("2023-12-27"), 0) }]}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3 justify-content-center">
          <Form.Label column sm={2}>
            Vælg Slut Dato
          </Form.Label>
          <Col sm={4}>
            <DatePicker
              todayButton="I dag"
              showIcon
              selected={endDate}
              onChange={(date) => {
                setEndDate(date);
              }}
              withPortal
              locale="da"
              dateFormat="dd-MM-yyyy HH:mm"
              name="lastDay"
              placeholderText={` ${getNextDay().toLocaleDateString("da")}`}
              showTimeSelect
              // inline
              timeIntervals={30}
              filterDate={(date) => excludeWeekends(date) && excludePastDatesAndToday(date)}
              minDate={startDate}
              minTime={startDate.toDateString() !== endDate.toDateString() ? new Date().setHours(8, 0) : new Date(startDate.getTime() + 15 * 60 * 1000)}
              maxTime={new Date().setHours(16, 0)}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group className="text-center" controlId="formBasicButton">
          <Button variant="primary" type="submit" value="book">
            Book
          </Button>
        </Form.Group>
      </Form>
    </>
  );
}
