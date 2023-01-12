import Navbar from "@c/Navbar";
import About from "@p/About";
import Phrases from "@p/Phrases";
import Builder from "@p/Builder";
import Glyphs from "@p/Glyphs";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Glyphs />} />
        <Route path="/phrases" element={<Phrases />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
