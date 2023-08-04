import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:3001" : "https://highvalyrianapi.onrender.com";

export const getWords = async () => {
  const results = await axios.get(`${BASE_URL}/words`);
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
export const postWord = async (formData) => {
  await axios.post(`${BASE_URL}/words`, formData, { headers: { "Content-Type": "multipart/form-data" } });
};

export const getNumbers = async () => {
  const results = await axios.get(`${BASE_URL}/numbers`);
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
export const getCharacters = async () => {
  const results = await axios.get(`${BASE_URL}/characters`);
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
