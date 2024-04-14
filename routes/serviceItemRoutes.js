const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
    addServiceItems,
    getAllServiceItems,
} = require("../controllers/serviceItemControllers");
const serviceItemRoutes = express.Router();
serviceItemRoutes.route("/").post(addServiceItems).get(getAllServiceItems);
module.exports = serviceItemRoutes;
