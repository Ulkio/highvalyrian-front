import { React, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getWords, getNumbers, getCharacters } from "../api";
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

  if (isLoadingCharacters || isLoadingNumbers || isLoadingWords) return <Loading />;

  return (
    <section className={`mt-16 px-8 h-screen flex flex-row gap-8`}>
      <div className="flex flex-col  gap-8 px-16 basis-3/5 overflow-scroll">
        <p className="text-center font-bold">Separator</p>
        <div className="flex flex-wrap justify-center gap-4">
          {words
            ?.filter((gl) => gl.englishTranslation === "middot")
            .map((filteredCharacter) => (
              <div
                onClick={() => handleClickGlyph(filteredCharacter)}
                className="flex flex-col justify-center items-center text-center cursor-pointer">
                <img
                  className="w-16 h-16 object-scale-down invert"
                  src={`https://highvalyrianapi.onrender.com/assets/words/0176-middot.png`}
                  width={20}
                  height={20}
                  alt="separator"
                />
              </div>
            ))}
        </div>

        <p className="font-bold">Alphabet</p>
        <div className="flex flex-wrap justify-center gap-4">
          {characters?.map((gl) => {
            return (
              <div
                onClick={() => handleClickGlyph(gl)}
                className="flex flex-col justify-center items-center text-center  cursor-pointer ">
                <p className="text-sm select-none">{gl.englishTranslation}</p>
                <img
                  className="w-8 h-8 object-scale-down invert"
                  src={`https://highvalyrianapi.onrender.com/assets/characters/${gl.imagePath}`}
                  width={20}
                  height={20}
                  alt={gl.englishTranslation}
                />
              </div>
            );
          })}
        </div>
        <p className="mt-16 font-bold">Numbers</p>
        <div className="flex flex-wrap justify-center gap-4">
          {numbers?.map((gl) => {
            return (
              <div
                onClick={() => handleClickGlyph(gl)}
                className="flex flex-col justify-center items-center text-center  cursor-pointer ">
                <p className="text-sm select-none">{gl.englishTranslation}</p>
                <img
                  className="w-8 h-8 object-scale-down invert"
                  src={`https://highvalyrianapi.onrender.com/assets/numbers/${gl.imagePath}`}
                  width={20}
                  height={20}
                  alt={gl.englishTranslation}
                />
              </div>
            );
          })}
        </div>
        <p className="mt-16 font-bold">Words</p>
        <div className="flex flex-wrap justify-around gap-4 ">
          {words?.map((gl) => {
            return (
              <div
                onClick={() => handleClickGlyph(gl)}
                className="flex flex-col justify-center items-center text-center  cursor-pointer  p-2 ">
                <p className="text-sm select-none">{gl.englishTranslation}</p>
                <img
                  className="w-8 h-8 object-scale-down invert"
                  src={`https://highvalyrianapi.onrender.com/assets/words/${gl.imagePath}`}
                  width={20}
                  height={20}
                  alt={gl.englishTranslation}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-6 self-center basis-2/5">
        <div className="flex flex-row self-center justify-center items-center">
          {builtWord?.map((gl) => {
            return <p>{gl.valyrianTranslation + " "} </p>;
          })}
        </div>

        <div className="flex flex-row self-center justify-center items-center">
          <img className="w-16 h-16 object-scale-down invert" src={`${BASE_URL}/assets/words/0066-doubledot.png`} />
          {builtWord?.map((gl) => {
            return (
              <img
                className="w-10 h-10 object-scale-down invert"
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
          <img className="w-16 h-16 object-scale-down invert" src={`${BASE_URL}/assets/words/0066-doubledot.png`} />
        </div>
        <div className="flex flex-row self-center justify-center items-center">
          <span>Meaning : </span>
          {builtWord?.map((gl) => {
            return <p>{gl.englishTranslation === "middot" ? " " : gl.englishTranslation + " "}</p>;
          })}
        </div>
        <div className="justify-center items-center flex">
          <button className=" bg-split-red  text-white font-bold py-2 px-4 rounded" onClick={() => setBuiltWord([])}>
            RESET
          </button>
        </div>
      </div>
    </section>
  );
};

export default Builder;
