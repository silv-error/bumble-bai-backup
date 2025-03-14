import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.routes.js";
import connectDB from "./db/connectDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json({ limit: "10mb" })); // allow us to parse json data using req.body
app.use(express.urlencoded({ extended: true })); // allow us to parse URl encoded data using req.body
app.use(cookieParser());

app.use('/api/auth', authRoute);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});