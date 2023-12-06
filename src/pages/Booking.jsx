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
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

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
              // startDate={startDate}
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
              }}
              // onChange={handleStartDateChange}
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
              // startDate={endDate}
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
              // endDate={endDate}
              minDate={startDate}
              minTime={startDate.toDateString() !== endDate.toDateString() ? new Date().setHours(8, 0) : new Date(startDate.getTime() + 15 * 60 * 1000)}
              // new Date(startDate.getTime() + 15 * 60 * 1000)}
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
