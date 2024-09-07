import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const verifyJWT = asyncHandler(async(req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
        console.log("token" , token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
        
        console.log("hi");

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN)

        console.log(decodedToken);
    
        const user = await  User.findById(decodedToken?._id).select("-password")
    
        if (!user) {
            
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user;
        
        next()
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: error?.message || "somthing wen t wronge",
          });
    }
    
})


export {
    verifyJWT,
}