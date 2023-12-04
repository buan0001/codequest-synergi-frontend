import { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import da from "date-fns/locale/da";
// import { setHours, setMinutes } from "date-fns";
registerLocale("da", da);
setDefaultLocale("da");

export default function Booking() {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [excludedTimes, setExcludedTimes] = useState([]);

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
    const formData = new FormData(event.target);

    const startTimeValue = startTime.toLocaleTimeString("da");
    const endTimeValue = endTime.toLocaleTimeString("da");

    formData.append("bookingTimeStart", startTimeValue);
    formData.append("bookingTimeEnd", endTimeValue);

    const data = Object.fromEntries(formData.entries());
    console.log("Form Data:", data);
  };

  return (
    <>
      <h1>Booking</h1>
      <p>Welcome to the booking page!</p>

      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3 justify-content-center">
          <Form.Label column sm={2}>
            Titel
          </Form.Label>
          <Col sm={4}>
            <Form.Control type="text" name="bookingTitle" placeholder="Titel på booking" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 justify-content-center" controlId="exampleFormControlTextarea1">
          <Form.Label column sm={2}>
            Besked
          </Form.Label>
          <Col sm={4}>
            <Form.Control as="textarea" className="bg-light" name="bookingMessage" placeholder="Kort beskrivelse af grunden til du booker.." rows={4} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 justify-content-center">
          <Form.Label column sm={2}>
            Vælg Dato(-er)
          </Form.Label>
          <Col sm={4}>
            <DatePicker
              className="customDatePicker"
              showIcon
              locale="da"
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);
              }}
              isClearable={true}
              withPortal
              name="bookingDays"
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
            name="bookingTimeStart"
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
            name="bookingTimeEnd"
            excludeTimes={excludedTimes}
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
