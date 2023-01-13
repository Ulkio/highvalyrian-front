import { React } from "react";
import { NavLink, useLocation } from "react-router-dom";
import useMediaQuery from "../hooks/useMediaQuery";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  const isAboveMobileScreens = useMediaQuery("(min-width:768px)");
  const pathname = useLocation().pathname;

  return (
    <nav className="bg-navbar-dark w-full sticky top-0 z-50">
      <div className="flex justify-between items-center h-16 md:px-24">
        <h1 className="font-bold md:text-lg">
          {isAboveMobileScreens && <NavLink to="/">HIGH VALYRIAN GLYPHS</NavLink>}
        </h1>
        {isAboveMobileScreens ? (
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
          <div className="px-8">
            <FaBars className="text-white h-8 cursor-pointer" size="30px" />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
