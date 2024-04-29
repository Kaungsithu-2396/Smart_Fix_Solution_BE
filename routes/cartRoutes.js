const express = require("express");
const {
    addToCart,
    getCartItemOfuser,
    deleteCartItem,
    processCheckout,
} = require("../controllers/cartControllers");
const routeProtector = require("../middleware/authMiddleware");
const cartRoutes = express.Router();
cartRoutes
    .route("/")
    .post(routeProtector, addToCart)
    .get(routeProtector, getCartItemOfuser)
    .delete(routeProtector, processCheckout);
cartRoutes.route("/:id").delete(routeProtector, deleteCartItem);
module.exports = cartRoutes;
