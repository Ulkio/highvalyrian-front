import { React, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { FaBars } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser } = useAuth();
  const isAboveMediumScreens = useMediaQuery({ query: `(min-width:1024px)` });
  const pathname = useLocation().pathname;
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  return (
    <nav className="lg:bg-navbar-dark bg-split-red w-full fixed top-0 ">
      <div className="flex justify-between items-center  h-16 lg:px-24 px-6">
        <h1 className="z-100 font-bold lg:text-lg">
          {<NavLink to="/">HIGH VALYRIAN GLYPHS</NavLink>}
        </h1>
        {isAboveMediumScreens ? (
          <div className="flex justify-between gap-16 text-sm font-semibold">
            <NavLink
              to="/"
              className={`text-white ${
                pathname === "/" ? "border-b-[1px] pb-2" : ""
              }`}
            >
              Words
            </NavLink>
            <NavLink
              to="/alphabet"
              className={`text-white ${
                pathname === "/alphabet" ? "border-b-[1px] pb-2" : ""
              }`}
            >
              Alphabet
            </NavLink>
            <NavLink
              to="/numbers"
              className={`text-white ${
                pathname === "/numbers" ? "border-b-[1px] pb-2" : ""
              }`}
            >
              Numbers
            </NavLink>

            <NavLink
              to="/contact"
              className={`text-white ${
                pathname === "/contact" ? "border-b-[1px] pb-2" : ""
              }`}
            >
              Contact
            </NavLink>

            <NavLink
              to="/login"
              className={`text-white ${
                pathname === "/login" ? "border-b-[1px] pb-2" : ""
              }`}
            >
              Manage
            </NavLink>
            {currentUser && (
              <NavLink
                to="/admin"
                className={`text-white ${
                  pathname === "/admin" ? "border-b-[1px] pb-2" : ""
                }`}
              >
                Admin page
              </NavLink>
            )}
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
              className={`z-auto rounded-b-3xl fixed right-0 h-full w-64 uppercase font-semibold  text-white-custom bg-split-red flex flex-col justify-evenly px-4  ${
                !isMobileNavOpen && "hidden"
              }`}
            >
              <NavLink
                to="/"
                className={`text-white ${
                  pathname === "/" ? "border-b-[1px] pb-2" : ""
                }`}
              >
                Words
              </NavLink>
              <NavLink
                to="/alphabet"
                className={`text-white ${
                  pathname === "/alphabet" ? "border-b-[1px] pb-2" : ""
                }`}
              >
                Alphabet
              </NavLink>
              <NavLink
                to="/numbers"
                className={`text-white ${
                  pathname === "/numbers" ? "border-b-[1px] pb-2" : ""
                }`}
              >
                Numbers
              </NavLink>
              <NavLink
                to="/builder"
                className={`text-white ${
                  pathname === "/builder" ? "border-b-[1px] pb-2" : ""
                }`}
              >
                Builder <span className="text-[10px]">(WIP)</span>
              </NavLink>
              <NavLink
                to="/contact"
                className={`text-white ${
                  pathname === "/contact" ? "border-b-[1px] pb-2" : ""
                }`}
              >
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
