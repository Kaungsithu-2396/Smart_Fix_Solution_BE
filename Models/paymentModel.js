const mongoose = require("mongoose");
const paymentSchema = mongoose.Schema(
    {
        paySlip: {
            data: Buffer,
        },
        verified: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
        paymentBy: {
            type: mongoose.Types.ObjectId,
            ref: "user",
        },
    },
    {
        timeStamps: true,
    }
);
const paymentModel = mongoose.model("payment", paymentSchema);
module.exports = paymentModel;
