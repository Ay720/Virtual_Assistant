import React, { useEffect, useState } from 'react'
import { createContext,useContext} from "react";
import axios from 'axios';

export const UserDataContext = createContext();

const serverUrl = "http://localhost:8000";

const UserProvider = ({children}) =>
{
  const [userData,setUserData] = useState(undefined);
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

const handleCurrentUser = async() =>
{
  try 
  {
    const result = await axios.get(`${serverUrl}/api/auth/user/current`,{withCredentials:true});
    setUserData(result.data);
    console.log(result.data);
  } catch (error) 
  {
    console.error("Error fetching current user:", error);
  }
  finally {
    setLoading(false);
  }
}


const getGeminiResponse = async(command) =>
{
  try 
  {
    const result = await axios.post(`${serverUrl}/api/auth/user/askToAssistant`,{command},{withCredentials:true})
    return result.data
  } 
  catch (error) 
  {
    console.log(error)
  }
}




useEffect(()=>
{
  handleCurrentUser();
},[])

const value = {serverUrl,userData,setUserData
,frontendImage,setFrontendImage,backendImage,setBackendImage,selectedImage, setSelectedImage,getGeminiResponse 
};

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  )
}

export default UserProvider