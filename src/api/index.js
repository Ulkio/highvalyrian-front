import axios from "axios";

const BASE_URL = "https://highvalyrianapi.onrender.com";
// const BASE_URL =
//   process.env.NODE_ENV === "development" ? "http://localhost:3001" : "https://highvalyrianapi.onrender.com";

export const getGlyphs = async () => {
  const results = await axios.get(`${BASE_URL}/glyphs`);
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
  const results = await axios.get(`${BASE_URL}/classes`);
  return results.data;
};
export const getTheme = async (id) => {
  const results = await axios.get(`${BASE_URL}/classes/${id}`);
  return results.data;
};
