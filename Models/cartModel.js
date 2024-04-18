const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.ObjectId,
            ref: "user",
        },
        products: [
            {
                productId: {
                    type: mongoose.Schema.ObjectId,
                    ref: "product",
                    required: [true, "invalid id"],
                },
                count: {
                    type: Number,
                    default: 0,
                },
            },
        ],
    },
    {
        new: true,
    }
);
const cartModel = mongoose.model("Carts", cartSchema);
module.exports = cartModel;
