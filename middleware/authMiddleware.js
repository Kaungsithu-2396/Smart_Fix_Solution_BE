const asyncHandler = require("express-async-handler");
const userModel = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const technicianModel = require("../Models/technicianModel");
const routeProtector = asyncHandler(async (req, resp, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            let decode = jwt.verify(token, process.env.SECRET_KEY);
            if (decode.role === "technician") {
                req.user = await technicianModel
                    .findById(decode.id)
                    .select("-password");
            }
            req.user = await userModel.findById(decode.id).select("-password");
        } catch (error) {
            resp.status(401);
            throw new Error("INVALID token");
        }
    } else {
        resp.status(401);
        throw new Error("No token found");
    }
    next();
});
module.exports = routeProtector;
