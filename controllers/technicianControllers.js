const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const technicianModel = require("../Models/technicianModel");
const jwt = require("jsonwebtoken");
const serviceItemModel = require("../Models/serviceItem_Model");
const { default: mongoose } = require("mongoose");
//@desc POST Technicians
//@route POST /api/v1/technicians
//@access Public
const registerTechnician = asyncHandler(async (req, resp) => {
    const { name, email, role, isAvailable, password } = req.body;
    if (!name || !email || !password) {
        resp.status(400);
        throw new Error("provide the complete data");
    }
    const isUserAlreadyExisit = await technicianModel.findOne({ email });
    if (isUserAlreadyExisit) {
        resp.status(400);
        throw new Error(`User already exisits with this email ${email}`);
    }
    const genSalt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, genSalt);
    const newTechnicianData = await technicianModel.create({
        name,
        email,
        password: hashPassword,
    });
    resp.status(201).send({
        message: "success",
        data: newTechnicianData,
        token: assignToken(newTechnicianData.id, newTechnicianData.role),
    });
});
//@desc POST Log in Technician
//@route POST /api/v1/technicians/login
//@access Public
const logInTechnician = asyncHandler(async (req, resp) => {
    const { email, password } = req.body;
    if (!email || !password) {
        resp.status(400);
        throw new Error("Please provide the complete data");
    }
    const isUserExisit = await technicianModel.findOne({ email });
    if (!isUserExisit) {
        resp.status(400);
        throw new Error("please register first");
    }
    if (await bcrypt.compare(password, isUserExisit.password)) {
        resp.status(401).send({
            message: "authenticated",
            data: isUserExisit,
            token: assignToken(isUserExisit.id, isUserExisit.role),
        });
    } else {
        resp.status(403).send({
            message: "Email or password wrong",
        });
    }
});
//@desc PUT assignTaskToTechnician
//@route PUT /api/v1/technician/:id
//@access Private
const assignTaskToTechnician = asyncHandler(async (req, resp) => {
    const { id } = req.params; //id of technician
    const { task_id } = req.body; //id of service Item
    let verifyServiceItem, technician;
    if (!task_id) {
        resp.status(400);
        throw new Error("Please provide the valid task id");
    }
    if (!id) {
        resp.status(400);
        throw new Error("invalid id");
    }
    const assignTechnician = await technicianModel.findById(id);
    if (!assignTechnician) {
        resp.status(404);
        throw new Error("no techncian found");
    }
    //find the duplicated task id
    if (assignTechnician.assignedTask.includes(task_id)) {
        resp.status(400);
        throw new Error("this task's already been assigned");
    }
    //Limit assign task to technician
    if (assignTechnician.assignedTask.length >= 2) {
        await technicianModel.findByIdAndUpdate(
            id,
            {
                isAvailable: false,
            },
            {
                new: true,
            }
        );
        resp.status(400).send({
            message: "Technician cannot be assigned due to overload",
        });
    } else {
        technician = await technicianModel.findByIdAndUpdate(
            assignTechnician.id,
            { $push: { assignedTask: task_id } },
            { new: true }
        );
        await serviceItemModel.findByIdAndUpdate(
            task_id,
            {
                status: "processing",
            },
            {
                new: true,
            }
        );

        for (let el of technician.assignedTask) {
            verifyServiceItem = await serviceItemModel
                .findById(el)
                .select("-image");
        }
        //assign the technicianID for serviceItem
        await serviceItemModel.findByIdAndUpdate(verifyServiceItem.id, {
            technicianId: technician.id,
        });
        resp.status(200).send({
            message: "assigned",
            technician,
        });
        ////
    }
});
const assignToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.SECRET_KEY, {
        expiresIn: "2d",
    });
};
//@desc GET technicians
//@route GET /api/v1/technician
//@access Private
const getAllTechnicians = asyncHandler(async (req, resp) => {
    const technicians = await technicianModel.find();
    resp.status(200).send({
        count: technicians.length,
        data: technicians,
    });
});
//@desc GET technicians
//@route GET /api/v1/technicians/:id
//@access Private
const respectiveTechnician = asyncHandler(async (req, resp) => {
    const { id } = req.params;
    if (!id) {
        resp.status(400);
        throw new Error("invalid id");
    }
    const technician = await technicianModel.findById(id);
    if (!technician) {
        resp.status(400);
        throw new Error("no technician found");
    }
    resp.status(200).send({
        data: technician,
    });
});
//@desc GET serviceItem history for each technician
//@Route GET /api/v1/technician
//@access PRIVATE
const getServiceItemHistory = asyncHandler(async (req, resp) => {
    const serviceItemRecord = await serviceItemModel.find({
        technicianId: new mongoose.Types.ObjectId(req.user.id),
    });
    resp.status(200).send({
        message: "success",
        count: serviceItemRecord.length,
        data: serviceItemRecord,
    });
});
module.exports = {
    registerTechnician,
    logInTechnician,
    assignTaskToTechnician,
    getAllTechnicians,
    respectiveTechnician,
    getServiceItemHistory,
};
