import axios from "axios";

let BASE_URL = "";
if (import.meta.env.DEV) BASE_URL = "http://localhost:3001";
if (import.meta.env.PROD) BASE_URL = "https://highvalyrianapi.onrender.com";

export const getGlyphs = async () => {
  console.log(import.meta);
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
