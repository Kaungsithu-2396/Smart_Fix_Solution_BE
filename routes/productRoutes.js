const express = require("express");
const productRoutes = express.Router();
const routeProtector = require("../middleware/authMiddleware");
const { verifyAdmin } = require("../middleware/verifyAuthority");
const uploadProduct_Img = require("../index");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const {
    getAllProducts,
    getSpecificProduct,
    deleteProduct,
    addProduct,
    updateProduct,
} = require("../controllers/productControllers");
productRoutes
    .route("/")
    .get(getAllProducts)
    .post(routeProtector, verifyAdmin, addProduct);
productRoutes
    .route("/:id")
    .get(getSpecificProduct)
    .delete(routeProtector, verifyAdmin, deleteProduct)
    .put(routeProtector, verifyAdmin, updateProduct);

module.exports = productRoutes;
