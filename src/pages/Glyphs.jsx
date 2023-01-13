import { React, useState, useMemo } from "react";
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

  return (
    <section className="pt-4 flex justify-between md:h-[calc(100vh_-_5rem)] bg-gradient-primary ">
      {/* LEFT */}

      <div className="w-full ml-24 basis-6/12">
        <div className="h-full flex justify-center items-center">
          {selectedGlyph && <CardDetails glyph={selectedGlyph} themeId={selectedGlyph.classId} />}
        </div>
      </div>

      {/* RIGHT */}

      <div className="w-full basis-5/12 scrollbar-track-black ">
        <div className="ml-20 flex flex-col items-center ">
          <Search onChange={(e) => setSearchValue(e.target.value)} onErase={() => setSearchValue("")} />
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
        {isLoadingGlyphs ? (
          <div className="h-64 self-center flex justify-center items-center text-center">
            <img src="/assets/Spinner-1.4s-200px.svg" />
          </div>
        ) : (
          <div className="flex flex-wrap gap-6 justify-center py-2 mt-8 h-[70vh] mr-4 scrollbar-thin scrollbar-thumb-black scrollbar-track-red-900">
            {filteredGlyphs?.map((glyph, key) => (
              <Card onClick={() => setSelectedGlyph(glyph)} glyph={glyph} key={key} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default Glyphs;
