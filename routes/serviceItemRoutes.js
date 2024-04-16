const express = require("express");
const {
    addServiceItems,
    getAllServiceItems,
    getSpecificServiceItem,
} = require("../controllers/serviceItemControllers");
const routeProtector = require("../middleware/authMiddleware");
const serviceItemRoutes = express.Router();
serviceItemRoutes
    .route("/")
    .post(routeProtector, addServiceItems)
    .get(routeProtector, getAllServiceItems);
serviceItemRoutes.route("/:id").get(routeProtector, getSpecificServiceItem);
module.exports = serviceItemRoutes;
