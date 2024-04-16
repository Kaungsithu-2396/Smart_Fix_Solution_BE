const express = require("express");
const technicianRoutes = express.Router();
const routeProtector = require("../middleware/authMiddleware");
const {
    registerTechnician,
    logInTechnician,
    assignTaskToTechnician,
    getAllTechnicians,
    respectiveTechnician,
} = require("../controllers/technicianControllers");
technicianRoutes
    .route("/")
    .post(registerTechnician)
    .get(routeProtector, getAllTechnicians);
technicianRoutes.route("/login").post(logInTechnician);
technicianRoutes
    .route("/:id")
    .put(routeProtector, assignTaskToTechnician)
    .get(routeProtector, respectiveTechnician);
module.exports = technicianRoutes;
