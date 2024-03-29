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
    const value = e.target.value;
    const newValue = value
      .replace(/ii/g, "ī")
      .replace(/ee/g, "ē")
      .replace(/aa/g, "ā")
      .replace(/oo/g, "ō")
      .replace(/yy/g, "ȳ")
      .replace(/uu/g, "ū");

    setValue(newValue);
    onChange(e);
  };

  return (
    <div className={` bg-white-custom flex items-center rounded-sm  shadow-xl `}>
      <FaSearch className={`ml-2 transform rotate-90`} color="rgba(0,0,0,0.2)" size="30px" />
      <input
        placeholder="Search a glyph..."
        type="text"
        name="search"
        id="search"
        value={value}
        onChange={handleChange}
        autoComplete="off"
        className={`w-full ${
          mobileView ? `p-2` : `p-4`
        } bg-white-custom  font-semibold text-dark  focus:outline-none  sm:text-md`}
      />
      <MdClose onClick={handleCloseButton} className="mr-2 hover:cursor-pointer " color="rgba(0,0,0,0.2)" size="30px" />
    </div>
  );
};

export default Search;
