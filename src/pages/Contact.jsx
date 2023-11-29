// import * as React from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //  console.log(errors);

  return (
    <div>
      <Form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <Form.Group as={Row} className="mb-3" controlId="formGroupName">
          <Form.Label column sm={2}>
            Fornavn
          </Form.Label>
          <Col sm={3}>
            <Form.Control type="text" placeholder="Fornavn" {...register("firstname", { required: "Feltet er ikke udfyldt" })} />
            <span style={{ color: "red" }}>{errors.firstname?.message}</span>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formGroupName">
          <Form.Label column sm={2}>
            Efternavn
          </Form.Label>
          <Col sm={3}>
            <Form.Control type="text" placeholder="Efternavn" {...register("lastname", { required: "Feltet er ikke udfyldt" })} />
            <span>{errors.lastname?.message}</span>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formGroupEmail">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={3}>
            <Form.Control type="email" placeholder="Email" {...register("email", { required: "Feltet er ikke udfyldt" })} />
            <span>{errors.email?.message}</span>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formGroupEmail">
          <Form.Label column sm={2}>
            Telefon nummer
          </Form.Label>
          <Col sm={3}>
            <Form.Control
              type="number"
              placeholder="Telefon nummer"
              {...register("phone", { valueAsNumber: true, required: "Feltet er ikke udfyldt", minLength: { value: 8, message: "Telefon nummeret skal være 8 cifre" } })}
            />
            <span>{errors.phone?.message}</span>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formGroupEmail">
          <Form.Label column sm={2}>
            Virksomhedens navn
          </Form.Label>
          <Col sm={3}>
            <Form.Control type="text" placeholder="Virksomhedens navn" {...register("company", { required: "Feltet er ikke udfyldt" })} />
            <span>{errors.company?.message}</span>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formGroupEmail">
          <Form.Label column sm={2}>
            Adresse
          </Form.Label>
          <Col sm={3}>
            <Form.Control type="text" placeholder="Adresse" {...register("address", { required: "Feltet er ikke udfyldt" })} />
            <span>{errors.address?.message}</span>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formGroupEmail">
          <Form.Label column sm={2}>
            Kort introduktion
          </Form.Label>
          <Col sm={3}>
            <Form.Control type="text" placeholder="Kort introduktion" {...register("introduction", { required: "Feltet er ikke udfyldt" })} />
            <span>{errors.introduction?.message}</span>
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label column sm={2}>
            Besked
          </Form.Label>
          <Col sm={3}>
            <Form.Control as="textarea" rows={4} />
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form.Group>
      </Form>
    </div>

    /* <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <input {...register("firstname", { required: "Feltet er ikke udfyldt" })} placeholder="Fornavn"></input>
        <span>{errors.firstname?.message}</span>
        <input {...register("lastname", { required: "Feltet er ikke udfyldt" })} placeholder="Efternavn"></input>
        <span>{errors.lastname?.message}</span>
        <input {...register("email", { required: "Feltet er ikke udfyldt" })} placeholder="Email"></input>
        <span>{errors.email?.message}</span>
        <input
          type="number"
          {...register("phone", { valueAsNumber: true, required: "Feltet er ikke udfyldt", minLength: { value: 8, message: "Telefon nummeret skal være 8 cifre" } })}
          placeholder="Telefon nummer"
        ></input>
        <span>{errors.phone?.message}</span>
        <input {...register("company", { required: "Feltet er ikke udfyldt" })} placeholder="Virksomhedens navn"></input>
        <span>{errors.company?.message}</span>
        <input {...register("address", { required: "Feltet er ikke udfyldt" })} placeholder="Adresse"></input>
        <span>{errors.address?.message}</span>
        <input {...register("introduction", { required: "Feltet er ikke udfyldt" })} placeholder="Kort introduktion"></input>
        <span>{errors.introduction?.message}</span>
        <button>Submit</button>
      </form> */
  );
}
