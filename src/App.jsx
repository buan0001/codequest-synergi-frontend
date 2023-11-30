import { Routes, Route } from "react-router-dom";
import Header from "./components/Navbar";
import Calendar from "./pages/Calendar";
import Home from "./pages/Home";
import About from "./pages/About";
import CV from "./pages/CV";
import Booksandarticles from "./pages/BooksAndArticles";
import Theory from "./pages/Theory";
import Contact from "./pages/Contact";
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
        <Route path="/theory" element={<Theory />}></Route> {/* Teoretisk ståsted page */}
        <Route path="/cv" element={<CV />}></Route> {/* CV page */}
        <Route path="/booksandarticles" element={<Booksandarticles />}></Route> {/* Bøger og artikler page */}
        <Route path="*" element={<h1>Not Found</h1>}></Route>
      </Routes>
      <ToastContainer /> {/* React Toastify Container */}
    </>
  );
}
