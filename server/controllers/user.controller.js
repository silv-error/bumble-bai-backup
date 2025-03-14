import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";

import User from "../models/user.model.js";

export const updateUser = async (req, res) => {
    const { _id:userId } = req.user;
    const { firstName, lastName, email, phone, shopName, gender, dateOfBirth } = req.body;
    let { profileImg } = req.body;
    
    try {
        let user = User.findById(userId);

        if(profileImg) {
            if(user.profileImg) {
                /**
                 * If user already has pfp and want to update, we'll remove their previous pfp in the server
                 * @param {string} public_id - image ID
                 */
                await cloudinary.uploader.destroy(user.profileImg.split('/').pop().split('.')[0]);
            }

            /**
             * @param {string} file - filename
             * @returns image URL
             */
            const uploadedResponse = await cloudinary.uploader.upload(profileImg);
            profileImg = uploadedResponse.secure_url;
        }

        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.shopName = shopName || user.shopName;
        user.gender = gender || user.gender;
        user.dateOfBirth = dateOfBirth || user.dateOfBirth;
        user.profileImg = profileImg || user.profileImg;

        user = await user.save();

        user.password = null;

        return res.status(200).json(user);

    } catch (error) {
        console.error(`Error in updateUser controller : ${error.message}`);
        return res.status(500).json({error: "Internal server error"});
    }
}

export const getUserProfile = async (req, res) => {
    const { username } = req.params;
    
    try {
        const user = await User.findOne({ username }).select("-password");
        if(!user) {
            return res.status(404).json({error: "User not found"});
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error(`Error in getUserProfile : ${error.message}`);
        return res.status(500).json({error: "Internal server error"});
    }
}

export const forgotPassword = async (req, res) => {
    const { email, oldPassword, newPassword, confirmPassword } = req.body;

    try {
        if(!email || !oldPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({error: "You must input everything"});
        }

        let user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({error: "Email is not registered"});
        }

        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isPasswordMatch) {
            return res.status(400).json({error: "Invalid password"});
        }

        if(newPassword !== confirmPassword) {
            return res.status(400).json({error: "New password does not match"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword
    
        user = await user.save();
        user.password = null;

        return res.status(200).json(user);
    } catch (error) {
        console.error(`Error in forgotPassword : ${error.message}`);
        return res.status(500).json({error: "Internal server error"});
    }
}