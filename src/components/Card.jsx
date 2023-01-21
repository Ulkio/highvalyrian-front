import { React } from "react";

const BASE_URL = "https://highvalyrianapi.onrender.com";
// const BASE_URL =
//   process.env.NODE_ENV === "development" ? "http://localhost:3001" : "https://highvalyrianapi.onrender.com";

const Card = ({ glyph, onClick, mobileView }) => {
  return (
    <article
      onClick={onClick}
      className={`select-none ${
        mobileView ? `w-[120px] h-[180px]` : `w-[160px] h-[240px]`
      }  text-center bg-white-custom  text-dark  flex flex-col items-center justify-between py-4 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]
         hover:cursor-pointer hover:scale-[1.02] transition duration-100`}>
      <p className="first-letter:uppercase">{glyph.valyrianTranslation === "" ? "?" : glyph.valyrianTranslation}</p>
      <img
        className={`lg:h-32 object-scale-down ${mobileView ? `h-16 ` : `h-24 `}`}
        src={`${BASE_URL}/assets/${glyph.imagePath}`}
        alt={glyph.valyrianTranslation}
      />
      <p className="first-letter:uppercase">{glyph.englishTranslation === "" ? "?" : glyph.englishTranslation}</p>
    </article>
  );
};

export default Card;
