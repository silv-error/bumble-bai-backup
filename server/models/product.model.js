import mongoose from "mongoose";

const productModel = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    productImg: {
        type: String,
        default: "",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    productDetails: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Product = mongoose.model("Product", productModel);

export default Product;