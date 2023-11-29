import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../assets/synergi-hrm logo.png";

export default function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container className="ms-0 mw-100">
        <div className="nav align-self-center">
          <Navbar.Brand href="/" className="align-self-center">
            <img src={logo} href="/" alt="logo" width="118" height="75" />
            Synergi HRM
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Link href="/">Startside</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>

        <div>
          <Navbar.Collapse>
            <Nav>
              <NavDropdown title="Om mig" id="basic-nav-dropdown">
                <NavDropdown.Item href="/theory">Teoretisk ståsted</NavDropdown.Item>
                <NavDropdown.Item href="/about">Om mig</NavDropdown.Item>
                <NavDropdown.Item href="/cv">CV</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                <NavDropdown.Item href="/booksandarticles">Bøger og artikler</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/contact" eventKey="link-1">
                Kontakt
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
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
