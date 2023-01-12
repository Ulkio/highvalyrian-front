import React from "react";
import { Link } from "react-router-dom";
import useMediaQuery from "../hooks/useMediaQuery";
import menuIcon from "../assets/menuIcon.png";

const Navbar = () => {
  const isAboveMobileScreens = useMediaQuery("(min-width:768px)");

  return (
    <nav className="bg-navbar-dark w-full fixed top-0 z-40 ">
      <div className="flex justify-between items-center md:px-24 mx-auto h-16">
        <h4 className="font-bold md:text-lg">{isAboveMobileScreens && <Link to="/">HIGH VALYRIAN GLYPHS</Link>}</h4>
        {isAboveMobileScreens ? (
          <div className="flex justify-between gap-16 text-sm font-semibold">
            {/* <Link to="/">Glyphs</Link> */}
            {/* <Link to="/phrases">Phrases</Link>
            <Link to="/builder">Builder</Link>
            <Link to="/about">About</Link> */}
          </div>
        ) : (
          <div className="px-8">
            <img src={menuIcon} alt="menu" className="h-[32px]" />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
