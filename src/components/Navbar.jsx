import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logout from "./Logout";
import logo from "../assets/synergi-hrm logo.png";

// Function is called Header, even though it's a Navbar, because of naming conflict with Navbar in React Bootstrap.
export default function Header() {
  const baseName = "/codequest-synergi-frontend";
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary sticky-top"
      style={{ boxShadow: "1px 1px 10px 5px rgb(182 185 189)" }}
    >
      <Container className="ms-0 mw-100">
        <div className="nav align-self-center">
          {/* Synergi Logo */}
          <Navbar.Brand href={baseName + "/"} className="align-self-center">
            <img
              src={logo}
              href={baseName + "/"}
              alt="logo"
              width="118"
              height="75"
            />
            Synergi HRM
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* Startside & Booking */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Link href={baseName + "/"}>Startside</Nav.Link>
              <Nav.Link href={baseName + "/booking"}>Booking</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>

        <div>
          {/* Blog & Kunder */}
          <Navbar.Collapse>
            <Nav>
              <Nav.Link href={baseName + "/blog"}>Blog</Nav.Link>
              <Nav.Link href={baseName + "/kunder"}>Kunder</Nav.Link>

              {/* Konsulentydelser dropdown */}
              <NavDropdown title="Konsulentydelser" id="basic-nav-dropdown">
                <NavDropdown.Item href={baseName + "/proceskonsultation"}>
                  Proceskonsultation
                </NavDropdown.Item>
                <NavDropdown.Item href={baseName + "/anerkendende coaching"}>
                  Coaching af enkeltpersoner eller team
                </NavDropdown.Item>
                <NavDropdown.Item href={baseName + "/teamudvikling"}>
                  Teamudvikling
                </NavDropdown.Item>
                <NavDropdown.Item href={baseName + "/netværksfacilitering"}>
                  Netværksfacilitering
                </NavDropdown.Item>
                <NavDropdown.Item href={baseName + "/ledelsesudvikling"}>
                  Ledelsesudvikling
                </NavDropdown.Item>
                <NavDropdown.Item href={baseName + "/4R ledelsesudvikling"}>
                  4R Ledelsesudvikling
                </NavDropdown.Item>
                <NavDropdown.Item
                  href={baseName + "/interne uddannelsesforløb"}
                >
                  Interne uddannelsesforløb
                </NavDropdown.Item>
              </NavDropdown>

              {/* Om mig dropdown */}
              <NavDropdown title="Om mig" id="basic-nav-dropdown">
                <NavDropdown.Item href={baseName + "/theory"}>
                  Teoretisk ståsted
                </NavDropdown.Item>
                <NavDropdown.Item href={baseName + "/cv"}>CV</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href={baseName + "/booksandarticles"}>
                  Bøger og artikler
                </NavDropdown.Item>
              </NavDropdown>

              {/* Kontakt */}
              <Nav.Link href={baseName + "/contact"} eventKey="link-1">
                Kontakt
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
        <Logout />
      </Container>
    </Navbar>
  );
}
