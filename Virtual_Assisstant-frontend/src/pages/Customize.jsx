import React, { useRef, useEffect, useContext } from "react";
import { UserDataContext } from "../context/userContext";
import Card from "../components/cards";
import { GrDocumentUpload } from "react-icons/gr";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/authBg.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.jpeg";
import image7 from "../assets/image7.jpeg";
import {useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

const Customize = () => {
    const navigate = useNavigate();
  const {
    frontendImage,
    setFrontendImage,
    backendImage,
    setBackendImage,
    selectedImage,
    setSelectedImage
  } = useContext(UserDataContext);

  const inputImage = useRef(null);

  // handle upload
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);

    setBackendImage(file);
    setFrontendImage(preview);
    setSelectedImage("upload"); // mark upload card as selected
  };

  // cleanup object URL
  useEffect(() => {
    return () => {
      if (frontendImage) URL.revokeObjectURL(frontendImage);
    };
  }, [frontendImage]);

  return (
  <div className="min-h-screen w-full bg-gradient-to-t from-black to-blue-500 px-4 sm:px-8 lg:px-10 py-6 sm:py-8 flex flex-col gap-6 sm:gap-10 relative">

    {/* Back Button */}
    <MdArrowBack 
      className="text-white absolute top-6 left-4 sm:left-8 w-7 h-7 sm:w-8 sm:h-8 cursor-pointer"
      onClick={() => navigate("/signin")}
    />

    {/* Heading */}
    <h1 className="text-center text-white text-xl sm:text-2xl lg:text-3xl font-semibold">
      Welcome to{" "}
      <span className="text-black bg-white px-2 rounded-md">
        Assistant Image
      </span>
    </h1>

    {/* Cards Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 place-items-center">

      <Card img={image1} className="w-[140px] h-[210px] sm:w-[180px] sm:h-[260px] lg:w-[200px] lg:h-[300px]" />
      <Card img={image2} className="w-[140px] h-[210px] sm:w-[180px] sm:h-[260px] lg:w-[200px] lg:h-[300px]" />
      <Card img={image3} className="w-[140px] h-[210px] sm:w-[180px] sm:h-[260px] lg:w-[200px] lg:h-[300px]" />
      <Card img={image4} className="w-[140px] h-[210px] sm:w-[180px] sm:h-[260px] lg:w-[200px] lg:h-[300px]" />
      <Card img={image5} className="w-[140px] h-[210px] sm:w-[180px] sm:h-[260px] lg:w-[200px] lg:h-[300px]" />
      <Card img={image6} className="w-[140px] h-[210px] sm:w-[180px] sm:h-[260px] lg:w-[200px] lg:h-[300px]" />
      <Card img={image7} className="w-[140px] h-[210px] sm:w-[180px] sm:h-[260px] lg:w-[200px] lg:h-[300px]" />

      {/* Upload Card */}
      <div
        onClick={() => {
          inputImage.current.click();
          setSelectedImage("upload");
        }}
        className={`
          w-[140px] h-[210px] sm:w-[180px] sm:h-[260px] lg:w-[200px] lg:h-[300px]
          bg-[#030326] rounded-2xl flex items-center justify-center cursor-pointer overflow-hidden
          transition-all duration-300
          ${
            selectedImage === "upload"
              ? "border-4 border-white shadow-2xl shadow-blue-950"
              : "border-2 border-blue-500 hover:border-white hover:shadow-2xl hover:shadow-blue-950"
          }
        `}
      >
        {!frontendImage ? (
          <GrDocumentUpload className="text-white text-4xl sm:text-5xl lg:text-6xl" />
        ) : (
          <img
            src={frontendImage}
            alt="uploaded"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={inputImage}
        className="hidden"
        onChange={handleImage}
      />
    </div>

    {/* Next Button */}
    <div className="flex justify-center">
      <button
        onClick={() => navigate("/customize2")}
        hidden={!selectedImage}
        className={`
          cursor-pointer text-base sm:text-lg lg:text-xl
          px-6 sm:px-8 lg:px-10 py-2 sm:py-3 rounded-2xl border-2 transition-all duration-300
          ${
            selectedImage
              ? "text-white hover:bg-white hover:text-black"
              : "text-gray-400 border-gray-400 cursor-not-allowed"
          }
        `}
      >
        Next
      </button>
    </div>

  </div>
);
}
export default Customize;
