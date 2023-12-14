import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { login } from "../features/LoginState";

export default function Login() {
  // State variable to store the username entered by the user
  const [username, setUsername] = useState("");
  // State variable to store the password entered by the user
  const [password, setPassword] = useState("");
  // Redux hook to access the dispatch function
  const dispatch = useDispatch();

  const handleLogin = (event) => {
    // Prevents the default form submission behavior
    event?.preventDefault();
    // Dispatches the login action with the username and password
    dispatch(login({ username, password }));
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
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
                  // Updates the username state when the input value changes
                  setUsername(event.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.code === "Enter") {
                    // Calls handleLogin function when Enter key is pressed
                    handleLogin();
                  }
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
            <Form.Label column sm={3}>
              Password
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(event) => {
                  // Updates the password state when the input value changes
                  setPassword(event.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.code === "Enter") {
                    handleLogin();
                  }
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 9, offset: 3 }}>
              <Button
                type="button"
                onClick={(event) => {
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
