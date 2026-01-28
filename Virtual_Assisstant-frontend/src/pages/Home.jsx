import { useContext, useEffect,useState, useRef } from "react";
import { UserDataContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const Home = () => {
   const navigate = useNavigate()


   useEffect (()=>
   { if(!userData)
      navigate('/signin')
   },[])
  
 
   const{serverUrl,userData,setUserData,getGeminiResponse} = useContext(UserDataContext)


   
   const handleLogOut = async()=>
   {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true})
      console.log("logout response:", result.data);
      setUserData(null);
    } catch (error) {
      console.log(error)
    }
   }
  

   const speak = (text)=>
   {
     const utterence = new window.SpeechSynthesisUtterance(text);
     window.speechSynthesis.speak(utterence);

   }



const handleCommand = (data) => {
 
    var type = data.type;
  const response = data.response || "";
  const text = (data.userInput || data.userinput || "").toLowerCase();
 
  
  if (text.includes("instagram")) {
    speak("Opening Instagram");
    window.open("https://www.instagram.com/", "_blank");
    return;
  }

  if (text.includes("youtube") && text.includes("search")) {
    const query = text.split("search")[1].trim();

    speak(`Searching ${query} on YouTube`);
    window.open(
      `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`,
      "_blank"
    );
    return;
  }


  if (text.includes("youtube")) {
    speak("Opening YouTube");
    window.open("https://www.youtube.com/", "_blank");
    return;
  }


  if (text.includes("google")) {
    const query = text.split("search")[1].trim();
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
    return;
  }

  if (text.includes("calculator")) {
    speak("Opening calculator");
    window.open("https://www.google.com/search?q=calculator", "_blank");
    return;
  }

  if(text.includes("song")||text.includes("play"))
  {
    const search = text.split("song")[1];
    speak(`playing${search}`);
    window.open(`https://open.spotify.com/search/${search}`)
    return
  }


if (text.includes("open") && text.includes("search")) {

  const afterOpen = text.split("open")[1];
  const app = afterOpen.split("search")[0].trim();
  const query = afterOpen.split("search")[1].trim();

  speak(`Opening ${app} and searching ${query}`);

  let url = "";

  if (app.includes("google")) {
    url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  } 
  else if (app.includes("youtube")) {
    url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
  } 
  else if (app.includes("amazon")) {
    url = `https://www.amazon.com/s?k=${encodeURIComponent(query)}`;
  } 
  else if (app.includes("flipkart")) {
    url = `https://www.flipkart.com/search?q=${encodeURIComponent(query)}`;
  } 
  else if (app.includes("myntra")) {
  url = `https://www.myntra.com/${encodeURIComponent(query)}`;
}
else {
  const cleanApps = app
    .replace(/and|or/g, "")   // remove words and/or
    .replace(/\s+/g, "")     // remove spaces
    .replace(/%20/g, "");    // just in case

  const cleanQuery = query.trim();

  url = `https://www.${cleanApps}.com/search?q=${encodeURIComponent(cleanQuery)}`;
}



  window.open(url, "_blank");
  return;
}



if (text.includes("open")) {
   const app = text.split("open")[1].trim().replace(/\s+/g, "");

  speak(`Opening ${app}`);

  window.open(`https://www.${app}.com/`);
  return;
}

  

  if (type === "general") {
    speak(response);
    return;
  }

  
};



    useEffect(()=>
  {
    const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    const recognition = new speechRecognition();
    recognition.continuous= true
    recognition.lang = 'en-US'

   recognition.onresult = async (e) => {
  const transcript = e.results[e.results.length - 1][0].transcript.trim();
  const userSpeech = transcript.toLowerCase();

  console.log("heard:", transcript);

  if (userSpeech.includes(userData.assistantName.toLowerCase())) {

    try {
      const data = await getGeminiResponse(transcript);
      console.log("AI reply:", data);
      handleCommand(data)
    } catch (err) {
      console.log("Gemini error:", err);
    }

  }
};

recognition.start()


  },[])

return (
  <div className="w-full h-[100vh] bg-gradient-to-t from-black to-[#02023d] flex justify-center items-center flex-col overflow-hidden">

    <button 
      className="text-white border-2 px-5 py-3 rounded-[3rem] w-[10rem] text-[1.2rem] cursor-pointer absolute top-6 right-6 bg-indigo-500"
      onClick={handleLogOut}
    >
      Log Out
    </button>

    <button 
      className="text-white border-2 px-5 py-3 rounded-[3rem] w-[10rem] text-[1.2rem] cursor-pointer absolute top-20 right-6 bg-indigo-500"
      onClick={() => navigate('/customize')}
    >
      Customize
    </button>

    {/* Floating Glow Container */}
    <div className="relative flex justify-center items-center animate-float">

      {/* Glow Circle */}
      <div className="absolute w-[380px] h-[380px] rounded-full bg-indigo-500 blur-3xl opacity-40"></div>

      {/* Assistant Image */}
      <img
        src={userData?.assistantImage}
        alt="assistant"
        className="h-[25rem] w-[20rem] object-cover rounded-4xl relative z-10"
      />

    </div>

    <h1 className="text-white text-2xl font-semibold mt-6">
      I am {userData.assistantName}
    </h1>

  </div>
);
}

export default Home;
