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

  const handleAddCharacter = (char) => {
    const newValue = value + char;
    setValue(newValue);
    onChange({ target: { value: newValue } });
  };

  return (
  <div className="flex gap-4">
    <div className={` bg-white-custom flex items-center rounded-lg  shadow-xl `}>
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
    <div className="flex items-center justify-center gap-4 ">
    {["ā", "ō", "ȳ", "ū"].map((char) => (
          <p
            key={char}
            onClick={() => handleAddCharacter(char)}
            className={`${
              mobileView
                ? `rounded-md border-split-red bg-split-red px-3 py-2 shadow-md`
                : `border-2 border-dark px-3 py-2 rounded-md shadow-md hover:scale-110 hover:cursor-pointer transition duration-100 select-none`
            }`}
          >
            {char}
          </p>
        ))}
    </div>
  </div>
  );
};

export default Search;
