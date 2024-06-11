import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getThemes, postWord } from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Admin = () => {
  const { isLoading, data: themes } = useQuery({
    queryKey: ["themes"],
    queryFn: getThemes,
    staleTime: 60 * 1000,
  });

  const [formData, setFormData] = useState({
    valyrianTranslation: "",
    englishTranslation: "",
    info: "",
    classId: "",
    imagePath: null,
  });

  const [file, setFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("valyrianTranslation", formData.valyrianTranslation);
    data.append("englishTranslation", formData.englishTranslation);
    data.append("info", formData.info);
    data.append("classId", formData.classId);
    data.append("imagePath", file);
    try {
      await postWord(data);
      setFormData({
        valyrianTranslation: "",
        englishTranslation: "",
        info: "",
        classId: "",
        imagePath: null,
      });
      setFile(null);
      toast.success("Success !", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <section className="lg:bg-gradient-primary h-screen flex justify-center ">
      <form
        onSubmit={handleSubmit}
        method="POST"
        className="md:w-[800px] flex flex-col justify-center gap-4 md:gap-6"
      >
        <label className="font-bold" htmlFor="valyrianTranslation">
          Valyrian translation
        </label>
        <input
          className="bg-white-custom rounded-sm p-4 text-dark focus:outline-none"
          type="text"
          name="valyrianTranslation"
          value={formData.valyrianTranslation}
          onChange={handleInputChange}
          required
        />
        <label className="font-bold" htmlFor="englishTranslation">
          English translation
        </label>
        <input
          className="bg-white-custom rounded-sm p-4 text-dark focus:outline-none"
          type="text"
          name="englishTranslation"
          value={formData.englishTranslation}
          onChange={handleInputChange}
          required
        />
        <label className="font-bold" htmlFor="info">
          Information
        </label>
        <input
          className="bg-white-custom rounded-sm p-4 text-dark focus:outline-none"
          type="text"
          name="info"
          value={formData.info}
          onChange={handleInputChange}
        />
        <label className="font-bold" htmlFor="classId">
          Class
        </label>
        <select
          className="bg-white-custom rounded-sm p-4 text-dark focus:outline-none"
          name="classId"
          id="classId"
          value={formData.classId}
          onChange={handleInputChange}
        >
          {themes?.map((theme) => {
            return (
              <option className="text-dark" value={theme._id} key={theme._id}>
                {theme.name}
              </option>
            );
          })}
        </select>
        <div className="w-full flex justify-center">
          <input
            onChange={handleFileChange}
            name="imagePath"
            type="file"
            accept="image/png"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
      />
    </section>
  );
};

export default Admin;
