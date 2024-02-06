const asyncHandler = require("express-async-handler");
const userModel = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const routeProtector = asyncHandler(async (req, resp, next) => {
    let token;
    try {
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
            const decode = jwt.verify(token, process.env.SECRET_KEY);
            req.user = await userModel.findById(decode.id);
        }
    } catch (error) {
        resp.status(401);
        throw new Error("Invalid token");
    }

    next();
});
module.exports = routeProtector;
