const express = require("express");
const feedbackRoutes = express.Router();
const {
    getAllFeedback,
    uploadFeedback,
} = require("../controllers/feedbackControllers");
const routeProtector = require("../middleware/authMiddleware");
const { verifyAdmin } = require("../middleware/verifyAuthority");
feedbackRoutes
    .route("/")
    .get(routeProtector, verifyAdmin, getAllFeedback)
    .post(routeProtector, uploadFeedback);

module.exports = feedbackRoutes;
