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
registerLocale("da", da);
setDefaultLocale("da");

export default function Booking() {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [excludedTimes, setExcludedTimes] = useState([]);

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

  const handleStartTimeChange = (time) => {
    setStartTime(time);
    generateExcludedTimes(time);
  };

  const generateExcludedTimes = (selectedStartTime) => {
    const excluded = [];
    const current = new Date(selectedStartTime);
    const startOfDay = new Date(selectedStartTime);
    startOfDay.setHours(0, 0, 0);

    while (current >= startOfDay) {
      excluded.push(new Date(current));
      current.setMinutes(current.getMinutes() - 15);
    }

    setExcludedTimes(excluded);
  };

  const handleEndTimeChange = (time) => {
    setEndTime(time);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // missing check if startDate, endDate, startTime, and endTime are selected

    const formData = new FormData(event.target);

    const startTimeValue = startTime.toLocaleTimeString("da");
    const endTimeValue = endTime.toLocaleTimeString("da");

    formData.append("bookingTimeStart", startTimeValue);
    formData.append("bookingTimeEnd", endTimeValue);

    const formEntries = Object.fromEntries(formData.entries());
    console.log("Form Data", formEntries);

    //  The spread syntax (...) is used to create a new object
    // 'combinedData' by copying all the enumerable own properties
    // from the formEntries object.
    let combinedData = { ...formEntries };

    if (startDate && endDate) {
      const datesInRange = [];
      let currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        const dayOfWeek = currentDate.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          datesInRange.push(new Date(currentDate));
        }

        currentDate.setDate(currentDate.getDate() + 1);
      }

      console.log("Selected Dates:", datesInRange);

      combinedData.datesInRange = datesInRange.map((date) =>
        date.toISOString()
      );
    } else {
      console.log("Please select both start and end dates.");
    }

    console.log("Combined Data:", combinedData);
  };

  return (
    <>
      <h1>Booking</h1>
      <p>Welcome to the booking page!</p>

      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3 justify-content-center">
          <Form.Label column sm={2}>
            Fulde navn:
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              type="text"
              name="firstName"
              placeholder="Fornavn"
              required
            />
            <Form.Control
              type="text"
              name="lastName"
              placeholder="Efternavn"
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 justify-content-center">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              type="email"
              name="email"
              placeholder="Din E-mail"
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 justify-content-center">
          <Form.Label column sm={2}>
            Tlf. Nummer
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              type="number"
              name="phoneNumber"
              placeholder="Dit tlf. nummer"
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 justify-content-center">
          <Form.Label column sm={2}>
            Vælg ydelse:
          </Form.Label>
          <Col sm={4}>
            <Form.Select
              aria-label="Default select example"
              name="chooseService"
              required
            >
              <option disabled selected>
                Vælg konsulent ydelse
              </option>
              <option value="Proceskonsultation">Proceskonsultation</option>
              <option value="Coaching af enkeltpersoner eller grupper">
                Coaching af enkeltpersoner eller grupper
              </option>
              <option value="Kreativ facilitering">Kreativ facilitering</option>
              <option value="Teamudvikling">Teamudvikling</option>
              <option value="Facilitering af ledernetværk og træning">
                Facilitering af ledernetværk og træning
              </option>
              <option value="4R Ledelsesudvikling">4R Ledelsesudvikling</option>
              <option value="Interne skræddersyede uddannelses- og træningsforløb">
                Interne skræddersyede uddannelses- og træningsforløb
              </option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-3 justify-content-center"
          controlId="exampleFormControlTextarea1"
        >
          <Form.Label column sm={2}>
            Besked
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              as="textarea"
              className="bg-light"
              name="message"
              placeholder="Kort uddybning af grunden til du booker.."
              rows={4}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 justify-content-center">
          <Form.Label column sm={2}>
            Vælg Dato(-er)
          </Form.Label>
          <Col sm={4}>
            <DatePicker
              className="customDatePicker"
              todayButton="I dag"
              showIcon
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);
              }}
              filterDate={(date) =>
                excludeWeekends(date) && excludePastDatesAndToday(date)
              }
              // isClearable={true} // den sætter sig over datoerne
              withPortal
              locale="da"
              dateFormat="dd-MM-yyyy"
              name="firstAndLastDay"
              placeholderText={` ${getNextDay().toLocaleDateString("da")}`}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 justify-content-center">
          <Form.Label column sm={2}>
            Vælg Starttidspunkt
          </Form.Label>
          <DatePicker
            selected={startTime}
            locale="da"
            onChange={handleStartTimeChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            dateFormat="HH:mm"
            inline
            name="timeStart"
            minTime={new Date().setHours(8, 0)}
            maxTime={new Date().setHours(15, 0)}
          />
          <Form.Label column sm={2}>
            Vælg Sluttidspunkt
          </Form.Label>
          <DatePicker
            selected={endTime}
            locale="da"
            onChange={handleEndTimeChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            dateFormat="HH:mm"
            inline
            name="timeEnd"
            excludeTimes={excludedTimes}
            minTime={new Date().setHours(8, 0)}
            maxTime={new Date().setHours(16, 0)}
          />
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
