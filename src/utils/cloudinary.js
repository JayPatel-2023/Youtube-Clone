import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ApiError } from "./apiError.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

function extractPublicId(url) {
  // Function to extract the public ID from the URL

  // This regex assumes the public ID is everything after "upload/" and before the file extension
  const regex = /\/upload\/(?:v\d+\/)?([^\.]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const checkIfPublicIdExists = async (publicId) => {
  // Function to check if the public ID exists on Cloudinary

  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: publicId, // Searching for the resource with the specific public ID
      max_results: 1, // We only need to check if one result exists
    });

    return result.resources.length > 0;
  } catch (error) {
    console.error("Error checking for public ID existence:", error);
    return false;
  }
};

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // upload file to cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // file has been uploaded successfully
    console.log("file is uploaded on cloudinary ", response.url);

    // remove locally saved temporary files
    fs.unlinkSync(localFilePath);
    return response;
  } catch (err) {
    // remove locally saved temporary fils asupload operation got failed
    fs.unlinkSync(localFilePath);
    return null;
  }
};

const deleteOnCloudinary = async (imageUrl) => {
  try {
    if (!imageUrl) return null;

    console.log(`Image URL: ${imageUrl}`);
    // Extract the public ID
    const publicId = extractPublicId(imageUrl);
    console.log(`Public ID: ${publicId}`);

    const exists = await checkIfPublicIdExists(publicId);

    if (!exists) {
      console.log(`Public ID ${publicId} does not exist on Cloudinary.`);
      return null;
    }

    // Delete the image if the public ID was successfully extracted

    const response = cloudinary.uploader.destroy(
      publicId,
      function (error, result) {
        if (error) {
          console.error("Error deleting image:", error);
        } else {
          console.log("Image deleted:", result);
          return response;
        }
      }
    );
  } catch (err) {
    throw new ApiError(500, "Something went wrong while deleting image");
  }
};

export { uploadOnCloudinary, deleteOnCloudinary };
