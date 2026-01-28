import axios from "axios"

const geminiResponse = async (command,assistant_Name,userName) => {
  try {
    const apiUrl =process.env.GEMINI_FULL
    const prompt = `You are a virtual assistant named "${assistant_Name}" created by "${userName}".  
You will always respond in the following JSON format:

{
  "type": "general" | "google_search" | "youtube_search" | "youtube_play" | 
           "calculator_open" | "instagram_open" | "facebook_open" | "weather_show" |
           "get_time" | "get_date" | "get_day" | "get_month",
  "userinput": "<original user input> (remove assistant's name if mentioned, keep only what user said; 
                if it's google or youtube search, include only search text)",
  "response": "<complete details what user ask about 5 lines and give direct information what user ask dont write unnecessary details>"
}

Type meanings:
- "general": if it's a factual or informational question.  
- "google_search": if user wants to search something on Google.  
- "youtube_search": if user wants to search something on YouTube.  
- "youtube_play": if user wants to directly play a video or song.  
- "calculator_open": if user wants to open a calculator.  
- "instagram_open": if user wants to open Instagram.  
- "facebook_open": if user wants to open Facebook.  
- "weather_show": if user wants to know the weather.  
- "get_time": if user asks for current time.  
- "get_date": if user asks for today’s date.  
- "get_day": if user asks what day it is.  
- "get_month": if user asks for the current month.  

Important:
- If someone asks “tumhe kisne banaya” or “who created you”, reply with "${userName}".  
- Only respond with the JSON object, nothing else.

Now the user input is: "${command}"
  `;

    const result = await axios.post(
      apiUrl,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }
    )
    return result.data.candidates[0].content.parts[0].text
  } catch (error) {
  console.log("Gemini Error:", error.response?.data || error.message)

  return JSON.stringify({
    type: "general",
    userinput: command,
    response: "Gemini service is busy right now. Please try again in a few seconds."
  })
}

}
export default geminiResponse;
