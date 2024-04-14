const mongoose = require("mongoose");
const techncianSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "please specifiy the name"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "email must be filled"],
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        default: "technician",
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    assignedTask: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "serviceItem",
        },
    ],
});
const technicianModel = mongoose.model("technician", techncianSchema);
module.exports = technicianModel;
