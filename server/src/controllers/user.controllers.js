import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const admin = await User.findOne({ username });
    if (admin && await admin.isPasswordCorrect(password)) {
        const accessToken = admin.generateAccessToken();
        const refreshToken = admin.generateRefreshToken();

        await admin.setRefreshToken(refreshToken); // Hash & store refresh token

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: process.env.ACCESS_TOKEN_EXPIRY_MS,
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: process.env.REFRESH_TOKEN_EXPIRY_MS,
        });

        res.status(200).json({
            _id: admin._id,
            username: admin.username,
            accessToken,
        });
    } else {
        throw new ApiError(401, "Invalid username or password");
    }
});

const registerUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const existingAdmin = await User.findOne({ username });
    if (existingAdmin) {
        throw new ApiError(400, "Username already exists");
    }

    const admin = await User.create({ username, password });

    res.status(201).json(new ApiResponse(200, admin, "New admin created"));
});

export {
    loginUser,
    registerUser
};
