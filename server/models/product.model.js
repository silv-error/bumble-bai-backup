import mongoose from "mongoose";

const productModel = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    productImg: { // TODO: Make this data required when UI is applied
        type: String,
        default: ""
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

const Product = mongoose.model("product", productModel);

export default Product;