const asyncHandler = require("express-async-handler");
const deliveredServiceModel = require("../Models/deliveredServiceModel");
const serviceItemModel = require("../Models/serviceItem_Model");
const technicianModel = require("../Models/technicianModel");
const sendMailToClient = require("../util/sendMail");
const submitDeliveredServiceItem = asyncHandler(async (req, resp) => {
    const { description, serviceItemId } = req.body;
    if (!serviceItemId) {
        resp.status(400);
        throw new Error("please provide the valid data");
    }
    const technician = await technicianModel.findById(req.user.id);
    if (!technician.assignedTask.includes(serviceItemId)) {
        resp.status(400);
        throw new Error("invalid task");
    }
    const client = await serviceItemModel
        .findById(serviceItemId)
        .select("-image");
    if (!client) {
        resp.status(404);
        throw new Error("no Service item found");
    }
    await serviceItemModel.findByIdAndUpdate(
        client.id,
        {
            status: "done",
        },
        {
            new: true,
        }
    );
    await technicianModel.findByIdAndUpdate(
        req.user.id,
        { $pull: { assignedTask: serviceItemId }, $set: { isAvailable: true } },
        { new: true }
    );
    const newDeliveredServiceItem = await deliveredServiceModel.create({
        description,
        technicianId: req.user.id,
        serviceItemId,
    });
    sendMailToClient(
        client.email,
        "Service Process Done",
        "<strong>Service Process is successfully done! Please pick up at Showroom. </strong>"
    );
    resp.status(201).send({
        message: "success",
        deliveredServiceItem: newDeliveredServiceItem,
    });
});
module.exports = { submitDeliveredServiceItem };
