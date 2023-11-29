import { Routes, Route } from "react-router-dom";
import Header from "./components/Navbar";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import CV from "./pages/CV";
import Booksandarticles from "./pages/BooksAndArticles";
import "./App.css";
import Theory from "./pages/Theory";

export default function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/theory" element={<Theory />}></Route>
        <Route path="/cv" element={<CV />}></Route>
        <Route path="/booksandarticles" element={<Booksandarticles />}></Route>
        <Route path="*" element={<h1>Not Found</h1>}></Route>
      </Routes>
    </>
  );
}
