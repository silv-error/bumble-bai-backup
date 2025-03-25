import { v2 as cloudinary } from "cloudinary";

import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const createProduct = async (req, res) => {
    try {
        let { productImg } = req.body;
        const { title, price, category, productDetails } = req.body;
        const userId = req.user._id;
        const user = await User.findById(userId);

        if(!title || !price || !category || !productDetails || !productImg) {
            res.status(400).json({error: "You must input everything"});
        }

        if(!user) {
            res.status(400).json({error: "User not found"});
        }

        if(productImg) {
            const uploadResponse = await cloudinary.uploader.upload(productImg);
            productImg = uploadResponse.secure_url;
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

            res.status(200).json(newProduct);
        }
    } catch (error) {
        console.error(`Error in createProduct controller : ${error.message}`);
        res.status(500).json({error: "Internal server error"});
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const userId = req.user._id;
        const productId = req.params.id;

        const myProduct = await Product.findOne({_id: productId, user: userId});

        if(!myProduct) return res.status(401).json({error: "Unauthorized: Failed to delete product"});

        await Product.findByIdAndDelete({_id: productId});

        res.status(200).json({success: true, message: "Product has been deleted"});
    } catch (error) {
        console.error(`Error in deleteProduct controller : ${error.message}`);
        res.status(500).json({error: "Internal server error"});
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const userId = req.user._id; // No need for await here, _id is not a promise
        const products = await Product.find({ user: { $ne: userId } }) // Corrected the query
            .sort({ createdAt: -1 })
            .populate({ path: "user", select: "-password"});

        if (products.length === 0) { // Check if the array is empty
            return res.status(200).json([]);
        }

        // const allProducts = [] 
        // products.map((product) => (
        //     allProducts.push({
        //         title: product.title,
        //         user: product.user,
        //         price: product.price,
        //         category: product.category,
        //         productDetails: product.productDetails,
        //         productImg: product.productImg
        //     })
        // ))

        res.status(200).json(products);
    } catch (error) {
        console.error(`Error in getAllProducts controller : ${error.message}`);
        res.status(500).json({error: "Internal server error"});
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
        //     res.status(200).json(populatedProducts);
        // } else {
        //     res.status(400).json({error: "No products found"});
        // }

        const myProducts = await Product.find({user: {$in: userId}}).populate({path: "user", select: "-password"});

        if(myProducts) {
            res.status(200).json(myProducts);
        } else {
            res.status(200).json([]);
        }
    } catch (error) {
        console.error(`Error in getMyProducts controller : ${error.message}`);
        res.status(500).json({error: "Internal server error"});
    }
}
