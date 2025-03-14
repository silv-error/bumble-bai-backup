import express from "express";
import authRoute from "./routes/auth.routes.js";

const app = express();

app.use('/api/auth', authRoute);

app.listen(8080, () => {
    console.log(`Server is running on http://localhost:5000`);
});