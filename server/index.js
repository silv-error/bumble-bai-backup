import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from 'cloudinary';

import connectMongoDB from "./db/connectMongoDB.js";

import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";

dotenv.config();

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const app = express();
const PORT = process.env.PORT;

app.use(express.json({ limit: "10mb" })); // allow us to parse json data using req.body
app.use(express.urlencoded({ extended: true })); // allow us to parse URl encoded data using req.body
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);

app.listen(PORT, () => {
    connectMongoDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});