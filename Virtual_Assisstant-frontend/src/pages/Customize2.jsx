import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/userContext";
import axios from "axios";
import { MdArrowBack } from "react-icons/md";
const Customize2 = () => {
    const[loading,setLoading]=useState(false);
  const navigate = useNavigate();

  const {
    userData,
    backendImage,
    selectedImage,
    serverUrl,
    setUserData
  } = useContext(UserDataContext);

  const [assistantName, setAssistantName] = useState(
    userData?.assistantName || ""
  );

  const handleUpdateAssistant = async () => {
    try {
      const formData = new FormData();
      formData.append("assistantName", assistantName);

      if (backendImage) {
        formData.append("assistantImage", backendImage);
      } else {
        formData.append("imageUrl", selectedImage);
      }

      const result = await axios.post(
        `${serverUrl}/api/auth/user/update`,
        formData,
        { withCredentials: true }
      );
      console.log("API RESPONSE:", result.data);
      // update context user
      setUserData(result.data);
 
      navigate("/Home"); 

    } catch (error) {
      console.error(
        "Error updating assistant:",
        error.response?.data || error.message
      );
    }
  };
return (
  <div className="min-h-screen w-full bg-gradient-to-t from-black to-blue-900 px-4 sm:px-8 lg:px-10 py-6 sm:py-8 flex flex-col gap-8 sm:gap-10 relative">

    {/* Back Button */}
    <MdArrowBack 
      className="text-white absolute top-6 left-4 sm:left-8 w-7 h-7 sm:w-8 sm:h-8 cursor-pointer"
      onClick={() => navigate("/customize")}
    />

    {/* Heading */}
    <h1 className="text-center text-white text-xl sm:text-2xl lg:text-3xl font-semibold mt-16 sm:mt-24">
      Enter Your{" "}
      <span className="text-black bg-white px-2 rounded-md">
        Assistant Name
      </span>
    </h1>

    {/* Input */}
    <div className="flex justify-center">
      <input
        type="text"
        placeholder="eg. Shifra"
        className="
          w-full sm:w-[80%] md:w-[60%] lg:w-[600px]
          h-[50px] sm:h-[60px]
          outline-none border-2 border-white bg-transparent
          text-white placeholder-gray-300 px-5 rounded-full
          text-[16px] sm:text-[18px]
        "
        required
        onChange={(e) => setAssistantName(e.target.value)}
        value={assistantName}
      />
    </div>

    {/* Button */}
    {assistantName && (
      <div className="flex justify-center">
        <button
          className="
            w-full sm:w-[300px]
            h-[50px] sm:h-[60px]
            mt-4 sm:mt-6
            text-black font-semibold cursor-pointer
            bg-white rounded-full
            text-[16px] sm:text-[19px]
            hover:bg-gray-200 transition
          "
          disabled={loading}
          onClick={handleUpdateAssistant}
        >
          {loading ? "Loading..." : "Finally Create Your Assistant"}
        </button>
      </div>
    )}

  </div>
);
}
export default Customize2;
