import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Booksandarticles from "./pages/BooksAndArticles";
import About from "./pages/About";
import "./App.css";

export default function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route
            path="/booksandarticles"
            element={<Booksandarticles />}
          ></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="*" element={<h1>Not Found</h1>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
