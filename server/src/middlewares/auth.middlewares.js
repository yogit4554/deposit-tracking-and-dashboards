import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        // Extract the token from cookies or Authorization header
        const token = 
            req.cookies?.accessToken || 
            req.header("Authorization")?.replace("Bearer ", "").trim();

        if (!token) {
            throw new ApiError(401, "Unauthorized request - No token provided");
        }

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Fetch the user based on the token payload
        const user = await User.findById(decodedToken.id).select("-password");
        if (!user) {
            throw new ApiError(401, "Unauthorized request - User not found");
        }

        // Attach the user object to the request for future use
        req.user = user;
        next();
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            throw new ApiError(401, "Unauthorized request - Invalid token");
        } else if (error.name === "TokenExpiredError") {
            throw new ApiError(401, "Unauthorized request - Token has expired");
        } else {
            throw new ApiError(401, error.message || "Unauthorized request");
        }
    }
});