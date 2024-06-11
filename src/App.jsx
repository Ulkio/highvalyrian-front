import Navbar from "@c/Navbar";
import Footer from "@c/Footer";
import Builder from "@p/Builder";
import Words from "@p/Words";
import Characters from "@p/Characters";
import Numbers from "@p/Numbers";
import Contact from "@p/Contact";
import NotFound from "@p/NotFound";
import Login from "@p/Login";
import Admin from "@p/Admin";
import { useMediaQuery } from "react-responsive";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
function App() {
  const isAboveMediumScreens = useMediaQuery({ query: `(min-width:1024px)` });

  return (
    <div className="app">
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Words />} />
          <Route path="/alphabet" element={<Characters />} />
          <Route path="/numbers" element={<Numbers />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
      {isAboveMediumScreens && <Footer />}
    </div>
  );
}

export default App;
