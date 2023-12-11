import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import LogoutButton from "./Logout";
import logo from "../assets/synergi-hrm logo.png";

// Funktionen hedder Header selvom det er en Navbar, pga. navngivningskonflikt med Navbar i React Bootstrap.
export default function Header() {
  // const { loggedIn } = useAuth();
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container className="ms-0 mw-100">
        <div className="nav align-self-center">
          {/* Synergi Logo */}
          <Navbar.Brand href="/" className="align-self-center">
            <img src={logo} href="/" alt="logo" width="118" height="75" />
            Synergi HRM
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* Startside, Kalender. KALENDER SKAL MÅSKE RYKKES? !!! */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Link href="/">Startside</Nav.Link>
              <Nav.Link href="/booking">Booking</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>

        <div>
          <Navbar.Collapse>
            <Nav>
              <Nav.Link href="/blog">Blog</Nav.Link>
              <Nav.Link href="/kunder">Kunder</Nav.Link>
              <NavDropdown title="Konsulentydelser" id="basic-nav-dropdown">
                <NavDropdown.Item href="/proceskonsultation">Proceskonsultation</NavDropdown.Item>
                <NavDropdown.Item href="/anerkendende coaching">Coaching af enkeltpersoner eller team</NavDropdown.Item>
                <NavDropdown.Item href="/teamudvikling">Teamudvikling</NavDropdown.Item>
                <NavDropdown.Item href="/netværksfacilitering">Netværksfacilitering</NavDropdown.Item>
                <NavDropdown.Item href="/ledelsesudvikling">Ledelsesudvikling</NavDropdown.Item>
                <NavDropdown.Item href="/4R ledelsesudvikling">4R Ledelsesudvikling</NavDropdown.Item>
                <NavDropdown.Item href="/interne uddannelsesforløb">Interne uddannelsesforløb</NavDropdown.Item>
              </NavDropdown>
              {/* Om mig dropdown & Kontakt */}
              <NavDropdown title="Om mig" id="basic-nav-dropdown">
                <NavDropdown.Item href="/theory">Teoretisk ståsted</NavDropdown.Item>
                <NavDropdown.Item href="/about">Om mig</NavDropdown.Item>
                <NavDropdown.Item href="/cv">CV</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/booksandarticles">Bøger og artikler</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/contact" eventKey="link-1">
                Kontakt
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
        <LogoutButton />
      </Container>
    </Navbar>
  );
}
