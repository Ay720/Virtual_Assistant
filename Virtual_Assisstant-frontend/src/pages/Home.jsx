import { useContext, useEffect } from "react";
import { UserDataContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();

 
  const { serverUrl, userData, setUserData, getGeminiResponse } =
    useContext(UserDataContext);


  useEffect(() => {
    if (!userData) navigate("/signin");
  }, [userData, navigate]);

 
  if (!userData) return null;


  const speak = (text) => {
  const core = document.querySelector(".cinematic-core");
  core?.classList.add("speaking");

  const utter = new SpeechSynthesisUtterance(text);

  utter.onend = () => core?.classList.remove("speaking");

  window.speechSynthesis.speak(utter);
};

 useEffect(() => {
    if (!userData) {
      const storedUser = localStorage.getItem("userData");

      if (storedUser) {
        setUserData(JSON.parse(storedUser));
      }
    }
  }, []);
  // 👋 Welcome voice when Home loads
  useEffect(() => {
    if (userData?.name) {
      speak(
        `Hey ${userData.name}, I am ${userData.assistantName}. What can I do for you?`
      );
    }
  }, [userData]);

  // 🚪 Logout
  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      setUserData(null);
    } catch (error) {
      console.log(error);
    }
  };

  // 🧠 Command handler
  const handleCommand = (data) => {
    const type = data.type;
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
        `https://www.youtube.com/results?search_query=${encodeURIComponent(
          query
        )}`,
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
      const query = text.split("search")[1];
      window.open(
        `https://www.google.com/search?q=${encodeURIComponent(query)}`,
        "_blank"
      );
      return;
    }

    if (text.includes("calculator")) {
      speak("Opening calculator");
      window.open("https://www.google.com/search?q=calculator", "_blank");
      return;
    }

    if (text.includes("song") || text.includes("play")) {
      const search = text.split("song")[1] || "";
      speak(`Playing ${search}`);
      window.open(`https://open.spotify.com/search/${search}`);
      return;
    }

    if (text.includes("open") && text.includes("search")) {
      const afterOpen = text.split("open")[1];
      const app = afterOpen.split("search")[0].trim();
      const query = afterOpen.split("search")[1].trim();

      speak(`Opening ${app} and searching ${query}`);

      let url = "";

      if (app.includes("google"))
        url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      else if (app.includes("youtube"))
        url = `https://www.youtube.com/results?search_query=${encodeURIComponent(
          query
        )}`;
      else if (app.includes("amazon"))
        url = `https://www.amazon.com/s?k=${encodeURIComponent(query)}`;
      else if (app.includes("flipkart"))
        url = `https://www.flipkart.com/search?q=${encodeURIComponent(query)}`;
      else if (app.includes("myntra"))
        url = `https://www.myntra.com/${encodeURIComponent(query)}`;
      else {
        const cleanApp = app.replace(/\s+/g, "");
        url = `https://www.${cleanApp}.com/search?q=${encodeURIComponent(
          query
        )}`;
      }

      window.open(url, "_blank");
      return;
    }

    if (text.includes("open")) {
      const app = text.split("open")[1].trim().replace(/\s+/g||`${assistantName}`, "");
      speak(`Opening ${app}`);
      window.open(`https://www.${app}.com/`);
      return;
    }

    if (type === "general") {
      speak(response);
    }
  };

  // 🎧 Speech recognition
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";

    recognition.onresult = async (e) => {
      const transcript =
        e.results[e.results.length - 1][0].transcript;
      const userSpeech = transcript.toLowerCase();
      console.log("heard : "+transcript)
      if (
        userSpeech.includes(userData.assistantName.toLowerCase())
      ) {
        try {
          const data = await getGeminiResponse(transcript);
          console.log("heard : "+transcript)
          handleCommand(data);
        } catch (err) {
          console.log("Gemini error:", err);
        }
      }
    };

    recognition.start();

    return () => recognition.stop();
  }, [userData]);

  // 🎨 UI
  return (
  <div className="w-full h-screen bg-gradient-to-br from-black via-[#02023d] to-black flex flex-col items-center justify-center relative overflow-hidden">

  {/* Controls */}
  <div className="absolute top-6 right-6 flex gap-3">
    <button
      onClick={handleLogOut}
      className="px-5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-lg"
    >
      Log Out
    </button>

    <button
      onClick={() => navigate("/customize")}
      className="px-5 py-2 rounded-full border border-white/30 text-white hover:bg-white/10 transition"
    >
      Customize
    </button>
  </div>

  {/* 🌌 CINEMATIC AI CORE */}
  <div className="relative cinematic-core flex justify-center items-center">

    {/* Energy Aura */}
    <div className="absolute w-[320px] h-[320px] bg-cyan-400 blur-[100px] opacity-40 rounded-full cinematic-aura"></div>

    {/* Assistant (LARGER SIZE) */}
    <img
      src={userData.assistantImage}
      alt="assistant"
      className="w-[220px] object-contain rounded-3xl relative z-10 cinematic-glow"
    />
  </div>

  {/* 🎧 Voice Waves */}
  <div className="wave mt-8 flex">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>

  <h1 className="text-white text-3xl font-semibold mt-6 tracking-wide">
    {userData.assistantName}
  </h1>

</div>

);

};

export default Home;
