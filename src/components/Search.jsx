import React from "react";
import { FaSearch } from "react-icons/fa";

const Search = ({ onChange }) => {
  return (
    <div className="w-[50%]  relative bg-white-custom flex items-center  rounded-full">
      <FaSearch className="absolute left-2 transform rotate-90" color="rgba(0,0,0,0.2)" size="30px" />
      <input
        placeholder="Search a glyph..."
        type="text"
        name="search"
        id="search"
        onChange={onChange}
        className="w-full p-4 font-semibold text-dark rounded-full py-4 pl-12 pr-3  focus:outline-none focus:border-sky-500 focus:dark focus:ring-4 sm:text-md"
      />
    </div>
  );
};

export default Search;
