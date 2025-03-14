import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../libs/utils/generateTokenAndSetCookie.js";

export const signup = async (req, res) => {
    try {
        const { username, firstName, lastName, email, password, confirmPassword } = req.body;

        if(!username || !firstName || !lastName || !email || !password || !confirmPassword) {
            res.status(400).json({error: "You must fillup username, firstname, lastname, email, password, confirm password"});
        }

        const existingUser = await User.findOne({username});
        if(existingUser) {
            res.status(400).json({error: "Username already exist"});
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            res.status(400).json({error: "Invalid email format"});
        }

        const existingEmail = await User.findOne({email});
        if(existingEmail) {
            res.status(400).json({error: "Email already exist"});
        }

        if(password !== confirmPassword) {
            res.status(400).json({error: "Your password does not match"});
        }

        if(password.length < 6) {
            res.status(400).json({error: "Password must be at least 6 characters long"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            firstName,
            lastName,
            email,
            password: hashedPassword
        })

        if(newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(200).json({
                _id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                phone: newUser.phone,
                shopName: newUser.shopName,
                dateOfBirth: newUser.dateOfBirth,
                gender: newUser.gender,
                profileImg: newUser.profileImg
            });
        } else {
            res.status(400).json({error: "Invalid user data"});
        }

    } catch (error) {
        res.status(500).json({error: `An error occured in signup controller: ${error.message}`});
    }
}

export const login = async (req, res) => {
    res.status(200).json({message: "user login"});
}

export const logout = async (req, res) => {
    res.status(200).json({message: "user logout"});
}

export const me = async (req, res) => {
    res.status(200).json({message: "get me"});
}