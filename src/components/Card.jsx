import React from "react";

let BASE_URL = "";
if (import.meta.env.DEV) BASE_URL = "http://localhost:3001";
if (import.meta.env.PROD) BASE_URL = "https://highvalyrianapi.onrender.com";

const Card = ({ glyph, onClick }) => {
  return (
    <article
      onClick={onClick}
      className="bg-white-custom w-[160px] h-[240px] text-dark rounded-2xl shadow-xl flex flex-col items-center justify-between py-4 hover:cursor-pointer">
      <p className="first-letter:uppercase">{glyph.valyrianTranslation === "" ? "?" : glyph.valyrianTranslation}</p>
      <img
        className="w-32 h-32 object-scale-down"
        src={`${BASE_URL}/assets/${glyph.imagePath}`}
        alt={glyph.valyrianTranslation}
      />
      <p className="first-letter:uppercase">{glyph.englishTranslation === "" ? "?" : glyph.englishTranslation}</p>
    </article>
  );
};

export default Card;