import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = async (userId, res) => {
    const token = jwt.sign({userId}, process.env.SECRET_TOKEN, {expiresIn: "15d"});

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, //MS
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks
        sameSite: "strict", // CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development",
    });
}
