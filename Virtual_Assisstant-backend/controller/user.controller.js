import { response } from "express"
import moment from "moment"
import uploadCloudinary from "../config/cloudinary.js"
import geminiResponse from "../gemini.js"
import User from "../models/user_model.js"
import userRouter from "../route/user_route.js"


export const getCurrentUser = async(req,res)=>
{ 
    try {
        const userId = req.user.id
        const user = await User.findById(userId).select("-password")
        if(!user)
        {
            return res.status(400).json({
                message:`user not found ${error}`
            })
        }
        return res.status(200).json(user)
    } 
    
    
    catch (error) {
         return res.status(500).json({
                message: error.message})
    }
}


export const updateAssisstant = async (req, res) => {
  try {

    const { assistantName, imageUrl } = req.body;

    let assistantImage;

    if (req.file) {
      const uploadImage = await uploadCloudinary(req.file.path);
      assistantImage = uploadImage.secure_url
    } else if (imageUrl) {
      assistantImage = imageUrl;
    }

    const updateData = {};

    if (assistantName) updateData.assistantName = assistantName;
    if (assistantImage) updateData.assistantImage = assistantImage;


    if (!req.user.id) {
      return res.status(401).json("Unauthorized");
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true }
    );

    return res.status(200).json(user);

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};




export const askToAssisstant = async (req, res) => {
  try {
    const { command } = req.body;
    const user = await User.findById(req.user.id);
    console.log(user)

    const userName = user.name;
    const assistant_Name = user.assistantName;

    const result = await geminiResponse(command, assistant_Name, userName);

    const jsonMatch = result.match(/{[\s\S]*}/);

    if (!jsonMatch) {
      return res.status(400).json({ response: "sorry, I can't understand" });
    }

    const gemResult = JSON.parse(jsonMatch[0]);
    const type = gemResult.type;

    switch (type) {
      case "get_time":
        return res.json({
          type,
          userinput: "current time",
          response: `The time is ${moment().format("hh:mm A")}`,
        });

      case "get_day":
        return res.json({
          type,
          userinput: gemResult.userinput,
          response: `Today is ${moment().format("dddd")}`,
        });

      case "get_date":
        return res.json({
          type,
          userinput: gemResult.userinput,
          response: `Today's date is ${moment().format("MMMM Do YYYY")}`,
        });

      case "google_search":
      case "youtube_search":
      case "youtube_play":
      case "general":
      case "calculator_open":
      case "instagram_open":
      case "facebook_open":
      case "weather_show":
        return res.json({
          type,
          userinput: gemResult.userinput,
          response: gemResult.response,
        });

      default:
        return res.status(400).json({ response: "assistant type not supported" });
    }

  }catch (error) {
  console.log("FULL ERROR 👉", error);
  return res.status(500).json({
    response: error.message || "server error"
  });
}

};
