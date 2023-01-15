import Navbar from "@c/Navbar";
import Footer from "@c/Footer";
import About from "@p/About";
import Phrases from "@p/Phrases";
import Builder from "@p/Builder";
import Glyphs from "@p/Glyphs";
import Contact from "@p/Contact";
import NotFound from "@p/NotFound";
import { useMediaQuery } from "react-responsive";

import { Routes, Route } from "react-router-dom";

function App() {
  const isAboveMediumScreens = useMediaQuery({ query: `(min-width:1024px)` });

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Glyphs />} />
        <Route path="/phrases" element={<Phrases />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      {isAboveMediumScreens && <Footer />}
    </div>
  );
}

export default App;
