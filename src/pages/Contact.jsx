// import * as React from "react";
// import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function Contact() {
  const loggedIn = useSelector((state) => state.loginState.loggedIn);
  console.log("state", loggedIn);

  const form = useRef();

  // EmailJS funktionalitet
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(`service_mo1481e`, `template_3x3y7gc`, form.current, `QennLeEfNjWQd9kMQ`).then(
      (result) => {
        console.log(result.text);

        // Success toast - React Toastify library
        toast.success("Din besked er sendt!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      },
      (error) => {
        console.log(error.text);

        // Error toast - React Toastify library
        toast.error("Din besked blev ikke sendt, prøv igen!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    );
  };

  return (
    <div className="mt-4">
      {/* Kontakt Form */}
      <Form ref={form} onSubmit={sendEmail} className="ms-4 mt-4 bg-white">
        <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formGroupName">
          <Form.Label column sm={2}>
            Fornavn
          </Form.Label>
          <Col sm={3}>
            <Form.Control type="text" className="bg-light" placeholder="Fornavn" name="fornavn" required />
            {/* <span style={{ color: "red" }}>{errors.firstname?.message}</span> */}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formGroupName">
          <Form.Label column sm={2}>
            Efternavn
          </Form.Label>
          <Col sm={3}>
            <Form.Control type="text" className="bg-light" placeholder="Efternavn" name="efternavn" required />
            {/* <span>{errors.lastname?.message}</span> */}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formGroupEmail">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={3}>
            <Form.Control type="email" className="bg-light" placeholder="Email" name="email" required />
            {/* <span>{errors.email?.message}</span> */}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formGroupPhone">
          <Form.Label column sm={2}>
            Telefon nummer
          </Form.Label>
          <Col sm={3}>
            <Form.Control type="number" className="bg-light" placeholder="Telefon nummer" name="telefon" required />
            {/* <span>{errors.phone?.message}</span> */}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formGroupBusiness">
          <Form.Label column sm={2}>
            Virksomhedens navn
          </Form.Label>
          <Col sm={3}>
            <Form.Control type="text" className="bg-light" placeholder="Virksomhedens navn (valgfrit)" name="virksomhed" />
            {/* <span>{errors.company?.message}</span> */}
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

        <Form.Group className="text-center mb-4" controlId="formBasicButton">
          <Button variant="primary" type="submit" value="Send">
            Send
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}
