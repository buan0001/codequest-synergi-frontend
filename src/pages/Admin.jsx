import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function LoginForm() {
  return (
    <Row className="justify-content-md-center">
      <Col md={6}>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Email
            </Form.Label>
            <Col sm={9}>
              <Form.Control type="email" placeholder="Email" />
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
              <Form.Control type="password" placeholder="Password" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 9, offset: 3 }}>
              <Button type="submit">Sign in</Button>
            </Col>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
}
