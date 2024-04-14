const mongoose = require("mongoose");

const cartModel = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
    },
    productId: {
        type: mongoose.Schema.ObjectId,
    },
});
