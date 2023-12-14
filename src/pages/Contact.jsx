import emailjs from "@emailjs/browser";
import { useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SuccessMessage from "../components/SuccessMessage";
import ErrorMessage from "../components/ErrorMessage";

export default function Contact() {

  const form = useRef();

  // Function to use emailjs to send an email
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(`service_mo1481e`, `template_3x3y7gc`, form.current, `QennLeEfNjWQd9kMQ`).then(
      () => {
        SuccessMessage("Din besked er sendt!");
        e.target.reset();
      },
      () => {
        ErrorMessage("Din besked blev ikke sendt, prøv igen!");
      }
    );
  };

  return (
    <div>
      <div>
        <h3 className="text-center pt-4">Her kan du kontakte mig</h3>
      </div>
      {/* Kontakt Form */}
      <Form ref={form} onSubmit={sendEmail} className="ms-4 mt-5 p-4">
        <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formGroupName">
          <Form.Label column sm={2}>
            Fornavn
          </Form.Label>
          <Col sm={3}>
            <Form.Control type="text" className="bg-light" placeholder="Fornavn" name="fornavn" required />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formGroupName">
          <Form.Label column sm={2}>
            Efternavn
          </Form.Label>
          <Col sm={3}>
            <Form.Control type="text" className="bg-light" placeholder="Efternavn" name="efternavn" required />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formGroupEmail">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={3}>
            <Form.Control type="email" className="bg-light" placeholder="Email" name="email" required />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formGroupPhone">
          <Form.Label column sm={2}>
            Telefon nummer
          </Form.Label>
          <Col sm={3}>
            <Form.Control type="number" className="bg-light" placeholder="Telefon nummer" name="telefon" required />

          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formGroupBusiness">
          <Form.Label column sm={2}>
            Virksomhedens navn
          </Form.Label>
          <Col sm={3}>
            <Form.Control type="text" className="bg-light" placeholder="Virksomhedens navn (valgfrit)" name="virksomhed" />
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

        <Form.Group className="text-center m-4" controlId="formBasicButton">
          <Button variant="primary" type="submit" value="Send">
            Send
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}
