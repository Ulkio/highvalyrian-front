import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const Search = ({ onChange, onErase, mobileView }) => {
  const [value, setValue] = useState("");

  const handleCloseButton = () => {
    setValue("");
    onErase();
  };
  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(e);
  };

  return (
    <div className={`bg-white-custom flex items-center rounded-full ${mobileView ? `fixed` : `relative`}`}>
      <FaSearch className="absolute left-2 transform rotate-90" color="rgba(0,0,0,0.2)" size="30px" />
      <input
        placeholder="Search a glyph..."
        type="text"
        name="search"
        id="search"
        value={value}
        onChange={handleChange}
        className="w-full p-4 font-semibold text-dark rounded-full py-4 px-12 focus:outline-none focus:border-sky-500 focus:dark focus:ring-4 sm:text-md"
      />
      <MdClose
        onClick={handleCloseButton}
        className="hover:cursor-pointer absolute right-2"
        color="rgba(0,0,0,0.2)"
        size="30px"
      />
    </div>
  );
};

export default Search;
