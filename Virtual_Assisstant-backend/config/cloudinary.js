import { v2 as cloudinary } from 'cloudinary'
import fs from'fs'
const uploadCloudinary = async(file_path)=>
{
    cloudinary.config({ 
  cloud_name: process.env.cloudinary_cloud_name, 
  api_key: process.env.cloudinary_api_key, 
  api_secret: process.env.cloudinay_api_secret
});

try {
    const uploadResult = await cloudinary.uploader
  .upload(file_path,{resource_type:'auto'})
  return uploadResult
} catch (error) {
    console.log(error)
    fs.unlinkSync(file_path)
    return res.status(500).json({message:'cloudinary error'})
}
}

export default uploadCloudinary