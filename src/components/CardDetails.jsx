import { React, useEffect, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTheme } from "../api";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

const BASE_URL = "https://highvalyrianapi.onrender.com";
// const BASE_URL =
//   process.env.NODE_ENV === "development" ? "http://localhost:3001" : "https://highvalyrianapi.onrender.com";

const CardDetails = ({ glyph, themeId, showModal }) => {
  const isAboveMediumScreens = useMediaQuery({ query: `(min-width:1024px)` });

  const { valyrianTranslation, englishTranslation, prefix, imagePath, info, example, alphabet } = glyph;
  const [glyphThemeId, setGlyphThemeId] = useState(themeId);

  const { data: theme } = useQuery({
    enabled: glyphThemeId !== null,
    queryKey: ["theme", glyphThemeId],
    queryFn: () => getTheme(glyphThemeId),
  });

  useEffect(() => {
    setGlyphThemeId(themeId);
  }, [glyph]);

  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (!isAboveMediumScreens) {
      // if (ref.current && !ref.current.contains(event.target)) {
      //   showModal(false);
      // } else {
      //   showModal(true);
      // }
      showModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
  }, []);

  return (
    <article>
      {isAboveMediumScreens ? (
        <>
          <motion.div
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
            className="select-none flex flex-col items-center gap-4">
            <p className="first-letter:uppercase font-semibold text-3xl">
              {valyrianTranslation === "" ? "?" : valyrianTranslation}
            </p>
            <div className="shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] bg-white-custom w-[320px] h-[480px] text-dark rounded-2xl  flex flex-col justify-evenly p-4 ">
              <img
                className="self-center w-[300px] h-[300px] object-scale-down"
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
                {alphabet && <p className="text-sm fm">Phonetic : [ {alphabet} ]</p>}
              </div>
            </div>
            <p className="h-8 first-letter:uppercase italic text-sm text-center">{example}</p>
          </motion.div>
        </>
      ) : (
        <div className="mt-16 absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-screen overflow-hidden w-screen flex justify-center items-center bg-black bg-opacity-80">
          <div ref={ref} className="flex flex-col items-center justify-center gap-4 relative ">
            <p className="first-letter:uppercase font-semibold text-3xl">
              {valyrianTranslation === "" ? "?" : valyrianTranslation}
            </p>
            <div className="bg-white-custom w-[240px] h-[360px] text-dark rounded-2xl shadow-xl flex flex-col justify-evenly py-4 ">
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
          </div>
        </div>
      )}
    </article>
  );
};

export default CardDetails;
