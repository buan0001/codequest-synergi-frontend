import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Navbar";
// import Home from "./pages/Home";
// import CV from "./pages/CV";
import Booksandarticles from "./pages/BooksAndArticles";
// import Theory from "./pages/Theory";
// import Kunder from "./pages/Customers";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Booking from "./pages/Booking";
import Footer from "./components/Footer";
import StandardPage from "./pages/StandardPage";
import "./App.css";
// import calendar from "./pages/calendar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import FourR from "./pages/4R";
// import Coaching from "./pages/Coaching";
// import Teamdevelopment from "./pages/Teamdevelopment";
// import NetworkFacilitation from "./pages/Networkfacilitation";
// import ManagementDevelopment from "./pages/ManagementDevelopment";
// import Processconsultation from "./pages/Processconsultation";
// import InternalTrainingCourses from "./pages/InternalTrainingCourses";

export default function App() {
  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <Header /> {/* Navbar */}
      <Routes>
        <Route path="/" element={<StandardPage title={"forside"} />}></Route> {/* Home page */}
        <Route path="/contact" element={<Contact />}></Route> {/* Contact page */}
        {/* <Route path="/contact" element={<Contact />} title={"forside"}></Route> Contact page */}
        <Route path="/about" element={<About />}></Route> {/* About page */}
        <Route path="/booking" element={<Booking />}></Route> {/*Booking page*/}
        <Route path="/theory" element={<StandardPage title={"teori"} />}></Route> {/* Teoretisk ståsted page */}
        <Route path="/cv" element={<StandardPage title={"cv"} />}></Route> {/* CV page */}
        <Route path="/booksandarticles" element={<Booksandarticles />}></Route> {/* Bøger og artikler page */}
        <Route path="/kunder" element={<StandardPage title={"kunder"} />}></Route> {/* Kunder page */}
        {/* Konsulentydelser dropdown */}
        <Route path="/proceskonsultation" element={<StandardPage title={"proceskonsultation"} />}></Route> {/* Proceskonsultation page */}
        <Route path="/anerkendende coaching" element={<StandardPage title={"anerkendende coaching"} />}></Route> {/* Coaching af enkeltpersoner eller team page */}
        <Route path="/teamudvikling" element={<StandardPage title={"teamudvikling"} />}></Route> {/* Teamudvikling page */}
        <Route path="/netværksfacilitering" element={<StandardPage title={"netværksfacilitering"} />}></Route> {/* Netværksfacilitering page */}
        <Route path="/ledelsesudvikling" element={<StandardPage title={"ledelsesudvikling"} />}></Route> {/* Ledelsesudvikling page */}
        <Route path="/4R ledelsesudvikling" element={<StandardPage title={"4R ledelsesudvikling"} />}></Route> {/* 4R Ledelsesudvikling page */}
        <Route path="/interne uddannelsesforløb" element={<StandardPage title={"nterne uddannelsesforløb"} />}></Route> {/* Interne uddannelsesforløb page */}
        <Route path="*" element={<h1>Site Not Found</h1>}></Route>
        <Route path="/admin" element={<Admin />}></Route>
      </Routes>
      <ToastContainer /> {/* React Toastify Container */}
      <Footer />
    </div>
  );
}
