import { v2 as cloudinary } from "cloudinary";

import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const createProduct = async (req, res) => {
    const { title, price, category, productDetails } = req.body;
    const { productImg } = req.body;

    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        // TODO: Add productImg in this condition if UI is applied
        if(!title || !price || !category || !productDetails) {
            return res.status(400).json({error: "You must input everything"});
        }

        if(!user) {
            return res.status(400).json({error: "User not found"});
        }

        if(productImg) {
            const uploadResponse = await cloudinary.uploader.upload(productImg);
            const productImg = uploadResponse.secure_url;
        }

        const newProduct = new Product({
            user: user._id,
            productImg: productImg || "",
            title: title,
            price: price,
            category: category,
            productDetails: productDetails
        })

        if(newProduct) {
            await newProduct.save();

            return res.status(200).json(newProduct);
        }
    } catch (error) {
        console.error(`Error in createProduct controller : ${error.message}`);
        return res.status(500).json({error: "Internal server error"});
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().
        sort({createdAt: -1}).
        populate({path: "user", select: "-password"});
        if(!products) {
            return res.status(400).json({error: "No products found"});
        }

        return res.status(200).json(products);
    } catch (error) {
        console.error(`Error in getAllProducts controller : ${error.message}`);
        return res.status(500).json({error: "Internal server error"});
    }
}

export const getMyProducts = async (req, res) => {
    try {
        const userId = req.user._id;

        // let myProducts = await Product.aggregate([
        //     {
        //         $match: {
        //             user: {$ne: userId}
        //         }
        //     },
        // ]);

        // const productIds = myProducts.map(product => product._id);

        // console.log(productIds)

        // const populatedProducts = await Product.find({ _id: { $in: productIds } })
        //                                 .populate('user') // Populate the user field
        //                                 .exec();

        // if(populatedProducts) {
        //     return res.status(200).json(populatedProducts);
        // } else {
        //     return res.status(400).json({error: "No products found"});
        // }

        const myProducts = await Product.find({user: {$in: userId}}).populate({path: "user", select: "-password"});

        if(myProducts) {
            return res.status(200).json(myProducts);
        } else {
            return res.status(400).json({error: "No products found"});
        }
    } catch (error) {
        console.error(`Error in getMyProducts controller : ${error.message}`);
        return res.status(500).json({error: "Internal server error"});
    }
}
