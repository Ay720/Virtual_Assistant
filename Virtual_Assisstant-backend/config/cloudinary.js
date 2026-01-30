import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadCloudinary = async (file_path) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(file_path, {
      resource_type: "auto",
    });

  
    return uploadResult;
  } catch (error) {
    console.log("Cloudinary error:", error);
    fs.unlinkSync(file_path);
    throw error;
  }
};

export default uploadCloudinary;
