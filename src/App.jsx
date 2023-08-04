import Navbar from "@c/Navbar";
import Footer from "@c/Footer";
import About from "@p/About";
import Phrases from "@p/Phrases";
import Builder from "@p/Builder";
import Words from "@p/Words";
import Characters from "@p/Characters";
import Numbers from "@p/Numbers";
import Contact from "@p/Contact";
import NotFound from "@p/NotFound";
import Admin from "@p/Admin";
import { useMediaQuery } from "react-responsive";

import { Routes, Route } from "react-router-dom";

function App() {
  const isAboveMediumScreens = useMediaQuery({ query: `(min-width:1024px)` });

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Words />} />
        <Route exact path="/alphabet" element={<Characters />} />
        <Route exact path="/numbers" element={<Numbers />} />
        <Route path="/phrases" element={<Phrases />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="/about" element={<About />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      {isAboveMediumScreens && <Footer />}
    </div>
  );
}

export default App;
