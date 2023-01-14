import { React } from "react";

const BASE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:3001" : "https://highvalyrianapi.onrender.com";

const Card = ({ glyph, onClick }) => {
  return (
    <article
      onClick={onClick}
      className="text-center bg-white-custom w-[160px] h-[240px]  text-dark rounded-2xl shadow-xl flex flex-col items-center justify-between py-4 hover:cursor-pointer hover:scale-[1.02] transition duration-100">
      <p className="first-letter:uppercase">{glyph.valyrianTranslation === "" ? "?" : glyph.valyrianTranslation}</p>
      <img
        className="h-24 lg:h-32 object-scale-down"
        src={`${BASE_URL}/assets/${glyph.imagePath}`}
        alt={glyph.valyrianTranslation}
      />
      <p className="first-letter:uppercase">{glyph.englishTranslation === "" ? "?" : glyph.englishTranslation}</p>
    </article>
  );
};

export default Card;
