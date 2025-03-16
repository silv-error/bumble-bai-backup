import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({error: "Unauthorized: Token is missing"});
        }

        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        if(!decoded) {
            return res.status(401).json({error: "Unauthorized: Invalid user"});
        }

        const user = await User.findById(decoded.userId).select("-password");
        if(!user) {
            return res.status(401).json({error: "User not found"});
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(`Error in protectRoute : ${error.message}`);
        return res.status(500).json({error: "Internal server error"});
    }
}