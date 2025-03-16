import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import Address from "../models/address.model.js";
import { generateTokenAndSetCookie } from "../libs/utils/generateTokenAndSetCookie.js";

export const signup = async (req, res) => {
    try {
        const { username, firstName, lastName, email, password, confirmPassword } = req.body;

        if(!username || !firstName || !lastName || !email || !password || !confirmPassword) {
            return res.status(400).json({error: "Please ensure all information is provided"});
        }

        const existingUser = await User.findOne({username});
        if(existingUser) {
            return res.status(400).json({error: "Username already exist"});
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            return res.status(400).json({error: "Invalid email format"});
        }

        const existingEmail = await User.findOne({email});
        if(existingEmail) {
            return res.status(400).json({error: "Email already exist"});
        }

        if(password !== confirmPassword) {
            return res.status(400).json({error: "Your password does not match"});
        }

        if(password.length < 6) {
            return res.status(400).json({error: "Password must be at least 6 characters long"});
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

            await Address.create({
                user: newUser._id
            })

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
        console.error(`Error in signup controller : ${error.message}`);
        res.status(500).json({error: `Internal server error`});
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect) {
            return res.status(400).json({error: "Invalid email or password"});
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullname: user.fullName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            shopName: user.shopName,
            dateOfBirth: user.dateOfBirth,
            gender: user.gender,
            profileImg: user.profileImg
        });
    } catch (error) {
        console.error(`Error in login controller : ${error.message}`)
        res.status(500).json({message: `Internal server error`});
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({message: "User logout successfully"});
    } catch (error) {
        console.log(`Error in logout controller : ${error.message}`);
        res.status(500).json({error: "Internal server error"});
    }
}

export const me = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).select("-password");

        if(!user) {
            return res.status(400).json({error: "User not found"});
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(`Error in get user controller : ${error.message}`);
        res.status(500).json({error: "Internal server error"});
    }
}