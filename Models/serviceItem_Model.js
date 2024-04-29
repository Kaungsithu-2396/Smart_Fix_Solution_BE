const mongoose = require("mongoose");
const serviceItemSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "name is left to fill"],
    },
    email: {
        type: String,
        require: [true, "email is left to fill"],
    },
    image: String,
    description: {
        type: String,
        default: "No specific description is provided",
    },
    status: {
        type: String,
        enum: ["pending", "processing", "done"],
        default: "pending",
    },
    address: {
        type: String,
        default: "",
    },
    technicianId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "technician",
    },
});
const serviceItemModel = mongoose.model("serviceItem", serviceItemSchema);
module.exports = serviceItemModel;
