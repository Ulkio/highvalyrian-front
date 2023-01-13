import Navbar from "@c/Navbar";
import Footer from "@c/Footer";
import About from "@p/About";
import Phrases from "@p/Phrases";
import Builder from "@p/Builder";
import Glyphs from "@p/Glyphs";
import Contact from "@p/Contact";
import useMediaQuery from "./hooks/useMediaQuery";
import { Routes, Route } from "react-router-dom";

function App() {
  const isAboveMobileScreens = useMediaQuery("(min-width:768px)");
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Glyphs />} />
        <Route path="/phrases" element={<Phrases />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      {isAboveMobileScreens && <Footer />}
    </div>
  );
}

export default App;
