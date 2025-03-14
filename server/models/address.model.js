import mongoose from "mongoose";

const addressModel = mongoose.Schema({
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