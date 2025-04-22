import  {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import {ApiResponse} from "../utils/apiResponse.js"
import {User} from "../models/user.models.js"
import jwt from "jsonwebtoken"

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
};
const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await User.findOne({ username });
        if (admin && (await User.matchPassword(password))) {
            const token = generateToken(admin._id);
            
            // Set token in cookies
            res.cookie("accessToken", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // Only secure in production
                sameSite: "strict",
                maxAge: process.env.ACCESS_TOKEN_EXPIRY_MS,
            });

            res.status(200).json({
                _id: admin._id,
                name: admin.name,
                email: admin.email,
                token,
            });
        } else {
            throw new ApiError(401, "Invalid email or password");
        }
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

const registerUser = asyncHandler(async(req,res)=>{
    const { username, password } = req.body;
    console.log(req.body);

    try {
        // Check if admin already exists
        const existingAdmin = await User.findOne({ username });
        if (existingAdmin) {
            throw new ApiError(400,"Email already exists!!")
        }

        // Create new admin
        const admin = await User.create({username, password });
        
        return res
        .status(201)
        .json(new ApiResponse(200,admin,"new admin created!!"))
    } catch (error) {
        throw new ApiError(400,"Error while registerting the admin!!")
    }
})
export {
    loginUser,
    registerUser
}