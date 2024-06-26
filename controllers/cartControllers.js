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

    const checkIsAlreadyExisitItem = await cartModel.find({
        userId: req.user.id,
    });
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
const processCheckout = asyncHandler(async (req, resp) => {
    const { id } = req.user;
    console.log(id);
    await cartModel.deleteMany({
        userId: "65c45c106fe8aebc3bd3086f",
    });
    resp.status(200).send({
        message: "delete success",
    });
});
const deleteCartItem = asyncHandler(async (req, resp) => {
    const { id } = req.params;
    if (!id) {
        resp.status(400);
        throw new Error("invalid id");
    }
    const isItemExisit = await cartModel.findById(id);
    if (!isItemExisit) {
        resp.status(404);
        throw new Error("This item doesn't exisit");
    }
    await cartModel.findByIdAndDelete(id);
    resp.status(200).send({
        message: "delete success",
    });
});
module.exports = {
    addToCart,
    getCartItemOfuser,
    deleteCartItem,
    processCheckout,
};
