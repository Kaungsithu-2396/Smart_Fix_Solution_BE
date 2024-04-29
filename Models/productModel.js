const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "please fill the name"],
        },
        color: {
            type: [String],
            required: [true, "please fill the color"],
            default: undefined, // mongoose default array value is "empty array []"
        },
        price: {
            type: Number,
            required: [true, "please fill the price"],
        },
        category: {
            type: [String],
            required: [true, "please fill the category section"],
            default: undefined,
        },
        description: {
            type: String,
            required: [true, "please fill the description"],
        },
        image: {
            type: String,
        },
        stockItem: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);
const productModel = mongoose.model("product", productSchema);
module.exports = productModel;
