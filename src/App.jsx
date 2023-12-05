import { Routes, Route } from "react-router-dom";
import Header from "./components/Navbar";
import Home from "./pages/Home";
import CV from "./pages/CV";
import Edit from "./pages/CKEditor";
import Booksandarticles from "./pages/BooksAndArticles";
import Theory from "./pages/Theory";
import Kunder from "./pages/Kunder";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Booking from "./pages/Booking";
import Footer from "./components/Footer";
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
        <Route path="/booking" element={<Booking />}></Route> {/*Booking page*/}
        <Route path="/edit" element={<Edit />}></Route> {/* Booking page */}
        <Route path="/theory" element={<Theory />}></Route> {/* Teoretisk ståsted page */}
        <Route path="/cv" element={<CV />}></Route> {/* CV page */}
        <Route path="/booksandarticles" element={<Booksandarticles />}></Route> {/* Bøger og artikler page */}
        <Route path="/kunder" element={<Kunder />}></Route> {/* Kunder page */}
        <Route path="*" element={<h1>Not Found</h1>}></Route>
        <Route path="/admin" element={<Admin />}></Route>
      </Routes>
      <ToastContainer /> {/* React Toastify Container */}
      <Footer />
    </>
  );
}
