import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

import dotenv from 'dotenv';
dotenv.config(
  {
    path : "../.env"
  }
);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    console.log("Started to upload....");
    console.log("File Path:", localFilePath);

   
    console.log("keys :" ,  process.env.CLOUDINARY_CLOUD_NAME," ",process.env.CLOUDINARY_API_KEY," ",process.env.CLOUDINARY_API_SECRET,"  end..");

    // Trim any extra spaces and check if the file exists
    const trimmedFilePath = localFilePath.trim();

    if (!trimmedFilePath || !fs.existsSync(trimmedFilePath)) {
      console.error("Invalid file path or file does not exist.");
      return null;
    }

    // Upload the file to Cloudinary
    
    const response = await cloudinary.uploader.upload(trimmedFilePath, {
      resource_type: "auto",
    });

    // Log the Cloudinary response
    console.log("Cloudinary Response:", response);

    // Delete the local file after successful upload
    fs.unlinkSync(trimmedFilePath);

    return response;
  } catch (error) {
    console.error("Error during upload:", error);

    // Remove the local file if the upload fails
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};

export { uploadOnCloudinary };
