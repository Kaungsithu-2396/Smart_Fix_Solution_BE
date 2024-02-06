const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name must be filled"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "email must be filled"],
    },
    password: {
        type: String,
        min: [7, "password must have at least 7 words"],
        required: [true, "password must be filled"],
    },
    role: {
        type: String,
        default: "user",
    },
});
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
