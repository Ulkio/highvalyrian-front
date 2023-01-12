import axios from "axios";

export const getGlyphs = async () => {
  const results = await axios.get(`http://localhost:3001/glyphs`);
  const sortedResults = results.data.sort(function (a, b) {
    if (a.englishTranslation == b.englishTranslation) return 0;
    if (a.englishTranslation == "") return 1;
    if (b.englishTranslation == "") return -1;

    if (a.englishTranslation < b.englishTranslation) return -1;
    if (a.englishTranslation > b.englishTranslation) return 1;
    return 0;
  });
  return sortedResults;
};
export const getThemes = async () => {
  const results = await axios.get(`http://localhost:3001/classes`);
  return results.data;
};
export const getTheme = async (id) => {
  const results = await axios.get(`http://localhost:3001/classes/${id}`);
  return results.data;
};
