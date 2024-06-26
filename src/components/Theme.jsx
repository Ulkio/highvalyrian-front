import { React } from "react";

const Theme = ({ theme, onClick, highlight }) => {
  return (
    <p onClick={onClick} className={`${highlight && `bg-theme-background`}  px-5 py-2 hover:cursor-pointer rounded-lg`}>
      {theme.name}
    </p>
  );
};

export default Theme;
