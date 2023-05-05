import { React, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { FaBars } from "react-icons/fa";
import { motion } from "framer-motion";

const Navbar = () => {
  const isAboveMediumScreens = useMediaQuery({ query: `(min-width:1024px)` });
  const pathname = useLocation().pathname;
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <nav className="lg:bg-navbar-dark bg-split-red w-full fixed top-0 ">
      <div className="flex justify-between items-center  h-16 lg:px-24 px-6">
        <h1 className="z-100 font-bold lg:text-lg">{<NavLink to="/">HIGH VALYRIAN GLYPHS</NavLink>}</h1>
        {isAboveMediumScreens ? (
          <div className="flex justify-between gap-16 text-sm font-semibold">
            <NavLink to="/" className={`text-white ${pathname === "/" ? "border-b-[1px] pb-2" : ""}`}>
              Words
            </NavLink>
            <NavLink
              to="/characters"
              className={`text-white ${pathname === "/characters" ? "border-b-[1px] pb-2" : ""}`}>
              Characters
            </NavLink>
            <NavLink to="/numbers" className={`text-white ${pathname === "/numbers" ? "border-b-[1px] pb-2" : ""}`}>
              Numbers
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
            <FaBars
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              className="text-white h-8 cursor-pointer"
              size="30px"
            />
            <motion.div
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.1 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              className={`z-50 rounded-b-3xl fixed right-0 h-64 w-64 uppercase font-semibold  text-white-custom bg-split-red flex flex-col justify-center items-end px-4 gap-8 ${
                !isMobileNavOpen && "hidden"
              }`}>
              <NavLink to="/" className="">
                Glyphs
              </NavLink>
              {/* <NavLink to="/phrases" className="border-b-2">
                Phrases
              </NavLink>
              <NavLink to="/builder" className="border-b-2">
                Builder
              </NavLink>
              <NavLink to="/about" className="border-b-2">
                About
              </NavLink> */}
              <NavLink to="/contact" className="">
                Contact
              </NavLink>
            </motion.div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
