const asyncHandler = require("express-async-handler");
const paymentModel = require("../Models/paymentModel");
// @desc POST payment screenshot
// @route POST /api/v1/payment
// @access PRIVATE
const uploadPayment = asyncHandler(async (req, resp) => {
    if (!req.files || req.files.length == 0) {
        resp.status(400);
        throw new Error("no file found");
    }
    const newPaymentSlip = await paymentModel.create({
        paySlip: {
            data: req.files[0].buffer,
        },
        paymentBy: req.user.id,
    });
    resp.status(201).send({
        message: "success",
        data: newPaymentSlip,
    });
});
// @desc GET paymentHistory
// @route GET /api/v1/payment
// @access PRIVATE
const getPaymentSlip = asyncHandler(async (req, resp) => {
    const paymentHistory = await paymentModel.find({
        paymentBy: req.user.id,
    });
    resp.status(200).send({
        count: paymentHistory.length,
        data: paymentHistory,
    });
});
// @desc PUT approve Payment
// @route PUT /api/v1/payment/:id
// @access PRIVATE
const approvePayment = asyncHandler(async (req, resp) => {
    const { id } = req.params;
    if (!id) {
        resp.status(400);
        throw new Error("invalid id");
    }
    const isValidPayment = await paymentModel.findById(id);
    if (!isValidPayment) {
        resp.status(404);
        throw new Error("no payment found");
    }
    const approvePayment = await paymentModel.findByIdAndUpdate(
        id,
        {
            verified: true,
            status: "approved",
        },
        {
            new: true,
        }
    );
    resp.status(200).send({
        message: "approved",
        data: approvePayment,
    });
});
module.exports = {
    uploadPayment,
    getPaymentSlip,
    approvePayment,
};
