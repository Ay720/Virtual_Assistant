import React, { useContext, useState } from 'react'
import bg from "../assets/authBg.png"
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { IoMdEye } from "react-icons/io";
import { useNavigate } from "react-router-dom"
import { UserDataContext } from '../context/userContext.jsx';
import axios from 'axios';
import { useEffect } from "react";

const Signin = () => {
    let err = "";
  const [showPassword, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[error,setErr] = useState("");
  const[loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const {serverUrl,userData,setUserData} = useContext(UserDataContext);
  useEffect(() => {
  if (userData) {
    navigate("/Home");
  }
}, [userData]);

const handleSignin = async(e) =>
{ e.preventDefault();
  setLoading(true);
  setErr("");
    try 
    {
        setLoading(false);
        let result = await axios.post(`${serverUrl}/api/auth/login`,
            {email,password},{withCredentials:true}
        )
        setUserData(result.data);
        console.log(userData);
        
    } 
    catch (error) 
    {
      
        console.error("Error during signin:", error);
        setLoading(false);
        setUserData(null);
        setErr(error.response.data.message);
    }
    finally {
    setLoading(false); // ✅ hamesha last me
  }
}

 return (
  <div
    className="w-full min-h-screen bg-cover bg-center flex justify-center items-center px-4"
    style={{ backgroundImage: `url(${bg})` }}
  >
    <form 
      className="
        w-full sm:w-[90%] md:w-[70%] lg:w-[45%]
        bg-black/60 backdrop-blur-md shadow-lg shadow-black
        flex flex-col justify-center items-center gap-6 sm:gap-8
        rounded-2xl p-6 sm:p-10
      "
      onSubmit={handleSignin}
    >

      <h1 className="text-[22px] sm:text-[26px] md:text-[30px] text-white font-semibold text-center">
        Login to <span className="text-blue-700">Virtual Assistant</span>
      </h1>

      <input
        type="email"
        placeholder="E-mail"
        className="w-full sm:w-[80%] md:w-[60%] h-[45px] sm:h-[50px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-5 rounded-full shadow-md shadow-white text-[16px] sm:text-[18px]"
        required
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <div className="w-full sm:w-[80%] md:w-[60%] h-[45px] sm:h-[50px] border-2 border-white bg-transparent flex items-center justify-between px-5 rounded-full shadow-md shadow-white">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="bg-transparent outline-none text-white placeholder-gray-300 w-full text-[16px] sm:text-[18px]"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        {showPassword ? (
          <IoMdEye 
            className="text-white text-lg sm:text-xl cursor-pointer"
            onClick={() => setShowPass(false)}
          />
        ) : (
          <AiOutlineEyeInvisible 
            className="text-white text-lg sm:text-xl cursor-pointer"
            onClick={() => setShowPass(true)}
          />
        )}
      </div>

      {error.length > 0 && (
        <p className="text-red-600 text-[14px] sm:text-[18px] text-center">
          *{error}
        </p>
      )}

      <button
        type="submit"
        className="text-white text-[16px] sm:text-[20px] cursor-pointer border-2 px-10 sm:px-14 py-2 sm:py-3 rounded-full my-2 shadow-md shadow-white"
        disabled={loading}
      >
        {loading ? "Loading..." : "Sign In"}
      </button>

      <p className="text-white text-sm sm:text-base text-center">
        Create a new account?
        <span
          className="text-blue-700 px-1 cursor-pointer"
          onClick={() => navigate('/Signup')}
        >
          Sign Up
        </span>
      </p>

    </form>
  </div>
);
}

export default Signin