import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Synergi HRM</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" /*justify-content-end" variant="pills" defaultActiveKey="/"*/>
            <Nav.Link href="/">Startside</Nav.Link>
            <Nav.Link href="/contact" eventKey="link-1">
              Kontakt
            </Nav.Link>
            <NavDropdown title="Om mig" id="basic-nav-dropdown">
              <NavDropdown.Item href="/theory">Teoretisk ståsted</NavDropdown.Item>
              <NavDropdown.Item href="/about">Om mig</NavDropdown.Item>
              <NavDropdown.Item href="/cv">CV</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

// export default function Navbar() {
//   return (
//     <nav>
//       <a href="/">Startside</a>
//       <a href="/about">Om mig</a>
//       <a href="/contact">Kontakt</a>
//     </nav>
//   );
// }
