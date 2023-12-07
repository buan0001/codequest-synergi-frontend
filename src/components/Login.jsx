import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { login } from "../features/LoginState";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();
    console.log("Logging in...");
    dispatch(login({ username, password }));
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "80vh" }}
    >
      <Col md={6}>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Brugernavn
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="username"
                placeholder="Brugernavn"
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formHorizontalPassword"
          >
            <Form.Label column sm={3}>
              Password
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3">
            <Col sm={{ span: 9, offset: 3 }}>
              <Button
                type="button"
                onClick={() => {
                  handleLogin(event);
                }}
              >
                Login
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Col>
    </div>
  );
}
