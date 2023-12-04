import { Routes, Route } from "react-router-dom";
import Header from "./components/Navbar";
import Calendar from "./pages/Calendar";
import Booking from "./pages/Booking.jsx";
import Home from "./pages/Home";
import About from "./pages/About";
import CV from "./pages/CV";
import Edit from "./pages/CKEditor";
import Booksandarticles from "./pages/BooksAndArticles";
import Theory from "./pages/Theory";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import "./App.css";
// import calendar from "./pages/calendar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <Header /> {/* Navbar */}
      <Routes>
        <Route path="/" element={<Home />}></Route> {/* Home page */}
        <Route path="/contact" element={<Contact />}></Route> {/* Contact page */}
        <Route path="/about" element={<About />}></Route> {/* About page */}
        <Route path="/calendar" element={<Calendar />}></Route> {/* Calendar page */}
        <Route path="/booking" element={<Booking />}></Route> {/* Booking page */}
        <Route path="/edit" element={<Edit />}></Route> {/* Booking page */}
        <Route path="/theory" element={<Theory />}></Route> {/* Teoretisk ståsted page */}
        <Route path="/cv" element={<CV />}></Route> {/* CV page */}
        <Route path="/booksandarticles" element={<Booksandarticles />}></Route> {/* Bøger og artikler page */}
        <Route path="*" element={<h1>Not Found</h1>}></Route>
        <Route path="/admin" element={<Admin/>}></Route>
        <Route path="/bookings" element={<Booking/>}></Route>
      </Routes>
      <ToastContainer /> {/* React Toastify Container */}
    </>
  );
}
