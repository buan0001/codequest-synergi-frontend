import { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Booking() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      <h1>Booking</h1>
      <p>Welcome to the booking page!</p>

      <Form>
        <Form.Group as={Row} className="mb-3 justify-content-center">
          <Form.Label column sm={1}>
            Titel
          </Form.Label>
          <Col sm={4}>
            <Form.Control type="text" placeholder="Titel på booking" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 justify-content-center" controlId="exampleFormControlTextarea1">
          <Form.Label column sm={1}>
            Besked
          </Form.Label>
          <Col sm={4}>
            <Form.Control as="textarea" className="bg-light" name="besked" rows={4} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 justify-content-center">
          <Form.Label column sm={1}>
            Vælg dato
          </Form.Label>
          <Col sm={4}>
            <DatePicker locale="da" dateFormat="dd/MM/yyyy" closeOnScroll={true} selected={startDate} onChange={(date) => setStartDate(date)} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 justify-content-center">
          <Form.Label column sm={1}>
            Vælg slut dato
          </Form.Label>
          <Col sm={4}>
            <DatePicker locale="da" dateFormat="dd/MM/yyyy" closeOnScroll={true} selected={startDate} onChange={(date) => setStartDate(date)} />
          </Col>
        </Form.Group>

        <Form.Group className="text-center" controlId="formBasicButton">
          <Button variant="primary" type="submit" value="Send">
            Send
          </Button>
        </Form.Group>
      </Form>
    </>
  );
}
