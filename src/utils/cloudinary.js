import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath) return null;

        // upload file to cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        // file has been uploaded successfully
        console.log("file is uploaded on cloudinary ", response.url);
        return response;
    } catch (err) { 
        // remove locally saved temporary fils asupload operation got failed 
        fs.unlinkSync(localFilePath);
        return null;
    }
};

export { uploadOnCloudinary }