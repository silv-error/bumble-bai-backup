import mongoose from "mongoose";

const addressModel = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    fullName: {
        type: String,
        default: ""
    },
    permanentAddress: {
        type: String,
        default: ""
    },
    details: {
        type: String,
        default: ""
    },
    postalCode: {
        type: String,
        default: ""
    }
}, { timestamps: true });

const Address = mongoose.model("address", addressModel);

export default Address;