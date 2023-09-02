const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    phoneNumberHash: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    otp: {
        type: Array,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
