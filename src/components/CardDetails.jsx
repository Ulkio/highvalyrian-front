import { React, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTheme } from "../api";

let BASE_URL = "";
if (import.meta.env.DEV) BASE_URL = "http://localhost:3001";
if (import.meta.env.PROD) BASE_URL = "https://highvalyrianapi.onrender.com";

const CardDetails = ({ glyph, themeId }) => {
  const [glyphThemeId, setGlyphThemeId] = useState(themeId);

  const { data: theme } = useQuery({
    enabled: glyphThemeId !== null,
    queryKey: ["theme", glyphThemeId],
    queryFn: () => getTheme(glyphThemeId),
  });

  useEffect(() => {
    setGlyphThemeId(themeId);
  }, [glyph]);

  return (
    <article className="flex flex-col items-center gap-4">
      <p className="first-letter:uppercase font-semibold text-3xl">
        {glyph.valyrianTranslation === "" ? "?" : glyph.valyrianTranslation}
      </p>
      <div className="bg-white-custom w-[320px] h-[480px] text-dark rounded-2xl shadow-xl flex flex-col justify-evenly py-4 ">
        <img
          className="self-center w-[240px] h-[240px] object-scale-down"
          src={`${BASE_URL}/assets/${glyph.imagePath}`}
          alt={glyph.valyrianTranslation}
        />
        <p className="first-letter:uppercase text-center font-semibold text-2xl">
          {glyph.englishTranslation === "" ? "?" : glyph.englishTranslation}
        </p>
        <div className="flex flex-col px-4">
          <p className="text-sm capitalize">Prefix : {glyph.prefix === "" ? "?" : `${glyph.prefix}-`}</p>
          <p className="text-sm capitalize">Class : {theme?.name}</p>
          <p className="text-sm capitalize">Infos : {glyph.info === "" ? "?" : glyph.info}</p>
        </div>
      </div>
      <p className="h-8 first-letter:uppercase italic text-sm text-center">{glyph.example}</p>
    </article>
  );
};

export default CardDetails;
