import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    // get refresh token from cookies if user from web || from body if user from mobile
    const token =
      req.cookies?.accessToken ||
      req.headers("Authorization")?.replace("Bearer ", ""); 
  
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }
  
    // decode token using access token secret
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  
    // get user from db using id from decoded token
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
  
    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }
  
    // attach user to request
    req.user = user;
  
    next();
  } catch (err) {
    throw new ApiError(401, "Invalid Access Token");
  }
});