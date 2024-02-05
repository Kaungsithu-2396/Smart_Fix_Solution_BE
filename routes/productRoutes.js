const express = require("express");
const productRoutes = express.Router();
const {
    getAllProducts,
    getSpecificProduct,
    deleteProduct,
    addProduct,
    updateProduct,
} = require("../controllers/productControllers");
productRoutes.route("/").get(getAllProducts).post(addProduct);
productRoutes
    .route("/:id")
    .get(getSpecificProduct)
    .delete(deleteProduct)
    .put(updateProduct);

module.exports = productRoutes;
