import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Store from "./pages/Store";
// import About from "./pages/About";
import "./App.css";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/contact" element={<Contact/>}></Route>
          <Route path="/store" element={<Store/>}></Route>
          <Route path="*" element={<h1>Not Found</h1>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
