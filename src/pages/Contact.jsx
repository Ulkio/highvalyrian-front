import React from "react";
import { motion } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";

const Contact = () => {
  const [state, handleSubmit] = useForm("mzbqzaer");
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
  const sentPopup = {
    hidden: { opacity: 0, y: 100 },
    show: {
      opacity: 1,
      y: -100,
      transition: {
        repeat: 1,
        repeatType: "reverse",
        repeatDelay: 3,
        duration: 0.5,
      },
    },
  };
  return (
    <section className="mt-16 pt-4 h-screen flex justify-center items-center ">
      <motion.form
        initial="hidden"
        animate="show"
        variants={container}
        className="md:w-[800px] flex flex-col justify-center gap-4 md:gap-8"
        action="https://formspree.io/f/mzbqzaer"
        onSubmit={handleSubmit}>
        <motion.input
          className="bg-white-custom rounded-sm p-4 text-dark focus:outline-none"
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          variants={input}
        />
        <ValidationError prefix="Name" field="name" errors={state.errors} />
        <motion.input
          className="bg-white-custom rounded-sm p-4 text-dark focus:outline-none"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          variants={input}
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
        <motion.textarea
          className="bg-white-custom rounded-sm p-4 text-dark focus:outline-none "
          name="message"
          id=""
          cols="30"
          rows="5"
          maxLength={1000}
          placeholder="Your message"
          variants={input}
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} />

        <motion.button
          className="self-center w-full md:w-1/2 border-split-red border-2 py-2 md:py-4 font-semibold text-2xl rounded-sm bg-split-red hover:scale-105 transition duration-200 "
          type="submit"
          variants={button}>
          SEND
        </motion.button>
        {state.succeeded && (
          <motion.p
            initial="hidden"
            animate="show"
            variants={sentPopup}
            className={` fixed bottom-0 self-center  border-split-red border-2 p-4 font-semibold text-lg rounded-sm bg-split-red`}>
            Message sent !
          </motion.p>
        )}
        {state.errors.length > 0 && (
          <motion.p
            initial="hidden"
            animate="show"
            variants={sentPopup}
            className={` fixed bottom-0 self-center  border-split-red border-2 p-4 font-semibold text-lg rounded-sm bg-split-red`}>
            Error !
          </motion.p>
        )}
      </motion.form>
    </section>
  );
};

export default Contact;
