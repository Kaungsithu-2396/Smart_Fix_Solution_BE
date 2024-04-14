const asyncHandler = require("express-async-handler");
const serviceItemModel = require("../Models/serviceItem_Model");
const { model } = require("mongoose");
//@desc GET getServiceItems
//@route GET /api/v1/serviceItems
//@access Private
const getAllServiceItems = asyncHandler(async (req, resp) => {
    const serviceItems = await serviceItemModel.find();
    resp.status(200).send({
        count: serviceItems.length,
        data: serviceItems,
    });
});
//@desc POST addServiceItems
//@route POST /api/v1/serviceItems
//@access Private
const addServiceItems = asyncHandler(async (req, resp) => {
    const { name, email, description, technicianId } = req.body;

    if (
        !name ||
        !email ||
        !description ||
        req.files.length === 0 ||
        !req.files
    ) {
        resp.status(400);
        throw new Error("Incompetence data providence");
    }
    const image = req.files[0].buffer;
    const newServiceItem = await serviceItemModel.create({
        name,
        email,
        description,
        technicianId,
        image: {
            data: image,
        },
    });
    resp.status(201).send({
        message: "Service Item has successfully been received",
        data: newServiceItem,
    });
});
module.exports = {
    addServiceItems,
    getAllServiceItems,
};
