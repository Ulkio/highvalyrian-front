import { React, useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getWords, getNumbers, getCharacters } from "../api";
import Card from "@c/Card";
import Loading from "@c/Loading";

const Builder = () => {
  const BASE_URL =
    process.env.NODE_ENV === "development" ? "http://localhost:3001" : "https://highvalyrianapi.onrender.com";
  const { isLoading: isLoadingCharacters, data: characters } = useQuery({
    queryKey: ["characters"],
    queryFn: getCharacters,
    staleTime: 60 * 1000,
  });
  const { isLoading: isLoadingNumbers, data: numbers } = useQuery({
    queryKey: ["numbers"],
    queryFn: getNumbers,
    staleTime: 60 * 1000,
  });
  const { isLoading: isLoadingWords, data: words } = useQuery({
    queryKey: ["words"],
    queryFn: getWords,
    staleTime: 60 * 1000,
  });

  const [builtWord, setBuiltWord] = useState([]);

  const handleClickGlyph = (gl) => {
    setBuiltWord((prev) => [...prev, gl]);
  };

  const glyphs = useMemo(() => {
    if (!words || !numbers || !characters) return;
    return characters.concat(numbers.concat(words));
  }, [words, characters, numbers]);
  console.log(characters);

  if (!glyphs) return <Loading />;
  return (
    <section className={`mt-16 pt-4  overflow-x-hidden  h-screen flex flex-row gap-8`}>
      <div className="flex flex-wrap justify-between gap-4 px-8 basis-3/5  overflow-scroll">
        {glyphs?.map((gl, key) => {
          return (
            <div
              onClick={() => handleClickGlyph(gl)}
              key={key}
              className="flex flex-col justify-center items-center text-center  cursor-pointer  w-16">
              <p className="text-sm select-none">{gl.englishTranslation}</p>
              <img
                className="w-8 h-8 object-scale-down invert"
                src={`${BASE_URL}/assets/${
                  gl.classId === "645567522c371064ed627267"
                    ? "numbers"
                    : gl.classId === "645567522c371064ed627268"
                    ? "characters"
                    : "words"
                }/${gl.imagePath}`}
                alt=""
              />
            </div>
          );
        })}
      </div>
      <div className="self-center basis-2/5">
        <div className="flex flex-row self-center justify-center items-center">
          {builtWord?.map((gl) => {
            return <p>{gl.valyrianTranslation + " "} </p>;
          })}
        </div>

        <div className="flex flex-row self-center justify-center items-center">
          <img className="w-16 h-16 object-scale-down invert" src={`${BASE_URL}/assets/words/doubledot.png`} />
          {builtWord?.map((gl) => {
            return (
              <img
                className="w-16 h-16 object-scale-down invert"
                src={`${BASE_URL}/assets/${
                  gl.classId === "645567522c371064ed627267"
                    ? "numbers"
                    : gl.classId === "645567522c371064ed627268"
                    ? "characters"
                    : "words"
                }/${gl.imagePath}`}
              />
            );
          })}
          <img className="w-16 h-16 object-scale-down invert" src={`${BASE_URL}/assets/words/doubledot.png`} />
        </div>
        <div className="flex flex-row self-center justify-center items-center">
          <span>Meaning : </span>
          {builtWord?.map((gl) => {
            return <p>{gl.englishTranslation + " "} </p>;
          })}
        </div>
        <div
          className="cursor-pointer self-center justify-center items-center flex w-full"
          onClick={() => setBuiltWord([])}>
          Reset
        </div>
      </div>
    </section>
  );
};

export default Builder;
