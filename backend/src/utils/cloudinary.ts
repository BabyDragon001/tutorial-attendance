import cloudinary from "cloudinary";
import { unlink } from "fs/promises";

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload file to Cloudinary
export const uploadToCloudinary = async (filePath: string) => {
  try {
    const result = await cloudinary.v2.uploader.upload(filePath, {
      folder: "project_submissions",
    });
    await unlink(filePath); // Clean up local file
    return result.secure_url; // Return only the URL
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Cloudinary upload failed");
  }
};
