const asyncHandler = require("express-async-handler");
const feedbackModel = require("../Models/feedBackModel");
//@desc GET feedback
//@Route GET /api/v1/feedback
//@access PRIVATE
const getAllFeedback = asyncHandler(async (req, resp) => {
    const feedbackCol = await feedbackModel.find();
    resp.status(200).send({
        count: feedbackCol.length,
        data: feedbackCol,
    });
});
//@desc POST feedback
//@Route POST /api/v1/feedback
//@access PRIVATE (login user)
const uploadFeedback = asyncHandler(async (req, resp) => {
    const { description, satisfiedRate } = req.body;
    if (!description) {
        resp.status(400);
        throw new Error("please provide your opinion for better system");
    }
    const newFeedback = await feedbackModel.create({
        description,
        satisfiedRate,
        feedbackBy: req.user.id,
    });
    resp.status(201).send({
        message: "success",
        data: newFeedback,
    });
});
module.exports = {
    getAllFeedback,
    uploadFeedback,
};
