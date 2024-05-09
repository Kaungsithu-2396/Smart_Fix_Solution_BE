const express = require("express");
const technicianRoutes = express.Router();
const routeProtector = require("../middleware/authMiddleware");
const {
    registerTechnician,
    logInTechnician,
    assignTaskToTechnician,
    getAllTechnicians,
    respectiveTechnician,
    getServiceItemHistory,
} = require("../controllers/technicianControllers");
technicianRoutes.route("/").post(registerTechnician).get(getAllTechnicians);
technicianRoutes
    .route("/serviceItems")
    .get(routeProtector, getServiceItemHistory);
technicianRoutes.route("/login").post(logInTechnician);
technicianRoutes
    .route("/:id")
    .patch(routeProtector, assignTaskToTechnician)
    .get(routeProtector, respectiveTechnician);
module.exports = technicianRoutes;
