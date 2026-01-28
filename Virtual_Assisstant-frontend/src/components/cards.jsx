import React, { useContext } from "react";
import { UserDataContext } from "../context/userContext";

const Card = ({ img, className }) => {
  const { selectedImage, setSelectedImage,frontendImage,setFrontendImage,backendImage,setBackendImage } = useContext(UserDataContext);

  return (
    <div
      onClick={() => {setSelectedImage(img)
        setFrontendImage(null)
        setBackendImage(null)}
      }
      className={`
        ${className}
        bg-[#030326]
        border-2
        rounded-2xl
        overflow-hidden
        cursor-pointer
        transition-all duration-300
        ${
          selectedImage === img
            ? "border-white shadow-2xl shadow-blue-950 scale-105"
            : "border-blue-500 hover:border-white hover:shadow-xl hover:shadow-blue-950"
        }
      `}
    >
      <img
        src={img}
        alt="card image"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Card;
