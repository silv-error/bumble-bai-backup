import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        default: ""
    },
    shopName: {
        type: String,
        default: ""
    },
    dateOfBirth: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        default: ""
    },
    profileImg: {
        type: String,
        default: ""
    }
}, {timestamps:true})

const User = mongoose.model("User", userModel);

export default User;