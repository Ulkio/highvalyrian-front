import { React, useState, useMemo, useEffect } from "react";
import Card from "@c/Card";
import CardDetails from "@c/CardDetails";
import Loading from "@c/Loading";

import { getNumbers } from "../api";
import { useQuery } from "@tanstack/react-query";
import { useMediaQuery } from "react-responsive";

const Numbers = () => {
  const isAboveMediumScreens = useMediaQuery({ query: `(min-width:1024px)` });
  const isAboveMobileScreens = useMediaQuery({ query: `(min-width:768px)` });
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [modalOnScreen, setModalOnScreen] = useState(false);

  const { isLoading: isLoadingNumbers, data: numbers } = useQuery({
    queryKey: ["numbers"],
    queryFn: getNumbers,
    staleTime: 60 * 1000,
  });

  const filteredNumbers = useMemo(() => {
    if (!numbers) return;
    return numbers;
  }, [numbers]);

  useEffect(() => {
    if (!modalOnScreen && selectedNumber) {
      setSelectedNumber(null);
    }
  }, [modalOnScreen]);

  useEffect(() => {
    if (selectedNumber && !isAboveMediumScreens) setModalOnScreen(true);
  }, [selectedNumber]);

  if (isLoadingNumbers) return <Loading />;
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
              {selectedNumber && <CardDetails showModal={() => null} glyph={selectedNumber} type="numbers" />}
            </div>
          </div>
          <div className="w-full basis-5/12 ">
            {isLoadingNumbers ? (
              <div className="h-64 self-center flex flex-col justify-center items-center ">
                <img src="/assets/Spinner-1.4s-200px.svg" />
              </div>
            ) : (
              <div className="flex flex-wrap gap-2 justify-center py-2 h-[70vh] mr-4 scrollbar scrollbar-thumb-black scrollbar-track-red-900">
                {filteredNumbers?.map((number, key) => (
                  <Card onClick={() => setSelectedNumber(number)} glyph={number} key={key} type="numbers" />
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="h-full flex justify-center items-center">
            {selectedNumber && (
              <CardDetails showModal={(e) => setModalOnScreen(e)} glyph={selectedNumber} type="numbers" />
            )}
          </div>
          <div>
            <div className="flex flex-col items-center gap-4 overflow-hidden scrollbar-none">
              {isLoadingNumbers ? (
                <div className="flex flex-col">
                  <img src="/assets/Spinner-1.4s-200px.svg" />
                </div>
              ) : (
                <div
                  className={`py-4 w-full scrollbar h-[70vh] grid ${
                    isAboveMobileScreens ? `grid-cols-3` : `grid-cols-2`
                  } gap-6 place-items-center`}>
                  {filteredNumbers?.map((number, key) => (
                    <Card
                      mobileView
                      onClick={() => setSelectedNumber(number)}
                      glyph={number}
                      key={key}
                      type="numbers"
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
export default Numbers;
