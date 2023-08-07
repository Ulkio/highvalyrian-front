import { React, useState, useMemo, useEffect } from "react";
import Search from "@c/Search";
import Theme from "@c/Theme";
import Card from "@c/Card";
import CardDetails from "@c/CardDetails";
import Loading from "@c/Loading";

import { getWords, getThemes } from "../api";
import { useQuery } from "@tanstack/react-query";
import { useMediaQuery } from "react-responsive";

const Words = () => {
  const isAboveMediumScreens = useMediaQuery({ query: `(min-width:1024px)` });
  const isAboveMobileScreens = useMediaQuery({ query: `(min-width:768px)` });
  const [selectedWord, setSelectedWord] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [modalOnScreen, setModalOnScreen] = useState(false);

  const { isLoading: isLoadingWords, data: words } = useQuery({
    queryKey: ["words"],
    queryFn: getWords,
    staleTime: 60 * 1000,
  });
  const { isLoading: isLoadingThemes, data: themes } = useQuery({
    queryKey: ["themes"],
    queryFn: getThemes,
    staleTime: 60 * 1000,
  });

  const filteredWords = useMemo(() => {
    if (!words) return;
    return words
      .filter(
        (word) =>
          searchValue.toLowerCase() === "" ||
          word.englishTranslation.toLowerCase().includes(searchValue.toLowerCase()) ||
          word.valyrianTranslation.toLowerCase().includes(searchValue.toLowerCase())
      )
      .filter((word) => selectedTheme === null || word.classId?.includes(selectedTheme?._id));
  }, [words, searchValue, selectedTheme]);

  useEffect(() => {
    if (!modalOnScreen && selectedWord) {
      setSelectedWord(null);
    }
  }, [modalOnScreen]);

  useEffect(() => {
    if (selectedWord && !isAboveMediumScreens) setModalOnScreen(true);
  }, [selectedWord]);

  const handleSearchInput = (event) => {
    const value = event.target.value;
    const newValue = value
      .replace(/ii/g, "ī")
      .replace(/ee/g, "ē")
      .replace(/aa/g, "ā")
      .replace(/oo/g, "ō")
      .replace(/yy/g, "ȳ")
      .replace(/uu/g, "ū");

    setSearchValue(newValue);
  };

  if (isLoadingWords) return <Loading />;
  return (
    <section
      className={`mt-16 pt-4 flex scrollbar-none overflow-x-hidden justify-center h-screen lg:bg-gradient-primary ${
        modalOnScreen === true ? `overflow-y-hidden` : `overflow-y-scroll`
      }`}>
      {/* DESKTOP  */}
      {isAboveMediumScreens ? (
        <>
          <div className="w-full ml-24 basis-6/12">
            <div className="h-full flex justify-center items-center">
              {selectedWord && (
                <CardDetails showModal={() => null} glyph={selectedWord} themeId={selectedWord.classId} type="words" />
              )}
            </div>
          </div>
          <div className="w-full basis-5/12 ">
            <div className="ml-20 flex flex-col items-center ">
              <Search onChange={handleSearchInput} onErase={() => setSearchValue("")} />
              <p className="text-xs">For diacritics, type 2 vowels ! </p>
              <div className=" my-2 flex gap-2 flex-wrap justify-center font-semibold uppercase">
                {!isLoadingThemes && (
                  <p
                    onClick={() => setSelectedTheme(null)}
                    className={`${!selectedTheme && `bg-theme-background `} px-5 py-2 hover:cursor-pointer`}>
                    All
                  </p>
                )}
                {themes
                  ?.filter((theme) => theme.name !== "Alphabet" && theme.name !== "Number")
                  .map((theme, key) => (
                    <Theme
                      onClick={() => setSelectedTheme(theme)}
                      theme={theme}
                      key={key}
                      highlight={theme === selectedTheme}
                    />
                  ))}
              </div>
            </div>
            {isLoadingWords ? (
              <div className="h-64 self-center flex flex-col justify-center items-center ">
                <img src="/assets/Spinner-1.4s-200px.svg" />
              </div>
            ) : (
              <div className="flex flex-wrap gap-2 justify-center py-2 h-[60vh] mr-4 scrollbar scrollbar-thumb-black scrollbar-track-red-900">
                {filteredWords?.map((word, key) => (
                  <Card onClick={() => setSelectedWord(word)} glyph={word} key={key} type="words" />
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="h-full flex justify-center items-center">
            {selectedWord && (
              <CardDetails
                showModal={(e) => setModalOnScreen(e)}
                glyph={selectedWord}
                themeId={selectedWord.classId}
                type="words"
              />
            )}
          </div>
          <div>
            <div className="flex flex-col items-center overflow-hidden scrollbar-none">
              <Search mobileView onChange={handleSearchInput} onErase={() => setSearchValue("")} />
              <p className="text-xs">For diacritics, type 2 vowels ! </p>

              <div className="text-xs px-2 flex flex-wrap justify-evenly font-semibold uppercase">
                {!isLoadingThemes && (
                  <p
                    onClick={() => setSelectedTheme(null)}
                    className={`${!selectedTheme && `bg-theme-background `} px-5 py-2 hover:cursor-pointer`}>
                    All
                  </p>
                )}
                {themes
                  ?.filter((theme) => theme.name !== "Alphabet" && theme.name !== "Number")
                  .map((theme, key) => (
                    <Theme
                      onClick={() => setSelectedTheme(theme)}
                      theme={theme}
                      key={key}
                      highlight={theme === selectedTheme}
                    />
                  ))}
              </div>
              {isLoadingWords ? (
                <div className="flex flex-col">
                  <img src="/assets/Spinner-1.4s-200px.svg" />
                </div>
              ) : (
                <div
                  className={`border-t-[1px] py-4 border-split-red w-full scrollbar h-[60vh] grid ${
                    isAboveMobileScreens ? `grid-cols-3` : `grid-cols-2`
                  } gap-4  place-items-center`}>
                  {filteredWords?.map((word, key) => (
                    <Card mobileView onClick={() => setSelectedWord(word)} glyph={word} key={key} type="words" />
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
};
export default Words;
