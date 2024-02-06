const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
//@desc GET Users
//@route GET /api/v1/users
//@access Private
const getAllUsers = asyncHandler(async (req, resp) => {
    const user = await userModel.find();
    resp.status(200).send({
        count: user.length,
        user,
    });
});
//@desc GET specificUser
//@route GET /api/v1/user/me
//@access Private
const getMe = asyncHandler(async (req, resp) => {
    resp.status(200).send("me info");
});
//@desc Sign Up User
//@route POST /api/v1/user
//@access Private
const signUpUser = asyncHandler(async (req, resp) => {
    const { name, email, password } = req.body;
    const genSalt = await bcrypt.genSalt(10);
    if (!name || !email || !password) {
        throw new Error("All the required data have to be filled");
    }
    const isDuplicatedUser = await userModel.findOne({ email });
    if (isDuplicatedUser) {
        throw new Error("User already exisits with this email");
    }
    const hashPassword = await bcrypt.hash(password, genSalt);
    const newUser = await userModel.create({
        name,
        email,
        password: hashPassword,
    });
    resp.status(201).send({
        message: "sign up success",
        user: newUser,
        token: signJWTToken(newUser.id, newUser.role),
    });
});
//@desc Login User
//@route POST /api/v1/user/login
//@access Private
const loginUser = asyncHandler(async (req, resp) => {
    const { email, password } = req.body;
    const isExisitingUser = await userModel.findOne({ email });
    if (!email || !password) {
        throw new Error("please fill the required staff to login");
    }
    if (!isExisitingUser) {
        throw new Error("User doesn't exisit");
    }
    if (
        isExisitingUser &&
        (await bcrypt.compare(password, isExisitingUser.password))
    ) {
        resp.status(201).send({
            user: isExisitingUser,
            token: signJWTToken(isExisitingUser.id, isExisitingUser.role),
        });
    } else {
        resp.status(404).send({
            message: "Email or Password wrong",
        });
    }
});
//@desc Update User Info
//@route PUT /api/v1/user/:id
//@access Private
const updateUserInfo = asyncHandler(async (req, resp) => {
    const { id } = req.params;
    resp.status(200).send({
        message: "update success",
    });
});
//@desc Delete User Info
//@route DELETE /api/v1/user/:id
//@access Private
const deleteUserInfo = asyncHandler(async (req, resp) => {
    const { id } = req.params;
    resp.status(200).send({
        message: "delete success",
    });
});

const signJWTToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.SECRET_KEY, { expiresIn: "2d" });
};

module.exports = {
    getAllUsers,
    getMe,
    signUpUser,
    loginUser,
    updateUserInfo,
    deleteUserInfo,
};
