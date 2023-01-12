import { React, useState } from "react";

const Theme = ({ theme, onClick }) => {
  return (
    <p onClick={onClick} className="bg-theme-background rounded-full px-5 py-2 hover:cursor-pointer">
      {theme.name}
    </p>
  );
};

export default Theme;
