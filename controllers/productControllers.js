const productModel = require("../Models/productModel");
const asyncHandler = require("express-async-handler");
// @desc GET products
// @route GET /api/v1/products
// @access PRIVATE
const getAllProducts = asyncHandler(async (req, resp) => {
    const products = await productModel.find();
    console.log(req.user);
    resp.status(200).send({
        status: "success",
        count: products.length,
        products,
    });
});
// @desc GET products as id
// @route GET /api/v1/products/:id
// @access PRIVATE
const getSpecificProduct = asyncHandler(async (req, resp) => {
    const { id } = req.params;
    const selectedProduct = await productModel.findById(id);
    resp.status(200).send({
        product: selectedProduct,
    });
});
// @desc ADD products
// @route POST /api/v1/products
// @access PRIVATE
const addProduct = asyncHandler(async (req, resp) => {
    const { name, color, category, price, description } = req.body;
    const newProduct = await productModel.create({
        name,
        color,
        price,
        category,
        description,
    });
    resp.status(201).send({
        message: "product upload success",
        product: newProduct,
    });
});

// @desc DELETE product
// @route DELETE /api/v1/products/:id
// @access PRIVATE
const deleteProduct = asyncHandler(async (req, resp) => {
    const { id } = req.params;
    await productModel.findByIdAndDelete(id);
    resp.status(200).send({
        message: "delete success",
    });
});
// @desc UPDATE product
// @route PUT /api/v1/products/:id
// @access PRIVATE
const updateProduct = asyncHandler(async (req, resp) => {
    const { id } = req.params;
    const { name, color, category, price, description } = req.body;

    const updateProduct = await productModel.findByIdAndUpdate(
        id,
        {
            name,
            color,
            category,
            price,
            description,
        },
        {
            new: true,
            runValidators: true,
        }
    );
    resp.status(200).send({
        message: "Update success",
        product: updateProduct,
    });
});

module.exports = {
    getAllProducts,
    getSpecificProduct,
    addProduct,
    deleteProduct,
    updateProduct,
};
