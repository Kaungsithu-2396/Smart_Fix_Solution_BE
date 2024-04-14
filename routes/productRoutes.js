const express = require("express");
const productRoutes = express.Router();
const routeProtector = require("../middleware/authMiddleware");
const verifyAdmin = require("../middleware/verifyAdmin");
const uploadProduct_Img = require("../index");
const {
    getAllProducts,
    getSpecificProduct,
    deleteProduct,
    addProduct,
    updateProduct,
} = require("../controllers/productControllers");
productRoutes
    .route("/")
    .get(routeProtector, verifyAdmin, getAllProducts)
    .post(routeProtector, verifyAdmin, addProduct);
productRoutes
    .route("/:id")
    .get(routeProtector, verifyAdmin, getSpecificProduct)
    .delete(routeProtector, verifyAdmin, deleteProduct)
    .put(routeProtector, verifyAdmin, updateProduct);

module.exports = productRoutes;
