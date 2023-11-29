import { Routes, Route } from "react-router-dom";
import Header from "./components/Navbar";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import CV from "./pages/CV";
import Booksandarticles from "./pages/BooksAndArticles";
import Admin from "./pages/Admin";
import "./App.css";
import { AuthProvider } from "./components/AuthContext";

export default function App() {
  return (
    <>
    <AuthProvider>
      <Header />

      <Routes>
        <Route path="/" element={<Home  />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/cv" element={<CV  />}></Route>
          <Route
            path="/booksandarticles"
            element={<Booksandarticles />}
          ></Route>
          <Route path="*" element={<h1>Not Found</h1>}></Route>
          <Route path="/admin" element={<Admin/>}></Route>
      </Routes>
      </AuthProvider>
    </>
  );
}
