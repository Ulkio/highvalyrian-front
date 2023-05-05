import { React, useState, useMemo, useEffect } from "react";
import Card from "@c/Card";
import CardDetails from "@c/CardDetails";
import { getCharacters } from "../api";
import { useQuery } from "@tanstack/react-query";
import { useMediaQuery } from "react-responsive";

const Characters = () => {
  const isAboveMediumScreens = useMediaQuery({ query: `(min-width:1024px)` });
  const isAboveMobileScreens = useMediaQuery({ query: `(min-width:768px)` });
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [modalOnScreen, setModalOnScreen] = useState(false);

  const { isLoading: isLoadingCharacters, data: characters } = useQuery({
    queryKey: ["characters"],
    queryFn: getCharacters,
    staleTime: 60 * 1000,
  });

  const filteredCharacters = useMemo(() => {
    if (!characters) return;
    return characters;
  }, [characters]);

  useEffect(() => {
    if (!modalOnScreen && selectedCharacter) {
      setSelectedCharacter(null);
    }
  }, [modalOnScreen]);

  useEffect(() => {
    if (selectedCharacter && !isAboveMediumScreens) setModalOnScreen(true);
  }, [selectedCharacter]);

  if (isLoadingCharacters) return <h1>Loading</h1>;
  return (
    <section
      className={` flex scrollbar-none overflow-x-hidden items-center justify-center h-screen lg:bg-gradient-primary ${
        modalOnScreen === true ? `overflow-y-hidden` : `overflow-y-scroll`
      }`}>
      {/* DESKTOP  */}
      {isAboveMediumScreens ? (
        <>
          <div className="w-full ml-24 basis-6/12">
            <div className="h-full flex justify-center items-center">
              {selectedCharacter && <CardDetails showModal={() => null} glyph={selectedCharacter} type="characters" />}
            </div>
          </div>
          <div className="w-full basis-5/12 ">
            {isLoadingCharacters ? (
              <div className="h-64 self-center flex flex-col justify-center items-center ">
                <h4>First loading may take a few seconds. Please wait :-)</h4>
                <img src="/assets/Spinner-1.4s-200px.svg" />
              </div>
            ) : (
              <div className="flex flex-wrap gap-2 justify-center py-2 h-[70vh] mr-4 scrollbar scrollbar-thumb-black scrollbar-track-red-900">
                {filteredCharacters?.map((character, key) => (
                  <Card onClick={() => setSelectedCharacter(character)} glyph={character} key={key} type="characters" />
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="h-full flex justify-center items-center">
            {selectedCharacter && (
              <CardDetails showModal={(e) => setModalOnScreen(e)} glyph={selectedCharacter} type="characters" />
            )}
          </div>
          <div>
            <div className="flex flex-col items-center gap-4 overflow-hidden scrollbar-none">
              {isLoadingCharacters ? (
                <div className="flex flex-col">
                  <h4>First loading may take a few seconds. Please wait :-)</h4>
                  <img src="/assets/Spinner-1.4s-200px.svg" />
                </div>
              ) : (
                <div
                  className={`py-4 w-full scrollbar h-[70vh] grid ${
                    isAboveMobileScreens ? `grid-cols-3` : `grid-cols-2`
                  } gap-6 place-items-center`}>
                  {filteredCharacters?.map((character, key) => (
                    <Card
                      mobileView
                      onClick={() => setSelectedCharacter(character)}
                      glyph={character}
                      key={key}
                      type="characters"
                    />
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
export default Characters;
