const express = require("express");
const {
    addToCart,
    getCartItemOfuser,
} = require("../controllers/cartControllers");
const routeProtector = require("../middleware/authMiddleware");
const cartRoutes = express.Router();
cartRoutes
    .route("/")
    .post(routeProtector, addToCart)
    .get(routeProtector, getCartItemOfuser);
module.exports = cartRoutes;
