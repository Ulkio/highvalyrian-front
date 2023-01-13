import { React, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTheme } from "../api";
import { motion } from "framer-motion";

const BASE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:3001" : "https://highvalyrianapi.onrender.com";

const CardDetails = ({ glyph, themeId }) => {
  const { valyrianTranslation, englishTranslation, prefix, imagePath, info, example } = glyph;
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
    <motion.article
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 1 }}
      variants={{
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
      }}
      className="flex flex-col items-center gap-4">
      <p className="first-letter:uppercase font-semibold text-3xl">
        {valyrianTranslation === "" ? "?" : valyrianTranslation}
      </p>
      <div className="bg-white-custom w-[320px] h-[480px] text-dark rounded-2xl shadow-xl flex flex-col justify-evenly py-4 ">
        <img
          className="self-center w-[240px] h-[240px] object-scale-down"
          src={`${BASE_URL}/assets/${imagePath}`}
          alt={valyrianTranslation}
        />
        <p className="first-letter:uppercase text-center font-semibold text-2xl">
          {englishTranslation === "" ? "?" : englishTranslation}
        </p>
        <div className="flex flex-col px-4">
          <p className="text-sm capitalize">Prefix : {prefix === "" ? "?" : `${prefix}-`}</p>
          <p className="text-sm capitalize">Class : {theme?.name}</p>
          <p className="text-sm capitalize">Infos : {info === "" ? "?" : info}</p>
        </div>
      </div>
      <p className="h-8 first-letter:uppercase italic text-sm text-center">{example}</p>
    </motion.article>
  );
};

export default CardDetails;
