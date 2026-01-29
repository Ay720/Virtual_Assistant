import React, { useEffect, useState, createContext } from "react";
import axios from "axios";

export const UserDataContext = createContext();

const serverUrl = "http://localhost:8000";

const UserProvider = ({ children }) => {

  const [userData, setUserData] = useState(undefined); 
  const [loading, setLoading] = useState(true);

  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // ✅ Load logged-in user on app start
  const handleCurrentUser = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/auth/user/current`,
        { withCredentials: true }
      );
      setUserData(result.data);   // logged user
    } catch (error) {
      setUserData(null);         // not logged in
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleCurrentUser();
  }, []);

  // 🎤 Assistant API
  const getGeminiResponse = async (command) => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/user/askToAssistant`,
        { command },
        { withCredentials: true }
      );
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    serverUrl,
    userData,
    setUserData,
    frontendImage,
    setFrontendImage,
    backendImage,
    setBackendImage,
    selectedImage,
    setSelectedImage,
    getGeminiResponse
  };

  // ⏳ Wait until session check finishes (FIXES reload bug)
  if (loading) return null; // or loader UI

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserProvider;
