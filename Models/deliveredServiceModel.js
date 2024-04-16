const mongoose = require("mongoose");
const deliveredServiceSchema = mongoose.Schema({
    technicianId: {
        type: mongoose.Types.ObjectId,
        ref: "technician",
    },
    serviceItemId: {
        type: mongoose.Types.ObjectId,
        ref: "serviceItem",
    },
    description: {
        type: String,
        default: "Thanks for working with us ",
    },
});
const deliveredServiceModel = mongoose.model(
    "deliveredService",
    deliveredServiceSchema
);
module.exports=deliveredServiceModel;