const asyncHandler = require("express-async-handler");
const productModel = require("../Models/productModel");
const cartModel = require("../Models/cartModel");
const { default: mongoose } = require("mongoose");
const addToCart = asyncHandler(async (req, resp) => {
    const { productId } = req.body;
    let count = 0;

    if (!productId) {
        resp.status(400);
        throw new Error("Invalid id");
    }
    const isValidProduct = await productModel.findById(productId);
    if (!isValidProduct) {
        resp.status(404);
        throw new Error("no product found");
    }

    let productIdCol = [];

    const checkIsAlreadyExisitItem = await cartModel.find();
    for (let el of checkIsAlreadyExisitItem) {
        productIdCol.push(el.products[0].productId);
    }
    const isDuplicatedItem = productIdCol
        .map((objId) => objId.toString())
        .includes(productId);
    if (isDuplicatedItem) {
        count += 1;
        const updateCount = await cartModel.updateOne(
            {
                "products.productId": productId,
            },
            {
                $inc: { "products.$.count": count },
            }
        );
        resp.status(201).send({
            message: "success",
            data: updateCount,
        });
    } else {
        const cartItem = await cartModel.create({
            userId: req.user.id,
            products: [
                {
                    productId,
                },
            ],
        });
        resp.status(201).send({
            message: "success",
            data: cartItem,
        });
    }
});
const getCartItemOfuser = asyncHandler(async (req, resp) => {
    const cartItems = await cartModel.find({ userId: req.user.id });
    resp.status(200).send({
        count: cartItems.length,
        data: cartItems,
    });
});
module.exports = {
    addToCart,
    getCartItemOfuser,
};
