const express = require("express");
const userRoutes = express.Router();
const {
    getAllUsers,
    getMe,
    signUpUser,
    loginUser,
    updateUserInfo,
    deleteUserInfo,
} = require("../controllers/userControllers");

userRoutes.route("/").get(getAllUsers).post(signUpUser);
userRoutes.route("/:id").put(updateUserInfo).delete(deleteUserInfo);
userRoutes.route("/login").post(loginUser);
userRoutes.route("/me").get(getMe);

module.exports = userRoutes;
