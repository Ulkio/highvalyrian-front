import { React } from "react";
import { NavLink, useLocation } from "react-router-dom";
import useMediaQuery from "../hooks/useMediaQuery";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width:1024px)");

  const pathname = useLocation().pathname;

  return (
    <nav className="lg:bg-navbar-dark bg-split-red w-full sticky top-0 z-50">
      <div className="flex justify-between items-center  h-16 lg:px-24 px-6">
        <h1 className="font-bold lg:text-lg">{<NavLink to="/">HIGH VALYRIAN GLYPHS</NavLink>}</h1>
        {isAboveMediumScreens ? (
          <div className="flex justify-between gap-16 text-sm font-semibold">
            <NavLink to="/" className={`text-white ${pathname === "/" ? "border-b-[1px] pb-2" : ""}`}>
              Glyphs
            </NavLink>
            {/* <NavLink to="/phrases" className="text-white">
              Phrases
            </NavLink>
            <NavLink to="/builder" className="text-white">
              Builder
            </NavLink>
            <NavLink to="/about" className="text-white">
              About
            </NavLink> */}
            <NavLink to="/contact" className={`text-white ${pathname === "/contact" ? "border-b-[1px] pb-2" : ""}`}>
              Contact
            </NavLink>
          </div>
        ) : (
          <div>
            <FaBars className="text-white h-8 cursor-pointer" size="30px" />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
