const express = require("express");
const deliveredServiceRoute = express.Router();
const { verifyTechnician } = require("../middleware/verifyAuthority");
const routeProtector = require("../middleware/authMiddleware.js");
const {
    submitDeliveredServiceItem,
} = require("../controllers/deliveredServiceControllers");
deliveredServiceRoute
    .route("/")
    .post(routeProtector, verifyTechnician, submitDeliveredServiceItem);
module.exports = deliveredServiceRoute;
