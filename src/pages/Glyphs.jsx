import { React, useState, useEffect } from "react";
import Search from "@c/Search";
import Theme from "@c/Theme";
import Card from "@c/Card";
import CardDetails from "@c/CardDetails";
import { getGlyphs, getThemes } from "../api";
import { useQuery } from "@tanstack/react-query";

const Glyphs = () => {
  const [selectedGlyph, setSelectedGlyph] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const { data: glyphs } = useQuery({
    queryKey: ["glyphs"],
    queryFn: getGlyphs,
  });
  const { isLoading: isLoadingThemes, data: themes } = useQuery({
    queryKey: ["themes"],
    queryFn: getThemes,
  });

  return (
    <section className="pt-24 flex justify-between h-screen bg-gradient-primary overflow-hidden">
      {/* LEFT */}
      <div className="w-full ml-24 basis-6/12">
        <div className="h-full flex justify-center items-center">
          {selectedGlyph && <CardDetails glyph={selectedGlyph} themeId={selectedGlyph.classId} />}
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full basis-5/12 scrollbar-track-black ">
        <div className="ml-20 flex flex-col items-center ">
          <Search value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
          {isLoadingThemes && <h1>Loading...</h1>}
          <div className=" mt-2 flex gap-2 flex-wrap justify-center">
            <p
              onClick={() => setSelectedTheme(null)}
              className="bg-theme-background rounded-full px-5 py-2 hover:cursor-pointer">
              All
            </p>
            {themes?.map((theme, key) => (
              <Theme onClick={() => setSelectedTheme(theme)} theme={theme} key={key} />
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-1 flex-wrap gap-6 justify-center overflow-scroll h-[70vh] overflow-x-hidden mr-4 scrollbar-thin scrollbar-thumb-black  scrollbar-track-red-900 ">
          {glyphs
            ?.filter((gl) => {
              return searchValue.toLocaleLowerCase() === ""
                ? gl
                : gl.englishTranslation.toLowerCase().includes(searchValue);
            })
            .filter((gl) => {
              return selectedTheme === null ? gl : gl.classId?.includes(selectedTheme?._id);
            })
            .map((glyph, key) => (
              <Card onClick={() => setSelectedGlyph(glyph)} glyph={glyph} key={key} />
            ))}
        </div>
      </div>
    </section>
  );
};
export default Glyphs;
