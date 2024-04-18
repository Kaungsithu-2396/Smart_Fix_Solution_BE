const productModel = require("../Models/productModel");
const asyncHandler = require("express-async-handler");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
// @desc ADD products
// @route POST /api/v1/products
// @access PRIVATE
const addProduct = asyncHandler(async (req, resp) => {
    const { name, color, category, price, description, stockItem } = req.body;
    if (!name || !color || !category || !price || !description) {
        resp.status(500);
        throw new Error("please provide complete data");
    }
    const colorCollection = Array.isArray(color)
        ? color
        : [...color.split(",")];
    const categoryCollection = Array.isArray(category)
        ? category
        : [...category.split(",")];
    if (!req.files || req.files.length == 0) {
        resp.status(500);
        throw new Error("no file found");
    }
    const newProduct = await productModel.create({
        name,
        color: colorCollection,
        category: categoryCollection,
        price,
        description,
        image: {
            data: req.files[0].buffer,
        },
        stockItem,
    });
    resp.status(201).send({
        message: "success",
        product: newProduct,
    });
});
// @desc GET products
// @route GET /api/v1/products
// @access PRIVATE
const getAllProducts = asyncHandler(async (req, resp) => {
    const products = await productModel.find();
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
    if (!id) {
        resp.status(400);
        throw new Error("Invalid id");
    }
    const selectedProduct = await productModel.findById(id);
    if (!selectedProduct) {
        resp.status(400);
        throw new Error("no product found");
    }
    resp.status(200).send({
        product: selectedProduct,
    });
});

// @desc DELETE product
// @route DELETE /api/v1/products/:id
// @access PRIVATE
const deleteProduct = asyncHandler(async (req, resp) => {
    const { id } = req.params;
    if (!id) {
        resp.status(500);
        throw new Error("no product found");
    }
    const isValidProduct = await productModel.findById(id);
    if (!isValidProduct) {
        resp.status(400);
        throw new Error("no product found");
    }
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
    const { name, color, price, description, category, stockItem } = req.body;
    let colorCollection, categoryCollection;
    const images = req.files[0].buffer;
    if (color) {
        colorCollection = Array.isArray(color) ? color : [...color.split(",")];
        console.log(colorCollection);
    }
    if (category) {
        categoryCollection = Array.isArray(category)
            ? category
            : [...category?.split(",")];
    }
    //frontend must send data witht this format "red,green"
    if (!id) {
        resp.status(400);
        throw new Error("invalid id");
    }
    const isProductExisit = await productModel.findById(id);
    if (!isProductExisit) {
        resp.status(400);
        throw new Error("no product found");
    }
    const updateProduct = await productModel.findByIdAndUpdate(
        id,
        {
            name,
            color: colorCollection,
            category: categoryCollection,
            price,
            description,
            images,
            stockItem,
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
