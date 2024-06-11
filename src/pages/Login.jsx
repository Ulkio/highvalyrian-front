import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, error, logout, currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/admin");
    } catch {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const input = {
    hidden: { x: -100, opacity: 0 },
    show: { x: 0, opacity: 1 },
  };
  const button = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  return (
    <section className="h-screen flex flex-col justify-center gap-8 items-center ">
      <p>
        This part is reserved for administration. Please contact us if you have
        any questions !
      </p>
      {error && <p>{error}</p>}
      <motion.form
        initial="hidden"
        animate="show"
        variants={container}
        className="md:w-[800px] flex flex-col justify-center gap-4 md:gap-8"
        onSubmit={handleSubmit}
      >
        <motion.input
          className="bg-white-custom p-4 rounded-lg text-dark focus:outline-none"
          type="email"
          ref={emailRef}
          placeholder="Email"
          variants={input}
          required
        />
        <motion.input
          className="bg-white-custom p-4 rounded-lg text-dark focus:outline-none"
          type="password"
          ref={passwordRef}
          placeholder="Password"
          variants={input}
          required
        />
        <motion.button
          className="self-center w-64 rounded-lg border-split-red border-2 p-2 font-semibold text-2xl bg-split-red hover:scale-105 transition duration-200"
          type="submit"
          disabled={loading}
          variants={button}
        >
          Log in
        </motion.button>
      </motion.form>
      {currentUser && (
        <button
          onClick={handleLogout}
          className="self-center w-64 rounded-lg border-split-red border-2 p-2 font-semibold text-2xl bg-split-red hover:scale-105 transition duration-200 "
        >
          Log out
        </button>
      )}
    </section>
  );
};

export default Login;
