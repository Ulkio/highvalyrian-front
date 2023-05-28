import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

const Loading = () => {
  const isAboveMobileScreens = useMediaQuery({ query: `(min-width:768px)` });
  const [showInfos, setShowInfos] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowInfos(true);
    }, 3000);

    return () => {
      setShowInfos(false);
    };
  }, []);

  return (
    <section className="mt-16 pt-4 flex mx-8 items-center h-screen lg:bg-gradient-primary">
      {isAboveMobileScreens ? (
        <>
          <div className="basis-6/12 "></div>
          <div className="flex flex-col items-center w-1/2 basis-6/12">
            <div className="h-36 w-36">
              <img src="assets/Spinner-1.4s-200px.svg" />
            </div>
            {showInfos && (
              <h4 className="text-white text-center w-1/2">
                Loading data... The glyphs may not appear for a few seconds, please wait. As our website is currently
                hosted for free, the database may go to sleep if there are no recent queries. We apologize for any
                inconvenience caused and appreciate your patience.
              </h4>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col justify-center w-full items-center ">
            <div className="h-36 w-36">
              <img src="assets/Spinner-1.4s-200px.svg" />
            </div>
            {showInfos && (
              <h4 className="text-white text-center px-4">
                Loading data... The glyphs may not appear for a few seconds, please wait. As our website is currently
                hosted for free, the database may go to sleep if there are no recent queries. We apologize for any
                inconvenience caused and appreciate your patience.
              </h4>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default Loading;
