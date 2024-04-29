const express = require("express");
const { verifyAdmin } = require("../middleware/verifyAuthority");
const routeProtector = require("../middleware/authMiddleware");
const userRoutes = express.Router();
const {
    getAllUsers,
    getMe,
    signUpUser,
    loginUser,
    getSpecificUser,
    updateUserInfo,
    deleteUserInfo,
} = require("../controllers/userControllers");

userRoutes
    .route("/")
    .get(routeProtector, verifyAdmin, getAllUsers)
    .post(signUpUser);
userRoutes
    .route("/:id")
    .put(routeProtector, verifyAdmin, updateUserInfo)
    .get(routeProtector, getSpecificUser)
    .delete(routeProtector, verifyAdmin, deleteUserInfo);
userRoutes.route("/login").post(loginUser);
userRoutes.route("/me").get(routeProtector, getMe);

module.exports = userRoutes;
