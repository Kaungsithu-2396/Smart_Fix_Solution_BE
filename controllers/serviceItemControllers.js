const asyncHandler = require("express-async-handler");
const serviceItemModel = require("../Models/serviceItem_Model");
const { model } = require("mongoose");
const sendMailToClient = require("../util/sendMail");
const technicianModel = require("../Models/technicianModel");
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
    if (newServiceItem) {
        sendMailToClient(
            email,
            "Service Item received",
            `Please explore the device status using id <br>
             <strong style="font-size:20px;">${newServiceItem.id}</strong> `
        );
    }
    resp.status(201).send({
        message: "Service Item has successfully been received",
        data: newServiceItem,
    });
});
const getSpecificServiceItem = asyncHandler(async (req, resp) => {
    const { id } = req.params; //id of service Item
    if (!id) {
        resp.status(400);
        throw new Error("invalid id");
    }
    const serviceItem = await serviceItemModel.findById(id).select("-password");
    if (!serviceItem) {
        resp.status(400);
        throw new Error("no service item found");
    }
    const technicianForServiceItem = await technicianModel
        .findById(serviceItem.technicianId)
        .select("-password");
    if (!technicianForServiceItem) {
        resp.status(400);
        throw new Error("no technician found");
    }
    resp.status(200).send({
        serviceItem,
        technician: technicianForServiceItem,
    });
});
const deleteServiceItem = asyncHandler(async (req, resp) => {
    const { id } = req.params; //id of service item
    if (!id) {
        resp.status(400);
        throw new Error("invalid id");
    }
    const isValidServiceItem = await serviceItemModel.findById(id);
    if (!isValidServiceItem) {
        resp.status(400);
        throw new Error("invalid service item");
    }
    await technicianModel.findByIdAndUpdate(
        isValidServiceItem.technicianId,
        {
            $pull: { assignedTask: id },
        },
        { new: true }
    );
    await serviceItemModel.findByIdAndDelete(id);
    resp.status(200).send({
        message: "delete success",
    });
});
module.exports = {
    addServiceItems,
    getAllServiceItems,
    getSpecificServiceItem,
    deleteServiceItem,
};
