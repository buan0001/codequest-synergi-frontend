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
registerLocale("da", da);
setDefaultLocale("da");

// console.log(excludeBookedDates);

// https://date-fns.org/v2.16.1/docs/eachDayOfInterval ---> til exclude af dage i databasen

export default function Booking() {
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
    return new Date(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes));
  };

  const firstDay = parseDateString("11-12-2023 14:00");
  const lastDay = parseDateString("15-12-2023 13:00");

  // // Convert date strings to Date objects
  // const firstDay = new Date("11-12-2023 14:00");
  // const lastDay = new Date("15-12-2023 13:00");

  const generateDatesBetween = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const datesInRange = generateDatesBetween(firstDay, lastDay);

  console.log(datesInRange);

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
    return !isWeekend(date);
  };

  const excludePastDatesAndToday = (date) => {
    const today = new Date();
    return date >= today;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(startDate);
    // console.log(endDate);

    // missing check if startDate, endDate, startTime, and endTime are selected

    const formData = new FormData(event.target);

    const formEntries = Object.fromEntries(formData.entries());
    console.log("Form Data", formEntries);
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="mb-5">
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
            <Form.Control type="number" name="phoneNumber" placeholder="Dit tlf. nummer" required />
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
              placeholderText={` ${getNextDay().toLocaleDateString("da")}`}
              showTimeSelect
              // inline
              timeIntervals={15}
              filterDate={(date) => excludeWeekends(date) && excludePastDatesAndToday(date)}
              minTime={new Date().setHours(8, 0)}
              maxTime={new Date().setHours(15, 0)}
              excludeDates={datesInRange}
              // excludeDateIntervals={[{ start: new Date("11-12-2023"), end: new Date("15-12-2023") }]}
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
              timeIntervals={15}
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
