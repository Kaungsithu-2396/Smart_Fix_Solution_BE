const express = require("express");
const paymentRoutes = express.Router();
const {
    uploadPayment,
    getPaymentSlip,
    approvePayment,
} = require("../controllers/paymentControllers");
const routeProtector = require("../middleware/authMiddleware");
const { verifyAdmin } = require("../middleware/verifyAuthority");
paymentRoutes
    .route("/")
    .post(routeProtector, uploadPayment)
    .get(routeProtector, getPaymentSlip);
paymentRoutes.route("/:id").put(routeProtector, verifyAdmin, approvePayment);

module.exports = paymentRoutes;
