import { React, useState, useMemo, useRef, useEffect } from "react";
import Search from "@c/Search";
import Theme from "@c/Theme";
import Card from "@c/Card";
import CardDetails from "@c/CardDetails";
import { getGlyphs, getThemes } from "../api";
import { useQuery } from "@tanstack/react-query";
import { useMediaQuery } from "react-responsive";

const Glyphs = () => {
  const isAboveMediumScreens = useMediaQuery({ query: `(min-width:1024px)` });
  const isAboveMobileScreens = useMediaQuery({ query: `(min-width:768px)` });
  const [selectedGlyph, setSelectedGlyph] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [modalOnScreen, setModalOnScreen] = useState(false);

  const { isLoading: isLoadingGlyphs, data: glyphs } = useQuery({
    queryKey: ["glyphs"],
    queryFn: getGlyphs,
  });
  const { isLoading: isLoadingThemes, data: themes } = useQuery({
    queryKey: ["themes"],
    queryFn: getThemes,
  });

  const filteredGlyphs = useMemo(() => {
    if (!glyphs) return;
    return glyphs
      .filter(
        (gl) =>
          searchValue.toLowerCase() === "" || gl.englishTranslation.toLowerCase().includes(searchValue.toLowerCase())
      )
      .filter((gl) => selectedTheme === null || gl.classId?.includes(selectedTheme?._id));
  }, [glyphs, searchValue, selectedTheme]);

  useEffect(() => {
    if (!modalOnScreen && selectedGlyph) {
      setSelectedGlyph(null);
    }
  }, [modalOnScreen]);

  useEffect(() => {
    if (selectedGlyph && !isAboveMediumScreens) setModalOnScreen(true);
  }, [selectedGlyph]);

  return (
    <section
      className={`mt-16 pt-4 flex overflow-x-hidden justify-center h-screen lg:bg-gradient-primary ${
        modalOnScreen === true ? `overflow-y-hidden` : `overflow-y-scroll`
      }`}>
      {/* DESKTOP  */}
      {isAboveMediumScreens ? (
        <>
          <div className="w-full ml-24 basis-6/12">
            <div className="h-full flex justify-center items-center">
              {selectedGlyph && (
                <CardDetails showModal={() => null} glyph={selectedGlyph} themeId={selectedGlyph.classId} />
              )}
            </div>
          </div>
          <div className="w-full basis-5/12 ">
            <div className="mx-20 flex flex-col items-center ">
              <Search onChange={(e) => setSearchValue(e.target.value)} onErase={() => setSearchValue("")} />
              <div className=" my-2 flex gap-2 flex-wrap justify-center font-semibold uppercase">
                {!isLoadingThemes && (
                  <p
                    onClick={() => setSelectedTheme(null)}
                    className={`${
                      !selectedTheme && `bg-theme-background `
                    }rounded-full px-5 py-2 hover:cursor-pointer`}>
                    All
                  </p>
                )}
                {themes?.map((theme, key) => (
                  <Theme
                    onClick={() => setSelectedTheme(theme)}
                    theme={theme}
                    key={key}
                    highlight={theme === selectedTheme}
                  />
                ))}
              </div>
            </div>
            {isLoadingGlyphs ? (
              <div className="h-64 self-center flex flex-col justify-center items-center ">
                <h4>First loading may take a few seconds. Please wait :-)</h4>
                <img src="/assets/Spinner-1.4s-200px.svg" />
              </div>
            ) : (
              <div className="flex flex-wrap gap-6 justify-center py-2 h-[70vh] mr-4 scrollbar scrollbar-thumb-black scrollbar-track-red-900">
                {filteredGlyphs?.map((glyph, key) => (
                  <Card onClick={() => setSelectedGlyph(glyph)} glyph={glyph} key={key} />
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="h-full flex justify-center items-center">
            {selectedGlyph && (
              <CardDetails
                showModal={(e) => setModalOnScreen(e)}
                glyph={selectedGlyph}
                themeId={selectedGlyph.classId}
              />
            )}
          </div>
          <div>
            <div className="flex flex-col items-center gap-4 overflow-hidden scrollbar-none">
              <Search mobileView onChange={(e) => setSearchValue(e.target.value)} onErase={() => setSearchValue("")} />
              <div className="text-sm px-6 flex gap-4 flex-wrap justify-center font-semibold uppercase">
                {!isLoadingThemes && (
                  <p
                    onClick={() => setSelectedTheme(null)}
                    className={`${
                      !selectedTheme && `bg-theme-background `
                    }rounded-full px-5 py-2 hover:cursor-pointer`}>
                    All
                  </p>
                )}
                {themes?.map((theme, key) => (
                  <Theme
                    onClick={() => setSelectedTheme(theme)}
                    theme={theme}
                    key={key}
                    highlight={theme === selectedTheme}
                  />
                ))}
              </div>
              {isLoadingGlyphs ? (
                <div className="flex flex-col">
                  <h4>First loading may take a few seconds. Please wait :-)</h4>
                  <img src="/assets/Spinner-1.4s-200px.svg" />
                </div>
              ) : (
                <div
                  className={`border-t-[1px] py-4 border-split-red w-full  scrollbar h-[60vh] grid ${
                    isAboveMobileScreens ? `grid-cols-3` : `grid-cols-2`
                  } gap-6 place-items-center`}>
                  {filteredGlyphs?.map((glyph, key) => (
                    <Card mobileView onClick={() => setSelectedGlyph(glyph)} glyph={glyph} key={key} />
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
export default Glyphs;
